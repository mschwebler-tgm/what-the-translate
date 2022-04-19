export default interface ITranslationService {
    translate(text: string, targetLanguage: string, sourceLanguage?: string): Promise<string>;
}
