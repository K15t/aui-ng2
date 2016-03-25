import {Injectable} from 'angular2/core';

export class LogLevel {
    static ERROR: number = 3;
    static WARN: number = 2;
    static INFO: number = 1;
    static DEBUG: number = 0;
}

@Injectable()
export class LogService {

    private logLevel: number = LogLevel.WARN;

    setLogLevel(level: number) {
        this.logLevel = level;
    }

    log(msg: any): void {
        if (this.logLevel >= LogLevel.INFO) {
            console.log(msg);
        }
    }

    logError(msg: any): void {
        if (this.logLevel >= LogLevel.ERROR) {
            console.error(msg);
        }
    }

    logInfo(msg: any): void {
        if (this.logLevel >= LogLevel.INFO) {
            console.info(msg);
        }
    }

    logDebug(msg: any): void {
        if (this.logLevel >= LogLevel.DEBUG) {
            console.debug(msg);
        }
    }

    logWarn(msg: any): void {
        if (this.logLevel >= LogLevel.WARN) {
            console.warn(msg);
        }
    }

}
