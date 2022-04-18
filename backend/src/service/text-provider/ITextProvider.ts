export default interface ITextProvider<T = string> {
    getTexts(): T | Promise<T>;
}
