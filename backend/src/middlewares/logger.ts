import expressWinston from 'express-winston';
import winston from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';
import crypto from 'crypto';
import { setupAWSConfig } from './aws';

const options = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
};

if (process.env.NODE_ENV === 'production') {
  setupAWSConfig();

  const startTime = new Date().toISOString();

  winston.add(
    new WinstonCloudwatch({
      logGroupName: process.env.APP_NAME,
      logStreamName: () => {
        const date = new Date().toISOString().split('T')[0];
        const reference = crypto
          .createHash('md5')
          .update(startTime)
          .digest('hex');
        return `express-server-${date}-${reference}`;
      },
      awsRegion: process.env.AWS_REGION,
      jsonMessage: true,
    }),
  );
}

export const logger = winston.createLogger(options);

export const appLogger = expressWinston.logger(options);

export const errorLogger = expressWinston.errorLogger(options);
