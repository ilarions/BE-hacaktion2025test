import { PrismaService } from "../prisma.service";
import { UserService } from "./user.service";
import { Test, TestingModule } from '@nestjs/testing';


const oneUser = {
  name: "arr",
  pasasword: "aa"
}

const db = {
  user: {

    findFirst: jest.fn().mockResolvedValue(oneUser),
  },
};



describe('CatService', () => {
  let service: UserService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();


    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getOne', () => {
    it('should get a single cat', () => {
      expect(service.get_user('a uuid')).resolves.toEqual(oneUser);
    });
  });

})
