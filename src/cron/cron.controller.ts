import { Controller, Get, Param, Put } from '@nestjs/common';
import { CronService } from './cron.service';


@Controller('cron')
export class CronController {

    constructor(
        private readonly cronService: CronService
    ){}

    @Put('stop/:name')
    stropCrons(@Param('name') name: string){
        return this.cronService.stopCron(name);
    }
    @Put('activate/:name')
    activeCron(@Param('name') name: string){
        return this.cronService.activateCron(name);
    }
    @Get()
    getNameCrons(){
        return this.cronService.getNameCrons();
    }
    @Put('desactivate-all-crons')
    desactivateAllCrons(){
        return this.cronService.desactivateAllCrons();
    }
    @Put('activate-all-crons')
    activateAllCrons(){
        return this.cronService.activateAllCrons();
    }

}
