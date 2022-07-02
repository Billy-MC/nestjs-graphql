import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { Student } from './student.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Student])],
	providers: [StudentService, StudentResolver],
	exports: [StudentService],
})
export class StudentModule {}
