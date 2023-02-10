import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from '../../course/entities/course.entity';
import { Lesson } from '../../lesson/entities/lesson.entity';
import { Modules } from '../../modules/entities/module.entity';
import { Student } from '../../students/entities/student.entity';

@Table({ tableName: 'viewed', timestamps: true })
export class Viewed extends Model<Viewed> {
  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Unikal id',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: '2', description: 'Studentning idsi' })
  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER,
  })
  student_id: number;

  @ApiProperty({ example: '2', description: 'Course idsi' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
  })
  course_id: number;

  @ApiProperty({ example: '2', description: 'Module idsi' })
  @ForeignKey(() => Modules)
  @Column({
    type: DataType.INTEGER,
  })
  module_id: number;

  @ApiProperty({ example: '2', description: 'Lesson idsi' })
  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.INTEGER,
  })
  lesson_id: number;

  @ApiProperty({ example: '30%', description: 'Modulni tugatgan qismi' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  viewed: number;
}
