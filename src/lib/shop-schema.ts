export const PRODUCT_RANGES = [
  {
    key: "standard-led",
    title: "Standard LED",
    subtitle: "Everyday performance lighting",
  },
  {
    key: "half-watt-range",
    title: "0.5 Watt Range",
    subtitle: "Decorative mini lighting series",
  },
  {
    key: "nakshatra-range",
    title: "Nakshatra Range",
    subtitle: "India First Time — Our New Product Launch",
  },
  {
    key: "gramin-range",
    title: "Gramin Range",
    subtitle: "Affordable high-efficiency rural lighting solutions",
  },
  {
    key: "pixel-led-range",
    title: "Pixel LED Range",
    subtitle: "Advanced digital decorative lighting solutions",
  },
] as const;

export type ProductRangeKey = (typeof PRODUCT_RANGES)[number]["key"];

export type ProductRecord = {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  rangeKey: ProductRangeKey;
  price: number;
  currency: "INR";
  images: string[];
  colors: string[];
  types: string[];
  specs: string[];
  cardMeta: string;
  cardDetail?: string;
  active: boolean;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CartItemRecord = {
  productId: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export type OrderRecord = {
  _id?: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  paymentMethod?: "cod" | "razorpay";
  paymentStatus?: "pending" | "paid" | "failed" | "cod";
  orderStatus?: "new" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  adminNote?: string;
  totalAmount: number;
  currency: "INR";
  items: CartItemRecord[];
  createdAt?: string;
  updatedAt?: string;
};

export function groupProductsByRange(products: ProductRecord[]) {
  return PRODUCT_RANGES.map((range) => ({
    ...range,
    products: products.filter((product) => product.rangeKey === range.key),
  }));
}
