import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { CourseService } from "src/services/course.service";
import { EnrollmentService } from "src/services/enrollment.service";
import { StudentService } from "src/services/student.service";
import { Enrollment } from "../models/enrollment";

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService
  ) { }

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  async enrollments() {
    return await this.enrollmentService.getAll()
  }

  @ResolveField()
  async student(@Parent() enrollment: Enrollment) {
    return await this.studentService.getById(enrollment.studentId)
  }

  @ResolveField()
  async course(@Parent() enrollment: Enrollment) {
    return await this.courseService.getById(enrollment.courseId)
  }

}