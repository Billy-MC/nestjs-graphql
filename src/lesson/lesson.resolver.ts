import { Query, Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import { AssignStudentsToLessonInput } from './assign-student-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver((_of: LessonType) => LessonType)
export class LessonResolver {
	constructor(private lessonService: LessonService, private studentService: StudentService) {}

	@Query(_returns => LessonType)
	lesson(@Args('id') id: string) {
		return this.lessonService.getLessonById(id);
	}

	@Query(_returns => [LessonType])
	lessons() {
		return this.lessonService.getLessons();
	}

	@Mutation(_returns => LessonType)
	createLesson(
		@Args('createLessonInput') createLessonInput: CreateLessonInput
	): Promise<LessonType> {
		return this.lessonService.createLesson(createLessonInput);
	}

	@Mutation(_returns => LessonType)
	assignStudentsToLesson(
		@Args('assignStudentsToLessonInput')
		assignStudentsToLessonInput: AssignStudentsToLessonInput
	) {
		const { lessonId, studentIds } = assignStudentsToLessonInput;
		return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
	}

	@ResolveField()
	async students(@Parent() lesson: Lesson) {
		return this.studentService.getManyStudents(lesson.students);
	}
}
