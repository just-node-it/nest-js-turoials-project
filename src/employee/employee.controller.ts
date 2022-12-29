import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Employee } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findEmployees(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findEmployee(
    @Param('id', ParseIntPipe) employeeId: number,
  ): Promise<Employee> {
    return this.employeeService.findOne(employeeId);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createEmployee(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteEmployee(@Param('id', ParseIntPipe) employeeId: number) {
    return this.employeeService.delete(employeeId);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateEmployee(
    @Param('id', ParseIntPipe) employeeId: number,
    @Body() dto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(employeeId, dto);
  }
}
