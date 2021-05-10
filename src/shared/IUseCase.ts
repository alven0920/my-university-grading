export default abstract class IUseCase<T, U> {
  abstract execute(args: T): Promise<U>;
}
