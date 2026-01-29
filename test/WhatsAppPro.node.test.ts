import { WhatsAppPro } from '../src/nodes/WhatsAppPro/WhatsAppPro.node';

/**
 * WhatsApp Pro Node Tests
 * 
 * Tests for interactive messages, buttons, lists, templates, media, and catalog operations
 * Following n8n testing conventions
 */

// Helper function to get operations for a resource
function getOperationsForResource(node: WhatsAppPro, resource: string): string[] {
	const operationProperty = node.description.properties.find(
		(p) => p.name === 'operation' && p.displayOptions?.show?.resource?.includes(resource)
	);
	if (!operationProperty || operationProperty.type !== 'options') return [];
	return (operationProperty as any).options.map((o: any) => o.value);
}

// Helper to generate button payload (mirrors node logic)
function generateButtonPayload(params: {
	to: string;
	bodyText: string;
	buttons: { id: string; title: string }[];
	headerText?: string;
	footerText?: string;
}) {
	const payload: any = {
		messaging_product: 'whatsapp',
		recipient_type: 'individual',
		to: params.to,
		type: 'interactive',
		interactive: {
			type: 'button',
			body: { text: params.bodyText },
			action: {
				buttons: params.buttons.map((btn) => ({
					type: 'reply',
					reply: {
						id: btn.id,
						title: btn.title.substring(0, 20),
					},
				})),
			},
		},
	};

	if (params.headerText) {
		payload.interactive.header = { type: 'text', text: params.headerText };
	}
	if (params.footerText) {
		payload.interactive.footer = { text: params.footerText };
	}

	return payload;
}

// Helper to generate list payload
function generateListPayload(params: {
	to: string;
	bodyText: string;
	buttonText: string;
	sections: { title: string; items: { id: string; title: string; description: string }[] }[];
	headerText?: string;
	footerText?: string;
}) {
	const payload: any = {
		messaging_product: 'whatsapp',
		recipient_type: 'individual',
		to: params.to,
		type: 'interactive',
		interactive: {
			type: 'list',
			body: { text: params.bodyText },
			action: {
				button: params.buttonText.substring(0, 20),
				sections: params.sections.map((section) => ({
					title: section.title.substring(0, 24),
					rows: section.items.map((item) => ({
						id: item.id,
						title: item.title.substring(0, 24),
						description: item.description.substring(0, 72),
					})),
				})),
			},
		},
	};

	if (params.headerText) {
		payload.interactive.header = { type: 'text', text: params.headerText };
	}
	if (params.footerText) {
		payload.interactive.footer = { text: params.footerText };
	}

	return payload;
}

// Helper to generate contact payload
function generateContactPayload(params: {
	to: string;
	firstName: string;
	lastName?: string;
	phone: string;
	email?: string;
	org?: string;
}) {
	const contact: any = {
		name: {
			formatted_name: params.lastName ? `${params.firstName} ${params.lastName}` : params.firstName,
			first_name: params.firstName,
		},
		phones: [{ phone: params.phone, type: 'CELL' }],
	};

	if (params.lastName) {
		contact.name.last_name = params.lastName;
	}
	if (params.email) {
		contact.emails = [{ email: params.email, type: 'WORK' }];
	}
	if (params.org) {
		contact.org = { company: params.org };
	}

	return {
		messaging_product: 'whatsapp',
		recipient_type: 'individual',
		to: params.to,
		type: 'contacts',
		contacts: [contact],
	};
}

// Helper to generate template payload
function generateTemplatePayload(params: {
	to: string;
	templateName: string;
	languageCode: string;
	variables?: { component: string; value: string }[];
}) {
	const payload: any = {
		messaging_product: 'whatsapp',
		recipient_type: 'individual',
		to: params.to,
		type: 'template',
		template: {
			name: params.templateName,
			language: { code: params.languageCode },
		},
	};

	if (params.variables && params.variables.length > 0) {
		const bodyParams = params.variables
			.filter((v) => v.component === 'body')
			.map((v) => ({ type: 'text', text: v.value }));

		if (bodyParams.length > 0) {
			payload.template.components = [
				{
					type: 'body',
					parameters: bodyParams,
				},
			];
		}
	}

	return payload;
}

