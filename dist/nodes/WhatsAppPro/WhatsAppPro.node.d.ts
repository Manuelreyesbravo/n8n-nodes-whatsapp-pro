import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
/**
 * WhatsApp Pro Node - Advanced WhatsApp Business API integration
 * Supports interactive messages, buttons, lists, templates, media, and catalog
 *
 * @author LatamFlows
 * @version 2.0.0
 */
export declare class WhatsAppPro implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
