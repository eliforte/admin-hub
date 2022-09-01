export const calculateStatus = (
  nextPayment: string,
  formOfPayment: string,
) => {
  const paid = 'Pago';
  const delay = 'Atrasado';
  const currentDate = new Date();
  const formatNextPayment = new Date(nextPayment);

  if (formOfPayment === 'Parcelamento') {
    if (currentDate < formatNextPayment) {
      return delay;
    }
    return paid;
  }
  return paid;
};
