import {IsOptional, IsString} from 'class-validator';
import {TranslationType} from '../TranslationRequestFactory';
import ITextProvider from '../../../service/text-provider/ITextProvider';

export default abstract class AbstractTranslationRequest {
    type!: TranslationType;

    @IsOptional()
    @IsString({each: true})
    protected targetLanguages?: string[];

    getTargetLanguages(): string[] {
        return this.targetLanguages || [];
    }

    abstract getTextProvider(): ITextProvider;
}
