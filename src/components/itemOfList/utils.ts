import dayjs from 'dayjs';

export const calculateStatus = (
  nextPayment: string,
  formOfPayment: string,
  lastPayment: string,
) => {
  const newLastPaymentDate = dayjs(lastPayment).format('DD-MM-YYYY');
  const newNextPaymentDate = dayjs(nextPayment).format('DD-MM-YYYY');
  const paid = 'Pago';
  const delay = 'Atrasado';
  const currentDate = new Date();
  const formatLastPayment = new Date(newLastPaymentDate);
  const formatNextPayment = new Date(newNextPaymentDate);

  if (formOfPayment === 'Parcelamento') {
    if (currentDate > formatNextPayment && currentDate > formatLastPayment) {
      return delay;
    }
    return paid;
  }
  return paid;
};
