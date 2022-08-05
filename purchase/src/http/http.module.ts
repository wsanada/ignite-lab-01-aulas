import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import path from 'path'
import { DatabaseModule } from 'src/database/database.module'
import { CustomerResolver } from './graphql/resolvers/customer.resolver'
import { ProductResolver } from './graphql/resolvers/product.resolver'
import { PurchaseResolver } from './graphql/resolvers/purchase.resolver'
import { CustomerService } from 'src/services/customer.service'
import { ProductService } from 'src/services/product.service'
import { PurchaseService } from 'src/services/purchase.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')
    })],
  providers: [
    /* resolvers */
    ProductResolver,
    PurchaseResolver,
    CustomerResolver,

    /* services */
    ProductService,
    PurchaseService,
    CustomerService,
  ],
})
export class HttpModule { }
