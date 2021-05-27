import mongoose from 'mongoose';
import { logger } from './middlewares/logger';

const mongoURL = process.env.MONGO_URL || '';

const mongoOptions = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
};

const db = mongoose.connection;

db.on('connecting', () => logger.info('Connecting to MongoDB...'));

db.on('error', (error) =>
  logger.error(`Error in MongoDB connection : ${error}`),
);
db.on('connected', () => logger.info('MongoDB connected!'));

db.once('open', async () => {
  logger.info('MongoDB connection opened!');
});

db.on('reconnected', () => logger.info('MongoDB reconnected!'));

db.on('disconnected', () => {
  logger.info('MongoDB disconnected!');
  retryConnectionAfterTimeout();
});

const MAX_ATTEMPTS = 10;
const FACTOR = 1.5;
const DEFAULT_RETRY_TIMEOUT = 5000;
const DEFAULT_ATTEMPTS = 0;

let retryTimeout = DEFAULT_RETRY_TIMEOUT;
let attempts = DEFAULT_ATTEMPTS;

const retryConnectionAfterTimeout = () => {
  if (attempts < MAX_ATTEMPTS) {
    logger.info(`Retrying connection in ${retryTimeout / 1000} seconds`);
    setTimeout(connectDatabase, retryTimeout);

    retryTimeout *= FACTOR;
    attempts++;
  } else {
    logger.info(`Max connection attempts (${MAX_ATTEMPTS}) reached!`);
  }
};

export function connectDatabase() {
  mongoose
    .connect(mongoURL, mongoOptions)
    .then(() => {
      retryTimeout = DEFAULT_RETRY_TIMEOUT;
      attempts = DEFAULT_ATTEMPTS;
    })
    .catch(() => {
      retryConnectionAfterTimeout();
    });
}
