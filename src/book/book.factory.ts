import { Factory } from 'fishery';
import { BookCategory } from './book.category.enum';
import { BookEntity } from './book.entity';

const userFactory = Factory.define<BookEntity>(({ sequence }) => ({
  title: 'Test',
  author: 'Mr xyz',
  category: BookCategory.Comedy,
  quantity: 10,
  bookId: sequence,
  bookUsers: null,
}));

const book = userFactory.build({
  title: 'Test',
  author: 'Mr xyz',
  category: BookCategory.Comedy,
  quantity: 10,
});
