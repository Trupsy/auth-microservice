import prisma from "../lib/prisma.js";

export class CBaseModel {
    data: any;
  prismaModel: string | undefined;
  constructor(data: any = null) {
    this.data = data ?? {};
  }

  // blank save data function for above snippet (script will be overried the function)
 
  
  private _create: Function = () => {
    if (!this.prismaModel) {
      throw new Error("Prisma model not defined");
    }
    return (prisma[this.prismaModel as any] as any).create({
        data: {
            ...this.data,
        }
    })
  }

  private _exists: Function = () => {
    if (!this.prismaModel) {
      throw new Error("Prisma model not defined");
    }
    return (prisma[this.prismaModel as any] as any).findUnique({
        where: {
            id: this.data.id,
        }
    })
  }

  private _update: Function = () => {
    if (!this.prismaModel) {
      throw new Error("Prisma model not defined");
    }
    return (prisma[this.prismaModel as any] as any).create({
        data: {
            ...this.data,
        }
    })
  }

  save: Function = () => {
    if (!this.prismaModel) {
      throw new Error("Prisma model not defined");
    }
  };
}
