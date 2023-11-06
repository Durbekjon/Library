import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareModule } from './middleware/middleware.module';
import { checkMiddleware } from './middleware/middleware/middleware.middleware';

@Module({
  imports: [
    AuthModule,
    BooksModule,
    CategoryModule,
    OrdersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MiddlewareModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
