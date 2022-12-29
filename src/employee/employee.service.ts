import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.employee.findMany();
  }
  async findOne(employeeId: number) {
    const employee: Employee = await this.prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException();
    }
    return employee;
  }
  async create(dto: any) {
    return this.prisma.employee.create({
      data: {
        ...dto,
      },
    });
  }
  async delete(employeeId: number) {
    return this.prisma.employee.delete({
      where: {
        id: employeeId,
      },
    });
  }
  async update(employeeId: number, dto: any) {
    return this.prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        ...dto,
      },
    });
  }
}
