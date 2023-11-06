"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    getAll() {
        return this.prisma.user.findMany();
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRt(user.id, tokens.refresh_token);
        return tokens;
    }
    async register(dto) {
        const password = await this.dataHasher(dto.password);
        const newUser = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password,
            },
        });
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRt(newUser.id, tokens.refresh_token);
        return tokens;
    }
    async updateRt(userId, rt) {
        try {
            const token = await this.dataHasher(rt);
            await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    refresh_token: token,
                },
            });
        }
        catch (error) {
            throw new Error('Failed to update refresh token: ' + error.message);
        }
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: {
                id: userId,
                refresh_token: {
                    not: null,
                },
            },
            data: {
                refresh_token: null,
            },
        });
        return 'Logged Out';
    }
    async getTokens(id, email) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: id,
                email,
            }, {
                secret: 'at-secret',
                expiresIn: 60 * 25,
            }),
            this.jwtService.signAsync({
                sub: id,
                email,
            }, {
                secret: 'rt-secret',
                expiresIn: 60 * 60 * 24 * 7,
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async dataHasher(data) {
        return await bcrypt.hash(data, 10);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map