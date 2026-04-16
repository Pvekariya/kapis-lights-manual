import { NextResponse } from "next/server";
import { createProduct, getProducts } from "@/lib/shop";
import type { ProductRecord } from "@/lib/shop-schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";

function normalizeProductPayload(input: Partial<ProductRecord>) {
  return {
    slug: input.slug?.trim() || "",
    title: input.title?.trim() || "",
    description: input.description?.trim() || "",
    rangeKey: input.rangeKey || "standard-led",
    price: Number(input.price || 0),
    currency: "INR" as const,
    images: Array.isArray(input.images) ? input.images.filter(Boolean) : [],
    colors: Array.isArray(input.colors) ? input.colors.filter(Boolean) : [],
    types: Array.isArray(input.types) ? input.types.filter(Boolean) : [],
    specs: Array.isArray(input.specs) ? input.specs.filter(Boolean) : [],
    cardMeta: input.cardMeta?.trim() || "",
    cardDetail: input.cardDetail?.trim() || "",
    active: input.active ?? true,
    stock: Number(input.stock ?? 0),
  };
}

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = normalizeProductPayload(await request.json());

  if (!payload.slug || !payload.title) {
    return NextResponse.json({ error: "Slug and title are required" }, { status: 400 });
  }

  const product = await createProduct(payload);

  return NextResponse.json({ product });
}
