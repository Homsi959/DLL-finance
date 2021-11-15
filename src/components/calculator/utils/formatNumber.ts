export const formatNumber = (
  value: number,
  fractionDigits: number | undefined = 2,
  trimEnd: boolean | undefined = false
) => {
  const fixedValue = value.toFixed(fractionDigits ?? 2);
  var parts = fixedValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return trimEnd ? parts.join(',').replace(',00', '') : parts.join(',');
};
