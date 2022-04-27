import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { mock } from 'jest-mock-extended';
import { CreateBookDTO } from './dto/create.book.dto';
import { BookCategory } from './book.category.enum';

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
    const res = await controller.createBook(bookInput);

    //assert
    expect(res.title).toEqual(bookInput.title);
    expect(res.author).toEqual(bookInput.author);
    expect(res.quantity).toEqual(bookInput.quantity);
  });
});
