import {Injectable} from '@angular/core';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {v4 as uuid} from 'uuid';
import {AppConfig} from '@configs';
import {Media, ResponseResult} from '../models';


@Injectable()
export class BlobService {
  private readonly bucket: S3Client;

  constructor() {
    this.bucket = new S3Client({
      credentials: {
        accessKeyId: AppConfig.storage.keyId,
        secretAccessKey: AppConfig.storage.keySecret,
      },
    });
  }

  async uploadFile(file: File): Promise<ResponseResult<Media>> {
    const fileName = `blob/${this.generateId()}`;

    const params = {
      Bucket: AppConfig.storage.bucketName,
      Key: fileName,
      ContentType: file.type,
    };

    try {
      await this.bucket.send(new PutObjectCommand(params));
      return {
        success: true,
        value: {
          url: `${AppConfig.storage.bucketUrl}/blob/${fileName}`,
          contentType: file.type,
        },
      };
    } catch (error) {
      console.error(`Could not upload file: ${error}`);
      return {success: false};
    }
  }

  private generateId(): string {
    return uuid().replace('-', '');
  }
}
