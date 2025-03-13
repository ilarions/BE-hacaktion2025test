import { Controller, Inject, Injectable } from '@nestjs/common';
const S3 = require('aws-sdk/clients/s3');
import awsConfig from './config/aws.config';
import { ConfigService } from '@nestjs/config';
type AwsConfigType = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
};
@Injectable()
export class AwsService {
  private s3;
  private awsConfig: any

  constructor(private readonly configService: ConfigService) {
    this.awsConfig = this.configService.get('aws');

    this.s3 = new S3({
      region: this.awsConfig.region,
      accessKeyId: this.awsConfig.accessKeyId,
      secretAccessKey: this.awsConfig.secretAccessKey,
    });
  }

  async createPhoto(file) {
    const name = this.generateArticle();

    if (!file || !file.buffer) {
      throw new Error('Invalid file: buffer is missing.');
    }
    try {
      const params = {
        Bucket: this.awsConfig.bucketName,
        Key: name,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      await this.s3.upload(params).promise();

      const fileUrl = `https://${this.awsConfig.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${name}`;
      return fileUrl;
    } catch (error) {
      throw new Error('Error uploading file to S3.');
    }
  };

  async remove_photo(url: string) {
    const parts = url.split('/');
    const name = parts[parts.length - 1];
    const params = {
      Bucket: this.awsConfig.bucketName,
      Key: name,
    };
    return this.s3.deleteObject(params).promise();
  };

  private generateArticle() {
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    let article = timestamp.slice(-8) + randomPart;

    while (article.length < 12) {
      article = '0' + article;
    }
    console.log(article);
    return article;
  }
}
