import Prisma, * as PrismaAll from '@prisma/client';

const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient;

export const prisma = new PrismaClient();
