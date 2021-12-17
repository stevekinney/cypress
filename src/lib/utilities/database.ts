import Prisma, * as PrismaAll from '@prisma/client';

const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient;

export let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
