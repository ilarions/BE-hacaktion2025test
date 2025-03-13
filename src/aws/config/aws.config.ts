import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  bucketName: process.env.AWS_BUCKET_NAME,
}));
