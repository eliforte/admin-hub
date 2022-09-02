export const calculateStatus = (
  nextPayment: string,
  formOfPayment: string,
  lastPayment: string,
) => {
  const paid = 'Pago';
  const delay = 'Atrasado';
  const currentDate = new Date();
  const formatLastPayment = new Date(lastPayment);
  const formatNextPayment = new Date(nextPayment);

  if (formOfPayment === 'Parcelamento') {
    if (currentDate > formatNextPayment && currentDate > formatLastPayment) {
      return delay;
    }
    return paid;
  }
  return paid;
};
