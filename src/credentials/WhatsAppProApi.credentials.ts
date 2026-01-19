import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class WhatsAppProApi implements ICredentialType {
  name = 'whatsAppProApi';
  displayName = 'WhatsApp Pro API';
  documentationUrl = 'https://developers.facebook.com/docs/whatsapp/cloud-api/get-started';
  properties: INodeProperties[] = [
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
