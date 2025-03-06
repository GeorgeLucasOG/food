/**
 * Formata uma data para o formato brasileiro usando o fuso horário de Belém/PA (UTC-3)
 * @param date Data a ser formatada
 * @param includeTime Se deve incluir hora/minutos no formato
 * @returns String formatada no padrão brasileiro
 */
export const formatDate = (
  date: Date | string | number,
  includeTime = true,
): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Belem",
  };

  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
};

/**
 * Cria uma nova data no fuso horário de Belém/PA (UTC-3)
 * @returns Data atual no fuso horário de Belém/PA
 */
export const getCurrentDateBelemTZ = (): Date => {
  // Criando uma data com o timezone explícito
  const now = new Date();
  const belemOffset = -3 * 60; // UTC-3 em minutos
  const userOffset = now.getTimezoneOffset();

  // Ajustando para o fuso de Belém
  return new Date(now.getTime() + (userOffset + belemOffset) * 60 * 1000);
};
