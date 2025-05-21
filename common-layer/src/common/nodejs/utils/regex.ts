/**
 * Regular expression for validating email addresses
 * This regex validates:
 * - Local part (before @):
 *   - Can contain letters (a-z, A-Z) and numbers (0-9)
 *   - Can contener dots (.) between parts, but not consecutive
 *   - Cannot start or end with dot
 * - Domain part (after @):
 *   - Can contain letters and numbers
 *   - Can contain dots between parts
 *   - TLD must be at least 2 characters and only letters
 *
 * Examples of valid emails:
 * - user@domain.com
 * - user.name@domain.com
 * - user123@domain.co.uk
 *
 * Examples of invalid emails:
 * - user@domain (missing TLD)
 * - .user@domain.com (starts with dot)
 * - user.@domain.com (ends with dot)
 * - user..name@domain.com (consecutive dots)
 * - user@domain.c (TLD too short)
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
