export const Role = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
} as const;

// Type helper
export type Role = (typeof Role)[keyof typeof Role];
