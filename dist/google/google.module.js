"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleModule = void 0;
const common_1 = require("@nestjs/common");
const google_service_1 = require("./google.service");
const google_controller_1 = require("./google.controller");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const passport_1 = require("@nestjs/passport");
const user_repository_1 = require("../user/user.repository");
const user_module_1 = require("../user/user.module");
const property_module_1 = require("../property/property.module");
const reservations_module_1 = require("../reservations/reservations.module");
let GoogleModule = class GoogleModule {
};
exports.GoogleModule = GoogleModule;
exports.GoogleModule = GoogleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_entity_1.User]),
            user_module_1.UserModule,
            property_module_1.PropertyModule,
            reservations_module_1.ReservationsModule,
            passport_1.PassportModule.register({
                defaultStrategy: 'google',
                session: false,
            }),
        ],
        providers: [google_service_1.GoogleService, user_repository_1.UserRepository],
        controllers: [google_controller_1.GoogleController]
    })
], GoogleModule);
//# sourceMappingURL=google.module.js.map