export function isRepeatable(payment: any): boolean {
  return !!(payment.repeatInterval && payment.repeatDesignator);
}
