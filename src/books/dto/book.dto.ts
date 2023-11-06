import { IsNotEmpty } from 'class-validator';

export class BooksDto {
  id: number;
  @IsNotEmpty()
  book_name: string;
  @IsNotEmpty()
  authorId: number;
  @IsNotEmpty()
  categoryId: number;
  prise: number;
}
