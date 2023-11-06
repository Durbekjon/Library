/// <reference types="multer" />
import { BooksService } from './books.service';
import { BooksDto } from './dto/book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    getAll(): Promise<{
        id: number;
        total_price: number;
    }>;
    create(dto: BooksDto): Promise<void>;
    update(id: number, dto: BooksDto): Promise<{
        id: number;
        book_name: string;
        prise: number;
        categoryId: number;
        authorId: number;
    }>;
    delete(id: number): Promise<string>;
    uploadFile(file: Express.Multer.File): Promise<Express.Multer.File>;
}
