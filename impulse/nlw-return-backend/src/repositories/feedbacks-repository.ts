export interface IFeedbackCreateData{
    id?: string;
    type: string;
    comment: string;
    screenshot?: string;
}

export interface IFeedbackResponse{
    id: string;
    type: string;
    comment: string;
    screenshot?: string;
}

export interface IFeedbackQueryData{
    page: number;
    limit: number;
}

export interface IFeedbackUpdateData{
    id : string;
    state: boolean;
}

export interface IFeedbacksRepository{
    create: (data: IFeedbackCreateData) => Promise<void>;
    getAll: (data: IFeedbackQueryData) => Promise<Array<IFeedbackResponse>>;
    getId: (id:string) => Promise<IFeedbackResponse>;
    count: () => Promise<number>;
    updateState: (data : IFeedbackUpdateData) => Promise<void>;
}
