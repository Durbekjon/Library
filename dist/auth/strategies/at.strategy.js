"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class AtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'at-secret',
        });
    }
    validate(payload) {
        return payload;
    }
}
exports.AtStrategy = AtStrategy;
//# sourceMappingURL=at.strategy.js.map