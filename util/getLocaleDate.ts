export function getLocaleDate(date: string) {
  return new Date(date).toLocaleDateString('ko');
}

export const todayLocaleDate = new Date().toLocaleDateString('ko');
