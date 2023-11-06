import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BooksDto } from './dto/book.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BooksService {
  // private readonly s3Client = new S3Client({
  //   region: this.configService.getOrThrow('AWS_S3_REGION'),
  // });
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getAll() {
    return await this.prisma.cash.findFirst({
      where: {
        id: 1,
      },
    });
    // await this.prisma.book.findMany({
    //   include: {
    //     category: true,
    //     author: true,
    //   },
    // });
  }
  async create(dto: BooksDto) {
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
    } catch (error) {
      throw new Error(`Error creating a book: ${error.message}`);
    }
  }

  async update(id: number, dto: BooksDto) {
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
    } catch (error) {
      throw new Error(
        `Error updating ${dto.book_name}  book: ${error.message}`,
      );
    }
  }

  async delete(id: number) {
    await this.prisma.book.delete({
      where: {
        id: Number(id),
      },
    });
    return 'Successfully deleted';
  }
}
