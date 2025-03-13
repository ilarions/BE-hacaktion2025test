import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "./user.service";
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
const db = {
  user: {
    findFirst: jest.fn().mockResolvedValue(oneUser),
    update: jest.fn().mockResolvedValue(updateUser),
  },
};



describe('UserService', () => {
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
      expect(service.get_user({ user: 'a uuid' })).resolves.toEqual(oneUser);
    });
  });
  describe("updateName", () => {
    it("should be return update user", () => {
      expect(service.change_name(oneUser, { user: 11 })).resolves.toEqual(updateUser);
    })
  })
})
