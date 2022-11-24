export declare type QuestionnaireResponse = {
    text: string;
    trackingName: string;
    info?: string;
    description?: string;
    slug?: string;
    statement: string;
    neutralStatement?: string;
    neutralStatementRef?: boolean;
    neutralStatementInfo?: string;
    question?: QuestionnaireQuestion;
};
export declare type QuestionnaireQuestion = {
    text: string;
    trackingName: string;
    info?: string;
    description?: string;
    responses: QuestionnaireResponse[];
};
