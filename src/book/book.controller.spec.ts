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
    it('case 1: create a new book', async () => {
      //prepare
      const bookInput: CreateBookDTO = {
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
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
      const result = await controller.createBook(bookInput);

      //assert
      expect(result.title).toEqual(bookInput.title);
      expect(result.author).toEqual(bookInput.author);
      expect(result.category).toEqual(bookInput.category);
      expect(result.quantity).toEqual(bookInput.quantity);
    });
  });

  describe('getBooks', () => {
    it('case 1: Return books', async () => {
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
    it('case 1: Update book', async () => {
      //prepare
      const bookInput: UpdateBookDTO = {
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
      };

      mockBookService.updateBook.mockResolvedValue({
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
      });

      //call
      const result = await controller.updateBook(bookInput, 2);

      //assert
      expect(result).toEqual(bookInput);
    });
  });

  // describe('issuedBook', () => {
  //   it('case 1: Issued book to user', async () => {
  //     //prepare
  //     const bookInput: IssuedBookDTO = {
  //       bookId: 1,
  //       userId: 2,
  //     };

  //     mockBookService.issuedBook.mockResolvedValue({
  //       bookId: 1,
  //       userId: 2,
  //       issuedDate: moment().toISOString(),
  //       returnDate: moment().add(7, 'days').format('L'),
  //       book: null,
  //       id: 2,
  //       user: null,
  //       deletedAt: new Date(),
  //     });

  //     //call
  //     const result = await controller.issuedBook(bookInput);

  //     //assert
  //     expect(result).toEqual(bookInput);
  //   });
  // });

  describe('deleteBook', () => {
    it('case 1: delete book of given ID', async () => {
      const result = await controller.deleteBook(2);
      expect(result).toEqual(controller.deleteBook(2));
    });

    it('case 2: book is not deleted', async () => {
      try {
        const result = await controller.deleteBook(2);
        expect(result).toEqual(controller.deleteBook(2));
      } catch (err) {
        return err.message;
      }
    });
  });
});
