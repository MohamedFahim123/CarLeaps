/** Stable mock dealer for local dashboard demos. */
export const DEMO_DEALER = {
  id: 1,
  name: "Demo Motors",
  email: "dealer@carleaps.com",
  password: "Demo@1234",
} as const;

export function getDemoLoginHint(): string {
  return `Demo: ${DEMO_DEALER.email} / ${DEMO_DEALER.password}`;
}
