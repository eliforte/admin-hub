export const paymentMethodsOptions: string[] = [
  'Cartão de crédito', 'Cartão de débito', 'Em dinheiro',
];

export const formOfPaymentOptions: string[] = ['À vista', 'Parcelamento'];

export const paymentDaysOptions = [5, 8, 15, 18];

export const quantityInstallmentsOptions = (): number[] => {
  const newQuantity = Array.from({ length: 12 }, (_, index) => index + 1);
  return newQuantity;
};

export const ShowInstallmentsDetails = (formOfPayment: string, paymentMethod: string) => {
  const display = formOfPayment === 'Parcelamento'
  && paymentMethod === 'Cartão de crédito'
    ? 'block'
    : 'none';

  return display;
};

// Qnt. de parcelas
