import dotenv from 'dotenv';

dotenv.config();

export const IS_DEV = process.env.ENVIRONMENT === "DEV";
export const IS_TEST = process.env.NODE_ENV === "test";

export const BASE_URL = process.env.BASE_URL as string;

export const CRAWLER_PORT = process.env.CRAWLER_PORT as string;