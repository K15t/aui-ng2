import {Injectable} from 'angular2/core';

@Injectable()
export class LogService {
    log(msg: string): void {
        console.log(msg);
    }

    logError(msg: string): void {
        console.error(msg);
    }

    logInfo(msg: string): void {
        console.info(msg);
    }

    logDebug(msg: string): void {
        console.debug(msg);
    }

    logWarn(msg: string): void {
        console.warn(msg);
    }

}
