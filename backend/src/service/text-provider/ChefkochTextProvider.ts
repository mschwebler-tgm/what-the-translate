import ITextProvider from '@service/text-provider/ITextProvider';

export default class ChefkochTextProvider implements ITextProvider {
    async getTexts(): Promise<string[]> {
        return ['ingredients', 'description'];
    }
}
