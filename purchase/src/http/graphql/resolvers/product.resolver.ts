import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductService } from 'src/services/product.service';
import { CreateProductInput } from '../inputs/createProduct.input';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) { }

  @Query(() => [Product])
  //@UseGuards(AuthorizationGuard)
  async product() {
    return await this.productService.getAll();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  async createProduct(@Args('data') data: CreateProductInput) {
    return await this.productService.create(data);
  }
}
