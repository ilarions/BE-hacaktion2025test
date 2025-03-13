import generateArticle from "./generate_article";

const S3 = require('aws-sdk/clients/s3');
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});
export const create_photo = async (file) => {
  const name = generateArticle();

  if (!file || !file.buffer) {
    throw new Error('Invalid file: buffer is missing.');
  }

  const params = {
    Bucket: bucketName,
    Key: name,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.upload(params).promise();
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${name}`;
    return fileUrl;
  } catch (error) {
    console.error(error)
    throw new Error('Error uploading file to S3.');
  }
};

export const remove_photo = (url: string) => {
  const parts = url.split('/');
  const name = parts[parts.length - 1];
  const params = {
    Bucket: bucketName,
    Key: name,
  };
  return s3.deleteObject(params).promise();
};
