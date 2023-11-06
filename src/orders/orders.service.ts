import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}
  async getAll() {
    return this.prismaService.order.findMany({
      include: {
        author: true,
        book: true,
        category: true,
      },
    });
  }
  async create(dto: OrderDto) {
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
    return createdOrder; // Return the created order at the end of the function
  }

  async addMoney(money: number) {
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

  async update(id: number, dto: OrderDto) {
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
  async delete(id: number) {
    return await this.prismaService.order.delete({
      where: {
        id: Number(id),
      },
    });
  }
}

// 2
// 4
// 1
// 1
