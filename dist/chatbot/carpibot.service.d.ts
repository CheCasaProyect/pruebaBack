import { CarpiBotDto } from 'src/dtos/carpiBotDto';
import { CarpiBot } from 'src/entities/carpiBot.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
export declare class CarpibotService {
    private readonly carpibotRepository;
    private readonly usersRepository;
    constructor(carpibotRepository: Repository<CarpiBot>, usersRepository: Repository<User>);
    private menu;
    private initialOptions;
    private response;
    getMenu(): {
        id: string;
        text: {
            id: number;
            text: string;
        };
    }[];
    getInitialOptions(optionId: string): any;
    getResponse(optionId: string): any;
    saveChat(carpiBotDto: CarpiBotDto): Promise<CarpiBot>;
    getAllChat(): void;
}
