import { createLogger, format, transports, type Logger as WinstonLogger } from 'winston';
import 'winston-daily-rotate-file';

const infoAndWarnFilter = format((info) => {
  return info.level === 'info' || info.level === 'warn' ? info : false;
});

const httpOnlyFilter = format((info) => {
  return info.level === 'http' ? info : false;
});

class Logger {
  private _logger?: WinstonLogger;

  info(message: string): void {
    if (!this._logger) { throw new Error('Logger not initialized!'); }

    this._logger.info(message);
  }

  http(message: string): void {
    if (!this._logger) { throw new Error('Logger not initialized!'); }

    this._logger.http(message);
  }

  error(message: unknown): void {
    if (!this._logger) { throw new Error('Logger not initialized!'); }

    this._logger.error(message);
  }

  init(): void {
    this._logger = createLogger({
      level: 'http',
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.align(),
        format.printf(({ level, message, timestamp, stack, ...meta }) => {
          return `${timestamp} ${level}: ${message}${Object.keys(meta).length ? ` - ${JSON.stringify(meta)}` : ''}${stack ? `\n${stack}` : ''}`;
        }),
      ),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: `./log/%DATE%-error.log`,
          level: 'error',
          maxSize: '20m',
          maxFiles: '14d',
          zippedArchive: true,
        }),
        new transports.DailyRotateFile({
          filename: `./log/%DATE%-info.log`,
          level: 'info',
          maxSize: '20m',
          maxFiles: '14d',
          format: format.combine(infoAndWarnFilter(), format.timestamp()),
          zippedArchive: true,
        }),
        new transports.DailyRotateFile({
          filename: `./log/%DATE%-requests.log`,
          level: 'http',
          maxSize: '20m',
          maxFiles: '14d',
          format: format.combine(httpOnlyFilter(), format.timestamp()),
          zippedArchive: true,
        }),
      ],
    });
  }
}

export default new Logger();
