import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/database/prisma/prisma.service"

interface ICreatePurchaseProps {
  customerId: string
  productId: string
}

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) { }

  async getAll() {
    const list = await this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    })
    return list
  }

  async getAllByCustomerId(customerId: string) {
    const list = await this.prisma.purchase.findMany({
      where: { customerId },
      orderBy: {
        createdAt: 'desc',
      }
    })
    return list
  }

  async create({ customerId, productId }: ICreatePurchaseProps) {
    if (!await this.prisma.product.findUnique({ where: { id: productId } }))
      throw new Error('Produto não encontrado.')

    if (!await this.prisma.customer.findUnique({ where: { id: customerId } }))
      throw new Error('Cliente não encontrado')

    return await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    })

  }

}