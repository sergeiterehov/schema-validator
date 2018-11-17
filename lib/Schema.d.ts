export declare type ISchemaContext = string[];
export interface ISchema {
    $type: string;
    $when?: ISchema;
    $context?: ISchemaContext;
}
