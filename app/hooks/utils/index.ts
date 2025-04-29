export const truncateText = (text: any, maxLength: number) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + ". . .";
  };