import { UseGuards } from "@nestjs/common"
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { AuthorizationGuard } from "src/http/auth/authorization.guard"
import { CurrentUser, IAuthUser } from "src/http/auth/current-user"
import { CustomerService } from "src/services/customer.service"
import { PurchaseService } from "src/services/purchase.service"
import { Customer } from "../models/customer"

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customerService: CustomerService,
    private purchaseService: PurchaseService
  ) { }

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: IAuthUser) {
    const authUserId = user.sub
    return await this.customerService.getByAuthUserId(authUserId)
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchaseService.getAllByCustomerId(customer.id)
  }
}
