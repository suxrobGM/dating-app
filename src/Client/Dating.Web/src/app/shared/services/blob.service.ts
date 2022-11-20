import {Injectable} from '@angular/core';
import {PutObjectCommand, PutObjectCommandInput, S3Client} from '@aws-sdk/client-s3';
import {v4 as uuid} from 'uuid';
import {AppConfig} from '@configs';
import {Media, ResponseResult} from '../models';


@Injectable()
export class BlobService {
  private readonly bucket: S3Client;

  constructor() {
    this.bucket = new S3Client({
      region: 'auto',
      endpoint: 'https://f8e76a74146f4459cccd71795ce9195a.r2.cloudflarestorage.com',
      credentials: {
        accessKeyId: AppConfig.storage.keyId,
        secretAccessKey: AppConfig.storage.keySecret,
      },
    });
  }

  async uploadFile(file: File): Promise<ResponseResult<Media>> {
    const fileName = `blob/${this.generateId()}`;

    const input: PutObjectCommandInput = {
      Bucket: AppConfig.storage.bucketName,
      Body: file,
      Key: fileName,
      ContentType: file.type,
    };

    try {
      await this.bucket.send(new PutObjectCommand(input));
      return {
        success: true,
        value: {
          url: `${AppConfig.storage.bucketUrl}/blob/${fileName}`,
          contentType: file.type,
        },
      };
    }
    catch (error) {
      console.error(`Could not upload file: ${error}`);
      return {
        success: false,
        error: `Could not upload file: ${error}`,
      };
    }
  }

  private generateId(): string {
    return uuid().replace('-', '');
  }
}
