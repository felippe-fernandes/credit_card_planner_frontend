/**
 * Formats a number or string value as Brazilian currency (BRL)
 * @param value - The value to format (can be number or string)
 * @param options - Optional formatting options
 * @returns Formatted currency string (e.g., "12.500,00")
 */
export function formatCurrency(
  value: number | string | undefined | null,
  options?: {
    includeSymbol?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const {
    includeSymbol = false,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options || {};

  // Handle null/undefined
  if (value === null || value === undefined) {
    return includeSymbol ? "R$ 0,00" : "0,00";
  }

  // Convert to number
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  // Handle invalid numbers
  if (isNaN(numValue)) {
    return includeSymbol ? "R$ 0,00" : "0,00";
  }

  // Format using Intl
  const formatted = numValue.toLocaleString("pt-BR", {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return includeSymbol ? `R$ ${formatted}` : formatted;
}

/**
 * Formats a number or string value as Brazilian currency with symbol
 * @param value - The value to format
 * @returns Formatted currency string with R$ symbol (e.g., "R$ 12.500,00")
 */
export function formatCurrencyWithSymbol(
  value: number | string | undefined | null
): string {
  return formatCurrency(value, { includeSymbol: true });
}
