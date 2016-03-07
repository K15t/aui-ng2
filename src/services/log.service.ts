import {Injectable} from 'angular2/core';

@Injectable()
export class LogService {
    log(msg: any): void {
        console.log(msg);
    }

    logError(msg: any): void {
        console.error(msg);
    }

    logInfo(msg: any): void {
        console.info(msg);
    }

    logDebug(msg: any): void {
        console.debug(msg);
    }

    logWarn(msg: any): void {
        console.warn(msg);
    }

}
