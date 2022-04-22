import { v4 as uuidv4 } from 'uuid';
import {TranslationType} from '@controller/request/TranslationRequestFactory';

export type TranslationStatus = 'IN_PROGRESS' | 'DONE';

export default class Translation<T> {
    uuid!: string;
    type!: TranslationType;
    status!: TranslationStatus;
    originalText!: T;
    translatedText!: T;
    sourceLanguage!: string;
    targetLanguages!: string[];

    constructor() {
        this.uuid = uuidv4();
    }
}
