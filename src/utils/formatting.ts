export const formatCurrency = (
  amount: number | string,
  currency: string = 'AED',
  locale: string = 'en-AE'
) => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) return '';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(numericAmount);
};

export const formatDate = (date: Date | string, format: string = 'yyyy-MM-dd') => {
  // This would typically use date-fns format function
  // For simplicity, returning ISO string
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
};

export const sanitizeFormData = <T extends Record<string, any>>(data: T): T => {
  const sanitized = { ...data };
  
  // Remove empty strings and undefined values
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key] === '' || sanitized[key] === undefined) {
      delete sanitized[key];
    }
  });
  
  return sanitized;
};