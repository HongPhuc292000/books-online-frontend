export const formatVND = (value?: number) => {
  const returnValue = value || 0;
  return returnValue.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
};

export const salePercent = (reducedPrice: number, defaultPrice: number) => {
  return (100 - (reducedPrice / defaultPrice) * 100).toFixed(0);
};
