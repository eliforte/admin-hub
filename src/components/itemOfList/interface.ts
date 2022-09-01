export interface IDataProps {
  _id: string;
  type: string;
  pacient_fullname: string;
  plan: string;
  payment_method: string;
  form_of_payment: string;
  quantity_installments: number;
  total: number;
  quantity_installments_paid: number;
  payment_day: number;
  last_payment: string | null;
  next_payment: string | null;
  installment_value: number;
  responsible_id: string;
}
