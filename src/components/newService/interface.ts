export interface IService {
  type: string;
  pacient_fullname: string;
  plan: string;
  total: number;
  quantity_installments_paid: number;
  last_payment: Date | null;
  next_payment: Date | null;
}