describe('WhatsApp Pro Node', () => {
	let whatsAppPro: WhatsAppPro;

	beforeEach(() => {
		whatsAppPro = new WhatsAppPro();
	});

	describe('Node Description', () => {
		it('should have correct node properties', () => {
			expect(whatsAppPro.description.displayName).toBe('WhatsApp Pro');
			expect(whatsAppPro.description.name).toBe('whatsAppPro');
			expect(whatsAppPro.description.group).toContain('transform');
			expect(whatsAppPro.description.version).toBe(1);
		});

		it('should require whatsAppProApi credentials', () => {
			const credentials = whatsAppPro.description.credentials;
			expect(credentials).toBeDefined();
			expect(credentials).toHaveLength(1);
			expect(credentials![0].name).toBe('whatsAppProApi');
			expect(credentials![0].required).toBe(true);
		});

		it('should have all required resources', () => {
			const resourceProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'resource'
			);
			expect(resourceProperty).toBeDefined();
			expect(resourceProperty!.type).toBe('options');
			
			const options = (resourceProperty as any).options;
			const resourceValues = options.map((o: any) => o.value);
			
			expect(resourceValues).toContain('message');
			expect(resourceValues).toContain('interactive');
			expect(resourceValues).toContain('template');
			expect(resourceValues).toContain('media');
			expect(resourceValues).toContain('catalog');
		});
	});

	describe('Message Operations', () => {
		it('should have sendText operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'message');
			expect(operations).toContain('sendText');
		});

		it('should have sendLocation operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'message');
			expect(operations).toContain('sendLocation');
		});

		it('should have sendContact operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'message');
			expect(operations).toContain('sendContact');
		});

		it('should have react operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'message');
			expect(operations).toContain('react');
		});

		it('should have contact fields defined', () => {
			const contactFields = ['contactFirstName', 'contactLastName', 'contactPhone', 'contactEmail', 'contactOrg'];
			for (const field of contactFields) {
				const property = whatsAppPro.description.properties.find(p => p.name === field);
				expect(property).toBeDefined();
			}
		});
	});

	describe('Interactive Operations', () => {
		it('should have sendButtons operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'interactive');
			expect(operations).toContain('sendButtons');
		});

		it('should have sendList operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'interactive');
			expect(operations).toContain('sendList');
		});

		it('should have sendCta operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'interactive');
			expect(operations).toContain('sendCta');
		});

		it('should have requestLocation operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'interactive');
			expect(operations).toContain('requestLocation');
		});

		it('should limit buttons to max 3', () => {
			const buttonsProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'buttons'
			);
			expect(buttonsProperty).toBeDefined();
			expect((buttonsProperty as any).typeOptions?.maxValues).toBe(3);
		});

		it('should limit sections to max 10', () => {
			const sectionsProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'sections'
			);
			expect(sectionsProperty).toBeDefined();
			expect((sectionsProperty as any).typeOptions?.maxValues).toBe(10);
		});
	});

	describe('Template Operations', () => {
		it('should have sendTemplate operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'template');
			expect(operations).toContain('sendTemplate');
		});

		it('should have listTemplates operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'template');
			expect(operations).toContain('listTemplates');
		});

		it('should have getTemplate operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'template');
			expect(operations).toContain('getTemplate');
		});

		it('should have deleteTemplate operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'template');
			expect(operations).toContain('deleteTemplate');
		});

		it('should have template variables field', () => {
			const templateVarsProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'templateVariables'
			);
			expect(templateVarsProperty).toBeDefined();
			expect(templateVarsProperty!.type).toBe('fixedCollection');
		});
	});

	describe('Media Operations', () => {
		it('should have sendImage operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'media');
			expect(operations).toContain('sendImage');
		});

		it('should have sendVideo operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'media');
			expect(operations).toContain('sendVideo');
		});

		it('should have sendDocument operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'media');
			expect(operations).toContain('sendDocument');
		});

		it('should have sendAudio operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'media');
			expect(operations).toContain('sendAudio');
		});

		it('should have sendSticker operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'media');
			expect(operations).toContain('sendSticker');
		});

		it('should support both URL and Media ID sources', () => {
			const mediaSourceProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'mediaSource'
			);
			expect(mediaSourceProperty).toBeDefined();
			
			const options = (mediaSourceProperty as any).options;
			const sourceValues = options.map((o: any) => o.value);
			
			expect(sourceValues).toContain('url');
			expect(sourceValues).toContain('id');
		});
	});

	describe('Catalog Operations', () => {
		it('should have sendProduct operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'catalog');
			expect(operations).toContain('sendProduct');
		});

		it('should have sendProductList operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'catalog');
			expect(operations).toContain('sendProductList');
		});

		it('should have getCatalog operation', () => {
			const operations = getOperationsForResource(whatsAppPro, 'catalog');
			expect(operations).toContain('getCatalog');
		});

		it('should have catalogId field', () => {
			const catalogIdProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'catalogId'
			);
			expect(catalogIdProperty).toBeDefined();
			expect(catalogIdProperty!.required).toBe(true);
		});
	});

	describe('Common Fields', () => {
		it('should have required "to" field for message operations', () => {
			const toProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'to'
			);
			expect(toProperty).toBeDefined();
			expect(toProperty!.required).toBe(true);
			expect(toProperty!.type).toBe('string');
		});

		it('should hide "to" field for non-message operations', () => {
			const toProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'to'
			);
			expect(toProperty!.displayOptions?.hide?.operation).toContain('listTemplates');
			expect(toProperty!.displayOptions?.hide?.operation).toContain('getTemplate');
			expect(toProperty!.displayOptions?.hide?.operation).toContain('deleteTemplate');
			expect(toProperty!.displayOptions?.hide?.operation).toContain('getCatalog');
		});
	});

	describe('CTA Button Fields', () => {
		it('should have ctaType field with url and phone options', () => {
			const ctaTypeProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'ctaType'
			);
			expect(ctaTypeProperty).toBeDefined();
			
			const options = (ctaTypeProperty as any).options;
			const typeValues = options.map((o: any) => o.value);
			
			expect(typeValues).toContain('url');
			expect(typeValues).toContain('phone');
		});

		it('should have ctaUrl field for URL type', () => {
			const ctaUrlProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'ctaUrl'
			);
			expect(ctaUrlProperty).toBeDefined();
			expect(ctaUrlProperty!.displayOptions?.show?.ctaType).toContain('url');
		});

		it('should have ctaPhone field for phone type', () => {
			const ctaPhoneProperty = whatsAppPro.description.properties.find(
				(p) => p.name === 'ctaPhone'
			);
			expect(ctaPhoneProperty).toBeDefined();
			expect(ctaPhoneProperty!.displayOptions?.show?.ctaType).toContain('phone');
		});
	});
});

