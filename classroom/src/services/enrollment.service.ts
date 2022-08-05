
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

interface IGetAllByStudentIdAndCourseId {
  studentId: string
  courseId: string
}

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) { }

  async getAll() {
    return await this.prisma.enrollment.findMany(
      { where: { canceledAt: null }, orderBy: { createdAt: 'desc' } }
    )
  }

  async getAllByStudentId(studentId: string) {
    return await this.prisma.enrollment.findMany(
      { where: { studentId, canceledAt: null }, orderBy: { createdAt: 'desc' } }
    )
  }

  async getAllByStudentIdAndCourseId({ studentId, courseId }: IGetAllByStudentIdAndCourseId) {
    if (!studentId || !courseId)
      return []

    return await this.prisma.enrollment.findFirst({ where: { studentId, courseId, canceledAt: null } })
  }
}