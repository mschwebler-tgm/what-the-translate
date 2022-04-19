export default interface ITranslationProvider {
    translate(text: string, targetLanguages: string[]): Promise<string>;
}
