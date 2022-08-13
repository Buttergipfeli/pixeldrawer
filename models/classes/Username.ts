import { Prisma } from "@prisma/client";

export class Username implements Prisma.usernameCreateInput {
    username: string;

    constructor(username: string) {
        this.username = username;
    }
}