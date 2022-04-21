import {IsOptional, IsString} from 'class-validator';
import {TranslationType} from '@controller/request/TranslationRequestFactory';
import ITextProvider from '@service/text-provider/ITextProvider';

export default abstract class AbstractTranslationRequest {
    public readonly type!: TranslationType;

    @IsString({message: 'sourceLanguageCode missing from request body'})
    public readonly sourceLanguageCode!: string;

    @IsOptional()
    @IsString({each: true})
    protected targetLanguageCodes?: string[];

    getTargetLanguageCodes(): string[] {
        return this.targetLanguageCodes || [];
    }

    abstract getTextProvider(): ITextProvider<unknown>;
}
