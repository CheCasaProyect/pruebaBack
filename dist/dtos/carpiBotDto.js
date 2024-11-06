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
exports.CarpiBotDto = void 0;
const class_validator_1 = require("class-validator");
class CarpiBotDto {
}
exports.CarpiBotDto = CarpiBotDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CarpiBotDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CarpiBotDto.prototype, "chat", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CarpiBotDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CarpiBotDto.prototype, "userId", void 0);
//# sourceMappingURL=carpiBotDto.js.map