import { CreateItemDto, UpdateItemDto } from "@app/shared/types";
import { Injectable, Logger } from "@nestjs/common";
import { Cpu } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class CpuService {
  private logger = new Logger(CpuService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const cpus = await this.prismaService.cpu.findMany({
      select: {
        id: true,
        model: true,
        manufacturerCode: true,
        createdAt: true,
        updatedAt: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return cpus;
  }

  async getById(id: string) {
    const cpu: Cpu = await this.prismaService.cpu
      .findUnique({
        where: { id },
      })
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    return cpu;
  }

  async getByModel(model: string) {
    const cpu: Cpu = await this.prismaService.cpu
      .findUnique({
        where: { model },
      })
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    return cpu;
  }

  async getByManufacturerCode(manufacturerCode: string) {
    const cpu: Cpu = await this.prismaService.cpu
      .findUnique({
        where: { manufacturerCode },
      })
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    return cpu;
  }

  async create(dto: CreateItemDto) {
    const cpu: Cpu = await this.prismaService.cpu
      .create({
        data: {
          ...dto,
        },
      })
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    return cpu;
  }

  async update(id: string, dto: UpdateItemDto) {
    const cpu: Cpu = await this.prismaService.cpu
      .update({
        where: { id },
        data: {
          ...dto,
        },
      })
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    return cpu;
  }

  async delete(id: string) {
    await this.prismaService.cpu
      .delete({
        where: { id },
      })
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    return id;
  }
}
