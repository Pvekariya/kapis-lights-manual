import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "kapis_admin_session";

function getAdminSecret() {
  return process.env.ADMIN_PASSWORD || "";
}

function signValue(value: string) {
  return crypto.createHmac("sha256", getAdminSecret()).update(value).digest("hex");
}

export async function createAdminSession() {
  const token = `admin:${signValue("admin")}`;
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  return value === `admin:${signValue("admin")}`;
}

export function validateAdminPassword(password: string) {
  return password === getAdminSecret();
}
