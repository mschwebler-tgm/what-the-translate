import ITranslationRepository from '../ITranslationRepository';
import {injectable} from 'inversify';
import Translation from '../entities/Translation';
import {S3} from 'aws-sdk';
import {plainToInstance} from 'class-transformer';

@injectable()
export default class S3TranslationRepository<T> implements ITranslationRepository<T> {
    private readonly bucketArn: string = process.env.TRANSLATION_BUCKET_NAME!;

    private readonly s3Client: S3;

    constructor(s3Client: S3) {
        this.s3Client = s3Client;
    }

    async save(translation: Translation<T>): Promise<void> {
        await this.s3Client.putObject({
            Bucket: this.bucketArn,
            Key: this.getFileKey(translation),
            Body: JSON.stringify(translation),
        }).promise();
    }

    async findByFileKey(key: string): Promise<Translation<T>> {
        const result = await this.s3Client.getObject({
            Bucket: this.bucketArn,
            Key: key,
        }).promise();
        const bodyString = result.Body?.toString('utf-8');
        if (!bodyString) {
            throw new Error(`Cannot find translation file "${key}"`);
        }
        const bodyJson = JSON.parse(bodyString);

        return plainToInstance(Translation, bodyJson) as Translation<T>;
    }

    async delete(translation: Translation<T>): Promise<void> {
        await this.s3Client.deleteObject({
            Bucket: this.bucketArn,
            Key: this.getFileKey(translation),
        }).promise();
    }

    private getFileKey(translation: Translation<T>): string {
        return `${translation.status}/${translation.uuid}.json`;
    }

}
