import prisma from "./external/prismaClient";
import StartUp from "./api/startUp";

const prismaConnection = prisma;

new StartUp(prismaConnection);
