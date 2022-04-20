export default interface ITranslationService {
    translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<string>;
}
