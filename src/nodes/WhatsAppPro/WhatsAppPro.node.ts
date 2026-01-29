import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	NodeOperationError,
} from 'n8n-workflow';

/**
 * WhatsApp Pro Node - Advanced WhatsApp Business API integration
 * Supports interactive messages, buttons, lists, templates, media, and catalog
 * 
 * @author LatamFlows
 * @version 2.0.0
 */
export class WhatsAppPro implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WhatsApp Pro',
		name: 'whatsAppPro',
		icon: 'file:whatsapp.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Advanced WhatsApp Business API with interactive messages, buttons, lists and catalogs',
		defaults: {
			name: 'WhatsApp Pro',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'whatsAppProApi',
				required: true,
			},
		],
		properties: [
			// ==================== RESOURCE ====================
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Interactive',
						value: 'interactive',
					},
					{
						name: 'Template',
						value: 'template',
					},
					{
						name: 'Media',
						value: 'media',
					},
					{
						name: 'Catalog',
						value: 'catalog',
					},
				],
				default: 'message',
			},

			// ==================== MESSAGE OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Send Text',
						value: 'sendText',
						description: 'Send a text message',
						action: 'Send a text message',
					},
					{
						name: 'Send Location',
						value: 'sendLocation',
						description: 'Send a location message',
						action: 'Send a location message',
					},
					{
						name: 'Send Contact',
						value: 'sendContact',
						description: 'Send a contact card',
						action: 'Send a contact card',
					},
					{
						name: 'React',
						value: 'react',
						description: 'React to a message with an emoji',
						action: 'React to a message',
					},
				],
				default: 'sendText',
			},

			// ==================== INTERACTIVE OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['interactive'],
					},
				},
				options: [
					{
						name: 'Send Buttons',
						value: 'sendButtons',
						description: 'Send a message with quick reply buttons (up to 3)',
						action: 'Send interactive buttons',
					},
					{
						name: 'Send List',
						value: 'sendList',
						description: 'Send a list message with sections (up to 10 items)',
						action: 'Send a list message',
					},
					{
						name: 'Send CTA Button',
						value: 'sendCta',
						description: 'Send a Call-to-Action button (URL or Phone)',
						action: 'Send a CTA button',
					},
					{
						name: 'Request Location',
						value: 'requestLocation',
						description: 'Request user location',
						action: 'Request location from user',
					},
				],
				default: 'sendButtons',
			},

			// ==================== TEMPLATE OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['template'],
					},
				},
				options: [
					{
						name: 'Send Template',
						value: 'sendTemplate',
						description: 'Send an approved template message',
						action: 'Send a template message',
					},
					{
						name: 'List Templates',
						value: 'listTemplates',
						description: 'List all message templates',
						action: 'List all templates',
					},
					{
						name: 'Get Template',
						value: 'getTemplate',
						description: 'Get a specific template by name',
						action: 'Get template details',
					},
					{
						name: 'Delete Template',
						value: 'deleteTemplate',
						description: 'Delete a template',
						action: 'Delete a template',
					},
				],
				default: 'sendTemplate',
			},

			// ==================== MEDIA OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['media'],
					},
				},
				options: [
					{
						name: 'Send Image',
						value: 'sendImage',
						description: 'Send an image',
						action: 'Send an image',
					},
					{
						name: 'Send Video',
						value: 'sendVideo',
						description: 'Send a video',
						action: 'Send a video',
					},
					{
						name: 'Send Document',
						value: 'sendDocument',
						description: 'Send a document',
						action: 'Send a document',
					},
					{
						name: 'Send Audio',
						value: 'sendAudio',
						description: 'Send an audio file',
						action: 'Send an audio file',
					},
					{
						name: 'Send Sticker',
						value: 'sendSticker',
						description: 'Send a sticker',
						action: 'Send a sticker',
					},
				],
				default: 'sendImage',
			},

			// ==================== CATALOG OPERATIONS ====================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['catalog'],
					},
				},
				options: [
					{
						name: 'Send Product',
						value: 'sendProduct',
						description: 'Send a single product message',
						action: 'Send a single product',
					},
					{
						name: 'Send Product List',
						value: 'sendProductList',
						description: 'Send multiple products (up to 30)',
						action: 'Send a product list',
					},
					{
						name: 'Get Catalog',
						value: 'getCatalog',
						description: 'Get catalog information',
						action: 'Get catalog info',
					},
				],
				default: 'sendProduct',
			},

			// ==================== COMMON FIELDS ====================
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				default: '',
				required: true,
				description: 'Recipient phone number with country code (e.g., 56912345678)',
				displayOptions: {
					hide: {
						operation: ['listTemplates', 'getTemplate', 'deleteTemplate', 'getCatalog'],
					},
				},
			},

			// ==================== TEXT MESSAGE FIELDS ====================
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				description: 'Text message content',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText'],
					},
				},
			},
			{
				displayName: 'Preview URL',
				name: 'previewUrl',
				type: 'boolean',
				default: false,
				description: 'Whether to show URL preview in the message',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText'],
					},
				},
			},

			// ==================== CONTACT FIELDS ====================
			{
				displayName: 'Contact First Name',
				name: 'contactFirstName',
				type: 'string',
				default: '',
				required: true,
				description: 'Contact first name',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendContact'],
					},
				},
			},
			{
				displayName: 'Contact Last Name',
				name: 'contactLastName',
				type: 'string',
				default: '',
				description: 'Contact last name (optional)',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendContact'],
					},
				},
			},
			{
				displayName: 'Contact Phone',
				name: 'contactPhone',
				type: 'string',
				default: '',
				required: true,
				description: 'Contact phone number with country code',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendContact'],
					},
				},
			},
			{
				displayName: 'Contact Email',
				name: 'contactEmail',
				type: 'string',
				default: '',
				description: 'Contact email (optional)',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendContact'],
					},
				},
			},
			{
				displayName: 'Contact Organization',
				name: 'contactOrg',
				type: 'string',
				default: '',
				description: 'Contact organization/company (optional)',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendContact'],
					},
				},
			},

			// ==================== INTERACTIVE BUTTONS FIELDS ====================
			{
				displayName: 'Body Text',
				name: 'bodyText',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				required: true,
				description: 'Main text of the interactive message (max 1024 characters)',
				displayOptions: {
					show: {
						resource: ['interactive'],
						operation: ['sendButtons', 'sendList', 'sendCta', 'requestLocation'],
					},
				},
			},
			{
				displayName: 'Header (Optional)',
				name: 'headerText',
				type: 'string',
				default: '',
				description: 'Optional header text (max 60 characters)',
				displayOptions: {
					show: {
						resource: ['interactive'],
						operation: ['sendButtons', 'sendList'],
					},
				},
			},
			{
				displayName: 'Footer (Optional)',
				name: 'footerText',
				type: 'string',
				default: '',
				description: 'Optional footer text (max 60 characters)',
				displayOptions: {
					show: {
						resource: ['interactive'],
						operation: ['sendButtons', 'sendList'],
					},
				},
			},
			{
				displayName: 'Buttons',
				name: 'buttons',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					maxValues: 3,
				},
				default: {},
				description: 'Quick reply buttons (max 3). Each button title max 20 characters.',
				displayOptions: {
					show: {
						resource: ['interactive'],
						operation: ['sendButtons'],
					},
				},
				options: [
					{
						name: 'buttonValues',
						displayName: 'Button',
						values: [
							{
								displayName: 'Button ID',
								name: 'id',
								type: 'string',
								default: '',
								description: 'Unique identifier for the button (max 256 characters)',
							},
							{
								displayName: 'Button Title',
								name: 'title',
								type: 'string',
								default: '',
								description: 'Button text (max 20 characters)',
							},
						],
					},
				],
			},

			// ==================== LIST MESSAGE FIELDS ====================
			{
				displayName: 'Button Text',
				name: 'buttonText',
				type: 'string',
				default: 'Ver opciones',
				required: true,
				description: 'Text for the list button (max 20 characters)',
				displayOptions: {
					show: {
						resource: ['interactive'],
						operation: ['sendList'],
					},
				},
			},
			{
				displayName: 'Sections',
				name: 'sections',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					maxValues: 10,
				},
				default: {},
				description: 'List sections with items (max 10 sections, max 10 items total across all sections)',
				displayOptions: {
					show: {
						resource: ['interactive'],
						operation: ['sendList'],
					},
				},
				options: [
					{
						name: 'sectionValues',
						displayName: 'Section',
						values: [
							{
								displayName: 'Section Title',
								name: 'title',
								type: 'string',
								default: '',
								description: 'Section header (max 24 characters)',
							},
							{
								displayName: 'Items',
								name: 'items',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
									maxValues: 10,
								},
								default: {},
								options: [
									{
										name: 'itemValues',
										displayName: 'Item',
										values: [
											{
												displayName: 'Item ID',
												name: 'id',
												type: 'string',
												default: '',
												description: 'Unique item identifier (max 200 characters)',
											},
											{
												displayName: 'Title',
												name: 'title',
												type: 'string',
												default: '',
												description: 'Item title (max 24 characters)',
											},
											{
												displayName: 'Description',
												name: 'description',
												type: 'string',
												default: '',
												description: 'Item description (max 72 characters)',
											},
										],
									},
								],
							},
						],
					},
				],
			},

			// ==================== CTA BUTTON FIELDS ====================
			{
				displayName: 'CTA Type',
				name: 'ctaType',
				type: 'options',
				options: [
					{
						name: 'URL',
						value: 'url',
					},
					{
						name: 'Phone Call',
						value: 'phone',
					},
				],
				default: 'url',
				displayOptions: {
					show: {
						resource: ['interactive'],
						operation: ['sendCta'],
					},
				},
			},
			{
				displayName: 'Button Text',
				name: 'ctaButtonText',
				type: 'string',
				default: '',
				required: true,
				description: 'CTA button text',
				displayOptions: {
					show: {
						resource: ['interactive'],
						operation: ['sendCta'],
					},
				},
			},
			{
				displayName: 'URL',
				name: 'ctaUrl',
				type: 'string',
				default: '',
				required: true,
				description: 'URL to open when button is clicked',
				displayOptions: {
					show: {
						resource: ['interactive'],
						operation: ['sendCta'],
						ctaType: ['url'],
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'ctaPhone',
				type: 'string',
				default: '',
				required: true,
				description: 'Phone number to call',
				displayOptions: {
					show: {
						resource: ['interactive'],
						operation: ['sendCta'],
						ctaType: ['phone'],
					},
				},
			},

			// ==================== TEMPLATE FIELDS ====================
			{
				displayName: 'Template Name',
				name: 'templateName',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of the approved template',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['sendTemplate', 'getTemplate', 'deleteTemplate'],
					},
				},
			},
			{
				displayName: 'Language Code',
				name: 'languageCode',
				type: 'string',
				default: 'es',
				description: 'Template language code (e.g., es, en, pt_BR)',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['sendTemplate'],
					},
				},
			},
			{
				displayName: 'Template Variables',
				name: 'templateVariables',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Variables to replace in the template',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['sendTemplate'],
					},
				},
				options: [
					{
						name: 'variableValues',
						displayName: 'Variable',
						values: [
							{
								displayName: 'Component',
								name: 'component',
								type: 'options',
								options: [
									{ name: 'Header', value: 'header' },
									{ name: 'Body', value: 'body' },
									{ name: 'Button', value: 'button' },
								],
								default: 'body',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},

			// ==================== LOCATION FIELDS ====================
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'number',
				default: 0,
				required: true,
				description: 'Location latitude',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'number',
				default: 0,
				required: true,
				description: 'Location longitude',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
			},
			{
				displayName: 'Location Name',
				name: 'locationName',
				type: 'string',
				default: '',
				description: 'Name of the location',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Address of the location',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
			},

			// ==================== MEDIA FIELDS ====================
			{
				displayName: 'Media Source',
				name: 'mediaSource',
				type: 'options',
				options: [
					{
						name: 'URL',
						value: 'url',
					},
					{
						name: 'Media ID',
						value: 'id',
					},
				],
				default: 'url',
				displayOptions: {
					show: {
						resource: ['media'],
					},
				},
			},
			{
				displayName: 'Media URL',
				name: 'mediaUrl',
				type: 'string',
				default: '',
				required: true,
				description: 'URL of the media file',
				displayOptions: {
					show: {
						resource: ['media'],
						mediaSource: ['url'],
					},
				},
			},
			{
				displayName: 'Media ID',
				name: 'mediaId',
				type: 'string',
				default: '',
				required: true,
				description: 'WhatsApp Media ID',
				displayOptions: {
					show: {
						resource: ['media'],
						mediaSource: ['id'],
					},
				},
			},
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				default: '',
				description: 'Caption for the media',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['sendImage', 'sendVideo', 'sendDocument'],
					},
				},
			},
			{
				displayName: 'Filename',
				name: 'filename',
				type: 'string',
				default: '',
				description: 'Filename for document',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['sendDocument'],
					},
				},
			},

			// ==================== REACTION FIELDS ====================
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the message to react to',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['react'],
					},
				},
			},
			{
				displayName: 'Emoji',
				name: 'emoji',
				type: 'string',
				default: '👍',
				required: true,
				description: 'Emoji reaction (empty to remove reaction)',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['react'],
					},
				},
			},

			// ==================== CATALOG FIELDS ====================
			{
				displayName: 'Catalog ID',
				name: 'catalogId',
				type: 'string',
				default: '',
				required: true,
				description: 'Facebook Catalog ID',
				displayOptions: {
					show: {
						resource: ['catalog'],
						operation: ['sendProduct', 'sendProductList'],
					},
				},
			},
			{
				displayName: 'Product Retailer ID',
				name: 'productRetailerId',
				type: 'string',
				default: '',
				required: true,
				description: 'Product retailer ID from your catalog',
				displayOptions: {
					show: {
						resource: ['catalog'],
						operation: ['sendProduct'],
					},
				},
			},
			{
				displayName: 'Body Text',
				name: 'catalogBodyText',
				type: 'string',
				default: '',
				description: 'Optional body text for product message',
				displayOptions: {
					show: {
						resource: ['catalog'],
						operation: ['sendProduct', 'sendProductList'],
					},
				},
			},
			{
				displayName: 'Header Text',
				name: 'catalogHeaderText',
				type: 'string',
				default: '',
				description: 'Header text for product list',
				displayOptions: {
					show: {
						resource: ['catalog'],
						operation: ['sendProductList'],
					},
				},
			},
			{
				displayName: 'Product Sections',
				name: 'productSections',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Product sections for multi-product message',
				displayOptions: {
					show: {
						resource: ['catalog'],
						operation: ['sendProductList'],
					},
				},
				options: [
					{
						name: 'sectionValues',
						displayName: 'Section',
						values: [
							{
								displayName: 'Section Title',
								name: 'title',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Product IDs',
								name: 'productIds',
								type: 'string',
								default: '',
								description: 'Comma-separated product retailer IDs',
							},
						],
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('whatsAppProApi');
		
		const phoneNumberId = credentials.phoneNumberId as string;
		const businessAccountId = credentials.businessAccountId as string;
		const baseUrl = `https://graph.facebook.com/v21.0/${phoneNumberId}`;

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				
				let body: any = {};
				let endpoint = '/messages';
				let method: IHttpRequestMethods = 'POST';

				// Get recipient for message operations
				if (!['listTemplates', 'getTemplate', 'deleteTemplate', 'getCatalog'].includes(operation)) {
					const to = this.getNodeParameter('to', i) as string;
					body.messaging_product = 'whatsapp';
					body.recipient_type = 'individual';
					body.to = to;
				}

				// ==================== MESSAGE RESOURCE ====================
				if (resource === 'message') {
					if (operation === 'sendText') {
						const message = this.getNodeParameter('message', i) as string;
						const previewUrl = this.getNodeParameter('previewUrl', i) as boolean;
						body.type = 'text';
						body.text = {
							preview_url: previewUrl,
							body: message,
						};
					} 
					else if (operation === 'sendLocation') {
						const latitude = this.getNodeParameter('latitude', i) as number;
						const longitude = this.getNodeParameter('longitude', i) as number;
						const name = this.getNodeParameter('locationName', i) as string;
						const address = this.getNodeParameter('address', i) as string;
						body.type = 'location';
						body.location = {
							latitude,
							longitude,
							name,
							address,
						};
					} 
					else if (operation === 'sendContact') {
						const firstName = this.getNodeParameter('contactFirstName', i) as string;
						const lastName = this.getNodeParameter('contactLastName', i, '') as string;
						const phone = this.getNodeParameter('contactPhone', i) as string;
						const email = this.getNodeParameter('contactEmail', i, '') as string;
						const org = this.getNodeParameter('contactOrg', i, '') as string;

						const contact: any = {
							name: {
								formatted_name: lastName ? `${firstName} ${lastName}` : firstName,
								first_name: firstName,
							},
							phones: [
								{
									phone: phone,
									type: 'CELL',
								},
							],
						};

						if (lastName) {
							contact.name.last_name = lastName;
						}
						if (email) {
							contact.emails = [{ email, type: 'WORK' }];
						}
						if (org) {
							contact.org = { company: org };
						}

						body.type = 'contacts';
						body.contacts = [contact];
					}
					else if (operation === 'react') {
						const messageId = this.getNodeParameter('messageId', i) as string;
						const emoji = this.getNodeParameter('emoji', i) as string;
						body.type = 'reaction';
						body.reaction = {
							message_id: messageId,
							emoji,
						};
					}
				}

				// ==================== INTERACTIVE RESOURCE ====================
				else if (resource === 'interactive') {
					body.type = 'interactive';
					
					const bodyText = this.getNodeParameter('bodyText', i) as string;
					const headerText = this.getNodeParameter('headerText', i, '') as string;
					const footerText = this.getNodeParameter('footerText', i, '') as string;

					if (operation === 'sendButtons') {
						const buttonsData = this.getNodeParameter('buttons.buttonValues', i, []) as any[];
						
						// Validate buttons inline
						if (buttonsData.length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one button is required', { itemIndex: i });
						}
						if (buttonsData.length > 3) {
							throw new NodeOperationError(this.getNode(), 'Maximum 3 buttons allowed per message', { itemIndex: i });
						}
						
						body.interactive = {
							type: 'button',
							body: { text: bodyText },
							action: {
								buttons: buttonsData.map((btn: any) => ({
									type: 'reply',
									reply: {
										id: btn.id,
										title: btn.title.substring(0, 20),
									},
								})),
							},
						};

						if (headerText) {
							body.interactive.header = { type: 'text', text: headerText.substring(0, 60) };
						}
						if (footerText) {
							body.interactive.footer = { text: footerText.substring(0, 60) };
						}
					} 
					else if (operation === 'sendList') {
						const buttonText = this.getNodeParameter('buttonText', i) as string;
						const sectionsData = this.getNodeParameter('sections.sectionValues', i, []) as any[];

						// Validate sections inline
						if (sectionsData.length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one section is required', { itemIndex: i });
						}
						if (sectionsData.length > 10) {
							throw new NodeOperationError(this.getNode(), 'Maximum 10 sections allowed', { itemIndex: i });
						}

						const sections = sectionsData.map((section: any) => ({
							title: section.title?.substring(0, 24) || '',
							rows: (section.items?.itemValues || []).map((item: any) => ({
								id: item.id,
								title: item.title.substring(0, 24),
								description: item.description?.substring(0, 72) || '',
							})),
						}));

						body.interactive = {
							type: 'list',
							body: { text: bodyText },
							action: {
								button: buttonText.substring(0, 20),
								sections,
							},
						};

						if (headerText) {
							body.interactive.header = { type: 'text', text: headerText.substring(0, 60) };
						}
						if (footerText) {
							body.interactive.footer = { text: footerText.substring(0, 60) };
						}
					}
					else if (operation === 'sendCta') {
						const ctaType = this.getNodeParameter('ctaType', i) as string;
						const ctaButtonText = this.getNodeParameter('ctaButtonText', i) as string;

						body.interactive = {
							type: 'cta_url',
							body: { text: bodyText },
							action: {
								name: 'cta_url',
								parameters: {
									display_text: ctaButtonText,
								},
							},
						};

						if (ctaType === 'url') {
							const url = this.getNodeParameter('ctaUrl', i) as string;
							body.interactive.action.parameters.url = url;
						} else {
							const phone = this.getNodeParameter('ctaPhone', i) as string;
							body.interactive.type = 'cta_call';
							body.interactive.action.name = 'cta_call';
							body.interactive.action.parameters.phone_number = phone;
						}
					}
					else if (operation === 'requestLocation') {
						body.interactive = {
							type: 'location_request_message',
							body: { text: bodyText },
							action: {
								name: 'send_location',
							},
						};
					}
				}

				// ==================== TEMPLATE RESOURCE ====================
				else if (resource === 'template') {
					if (operation === 'sendTemplate') {
						const templateName = this.getNodeParameter('templateName', i) as string;
						const languageCode = this.getNodeParameter('languageCode', i) as string;
						const variablesData = this.getNodeParameter('templateVariables.variableValues', i, []) as any[];

						body.type = 'template';
						body.template = {
							name: templateName,
							language: { code: languageCode },
						};

						if (variablesData.length > 0) {
							const components: any[] = [];
							const bodyParams = variablesData
								.filter((v: any) => v.component === 'body')
								.map((v: any) => ({ type: 'text', text: v.value }));
							
							if (bodyParams.length > 0) {
								components.push({
									type: 'body',
									parameters: bodyParams,
								});
							}

							const headerParams = variablesData
								.filter((v: any) => v.component === 'header')
								.map((v: any) => ({ type: 'text', text: v.value }));
							
							if (headerParams.length > 0) {
								components.push({
									type: 'header',
									parameters: headerParams,
								});
							}

							if (components.length > 0) {
								body.template.components = components;
							}
						}
					}
					else if (operation === 'listTemplates') {
						endpoint = '';
						method = 'GET';
						const url = `https://graph.facebook.com/v21.0/${businessAccountId}/message_templates`;
						
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'whatsAppProApi',
							{
								method: 'GET',
								url,
							},
						);
						returnData.push({ json: response });
						continue;
					}
					else if (operation === 'getTemplate') {
						const templateName = this.getNodeParameter('templateName', i) as string;
						endpoint = '';
						const url = `https://graph.facebook.com/v21.0/${businessAccountId}/message_templates?name=${templateName}`;
						
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'whatsAppProApi',
							{
								method: 'GET',
								url,
							},
						);
						returnData.push({ json: response });
						continue;
					}
					else if (operation === 'deleteTemplate') {
						const templateName = this.getNodeParameter('templateName', i) as string;
						const url = `https://graph.facebook.com/v21.0/${businessAccountId}/message_templates?name=${templateName}`;
						
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'whatsAppProApi',
							{
								method: 'DELETE',
								url,
							},
						);
						returnData.push({ json: response });
						continue;
					}
				}

				// ==================== MEDIA RESOURCE ====================
				else if (resource === 'media') {
					const mediaSource = this.getNodeParameter('mediaSource', i) as string;
					const caption = this.getNodeParameter('caption', i, '') as string;

					let mediaType = '';
					if (operation === 'sendImage') mediaType = 'image';
					else if (operation === 'sendVideo') mediaType = 'video';
					else if (operation === 'sendDocument') mediaType = 'document';
					else if (operation === 'sendAudio') mediaType = 'audio';
					else if (operation === 'sendSticker') mediaType = 'sticker';

					body.type = mediaType;
					body[mediaType] = {};

					if (mediaSource === 'url') {
						const url = this.getNodeParameter('mediaUrl', i) as string;
						body[mediaType].link = url;
					} else {
						const id = this.getNodeParameter('mediaId', i) as string;
						body[mediaType].id = id;
					}

					if (caption && ['image', 'video', 'document'].includes(mediaType)) {
						body[mediaType].caption = caption;
					}

					if (operation === 'sendDocument') {
						const filename = this.getNodeParameter('filename', i, '') as string;
						if (filename) {
							body[mediaType].filename = filename;
						}
					}
				}

				// ==================== CATALOG RESOURCE ====================
				else if (resource === 'catalog') {
					if (operation === 'sendProduct') {
						const catalogId = this.getNodeParameter('catalogId', i) as string;
						const productRetailerId = this.getNodeParameter('productRetailerId', i) as string;
						const bodyText = this.getNodeParameter('catalogBodyText', i, '') as string;

						body.type = 'interactive';
						body.interactive = {
							type: 'product',
							body: { text: bodyText || ' ' },
							action: {
								catalog_id: catalogId,
								product_retailer_id: productRetailerId,
							},
						};
					}
					else if (operation === 'sendProductList') {
						const catalogId = this.getNodeParameter('catalogId', i) as string;
						const bodyText = this.getNodeParameter('catalogBodyText', i) as string;
						const headerText = this.getNodeParameter('catalogHeaderText', i, '') as string;
						const sectionsData = this.getNodeParameter('productSections.sectionValues', i, []) as any[];

						const sections = sectionsData.map((section: any) => ({
							title: section.title,
							product_items: section.productIds.split(',').map((id: string) => ({
								product_retailer_id: id.trim(),
							})),
						}));

						body.type = 'interactive';
						body.interactive = {
							type: 'product_list',
							header: { type: 'text', text: headerText || 'Products' },
							body: { text: bodyText },
							action: {
								catalog_id: catalogId,
								sections,
							},
						};
					}
					else if (operation === 'getCatalog') {
						const url = `https://graph.facebook.com/v21.0/${businessAccountId}/product_catalogs`;
						
						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'whatsAppProApi',
							{
								method: 'GET',
								url,
							},
						);
						returnData.push({ json: response });
						continue;
					}
				}

				// Execute the API request
				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'whatsAppProApi',
						{
							method,
							url: `${baseUrl}${endpoint}`,
							body,
							json: true,
						},
					);
					returnData.push({ json: response });
				} catch (error: any) {
					// Handle WhatsApp API errors
					const errorData = error.response?.data?.error;
					if (errorData) {
						const errorMessage = errorData.message || 'Unknown WhatsApp API error';
						const errorCode = errorData.code || 'UNKNOWN';
						throw new NodeOperationError(
							this.getNode(),
							`WhatsApp API Error [${errorCode}]: ${errorMessage}`,
							{ itemIndex: i }
						);
					}
					throw error;
				}

			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
