export default async function globalTeardown(): Promise<void> {
  console.log('\n=== Playwright test suite finished ===\n');
}
