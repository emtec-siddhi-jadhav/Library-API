import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { AuthCredentialsSignUpDTO } from './dto/auth.credentials.signup.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as crypto from 'crypto-js';
import { AuthCredentialsSignInDTO } from './dto/auth.credentials.signin.dto';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let controller: UserController;
  const mockUserService = mock<UserService>();
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
          signOptions: {
            expiresIn: 3600,
          },
        }),
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
      ],
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

  // describe('signIn', () => {
  //   it('case 1: user registered successfully', async () => {
  //     const userCredentials: AuthCredentialsSignInDTO = {
  //       email: 'admin@gmail.com',
  //       password: 'test1',
  //     };

  //     mockUserService.signIn.mockResolvedValue({
  //       token: jwtService.sign(userCredentials.email),
  //     });

  //     const result = await controller.signIn(userCredentials);
  //     expect(result).toEqual(controller.signIn);
  //   });
  // });
});
