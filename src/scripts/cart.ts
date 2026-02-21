const STORAGE_KEY = "ea-cart";
const CART_EVENT = "cart-updated";

function loadCart(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.every((v) => typeof v === "string")) {
        return parsed as string[];
      }
    }
  } catch {
    // Corrupted or unavailable storage – start fresh
  }
  return [];
}

function saveCart(items: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable or quota exceeded – continue in-memory only
  }
  window.dispatchEvent(
    new CustomEvent(CART_EVENT, { detail: { count: items.length } }),
  );
}

/** Add an addon id to the cart. No-op if already present. */
export function addToCart(id: string): void {
  const items = loadCart();
  if (!items.includes(id)) {
    items.push(id);
    saveCart(items);
  }
}

/** Remove an addon id from the cart. No-op if not present. */
export function removeFromCart(id: string): void {
  const items = loadCart();
  const index = items.indexOf(id);
  if (index !== -1) {
    items.splice(index, 1);
    saveCart(items);
  }
}

/** Check whether an addon id is currently in the cart. */
export function isInCart(id: string): boolean {
  return loadCart().includes(id);
}

/** Return the number of items currently in the cart. */
export function getCartCount(): number {
  return loadCart().length;
}

/** Return a copy of the addon ids currently in the cart. */
export function getCartItems(): string[] {
  return loadCart();
}

/**
 * Subscribe to cart changes. The callback receives the updated item count
 * each time the cart is modified (via addToCart / removeFromCart).
 */
export function onCartChange(callback: (count: number) => void): void {
  window.addEventListener(CART_EVENT, ((e: CustomEvent<{ count: number }>) => {
    callback(e.detail.count);
  }) as EventListener);
}
