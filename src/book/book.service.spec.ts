import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { CreateBookDTO } from './dto/create.book.dto';
import { BookCategory } from './book.category.enum';
import { UpdateBookDTO } from './dto/update.book.dto';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { BookEntity } from './book.entity';
import { SearchBookDTO } from './dto/search.book.dto';

describe('BookService', () => {
  let service: BookService;
  const mockBookRepository = mock<BookRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BookRepository,
          useValue: mockBookRepository,
        },
        BookService,
      ],
    }).compile();
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      mockBookRepository.createBook.mockResolvedValue({
        bookId: 1,
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
        bookUsers: null,
      });

      //call
      const result = await service.createBook(bookInput);

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
      mockBookRepository.getBooks.mockResolvedValue(bookEntity);
      const result = await service.getBooks(bookInput);
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

      mockBookRepository.updateBook.mockResolvedValue({
        title: 'Secret Wishlist',
        author: 'Mr ABC',
        category: BookCategory.Romantic,
        quantity: 10,
      });

      //call
      const result = await service.updateBook(bookInput, 2);

      //assert
      expect(result.title).toEqual(bookInput.title);
      expect(result.author).toEqual(bookInput.author);
      expect(result.category).toEqual(bookInput.category);
      expect(result.quantity).toEqual(bookInput.quantity);
    });
  });
});
