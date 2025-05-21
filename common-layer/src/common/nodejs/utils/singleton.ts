export type SingletonFunction<I> = () => I;
export function Singleton<I>(create: SingletonFunction<I>): SingletonFunction<I> {
  let instance: I;
  return () => {
    if (instance) return instance;
    instance = create();
    return instance;
  };
}
