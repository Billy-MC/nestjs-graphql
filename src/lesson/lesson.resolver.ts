import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((_of: LessonType) => LessonType)
export class LessonResolver {
	constructor(private lessonService: LessonService) {}

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
}
