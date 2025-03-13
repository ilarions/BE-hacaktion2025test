import { Test, TestingModule } from '@nestjs/testing';
import { AwsService } from './aws.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService

jest.mock('aws-sdk', () => {
  const mockS3Instance = {
    upload: jest.fn().mockReturnThis(),
    promise: jest.fn().mockResolvedValue({ Location: 'https://mock-s3-url.com/file.jpg' }), // Mock resolved value
  };
  return { S3: jest.fn(() => mockS3Instance) };
});

describe('AwsService', () => {
  let service: AwsService;
  let configService: ConfigService;

  const mockConfig = {
    region: 'us-east-1',
    accessKeyId: 'mockAccessKeyId',
    secretAccessKey: 'mockSecretAccessKey',
    bucketName: 'mock-bucket',
    AWS_BUCKET_NAME: 'mock-bucket-name',
    AWS_BUCKET_REGION: 'us-east-1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule], // Import ConfigModule
      providers: [
        AwsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'aws') {
                return mockConfig;
              }
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AwsService>(AwsService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should upload a file and return its URL', async () => {
    const file = {
      buffer: Buffer.from('test-file'),
      mimetype: 'image/jpeg',
    };

    expect(await service.createPhoto(file)).toBe('https://mock-bucket-name.s3.us-east-1.amazonaws.com/random-name');
  });
});






















































