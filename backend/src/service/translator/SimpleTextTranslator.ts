import ITextTranslator from '@service/translator/ITextTranslator';

export default class SimpleTextTranslator implements ITextTranslator<string> {
    translate(input: string, targetLanguages: string[]): Promise<string> {
        console.log(input);
        return Promise.resolve(input);
    }
}
