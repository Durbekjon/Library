import { OrderDto } from './dto/order.dto';
import { OrderService } from './orders.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    getAll(): Promise<({
        book: {
            id: number;
            book_name: string;
            prise: number;
            categoryId: number;
            authorId: number;
        };
        category: {
            id: number;
            name: string;
        };
        author: {
            id: number;
            name: string;
            email: string;
            password: string;
            refresh_token: string;
        };
    } & {
        id: number;
        authorId: number;
        categoryId: number;
        bookId: number;
    })[]>;
    create(dto: OrderDto): Promise<{
        id: number;
        authorId: number;
        categoryId: number;
        bookId: number;
    }>;
    update(id: number, dto: OrderDto): Promise<{
        id: number;
        authorId: number;
        categoryId: number;
        bookId: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        authorId: number;
        categoryId: number;
        bookId: number;
    }>;
}
