import { BookStatus } from '../book.status.enum';

export class SearchBookDTO {
  search: string;
  status: BookStatus;
}
