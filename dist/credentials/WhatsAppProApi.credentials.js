"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppProApi = void 0;
class WhatsAppProApi {
    constructor() {
        this.name = 'whatsAppProApi';
        this.displayName = 'WhatsApp Pro API';
        this.documentationUrl = 'https://developers.facebook.com/docs/whatsapp/cloud-api/get-started';
        this.properties = [
            {
                displayName: 'Access Token',
                name: 'accessToken',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
                description: 'The access token for WhatsApp Business API',
            },
            {
                displayName: 'Phone Number ID',
                name: 'phoneNumberId',
                type: 'string',
                default: '',
                required: true,
                description: 'The Phone Number ID from Meta Business Suite',
            },
            {
                displayName: 'Business Account ID',
                name: 'businessAccountId',
                type: 'string',
                default: '',
                required: false,
                description: 'The WhatsApp Business Account ID (optional, for template management)',
            },
        ];
    }
}
exports.WhatsAppProApi = WhatsAppProApi;
//# sourceMappingURL=WhatsAppProApi.credentials.js.map