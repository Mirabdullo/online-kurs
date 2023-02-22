
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
import { Highlight } from '../../highlights/entities/highlight.entity';
import { Student } from '../../students/entities/student.entity';

@Table({ tableName: 'course_highlight', timestamps: false })
export class CourseHighlight extends Model<CourseHighlight> {
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

  @ApiProperty({ example: '2', description: 'Course id' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  course_id: string;

  @ApiProperty({ example: '2', description: 'Highlight id' })
  @ForeignKey(() => Highlight)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  highlight_id: string;

  @BelongsTo(() => Highlight)
  highlights: Highlight;
}
