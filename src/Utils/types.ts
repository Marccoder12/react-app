export interface FineTask {
    id: string;
    title: string;
    amount: number | null;
    due_date: string;
    bank_code: string;
    bank_name: string;
    acc_num: string | null;
    resolved_account_name: string;
    // auto_pay: boolean;
};


export interface StatsEntry{
    id: string;
    user_id: string;
    fineTaskId?: string;
    fineTask_group?: string;
    created_at: string;
    status: string;
}