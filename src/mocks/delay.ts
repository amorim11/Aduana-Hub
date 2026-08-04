/** Simulates real network latency in the mock API route handlers. */
export function delay(minMs = 300, maxMs = 600) {
  const ms = minMs + Math.random() * (maxMs - minMs);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
