const { PrismaClient } = require("@prisma/client");

const prismaClientInstance = new PrismaClient();

module.exports = prismaClientInstance;