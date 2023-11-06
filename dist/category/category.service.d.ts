import { CategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoryService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<({
        books: {
            id: number;
            book_name: string;
            prise: number;
            categoryId: number;
            authorId: number;
        }[];
    } & {
        id: number;
        name: string;
    })[]>;
    create(dto: CategoryDto): Promise<{
        id: number;
        name: string;
    }>;
    update(id: number, dto: CategoryDto): Promise<{
        id: number;
        name: string;
    }>;
    delete(id: number): Promise<string>;
}
