import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { CurrentUser, IAuthUser } from "src/http/auth/current-user";
import { EnrollmentService } from "src/services/enrollment.service";
import { StudentService } from "src/services/student.service";
import { Student } from "../models/student";

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService
  ) { }

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: IAuthUser) {
    return await this.studentService.getByAuthUserId(user.sub)
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    return await this.studentService.getAll()
  }

  @ResolveField()
  async enrollments(@Parent() student: Student) {
    return await this.enrollmentService.getAllByStudentId(student.id)
  }

}