/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
export const context = new PrismaClient();

export const SALT_ROUND = 10;
