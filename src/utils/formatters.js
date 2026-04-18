// Utilities for formatting numbers and currencies

export const formatCurrency = (amount, currency = 'TL') => {
  const number = Number(amount) || 0;
  
  // Custom formatting based on user preference
  const formattedNumber = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  switch (currency) {
    case 'USD':
      return `$${formattedNumber}`;
    case 'EUR':
      return `€${formattedNumber}`;
    case 'TL':
    default:
      return `${formattedNumber} ₺`;
  }
};

export const parseNumber = (val) => {
  if (!val) return 0;
  if (typeof val === 'number') return val;
  // Replace comma with dot if user typed "2,5" -> "2.5" manually, 
  // though simple HTML number inputs use dots
  const str = String(val).replace(',', '.');
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
};
