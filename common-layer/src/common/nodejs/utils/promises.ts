export async function processBatchPromises<T>(promises: Promise<T>[], batchSize: number = 20): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }
  return results;
}
