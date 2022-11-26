import {Injectable} from '@angular/core';
import {PutObjectCommand, PutObjectCommandInput, S3Client} from '@aws-sdk/client-s3';
import {v4 as uuid} from 'uuid';
import {AppConfig} from '@configs';
import {Media, ResponseResult} from '../models';


@Injectable()
export class BlobService {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly bucketUrl: string;

  constructor() {
    this.client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: AppConfig.storage.accessKeyId,
        secretAccessKey: AppConfig.storage.secretAccessKey,
      },
    });

    this.bucket = AppConfig.storage.bucketName;
    this.bucketUrl = `https://${this.bucket}.s3.us-east-1.amazonaws.com`;
  }

  async uploadImage(file: File): Promise<ResponseResult<Media>> {
    const fileName = `img/${this.generateId()}.jpg`;

    const input: PutObjectCommandInput = {
      Bucket: this.bucket,
      Body: file,
      Key: fileName,
      ContentType: file.type,
    };

    try {
      await this.client.send(new PutObjectCommand(input));
      return {
        success: true,
        value: {
          url: `${this.bucketUrl}/${fileName}`,
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
