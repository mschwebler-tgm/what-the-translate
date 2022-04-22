import Translation from './entities/Translation';

export default interface ITranslationRepository<T> {
    save(translation: Translation<T>): Promise<void>;

    delete(translation: Translation<T>): Promise<void>;
}
