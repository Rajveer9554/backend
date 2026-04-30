export const generateComplaintId = () => {
  const random = Math.floor(Math.random() * 10000);

  return `AJ-${Date.now()}-${random}`;
};
