/**
 * Single source of truth for the user `role` field.
 *
 * - `roleField` is used by both the Better Auth server config (src/lib/auth.ts)
 *   and the auth client (src/lib/auth-client.ts) so the two stay in sync.
 * - `USER_ROLES` / `UserRole` are used by the sign-up form for the
 *   seeker / recruiter / admin selection.
 */
export const USER_ROLES = ["seeker", "recruiter", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const roleField = {
  type: "string",
  defaultValue: "seeker",
  input: true,
} as const;
