export interface FineTask {
    id: string;
    title: string;
    amount: number | null;
    due_date: string;
    bank_code: string;
    bank_name: string;
    acc_num: string | null;
    resolved_account_name: string;
    pin: number | null;
    // auto_pay: boolean;
};