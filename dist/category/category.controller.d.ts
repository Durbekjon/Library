import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    index(): Promise<({
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
