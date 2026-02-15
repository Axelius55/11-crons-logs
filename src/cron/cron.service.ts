import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class CronService {

    constructor(
        private readonly schedulerRegistry: SchedulerRegistry
    ){}

    @Cron('*/10 * * * * *', {
        name: 'cron1'
    })
    cron1(){
        console.log("cron 1 acción cada 10 seg");
    }

    
    @Cron('*/30 * * * * *', {
        name: 'cron2'
    })
    cron2(){
        console.log("cron 2 cada 30 seg");
    }

    
    @Cron('* * * * *', {
        name: 'cron3'
    })
    cron3(){
        console.log("cron 3 cada minuto");
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
