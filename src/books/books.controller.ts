import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksDto } from './dto/book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get()
  async getAll() {
    return this.booksService.getAll();
  }
  @Post('')
  async create(@Body() dto: BooksDto) {
    return this.booksService.create(dto);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: BooksDto) {
    return this.booksService.update(id, dto);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.booksService.delete(id);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000 }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }
}
