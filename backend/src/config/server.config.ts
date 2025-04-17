import { config } from 'dotenv';

config();

const SERVER_PORT = process.env.SERVER_PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  port: SERVER_PORT,
  environment: NODE_ENV,
};