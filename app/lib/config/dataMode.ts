export function isMockMode(): boolean {
  const mode = process.env.NEXT_PUBLIC_DATA_MODE;
  if (mode === "api") return false;
  return true; // default mock
}
