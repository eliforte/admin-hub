import { AxiosResponse } from 'axios';
import { IDataProps, IVoucherFilteredStatus } from '../../interfaces';

export const monthsOptions = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const paymentMethodOptions = ['Cartão de crédito', 'Cartão de débito', 'Em dinheiro'];
export const formOfPaymentOptions = ['À vista', 'Parcelamento'];
export const typeFilterOptions = ['Mês', 'Ano'];

export const isInstallments = (data: IDataProps[]) => {
  const voucherFilterd = data.filter((voucher: IDataProps) => (
    voucher.form_of_payment === 'Parcelamento'
    && voucher.quantity_installments >= voucher.quantity_installments_paid
  ));
  return voucherFilterd;
};

export const totalInstallmentsValue = (vouchers: IDataProps[]) => {
  const amout = vouchers.map((voucher: IDataProps) => (voucher.installment_value))
    .reduce((previousValue: number, currentValue: number) => (
      currentValue + previousValue
    ), 0);
  return amout;
};

export const isInCash = (data: IDataProps[]) => {
  const voucherFiltered = data.filter((voucher: IDataProps) => (
    voucher.form_of_payment !== 'Parcelamento'
    && voucher.total > 0
  ));
  return voucherFiltered;
};

export const totalInCash = (vouchers: IDataProps[]) => {
  const amout = vouchers.map((voucher: IDataProps) => voucher.total)
    .reduce((previousValue: number, currentValue: number) => (
      previousValue + currentValue
    ), 0);
  return amout;
};

export const calculateStatusPayment = (response: AxiosResponse) => {
  const vouchersStatus: IVoucherFilteredStatus = {
    late: [],
    paid: [],
  };
  response?.data?.map((voucher: IDataProps) => {
    const currentDate = new Date();
    const formatLastPayment = new Date(String(voucher.last_payment));
    const formatNextPayment = new Date(String(voucher.next_payment));
    if (voucher.form_of_payment === 'Parcelamento') {
      if (currentDate > formatNextPayment && currentDate > formatLastPayment) {
        return vouchersStatus.late.push(voucher);
      }
      return vouchersStatus.paid.push(voucher);
    }
    vouchersStatus.paid.push(voucher);
  });

  return vouchersStatus;
};

export const calculateTotalLatePayment = (vouchers: IDataProps[]) => {
  const totalValueInstallments = totalInstallmentsValue(vouchers);
  return totalValueInstallments;
};
