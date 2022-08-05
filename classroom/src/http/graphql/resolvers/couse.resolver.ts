import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { CurrentUser, IAuthUser } from "src/http/auth/current-user";
import { CourseService } from "src/services/course.service";
import { EnrollmentService } from "src/services/enrollment.service";
import { StudentService } from "src/services/student.service";
import { CreateCourseInput } from "../inputs/create-couse-input";
import { Course } from "../models/course";

@Resolver(() => Course)
export class CourseResolver {

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private studentService: StudentService
  ) { }

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async courses() {
    return await this.courseService.getAll()
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: IAuthUser) {
    const student = await this.studentService.getByAuthUserId(user.sub)

    if (!student)
      throw new Error('Não foi possível encontrar o estudante com o usuário corrente')

    const enrollment = await this.enrollmentService.getAllByStudentIdAndCourseId(
      { studentId: student.id, courseId: id }
    )

    if (!enrollment)
      throw new UnauthorizedException()

    return await this.courseService.getById(id)
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  async createCourse(@Args('data') data: CreateCourseInput) {
    return await this.courseService.create(data)
  }
}