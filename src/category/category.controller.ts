import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
@UsePipes(new ValidationPipe())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async index() {
    return this.categoryService.getAll();
  }
  @Post()
  async create(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CategoryDto) {
    return this.categoryService.update(id, dto);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
