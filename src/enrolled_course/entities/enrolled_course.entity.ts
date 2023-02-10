import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from '../../course/entities/course.entity';
import { Student } from '../../students/entities/student.entity';

@Table({ tableName: 'enrolled_course', timestamps: true, paranoid: true })
export class EnrolledCourse extends Model<EnrolledCourse> {
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

  @ApiProperty({ example: '2', description: 'Student id' })
  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  student_id: number;

  @ApiProperty({ example: '2', description: 'Course id' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  course_id: number;

  // @BelongsTo(() => Student)
  // student: Student

  @BelongsTo(() => Course)
  courses: Course;
}
