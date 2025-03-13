import { PrismaService } from "../prisma/prisma.service";
import { QuizService } from "./quiz.service";
import { Test, TestingModule } from '@nestjs/testing';


const oneUser = {
  id: "11",
  name: "arr",
  pasasword: "aa"
}
const updateUser = {
  id: "11",
  name: "ary",
  pasasword: "aa"
}

const quizes = [{
  "id": "67a6b7d7d8ae81ee84ba2518",
  "title": "fara",
  "description": "aaaaaa",
  "img": "https://faralaer.s3.eu-west-2.amazonaws.com/792872262596",
  "time": 15,
  "rating": 0,
  "authorId": "67a656e041a39342ceebd91c"
},
{
  "id": "67b0fdb8d2175695d122bb7c",
  "title": "TOP Lore",
  "description": "Перевірка знань lore top",
  "img": "https://faralaer.s3.eu-west-2.amazonaws.com/525352546731",
  "time": 20,
  "rating": 0,
  "authorId": "67a656e041a39342ceebd91c"
},
]
const quiz = {
  "id": "67b0fdb8d2175695d122bb7c",
  "title": "TOP Lore",
  "description": "Перевірка знань lore top",
  "img": "https://faralaer.s3.eu-west-2.amazonaws.com/525352546731",
  "time": 20,
  "rating": 0,
  "authorId": "67a656e041a39342ceebd91c"
}

const createPhotoMock = jest.fn().mockResolvedValue('mocked-photo-url');
const db = {
  quiz: {
    findMany: jest.fn().mockResolvedValue(quizes),
    count: jest.fn().mockResolvedValue(2),
    findFirst: jest.fn().mockResolvedValue(quiz),
    update: jest.fn().mockResolvedValue(updateUser),
    create: jest.fn().mockResolvedValue(quiz),
  },
};



describe('UserService', () => {
  let service: QuizService;
  let createPhoto: jest.Mock;
  let prisma: PrismaService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: PrismaService,
          useValue: db,
        },
        {
          provide: 'create_photo',
          useValue: createPhotoMock,
        }
      ],
    }).compile();


    service = module.get<QuizService>(QuizService);
    prisma = module.get<PrismaService>(PrismaService);
    createPhoto = module.get<jest.Mock>('create_photo')
  });

  it('should return paginated quizzes with total count and totalPages', async () => {
    const page = 1;
    const limit = 1;

    const result = await service.get(page, limit);

    expect(result).toEqual({
      data: quizes,
      page,
      limit,
      total: 2,
      totalPages: 2,
    });

    expect(prisma.quiz.findMany).toHaveBeenCalledWith({
      skip: (page - 1) * limit,
      take: limit,
    });

    expect(prisma.quiz.count).toHaveBeenCalled();
  });
  describe("updateName", () => {
    it("should be return update user", () => {
      expect(service.get_one("11")).resolves.toEqual(quiz);
    })
  })






  describe("create_quiz", () => {
    it('should call create_photo when creating a quiz', async () => {
      const file = {
        mainImg: [{ buffer: Buffer.from('image-data') }]
      };
      const data = { title: 'Test Quiz', description: 'Test Description', time: 30 };
      const req = { user: { id: 1 } };

      const quiz = await service.create_quiz(file, data, req);

      expect(quiz).toHaveProperty('title', 'TOP Lore');
    });
  })
})
