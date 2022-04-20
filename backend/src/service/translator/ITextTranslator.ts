export default interface ITextTranslator<T> {
    translate(input: T, sourceLanguage: string, targetLanguages: string[]): Promise<T>;
}
