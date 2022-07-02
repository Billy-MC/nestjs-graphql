import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
	@Field(_type => ID)
	@IsUUID()
	lessonId: string;

	@Field(_type => [ID])
	@IsUUID('4', { each: true })
	studentIds: string[];
}
