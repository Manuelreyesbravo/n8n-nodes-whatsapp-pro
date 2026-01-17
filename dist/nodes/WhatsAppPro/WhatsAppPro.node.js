"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppPro = void 0;
class WhatsAppPro {
    constructor() {
        this.description = {
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
                // Resource
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
                // ============ MESSAGE OPERATIONS ============
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
                // ============ INTERACTIVE OPERATIONS ============
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
                // ============ TEMPLATE OPERATIONS ============
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
                // ============ MEDIA OPERATIONS ============
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
                // ============ CATALOG OPERATIONS ============
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
                // ============ COMMON FIELDS ============
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
                // ============ TEXT MESSAGE FIELDS ============
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
                // ============ INTERACTIVE BUTTONS FIELDS ============
                {
                    displayName: 'Body Text',
                    name: 'bodyText',
                    type: 'string',
                    typeOptions: {
                        rows: 3,
                    },
                    default: '',
                    required: true,
                    description: 'Main text of the interactive message',
                    displayOptions: {
                        show: {
                            resource: ['interactive'],
                            operation: ['sendButtons', 'sendList', 'sendCta'],
                        },
                    },
                },
                {
                    displayName: 'Header (Optional)',
                    name: 'headerText',
                    type: 'string',
                    default: '',
                    description: 'Optional header text',
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
                    description: 'Optional footer text',
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
                    description: 'Quick reply buttons (max 3)',
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
                                    description: 'Unique identifier for the button',
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
                // ============ LIST MESSAGE FIELDS ============
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
                    description: 'List sections with items',
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
                                    description: 'Section header',
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
                // ============ CTA BUTTON FIELDS ============
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
                // ============ TEMPLATE FIELDS ============
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
                // ============ LOCATION FIELDS ============
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
                // ============ MEDIA FIELDS ============
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
                // ============ REACTION FIELDS ============
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
                // ============ CATALOG FIELDS ============
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('whatsAppProApi');
        const phoneNumberId = credentials.phoneNumberId;
        const businessAccountId = credentials.businessAccountId;
        const baseUrl = `https://graph.facebook.com/v21.0/${phoneNumberId}`;
        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i);
                const operation = this.getNodeParameter('operation', i);
                let body = {};
                let endpoint = '/messages';
                let method = 'POST';
                // Get recipient for message operations
                if (!['listTemplates', 'getTemplate', 'deleteTemplate', 'getCatalog'].includes(operation)) {
                    const to = this.getNodeParameter('to', i);
                    body.messaging_product = 'whatsapp';
                    body.recipient_type = 'individual';
                    body.to = to;
                }
                // ============ MESSAGE RESOURCE ============
                if (resource === 'message') {
                    if (operation === 'sendText') {
                        const message = this.getNodeParameter('message', i);
                        const previewUrl = this.getNodeParameter('previewUrl', i);
                        body.type = 'text';
                        body.text = {
                            preview_url: previewUrl,
                            body: message,
                        };
                    }
                    else if (operation === 'sendLocation') {
                        const latitude = this.getNodeParameter('latitude', i);
                        const longitude = this.getNodeParameter('longitude', i);
                        const name = this.getNodeParameter('locationName', i);
                        const address = this.getNodeParameter('address', i);
                        body.type = 'location';
                        body.location = {
                            latitude,
                            longitude,
                            name,
                            address,
                        };
                    }
                    else if (operation === 'react') {
                        const messageId = this.getNodeParameter('messageId', i);
                        const emoji = this.getNodeParameter('emoji', i);
                        body.type = 'reaction';
                        body.reaction = {
                            message_id: messageId,
                            emoji,
                        };
                    }
                }
                // ============ INTERACTIVE RESOURCE ============
                else if (resource === 'interactive') {
                    body.type = 'interactive';
                    const bodyText = this.getNodeParameter('bodyText', i);
                    const headerText = this.getNodeParameter('headerText', i, '');
                    const footerText = this.getNodeParameter('footerText', i, '');
                    if (operation === 'sendButtons') {
                        const buttonsData = this.getNodeParameter('buttons.buttonValues', i, []);
                        body.interactive = {
                            type: 'button',
                            body: { text: bodyText },
                            action: {
                                buttons: buttonsData.map((btn) => ({
                                    type: 'reply',
                                    reply: {
                                        id: btn.id,
                                        title: btn.title.substring(0, 20),
                                    },
                                })),
                            },
                        };
                        if (headerText) {
                            body.interactive.header = { type: 'text', text: headerText };
                        }
                        if (footerText) {
                            body.interactive.footer = { text: footerText };
                        }
                    }
                    else if (operation === 'sendList') {
                        const buttonText = this.getNodeParameter('buttonText', i);
                        const sectionsData = this.getNodeParameter('sections.sectionValues', i, []);
                        const sections = sectionsData.map((section) => ({
                            title: section.title,
                            rows: (section.items?.itemValues || []).map((item) => ({
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
                            body.interactive.header = { type: 'text', text: headerText };
                        }
                        if (footerText) {
                            body.interactive.footer = { text: footerText };
                        }
                    }
                    else if (operation === 'sendCta') {
                        const ctaType = this.getNodeParameter('ctaType', i);
                        const ctaButtonText = this.getNodeParameter('ctaButtonText', i);
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
                            const url = this.getNodeParameter('ctaUrl', i);
                            body.interactive.action.parameters.url = url;
                        }
                        else {
                            const phone = this.getNodeParameter('ctaPhone', i);
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
                // ============ TEMPLATE RESOURCE ============
                else if (resource === 'template') {
                    if (operation === 'sendTemplate') {
                        const templateName = this.getNodeParameter('templateName', i);
                        const languageCode = this.getNodeParameter('languageCode', i);
                        const variablesData = this.getNodeParameter('templateVariables.variableValues', i, []);
                        body.type = 'template';
                        body.template = {
                            name: templateName,
                            language: { code: languageCode },
                        };
                        if (variablesData.length > 0) {
                            const components = [];
                            const bodyParams = variablesData
                                .filter((v) => v.component === 'body')
                                .map((v) => ({ type: 'text', text: v.value }));
                            if (bodyParams.length > 0) {
                                components.push({
                                    type: 'body',
                                    parameters: bodyParams,
                                });
                            }
                            const headerParams = variablesData
                                .filter((v) => v.component === 'header')
                                .map((v) => ({ type: 'text', text: v.value }));
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
                        const response = await this.helpers.httpRequestWithAuthentication.call(this, 'whatsAppProApi', {
                            method: 'GET',
                            url,
                        });
                        returnData.push({ json: response });
                        continue;
                    }
                    else if (operation === 'getTemplate') {
                        const templateName = this.getNodeParameter('templateName', i);
                        endpoint = '';
                        const url = `https://graph.facebook.com/v21.0/${businessAccountId}/message_templates?name=${templateName}`;
                        const response = await this.helpers.httpRequestWithAuthentication.call(this, 'whatsAppProApi', {
                            method: 'GET',
                            url,
                        });
                        returnData.push({ json: response });
                        continue;
                    }
                    else if (operation === 'deleteTemplate') {
                        const templateName = this.getNodeParameter('templateName', i);
                        const url = `https://graph.facebook.com/v21.0/${businessAccountId}/message_templates?name=${templateName}`;
                        const response = await this.helpers.httpRequestWithAuthentication.call(this, 'whatsAppProApi', {
                            method: 'DELETE',
                            url,
                        });
                        returnData.push({ json: response });
                        continue;
                    }
                }
                // ============ MEDIA RESOURCE ============
                else if (resource === 'media') {
                    const mediaSource = this.getNodeParameter('mediaSource', i);
                    const caption = this.getNodeParameter('caption', i, '');
                    let mediaType = '';
                    if (operation === 'sendImage')
                        mediaType = 'image';
                    else if (operation === 'sendVideo')
                        mediaType = 'video';
                    else if (operation === 'sendDocument')
                        mediaType = 'document';
                    else if (operation === 'sendAudio')
                        mediaType = 'audio';
                    else if (operation === 'sendSticker')
                        mediaType = 'sticker';
                    body.type = mediaType;
                    body[mediaType] = {};
                    if (mediaSource === 'url') {
                        const url = this.getNodeParameter('mediaUrl', i);
                        body[mediaType].link = url;
                    }
                    else {
                        const id = this.getNodeParameter('mediaId', i);
                        body[mediaType].id = id;
                    }
                    if (caption && ['image', 'video', 'document'].includes(mediaType)) {
                        body[mediaType].caption = caption;
                    }
                    if (operation === 'sendDocument') {
                        const filename = this.getNodeParameter('filename', i, '');
                        if (filename) {
                            body[mediaType].filename = filename;
                        }
                    }
                }
                // ============ CATALOG RESOURCE ============
                else if (resource === 'catalog') {
                    if (operation === 'sendProduct') {
                        const catalogId = this.getNodeParameter('catalogId', i);
                        const productRetailerId = this.getNodeParameter('productRetailerId', i);
                        const bodyText = this.getNodeParameter('bodyText', i, '');
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
                        const catalogId = this.getNodeParameter('catalogId', i);
                        const bodyText = this.getNodeParameter('bodyText', i);
                        const headerText = this.getNodeParameter('headerText', i, '');
                        const sectionsData = this.getNodeParameter('productSections.sectionValues', i, []);
                        const sections = sectionsData.map((section) => ({
                            title: section.title,
                            product_items: section.productIds.split(',').map((id) => ({
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
                        const response = await this.helpers.httpRequestWithAuthentication.call(this, 'whatsAppProApi', {
                            method: 'GET',
                            url,
                        });
                        returnData.push({ json: response });
                        continue;
                    }
                }
                // Execute the API request
                const response = await this.helpers.httpRequestWithAuthentication.call(this, 'whatsAppProApi', {
                    method,
                    url: `${baseUrl}${endpoint}`,
                    body,
                    json: true,
                });
                returnData.push({ json: response });
            }
            catch (error) {
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
exports.WhatsAppPro = WhatsAppPro;
//# sourceMappingURL=WhatsAppPro.node.js.map