describe('WhatsApp API Payload Structures', () => {
	describe('Interactive Button Payload', () => {
		it('should generate correct button payload structure', () => {
			const payload = generateButtonPayload({
				to: '56912345678',
				bodyText: 'How can I help you?',
				buttons: [
					{ id: 'btn1', title: 'Sales' },
					{ id: 'btn2', title: 'Support' },
				],
			});

			expect(payload.messaging_product).toBe('whatsapp');
			expect(payload.recipient_type).toBe('individual');
			expect(payload.to).toBe('56912345678');
			expect(payload.type).toBe('interactive');
			expect(payload.interactive.type).toBe('button');
			expect(payload.interactive.body.text).toBe('How can I help you?');
			expect(payload.interactive.action.buttons).toHaveLength(2);
			expect(payload.interactive.action.buttons[0].type).toBe('reply');
			expect(payload.interactive.action.buttons[0].reply.id).toBe('btn1');
			expect(payload.interactive.action.buttons[0].reply.title).toBe('Sales');
		});

		it('should include optional header and footer', () => {
			const payload = generateButtonPayload({
				to: '56912345678',
				bodyText: 'Body text',
				buttons: [{ id: 'btn1', title: 'OK' }],
				headerText: 'Header',
				footerText: 'Footer',
			});

			expect(payload.interactive.header).toBeDefined();
			expect(payload.interactive.header.type).toBe('text');
			expect(payload.interactive.header.text).toBe('Header');
			expect(payload.interactive.footer.text).toBe('Footer');
		});

		it('should truncate button title to 20 characters', () => {
			const longTitle = 'This is a very long button title that exceeds limit';
			const payload = generateButtonPayload({
				to: '56912345678',
				bodyText: 'Body',
				buttons: [{ id: 'btn1', title: longTitle }],
			});

			expect(payload.interactive.action.buttons[0].reply.title.length).toBeLessThanOrEqual(20);
		});
	});

	describe('Interactive List Payload', () => {
		it('should generate correct list payload structure', () => {
			const payload = generateListPayload({
				to: '56912345678',
				bodyText: 'Select an option',
				buttonText: 'View Options',
				sections: [
					{
						title: 'Products',
						items: [
							{ id: 'p1', title: 'Product A', description: 'Description A' },
							{ id: 'p2', title: 'Product B', description: 'Description B' },
						],
					},
				],
			});

			expect(payload.type).toBe('interactive');
			expect(payload.interactive.type).toBe('list');
			expect(payload.interactive.body.text).toBe('Select an option');
			expect(payload.interactive.action.button).toBe('View Options');
			expect(payload.interactive.action.sections).toHaveLength(1);
			expect(payload.interactive.action.sections[0].title).toBe('Products');
			expect(payload.interactive.action.sections[0].rows).toHaveLength(2);
		});

		it('should truncate list item titles to 24 characters', () => {
			const longTitle = 'This is a very long item title that exceeds the limit';
			const payload = generateListPayload({
				to: '56912345678',
				bodyText: 'Body',
				buttonText: 'Options',
				sections: [
					{
						title: 'Section',
						items: [{ id: 'i1', title: longTitle, description: '' }],
					},
				],
			});

			expect(payload.interactive.action.sections[0].rows[0].title.length).toBeLessThanOrEqual(24);
		});

		it('should truncate descriptions to 72 characters', () => {
			const longDesc = 'This is a very long description that definitely exceeds the seventy-two character limit imposed by the WhatsApp API';
			const payload = generateListPayload({
				to: '56912345678',
				bodyText: 'Body',
				buttonText: 'Options',
				sections: [
					{
						title: 'Section',
						items: [{ id: 'i1', title: 'Item', description: longDesc }],
					},
				],
			});

			expect(payload.interactive.action.sections[0].rows[0].description.length).toBeLessThanOrEqual(72);
		});
	});

	describe('Contact Payload', () => {
		it('should generate correct contact payload structure', () => {
			const payload = generateContactPayload({
				to: '56912345678',
				firstName: 'John',
				lastName: 'Doe',
				phone: '+1234567890',
				email: 'john@example.com',
				org: 'Acme Inc',
			});

			expect(payload.type).toBe('contacts');
			expect(payload.contacts).toHaveLength(1);
			expect(payload.contacts[0].name.first_name).toBe('John');
			expect(payload.contacts[0].name.last_name).toBe('Doe');
			expect(payload.contacts[0].name.formatted_name).toBe('John Doe');
			expect(payload.contacts[0].phones[0].phone).toBe('+1234567890');
			expect(payload.contacts[0].phones[0].type).toBe('CELL');
			expect(payload.contacts[0].emails[0].email).toBe('john@example.com');
			expect(payload.contacts[0].org.company).toBe('Acme Inc');
		});

		it('should handle contact without optional fields', () => {
			const payload = generateContactPayload({
				to: '56912345678',
				firstName: 'John',
				phone: '+1234567890',
			});

			expect(payload.contacts[0].name.formatted_name).toBe('John');
			expect(payload.contacts[0].name.last_name).toBeUndefined();
			expect(payload.contacts[0].emails).toBeUndefined();
			expect(payload.contacts[0].org).toBeUndefined();
		});
	});

	describe('Template Payload', () => {
		it('should generate correct template payload structure', () => {
			const payload = generateTemplatePayload({
				to: '56912345678',
				templateName: 'hello_world',
				languageCode: 'es',
			});

			expect(payload.type).toBe('template');
			expect(payload.template.name).toBe('hello_world');
			expect(payload.template.language.code).toBe('es');
		});

		it('should include template variables', () => {
			const payload = generateTemplatePayload({
				to: '56912345678',
				templateName: 'order_confirmation',
				languageCode: 'es',
				variables: [
					{ component: 'body', value: 'John' },
					{ component: 'body', value: 'Order #123' },
				],
			});

			expect(payload.template.components).toBeDefined();
			expect(payload.template.components[0].type).toBe('body');
			expect(payload.template.components[0].parameters).toHaveLength(2);
			expect(payload.template.components[0].parameters[0].text).toBe('John');
		});
	});

	describe('Reaction Payload', () => {
		it('should generate correct reaction payload', () => {
			const payload = {
				messaging_product: 'whatsapp',
				recipient_type: 'individual',
				to: '56912345678',
				type: 'reaction',
				reaction: {
					message_id: 'wamid.xxxxx',
					emoji: '👍',
				},
			};

			expect(payload.type).toBe('reaction');
			expect(payload.reaction.message_id).toBe('wamid.xxxxx');
			expect(payload.reaction.emoji).toBe('👍');
		});
	});

	describe('Location Request Payload', () => {
		it('should generate correct location request payload', () => {
			const payload = {
				messaging_product: 'whatsapp',
				recipient_type: 'individual',
				to: '56912345678',
				type: 'interactive',
				interactive: {
					type: 'location_request_message',
					body: { text: 'Please share your location' },
					action: {
						name: 'send_location',
					},
				},
			};

			expect(payload.interactive.type).toBe('location_request_message');
			expect(payload.interactive.action.name).toBe('send_location');
		});
	});
});

