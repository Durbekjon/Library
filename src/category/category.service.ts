import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll() {
    return await this.prismaService.category.findMany({
      include: {
        books: true,
        // sells: true,
      },
    });
  }
  async create(dto: CategoryDto) {
    return await this.prismaService.category.create({
      data: {
        name: dto.name,
      },
    });
  }
  async update(id: number, dto: CategoryDto) {
    return await this.prismaService.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name: dto.name,
      },
    });
  }
  async delete(id: number) {
    await this.prismaService.category.delete({
      where: {
        id: Number(id),
      },
    });
    return 'Successfully deleted';
  }
}
