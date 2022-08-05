
import { Injectable } from "@nestjs/common";
import slugify from "slugify";
import { PrismaService } from "src/database/prisma/prisma.service";

interface ICreateCourseArgs {
  title: string
  slug?: string
}

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) { }

  async getAll() {
    return await this.prisma.course.findMany()
  }

  async getById(id: string) {
    return await this.prisma.course.findUnique({ where: { id } })
  }

  async create({ title }: ICreateCourseArgs) {
    const slug = slugify(title, { lower: true })
    if (await this.prisma.course.findUnique({ where: { slug } }))
      throw new Error(`Não é possível criar novo curso com o mesmo slug '${slug}'.`)

    return await this.prisma.course.create({ data: { title, slug } })
  }
}