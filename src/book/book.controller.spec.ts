import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { mock } from 'jest-mock-extended';
import { CreateBookDTO } from './dto/create.book.dto';
import { BookCategory } from './book.category.enum';
import { SearchBookDTO } from './dto/search.book.dto';
import { UpdateBookDTO } from './dto/update.book.dto';
import { IssuedBookDTO } from './dto/issued.book.dto';
import moment from 'moment';
import { BookEntity } from './book.entity';
import { ReturnBookDTO } from './dto/return.book.dto';
import { UserEntity } from '../user/user.entity';
import * as crypto from 'crypto-js';

describe('BookController', () => {
  let controller: BookController;
  const mockBookService = mock<BookService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
      controllers: [BookController],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createBook', () => {
    it('case 1: create a new book successfully', async () => {
      //prepare
      const bookInput: CreateBookDTO = {
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
      };
      const userEntity: UserEntity = {
        username: 'user',
        email: 'user@gmail.com',
        password: 'user',
        userId: 1,
        bookUsers: null,
        validatePassword: function (password: string): boolean {
          const encrypted = `${crypto.MD5(password)}`;
          return encrypted == this.password;
        },
      };
      mockBookService.createBook.mockResolvedValue({
        bookId: 1,
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
        bookUsers: null,
      });
      //call
      const result = await controller.createBook(userEntity, bookInput);

      //assert
      expect(result.title).toEqual(bookInput.title);
      expect(result.author).toEqual(bookInput.author);
      expect(result.category).toEqual(bookInput.category);
      expect(result.quantity).toEqual(bookInput.quantity);
    });

    it('case 2: Book is not created', async () => {
      //prepare
      const bookInput: CreateBookDTO = {
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
      };
      const userEntity: UserEntity = {
        username: 'user',
        email: 'user@gmail.com',
        password: 'user',
        userId: 1,
        bookUsers: null,
        validatePassword: function (password: string): boolean {
          const encrypted = `${crypto.MD5(password)}`;
          return encrypted == this.password;
        },
      };
      mockBookService.createBook.mockRejectedValue({
        bookId: 1,
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
        bookUsers: null,
      });
      //call
      const error = new Error('test-error book is not created');
      mockBookService.createBook.mockRejectedValue(error);

      //assert
      expect(controller.createBook(userEntity, bookInput)).rejects.toThrowError(
        'book is not created',
      );
    });
  });

  describe('getBooks', () => {
    it('case 1: Return books successfully', async () => {
      //prepare
      const bookInput: SearchBookDTO = {
        search: 'ABC',
      };

      const bookEntity: BookEntity[] = [
        {
          title: 'test',
          author: 'ABC',
          category: BookCategory.Adventure,
          quantity: 10,
          bookId: 2,
          bookUsers: null,
        },
      ];
      mockBookService.getBooks.mockResolvedValue(bookEntity);
      const result = await controller.getBooks(bookInput);
      //assert
      expect(result.length).toEqual(1);

      result.map((book) => {
        expect(book).toEqual(bookEntity[0]);
      });
    });
  });

  describe('updateBook', () => {
    it('case 1: Book info updated successfully', async () => {
      //prepare
      const bookInput: UpdateBookDTO = {
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
      };

      const userEntity: UserEntity = {
        username: 'user',
        email: 'user@gmail.com',
        password: 'user',
        userId: 1,
        bookUsers: null,
        validatePassword: function (password: string): boolean {
          const encrypted = `${crypto.MD5(password)}`;
          return encrypted == this.password;
        },
      };
      mockBookService.updateBook.mockResolvedValue({
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
      });

      //call
      const result = await controller.updateBook(userEntity, bookInput, 2);

      //assert
      expect(result).toEqual(bookInput);
    });

    it('case 2: Book info is not updated', async () => {
      //prepare
      const bookInput: UpdateBookDTO = {
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
      };

      const userEntity: UserEntity = {
        username: 'user',
        email: 'user@gmail.com',
        password: 'user',
        userId: 1,
        bookUsers: null,
        validatePassword: function (password: string): boolean {
          const encrypted = `${crypto.MD5(password)}`;
          return encrypted == this.password;
        },
      };
      mockBookService.updateBook.mockResolvedValue({
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
      });

      //call
      const error = new Error('test-error book is not updated');
      mockBookService.updateBook.mockRejectedValue(error);

      //assert
      expect(
        controller.updateBook(userEntity, bookInput, 2),
      ).rejects.toThrowError('book is not updated');
    });
  });

  // describe('issuedBook', () => {
  //   it('case 1: Issued book to user', async () => {
  //     //prepare
  //     const bookInput: IssuedBookDTO = {
  //       bookId: 1,
  //       userId: 2,
  //     };
  //     const userEntity: UserEntity = {
  //       username: 'user',
  //       email: 'user@gmail.com',
  //       password: 'user',
  //       userId: 1,
  //       bookUsers: null,
  //       validatePassword: function (password: string): boolean {
  //         const encrypted = `${crypto.MD5(password)}`;
  //         return encrypted == this.password;
  //       },
  //     };
  //     mockBookService.issuedBook.mockResolvedValue({
  //       bookId: 1,
  //       userId: 2,
  //       issuedDate: moment().toISOString(),
  //       returnDate: moment().add(7, 'days').format('L'),
  //       book: null,
  //       id: 1,
  //       user: null,
  //       deletedAt: new Date(),
  //     });

  //     //call
  //     const result = await controller.issuedBook(userEntity, bookInput);

  //     //assert
  //     expect(result).toEqual(bookInput);
  //   });
  // });

  // describe('returnBook', () => {
  //   it('case 1: Book is returned by user successfully', async () => {
  //     const input: ReturnBookDTO = {
  //       bookId: 1,
  //       userId: 2,
  //     };
  //     const userEntity: UserEntity = {
  //       username: 'user',
  //       email: 'user@gmail.com',
  //       password: 'user',
  //       userId: 1,
  //       bookUsers: null,
  //       validatePassword: function (password: string): boolean {
  //         const encrypted = `${crypto.MD5(password)}`;
  //         return encrypted == this.password;
  //       },
  //     };
  //     mockBookService.returnBook.mockResolvedValue({
  //       title: 'test',
  //       author: 'ABC',
  //       category: BookCategory.Adventure,
  //       quantity: 10,
  //       bookId: 2,
  //       bookUsers: null,
  //     });

  //     const result = await controller.returnBook(userEntity, input);
  //     expect(result.bookId).toEqual(input.bookId);
  //   });
  // });

  describe('deleteBook', () => {
    it('case 1: delete book of given ID', async () => {
      const userEntity: UserEntity = {
        username: 'user',
        email: 'user@gmail.com',
        password: 'user',
        userId: 1,
        bookUsers: null,
        validatePassword: function (password: string): boolean {
          const encrypted = `${crypto.MD5(password)}`;
          return encrypted == this.password;
        },
      };
      const result = await controller.deleteBook(userEntity, 2);
      expect(result).toEqual(controller.deleteBook(userEntity, 2));
    });

    it('case 2: book is not deleted', async () => {
      const userEntity: UserEntity = {
        username: 'user',
        email: 'user@gmail.com',
        password: 'user',
        userId: 1,
        bookUsers: null,
        validatePassword: function (password: string): boolean {
          const encrypted = `${crypto.MD5(password)}`;
          return encrypted == this.password;
        },
      };

      const error = new Error('test-error book is not deleted');
      mockBookService.deleteBook.mockRejectedValue(error);

      //assert
      expect(controller.deleteBook(userEntity, 2)).rejects.toThrowError(
        'book is not deleted',
      );
    });
  });
});
