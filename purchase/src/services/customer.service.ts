import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/database/prisma/prisma.service"

interface ICreateCustomerArgs {
  authUserId: string
}

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) { }

  async getAll() {
    const list = await this.prisma.customer.findMany()
    return list
  }

  async getById(id: string) {
    const item = await this.prisma.customer.findUnique({ where: { id } })
    return item
  }

  async getByAuthUserId(authUserId: string) {
    const item = await this.prisma.customer.findUnique({ where: { authUserId } })
    return item
  }

  async create({ authUserId }: ICreateCustomerArgs) {
    if (!this.getByAuthUserId(authUserId))
      throw new Error('Não é possível criar um cliente com o mesmo authUserId.')

    return this.prisma.customer.create({ data: { authUserId } })
  }
}