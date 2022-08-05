import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) { }

  async getAll() {
    return await this.prisma.student.findMany()
  }

  async getById(id: string) {
    return await this.prisma.student.findUnique({ where: { id } })
  }

  async getByAuthUserId(authUserId: string) {
    return await this.prisma.student.findUnique({ where: { authUserId } })
  }

}