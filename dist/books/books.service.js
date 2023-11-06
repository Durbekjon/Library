"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
let BooksService = class BooksService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async getAll() {
        return await this.prisma.cash.findFirst({
            where: {
                id: 1,
            },
        });
    }
    async create(dto) {
        try {
            await this.prisma.book.create({
                data: {
                    book_name: dto.book_name,
                    prise: dto.prise,
                    author: {
                        connect: {
                            id: Number(dto.authorId),
                        },
                    },
                    category: {
                        connect: {
                            id: Number(dto.categoryId),
                        },
                    },
                },
            });
            console.log(Number(dto.prise));
        }
        catch (error) {
            throw new Error(`Error creating a book: ${error.message}`);
        }
    }
    async update(id, dto) {
        try {
            const updatedBook = await this.prisma.book.update({
                where: {
                    id: Number(id),
                },
                data: {
                    book_name: dto.book_name,
                    author: {
                        connect: {
                            id: Number(dto.authorId),
                        },
                    },
                    category: {
                        connect: {
                            id: Number(dto.categoryId),
                        },
                    },
                    prise: Number(dto.prise),
                },
            });
            return updatedBook;
        }
        catch (error) {
            throw new Error(`Error updating ${dto.book_name}  book: ${error.message}`);
        }
    }
    async delete(id) {
        await this.prisma.book.delete({
            where: {
                id: Number(id),
            },
        });
        return 'Successfully deleted';
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], BooksService);
//# sourceMappingURL=books.service.js.map