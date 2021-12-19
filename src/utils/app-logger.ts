import * as LOGGER from 'logger';
// TODO:- replace logger with simple-node-logger
// https://www.npmjs.com/package/simple-node-logger
import { LoggerLevels, StageType } from '../models/enums/enums';
import {ENV} from '../helper/evn-variables';

export class AppLogger {
  public static logger = LOGGER.createLogger('systemlogs.log');
  public static level: LoggerLevels;

  public static debug(...args: any) {
    this.checkLogLevel();
    this.logger.debug(args);
    if (this.level === LoggerLevels.Debug) {
      console.debug('\u001b[' + 32 + 'm' + '[DEBUG] >>>>>' + '\u001b[0m', args, '\n');
    }
  }

  public static info(...args: any) {
    this.checkLogLevel();
    this.logger.info(args);
    if (this.level === LoggerLevels.Debug) {
      console.info('\u001b[' + 93 + 'm' + '[INFO] >>>>>' + '\u001b[0m', args, '\n');
    }
  }

  public static warn(...args: any) {
    this.checkLogLevel();
    this.logger.warn(args);
    if (this.level === LoggerLevels.Debug) {
      console.warn('\u001b[' + 93 + 'm' + '[WARNING] >>>>>' + '\u001b[0m', args, '\n');
    }
  }

  public static error(...args: any) {
    this.checkLogLevel();
    this.logger.error(args);
    if (this.level === LoggerLevels.Debug) {
      console.error('\u001b[' + 31 + 'm' + '[ERROR] >>>>>' + '\u001b[0m', args, '\n');
    }
  }

  public static fatal(...args: any) {
    this.checkLogLevel();
    this.logger.fatal(args);
    if (this.level === LoggerLevels.Debug) {
      console.error('\u001b[' + 31 + 'm' + '[FATAL][ERROR] >>>>>' + '\u001b[0m', args, '\n');
    }
  }

  public static checkLogLevel() {
    if (!this.level) {
      if (ENV.ENABLE_LOGGING == 'true' || ENV.STAGE_TYPE == StageType.Development) {
        this.level = LoggerLevels.Debug;
      } else if (ENV.STAGE_TYPE == StageType.Testing) {
        this.level = LoggerLevels.Info;
      } else if (ENV.STAGE_TYPE == StageType.Production) {
        this.level = LoggerLevels.Error;
      }
      this.logger.setLevel(this.level);
    }
  }
}
