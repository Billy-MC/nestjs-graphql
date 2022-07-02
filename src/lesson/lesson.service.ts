import { CreateLessonInput } from './lesson.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
	constructor(
		@InjectRepository(Lesson)
		private lessonRepository: Repository<Lesson>
	) {}

	async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
		const { name, startDate, endDate, students } = createLessonInput;
		const lesson = this.lessonRepository.create({
			id: uuid(),
			name,
			startDate,
			endDate,
			students,
		});
		return await this.lessonRepository.save(lesson);
	}

	async getLessonById(id: string): Promise<Lesson> {
		return this.lessonRepository.findOne({ where: { id } });
	}

	async getLessons(): Promise<Lesson[]> {
		return this.lessonRepository.find();
	}

	async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
		const lesson = await this.lessonRepository.findOne({ where: { id: lessonId } });
		lesson.students = [...lesson.students, ...studentIds];
		return await this.lessonRepository.save(lesson);
	}
}
