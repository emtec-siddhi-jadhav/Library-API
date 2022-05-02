import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { AuthCredentialsSignUpDTO } from './dto/auth.credentials.signup.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as crypto from 'crypto-js';

describe('UserController', () => {
  let controller: UserController;
  const mockUserService = mock<UserService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('case 1: user registered successfully', async () => {
      const userCredentials: AuthCredentialsSignUpDTO = {
        email: 'admin@gmail.com',
        password: 'test1',
        username: 'Mr. Admin',
      };

      mockUserService.signUp.mockResolvedValue({
        email: 'admin@gmail.com',
        password: 'test1',
        username: 'Mr. Admin',
        bookUsers: null,
        userId: 4,
        validatePassword: function (password: string): boolean {
          const encrypted = `${crypto.MD5(password)}`;
          return encrypted == this.password;
        },
      });

      const result = await controller.signUp(userCredentials);
      expect(result.email).toEqual(userCredentials.email);
      expect(result.username).toEqual(userCredentials.username);
    });
  });
});
