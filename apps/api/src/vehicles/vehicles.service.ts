import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Transmission, Vehicle } from './vehicle.model.js';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Vehicle[]> {
    // include traz a categoria na mesma consulta, sem N+1
    const vehicles = await this.prisma.vehicle.findMany({
      include: { category: true },
    });

    return vehicles.map((vehicle) => ({
      ...vehicle,
      dailyRate: vehicle.dailyRate.toNumber(),
      transmission: vehicle.transmission as Transmission,
    }));
  }
}
