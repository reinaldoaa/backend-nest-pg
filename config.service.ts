import * as fs from 'fs';
import {parse} from 'dotenv';
//import { Logger } from '@nestjs/common';

export class ConfigService {
    private readonly envConfig :{ [key:string] : string };

    constructor(){
        //const PathFileActual = __dirname + './../../.env'; 
        const isDevelopmentEnv = process.env.NODE_ENV !== "production";
        if (isDevelopmentEnv) {
            const envFilePath =   './.env'; 
            //__dirname + '/../../.env'; 
            const exitsPath = fs.existsSync(envFilePath);
            if (!exitsPath) {
                console.log('El archivo "de entorno (.env)" de entorno no existe');
                process.exit(0);
            } 
            this.envConfig = parse(fs.readFileSync(envFilePath) )
        }else{
            this.envConfig = {
                PORT : process.env.PORT,
            }
        }
        //Logger.log(`Puerto ${isDevelopmentEnv}`,'conetion');
        //Logger.log(`PathFileActual ${PathFileActual}`,'conetion');
    }
    
    get(key:string):string{
        return this.envConfig[key];
    }
}