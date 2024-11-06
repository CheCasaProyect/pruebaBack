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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarpiChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const carpibot_service_1 = require("./carpibot.service");
let CarpiChatGateway = class CarpiChatGateway {
    constructor(carpiBotService) {
        this.carpiBotService = carpiBotService;
    }
    handleConnection(client) {
        console.log('Client connect');
        client.emit('menu', this.carpiBotService.getMenu());
    }
    handleDisconnect(client) {
        console.log('Client disconnect');
    }
    handleOption(optionId, client) {
        const initialOptions = this.carpiBotService.getInitialOptions(optionId);
        client.emit('options', initialOptions);
    }
    handleResponse(optionId, client) {
        const response = this.carpiBotService.getResponse(optionId);
        client.emit('response', response);
    }
};
exports.CarpiChatGateway = CarpiChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CarpiChatGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CarpiChatGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CarpiChatGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('chooseOption'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CarpiChatGateway.prototype, "handleOption", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('response'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CarpiChatGateway.prototype, "handleResponse", null);
exports.CarpiChatGateway = CarpiChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: '/carpibot',
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
        },
    }),
    __metadata("design:paramtypes", [carpibot_service_1.CarpibotService])
], CarpiChatGateway);
//# sourceMappingURL=carpibot.gateway.js.map