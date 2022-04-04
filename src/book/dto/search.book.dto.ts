import { BookStatus } from '../book.enum';

export class SearchBookDTO {
  search: string;
  status: BookStatus;
}
