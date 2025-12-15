/**
 * Valida se uma string não está vazia
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Valida se um número é positivo
 */
export function isPositive(value: number): boolean {
  return value > 0;
}

/**
 * Valida se uma idade é válida (maior que 0)
 */
export function isValidAge(idade: number): boolean {
  return Number.isInteger(idade) && idade > 0;
}

/**
 * Valida se uma pessoa é menor de idade
 */
export function isMinor(idade: number): boolean {
  return idade < 18;
}

/**
 * Valida se uma categoria é compatível com o tipo de transação
 */
export function isCategoriaCompatible(
  finalidade: number,
  tipo: number
): boolean {
  // Finalidade 3 (Ambas) é compatível com qualquer tipo
  if (finalidade === 3) return true;
  
  // Finalidade 1 (Despesa) só é compatível com tipo 1 (Despesa)
  if (finalidade === 1) return tipo === 1;
  
  // Finalidade 2 (Receita) só é compatível com tipo 2 (Receita)
  if (finalidade === 2) return tipo === 2;
  
  return false;
}

