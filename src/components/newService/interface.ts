export interface IService {
  type: string;
  pacient_fullname: string;
  plan: string;
  total: number;
  quantity_installments_paid: number;
  last_payment: string | null;
  next_payment: string | null;
}
