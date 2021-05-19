export const formatDollarsRegex = (input: number): string => {
  const parts = input.toFixed(2).split('.');
  return (
    '$' + parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
};
