export const max = (length: number, data: string) => {
  if (data?.length >= length) {
    return `The length of ${data} must be less than or equal to ${length} characters.`;
  }
  return;
};