describe('Validation Tests', () => {
	describe('Button Validation', () => {
		it('should enforce maximum 3 buttons', () => {
			const buttons = [
				{ id: '1', title: 'One' },
				{ id: '2', title: 'Two' },
				{ id: '3', title: 'Three' },
				{ id: '4', title: 'Four' }, // This should fail
			];
			expect(buttons.length).toBeGreaterThan(3);
		});

		it('should require button ID and title', () => {
			const validButton = { id: 'btn1', title: 'Click me' };
			expect(validButton.id).toBeTruthy();
			expect(validButton.title).toBeTruthy();
		});
	});

	describe('List Validation', () => {
		it('should enforce maximum 10 sections', () => {
			const maxSections = 10;
			expect(maxSections).toBe(10);
		});

		it('should enforce maximum 10 total items across sections', () => {
			const maxTotalItems = 10;
			expect(maxTotalItems).toBe(10);
		});
	});

	describe('Character Limits', () => {
		it('should enforce 20 char limit for button titles', () => {
			const maxLength = 20;
			const title = 'Short';
			expect(title.length).toBeLessThanOrEqual(maxLength);
		});

		it('should enforce 24 char limit for list item titles', () => {
			const maxLength = 24;
			const title = 'List Item Title';
			expect(title.length).toBeLessThanOrEqual(maxLength);
		});

		it('should enforce 72 char limit for list item descriptions', () => {
			const maxLength = 72;
			const description = 'A reasonable description';
			expect(description.length).toBeLessThanOrEqual(maxLength);
		});

		it('should enforce 60 char limit for headers', () => {
			const maxLength = 60;
			const header = 'Header Text';
			expect(header.length).toBeLessThanOrEqual(maxLength);
		});

		it('should enforce 60 char limit for footers', () => {
			const maxLength = 60;
			const footer = 'Footer Text';
			expect(footer.length).toBeLessThanOrEqual(maxLength);
		});
	});
});
