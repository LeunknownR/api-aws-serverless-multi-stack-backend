export function createNestedSchema<T>(items: T[], validationFn: (item: T) => object): object | undefined {
  return items.reduceRight<object | undefined>(
    (elseSchema, item) => ({
      ...validationFn(item),
      else: elseSchema,
    }),
    undefined,
  );
}
