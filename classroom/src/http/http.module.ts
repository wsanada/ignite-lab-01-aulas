import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import path from 'path'
import { DatabaseModule } from 'src/database/database.module'
import { CourseService } from 'src/services/course.service'
import { EnrollmentService } from 'src/services/enrollment.service'
import { StudentService } from 'src/services/student.service'
import { CourseResolver } from './graphql/resolvers/couse.resolver'
import { EnrollmentResolver } from './graphql/resolvers/enrollment.resolver'
import { StudentResolver } from './graphql/resolvers/student.resolver'

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
    StudentResolver,
    CourseResolver,
    EnrollmentResolver,

    /* services */
    StudentService,
    CourseService,
    EnrollmentService,
  ],
})
export class HttpModule { }
