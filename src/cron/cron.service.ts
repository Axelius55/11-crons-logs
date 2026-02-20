import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class CronService {

    constructor(
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly loggerService: LoggerService
    ){}

    @Cron('*/10 * * * * *', {
        name: 'cron1'
    })
    cron1(){
        //this.loggerService.log("cron 1 acción cada 10 seg");
        console.log("cron 1 acción cada 10 seg");
    }

    
    @Cron('*/30 * * * * *', {
        name: 'cron2'
    })
    cron2(){
        // this.loggerService.error("cron 2 cada 30 seg");
        console.error("cron 2 cada 30 seg");
    }

    
    @Cron('* * * * *', {
        name: 'cron3'
    })
    cron3(){
        //this.loggerService.warn("cron 3 cada minuto");
        console.warn("cron 3 cada minuto");
    }

    stopCron(name: string){
        const job: CronJob = this.schedulerRegistry.getCronJob(name);
        if(!job){
            throw new NotFoundException(`No se encontró el cron con el nombre ${name}`);
        }else{
            job.stop();
            return `Cron ${name} detenido`;
        }
    }

    activateCron(name: string){
        const job: CronJob = this.schedulerRegistry.getCronJob(name);
        if(!job){
            throw new NotFoundException(`No se encontró el cron con el nombre ${name}`);
        }else{
            job.start();
            return `Cron ${name} arrancado`;
        }
    }

    getNameCrons(){
        const names: string[]= [];
        for (const element of this.schedulerRegistry.getCronJobs().keys()) {
            names.push(element);
        }
        return names;
    }

    desactivateAllCrons(){
        const names = this.getNameCrons();

        for (const name of names) {
            this.stopCron(name);
        }
        return 'Todos los crons desactivados';
    }

    activateAllCrons(){
        const names = this.getNameCrons();

        for (const name of names) {
            this.activateCron(name);
        }
        return 'Todos los crons activados';
    }
}
