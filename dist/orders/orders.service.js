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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll() {
        return this.prismaService.order.findMany({
            include: {
                author: true,
                book: true,
                category: true,
            },
        });
    }
    async create(dto) {
        await this.prismaService.cash.create({
            data: {
                total_price: 0,
            },
        });
        const createdOrder = await this.prismaService.order.create({
            data: {
                author: {
                    connect: {
                        id: Number(dto.author),
                    },
                },
                book: {
                    connect: {
                        id: Number(dto.book),
                    },
                },
                category: {
                    connect: {
                        id: Number(dto.category),
                    },
                },
            },
        });
        const book = this.prismaService.book.findUnique({
            where: {
                id: Number(dto.book),
            },
        });
        await this.addMoney((await book).prise);
        return createdOrder;
    }
    async addMoney(money) {
        const beforeMoney = await this.prismaService.cash.findUnique({
            where: {
                id: 1,
            },
        });
        const multipleMoney = Number(beforeMoney.total_price) + money;
        const total_cash = await this.prismaService.cash.update({
            where: {
                id: 1,
            },
            data: {
                total_price: multipleMoney,
            },
        });
        return total_cash;
    }
    async update(id, dto) {
        return await this.prismaService.order.update({
            where: {
                id: Number(id),
            },
            data: {
                author: {
                    connect: {
                        id: Number(dto.author),
                    },
                },
                book: {
                    connect: {
                        id: Number(dto.book),
                    },
                },
                category: {
                    connect: {
                        id: Number(dto.category),
                    },
                },
            },
        });
    }
    async delete(id) {
        return await this.prismaService.order.delete({
            where: {
                id: Number(id),
            },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=orders.service.js.map