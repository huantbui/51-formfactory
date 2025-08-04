export const min = (length: number, data: string) => {
  if (data.length < length) {
    return `The length of ${data} must be at least ${length} characters.`;
  }
  return;
};
