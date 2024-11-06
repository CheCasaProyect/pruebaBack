import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CarpibotService } from './carpibot.service';
export declare class CarpiChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly carpiBotService;
    server: Server;
    constructor(carpiBotService: CarpibotService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleOption(optionId: string, client: Socket): void;
    handleResponse(optionId: string, client: Socket): void;
}
