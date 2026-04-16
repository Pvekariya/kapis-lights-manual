export const COD_MAX_AMOUNT = 1000;

export function isRazorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export function getPublicPaymentConfig(totalAmount = 0) {
  const codAllowed = totalAmount > 0 && totalAmount <= COD_MAX_AMOUNT;

  return {
    cod: {
      enabled: codAllowed,
      maxAmount: COD_MAX_AMOUNT,
      message: codAllowed
        ? `Cash on Delivery is available for orders up to Rs. ${COD_MAX_AMOUNT}.`
        : `Cash on Delivery is available only for orders up to Rs. ${COD_MAX_AMOUNT}.`,
    },
    razorpay: {
      enabled: isRazorpayConfigured(),
      message: isRazorpayConfigured()
        ? "Pay online with Razorpay."
        : "Razorpay is not configured yet.",
    },
  };
}

export function getAdminPaymentConfig() {
  return {
    cod: {
      enabled: true,
      label: `Cash on Delivery / Manual confirmation up to Rs. ${COD_MAX_AMOUNT}`,
      maxAmount: COD_MAX_AMOUNT,
    },
    razorpay: {
      enabled: isRazorpayConfigured(),
      keyIdPreview: process.env.RAZORPAY_KEY_ID
        ? `${process.env.RAZORPAY_KEY_ID.slice(0, 4)}...${process.env.RAZORPAY_KEY_ID.slice(-4)}`
        : null,
      secretConfigured: Boolean(process.env.RAZORPAY_KEY_SECRET),
    },
  };
}
