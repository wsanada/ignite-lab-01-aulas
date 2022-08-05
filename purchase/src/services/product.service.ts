import { Injectable } from "@nestjs/common"
import slugify from "slugify"
import { PrismaService } from "src/database/prisma/prisma.service"

interface ICreateProductProps {
  title: string
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  getAll() {
    const list = this.prisma.product.findMany()
    return list
  }

  getById(id: string) {
    const list = this.prisma.product.findUnique({
      where: {
        id,
      },
    })
    return list
  }

  async create({ title }: ICreateProductProps) {
    const slug = slugify(title, { lower: true })

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    })

    if (productWithSameSlug)
      throw new Error('Não é possível criar o produto com o mesmo slug.')

    return this.prisma.product.create({ data: { title, slug } })
  }
}