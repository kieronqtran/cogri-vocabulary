import _ from 'lodash';
import * as chalk from 'chalk';
import { Logger, LoggerOptions, createLogger, transports } from 'winston';
import * as PrettyError from 'pretty-error';

const defaultOptions: LoggerOptions = {
  transports: [
    new transports.File({
      filename: process.env.LOG_FILE || 'app.dev.log',
    }),
  ],
};

export class LoggerService {
  private static prevTimestamp?: number;
  private constructor(private context: string, options: LoggerOptions) {
    this.logger = createLogger(options);
    this.prettyError.skipNodeFiles();
    this.prettyError.skipPackage('express', '@nestjs/common', '@nestjs/core');
  }

	get Logger(): Logger {
    return this.logger; // idk why i have this in my code !
  }

	private readonly logger: Logger;
  private readonly prettyError = new PrettyError();

  static createLogger(context: string, options = defaultOptions) {
    return new LoggerService(context, options);
  }

  log(message: string): void {
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formatedLog('info', message);
  }

  error(message: string, trace?: any): void {
    const currentDate = new Date();
    // i think the trace should be JSON Stringified
    this.logger.error(`${message} -> (${trace || 'trace not provided !'})`, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formatedLog('error', message, trace);
  }

  warn(message: string): void {
    const currentDate = new Date();
    this.logger.warn(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.formatedLog('warn', message);
  }

  overrideOptions(options: LoggerOptions) {
    this.logger.configure(options);
  }

  // this method just for printing a cool log in your terminal , using chalk
  private formatedLog(level: string, message: string, error?): void {
    const result = this.formatLog(level, message, error);
    const timeStamp = ` +${Date.now() - LoggerService.prevTimestamp}ms`;
    process.stdout.write(result);
    if (LoggerService.prevTimestamp) {
      process.stdout.write(timeStamp);
    }
    LoggerService.prevTimestamp = Date.now();
    process.stdout.write('\n');
  }

  private formatLog(logLevel: string, message: string, error?) {
    const color = chalk.default;
    const currentDate = new Date();
    const time = `${currentDate.toISOString()}`;
    const printTime = color.dim.yellow.bold.underline(time);
    // prettier-ignore
    const context = `${printTime} [${process.pid}] [${color.green(this.context)}]`;
    switch (logLevel) {
      case 'info':
        return `[${color.blue('INFO')}] ${context} ${message}`;
      case 'error':
        let trace = '';
        if (error && process.env.NODE_ENV === 'dev') {
          trace = this.prettyError.render(error, true);
        }
        // prettier-ignore
        return `[${color.red('ERR')}] ${context} ${message} ${trace}`;
      case 'warn':
        return `[${color.yellow('WARN')}] ${context} ${message}`;
      default:
        break;
    }
  }
}
