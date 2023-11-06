"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const books_module_1 = require("./books/books.module");
const category_module_1 = require("./category/category.module");
const orders_module_1 = require("./orders/orders.module");
const config_1 = require("@nestjs/config");
const middleware_module_1 = require("./middleware/middleware.module");
const middleware_middleware_1 = require("./middleware/middleware/middleware.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(middleware_middleware_1.checkMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            books_module_1.BooksModule,
            category_module_1.CategoryModule,
            orders_module_1.OrdersModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            middleware_module_1.MiddlewareModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map