"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMiddleware = void 0;
class checkMiddleware {
    use(req, res, next) {
        console.log(req.body);
        next();
    }
}
exports.checkMiddleware = checkMiddleware;
//# sourceMappingURL=middleware.middleware.js.map