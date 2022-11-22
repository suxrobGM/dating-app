import {Injectable} from '@angular/core';
import {ListBucketsCommand, PutBucketCorsCommand, PutBucketCorsCommandInput, PutObjectCommand, PutObjectCommandInput, S3Client} from '@aws-sdk/client-s3';
import {v4 as uuid} from 'uuid';
import {AppConfig} from '@configs';
import {Media, ResponseResult} from '../models';


@Injectable()
export class BlobService {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.client = new S3Client({
      region: 'auto',
      endpoint: 'https://f8e76a74146f4459cccd71795ce9195a.r2.cloudflarestorage.com',
      credentials: {
        accessKeyId: AppConfig.storage.accessKey,
        secretAccessKey: AppConfig.storage.secretKey,
      },
    });

    this.bucket = AppConfig.storage.bucketName;
  }

  async uploadImage(file: File): Promise<ResponseResult<Media>> {
    const fileName = `img/${this.generateId()}.jpg`;

    

    const inputCors: PutBucketCorsCommandInput = {
      Bucket: this.bucket,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedMethods: ['PUT'],
            AllowedOrigins: ['*'],
            AllowedHeaders: ['content-type'],
          },
        ],
      },
    };

    console.log(await this.client.send(new PutBucketCorsCommand(inputCors)));
    console.log(await this.client.send(new ListBucketsCommand('')));
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
          url: `${AppConfig.storage.bucketUrl}/${fileName}`,
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
