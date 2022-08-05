import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AuthorizationGuard } from 'src/http/auth/authorization.guard'
import { CurrentUser, IAuthUser } from 'src/http/auth/current-user'
import { CustomerService } from 'src/services/customer.service'
import { ProductService } from 'src/services/product.service'
import { PurchaseService } from 'src/services/purchase.service'
import { CreatePurchaseInput } from '../inputs/createPurchase.input'
import { Purchase } from '../models/purchase'

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private customerService: CustomerService
  ) { }

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  async purchase() {
    return await this.purchaseService.getAll()
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productService.getById(purchase.productId)
  }
  @ResolveField()
  customer(@Parent() purchase: Purchase) {
    return this.customerService.getById(purchase.customerId)
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(@Args('data') data: CreatePurchaseInput, @CurrentUser() user: IAuthUser) {
    let customer = await this.customerService.getByAuthUserId(user.sub)

    if (!customer)
      customer = await this.customerService.create({ authUserId: user.sub })

    return await this.purchaseService.create({
      productId: data.productId,
      customerId: customer.id,
    })
  }
}
