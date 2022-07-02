import { CreateStudentInput } from './create-student.input';
import { StudentType } from './student.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';

@Resolver((_of: StudentType) => StudentType)
export class StudentResolver {
	constructor(private studentService: StudentService) {}

	@Query(_returns => [StudentType])
	students() {
		return this.studentService.getStudents();
	}

	@Query(_return => StudentType)
	student(@Args('id') id: string) {
		return this.studentService.getStudentById(id);
	}

	@Mutation(_returns => StudentType)
	createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
		return this.studentService.createStudent(createStudentInput);
	}
}
