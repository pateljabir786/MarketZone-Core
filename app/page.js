// B2B Volume Pricing Calculation Engine
const getB2BPrice = (basePrice, quantity) => {
  if (quantity >= 50) return basePrice * 0.80; // 20% discount for bulk orders
  if (quantity >= 20) return basePrice * 0.90; // 10% discount for medium volume
  return basePrice;
};
