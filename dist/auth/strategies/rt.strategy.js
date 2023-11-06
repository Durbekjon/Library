"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class RtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'rt-secret',
            passReqToCallback: false,
        });
    }
    validate(req, payload) {
        const refreshToken = req.get('authorization').trim();
        return {
            ...payload,
            refreshToken,
        };
    }
}
exports.RtStrategy = RtStrategy;
//# sourceMappingURL=rt.strategy.js.map