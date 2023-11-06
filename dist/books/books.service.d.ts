import { PrismaService } from 'src/prisma/prisma.service';
import { BooksDto } from './dto/book.dto';
import { ConfigService } from '@nestjs/config';
export declare class BooksService {
    private prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
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
}
