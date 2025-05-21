export default abstract class CustomError<E> extends Error {
  readonly data: E;
  constructor(message: string, data: E) {
    super(message);
    this.data = data;
  }
}
