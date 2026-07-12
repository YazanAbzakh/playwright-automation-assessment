import { randomUUID } from 'node:crypto';

export function generateUniqueEmail(): string {
  return `qa.automation.${randomUUID()}@example.com`;
}
