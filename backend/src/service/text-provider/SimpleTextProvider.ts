import ITextProvider from './ITextProvider';

export default class SimpleTextProvider implements ITextProvider {
    private readonly text: string;

    constructor(text: string) {
        this.text = text;
    }

    getTexts(): string[] {
        return [this.text];
    }
}
