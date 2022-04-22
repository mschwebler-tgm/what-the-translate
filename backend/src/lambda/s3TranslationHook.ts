import 'reflect-metadata';
import {S3Event} from 'aws-lambda';
import iocContainer from '@ioc/iocContainer';
import S3TranslationRepository from '../persistence/s3/S3TranslationRepository';
import TranslationService from '@service/TranslationService';

export default async function s3TranslationHook(event: S3Event): Promise<void> {
  const repository = iocContainer.get(S3TranslationRepository);
  const translationService = iocContainer.get(TranslationService);
  const promises = event.Records.map(async (record) => {
    console.log(`Translating ${record.s3.object.key}`);
    const fileKey = record.s3.object.key;
    const translation = await repository.findByFileKey(fileKey);
    await translationService.translate(translation);
  });

  await Promise.all(promises);
}
