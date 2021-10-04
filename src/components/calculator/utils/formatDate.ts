export const formatDate = (date?: string) => {
  if (!date) {
    return undefined;
  }

  return new Date(date).toLocaleDateString('ru-RU');
};
