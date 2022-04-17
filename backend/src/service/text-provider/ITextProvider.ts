export default interface ITextProvider {
    getTexts(): string[] | Promise<string[]>;
}
