import { NextResponse } from "next/server";
import { deleteProduct, getProductById, updateProduct } from "@/lib/shop";
import type { ProductRecord } from "@/lib/shop-schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";

function normalizeProductPayload(input: Partial<ProductRecord>) {
  return {
    slug: input.slug?.trim(),
    title: input.title?.trim(),
    description: input.description?.trim(),
    rangeKey: input.rangeKey,
    price: input.price === undefined ? undefined : Number(input.price),
    currency: "INR" as const,
    images: Array.isArray(input.images) ? input.images.filter(Boolean) : undefined,
    colors: Array.isArray(input.colors) ? input.colors.filter(Boolean) : undefined,
    types: Array.isArray(input.types) ? input.types.filter(Boolean) : undefined,
    specs: Array.isArray(input.specs) ? input.specs.filter(Boolean) : undefined,
    cardMeta: input.cardMeta?.trim(),
    cardDetail: input.cardDetail?.trim(),
    active: input.active,
    stock: input.stock === undefined ? undefined : Number(input.stock),
  };
}

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const payload = normalizeProductPayload(await request.json());
  const product = await updateProduct(id, payload);

  return NextResponse.json({ product });
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
