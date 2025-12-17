export function decodeJWT(token: string | null): Record<string, any> | null {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    // Padding token for Base64 decoding
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decoded = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}
