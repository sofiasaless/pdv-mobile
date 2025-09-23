export function getDiaAnteriorAs16(): Date {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  // Setar horário fixo 16:00:00
  yesterday.setHours(16, 0, 0, 0);

  return yesterday;
}

export function converterParaDate(dataString: string) {
  let dataComSplit = dataString.split('/', 3)
  let dataConvertida = new Date(Number(dataComSplit[2]), Number(dataComSplit[1]) - 1, Number(dataComSplit[0]));
  return dataConvertida;
}

export function setTimeFromString(base: Date, timeString: string): Date {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  const updated = new Date(base);
  updated.setHours(hours, minutes, seconds || 0, 0);

  return updated;
}
