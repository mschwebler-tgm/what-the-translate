export default interface ITranslationService {
    translate(text: string, targetLanguages: string[]): Promise<string>;
}
