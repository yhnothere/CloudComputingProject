import { CoffeeBean } from "@/lib/beans";
 
export interface CartItem {
  id: string;        // bean_id
  name: string;
  origin: string;    // "origin_country · origin_region"
  roast: string;     // roast_level
  grind: string;
  price: number;
  quantity: number;
}
 
const KEY = "beans_cart";
 
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
 
export function saveCart(items: CartItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}
 
export function addToCart(bean: CoffeeBean): void {
  const cart = getCart();
  const existing = cart.find((i) => i.id === bean.bean_id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: bean.bean_id,
      name: bean.name,
      origin: `${bean.origin_country} · ${bean.origin_region}`,
      roast: bean.roast_level,
      grind: "Whole Bean",
      price: bean.price,
      quantity: 1,
    });
  }
  saveCart(cart);
}
 
export function removeFromCart(id: string): void {
  saveCart(getCart().filter((i) => i.id !== id));
}
 
export function updateQty(id: string, delta: number): void {
  const cart = getCart()
    .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
    .filter((i) => i.quantity > 0);
  saveCart(cart);
}
 
export function updateGrind(id: string, grind: string): void {
  saveCart(getCart().map((i) => (i.id === id ? { ...i, grind } : i)));
}
 
export function cartCount(): number {
  return getCart().reduce((s, i) => s + i.quantity, 0);
}