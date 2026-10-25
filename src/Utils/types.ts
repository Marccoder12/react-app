export interface AppNotification {
  id: string;
  user_id: string;
  type: "finetask" | "task" | "app";
  title: string;
  message: string;
  object: Record<string, any> | null;
  notified_at: string | null;
  read_at: string | null;
  created_at: string;
};

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