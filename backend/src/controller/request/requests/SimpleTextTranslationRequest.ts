import AbstractTranslationRequest from './AbstractTranslationRequest';
import ITextProvider from '@service/text-provider/ITextProvider';
import {IsDefined, IsString} from 'class-validator';
import SimpleTextProvider from '@service/text-provider/SimpleTextProvider';

export default class SimpleTextTranslationRequest extends AbstractTranslationRequest {
    @IsDefined({message: 'text missing from request body'})
    @IsString({message: 'text must be of type string'})
    text!: string;

    getTextProvider(): ITextProvider<string> {
        return new SimpleTextProvider(this.text);
    }
}
