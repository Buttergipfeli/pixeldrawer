import { Prisma } from "@prisma/client";

export class Color implements Prisma.colorCreateInput {
    color: string;

    constructor(color: string) {
        this.color = color;
    }

}