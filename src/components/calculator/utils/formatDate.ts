export const formatDate = (date?: string, compressed?: boolean) => {
  if (!date) {
    return undefined;
  }

  const localedDate = new Date(date).toLocaleDateString('ru-RU');

  if (compressed) {
    const arrOfDate = localedDate.split('');

    arrOfDate.splice(-4, 2);

    return arrOfDate.join('');
  }

  return localedDate;
};
