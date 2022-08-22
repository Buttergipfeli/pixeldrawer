const { PrismaClient } = require("@prisma/client");

let prismaClientInstance;

if (!global.prismaClientInstance) {
    global.prismaClientInstance = new PrismaClient();
}
prismaClientInstance = global.prismaClientInstance;

// ! Production only such a line!
// ! prismaClientInstance = new PrismaClient()

module.exports = prismaClientInstance;