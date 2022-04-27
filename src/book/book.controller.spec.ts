import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { mock } from 'jest-mock-extended';
import { CreateBookDTO } from './dto/create.book.dto';
import { BookCategory } from './book.category.enum';
import { SearchBookDTO } from './dto/search.book.dto';
import { UpdateBookDTO } from './dto/update.book.dto';

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
    it('case 1', async () => {
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

  describe('updateBook', () => {
    it('case 1', async () => {
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
      expect(result.title).toEqual(bookInput.title);
      expect(result.author).toEqual(bookInput.author);
      expect(result.category).toEqual(bookInput.category);
      expect(result.quantity).toEqual(bookInput.quantity);
    });
  });
});
