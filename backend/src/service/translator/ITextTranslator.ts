export default interface ITextTranslator<T> {
    translate(input: T, targetLanguages: string[]): Promise<T>;
}
