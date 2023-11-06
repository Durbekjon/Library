import { IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  author: number;
  @IsNotEmpty()
  book: number;
  @IsNotEmpty()
  category: number;
  
}
