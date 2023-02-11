import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from '../../course/entities/course.entity';
import { Modules } from '../../modules/entities/module.entity';

@Table({ tableName: 'module-test', timestamps: true, paranoid: true })
export class ModuleTests extends Model<ModuleTests> {
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

  @ApiProperty({ example: '1', description: 'Qaysi coursega tegishliligi' })
  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  course_id: string;

  @ApiProperty({ example: '1', description: 'Qaysi modulega tegishliligi' })
  @ForeignKey(() => Modules)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  module_id: string;

  @ApiProperty({
    example: 'Dasturlash nima?',
    description: 'Test savoli',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  question: string;

  @ApiProperty({ example: 'Dasturlash', description: ' Birinchi variant' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  select_first: string;

  @ApiProperty({
    example: 'Dasturlash',
    description: 'Ikkinchi variant',
  })
  @Column({
    type: DataType.STRING,
  })
  select_two: string;

  @ApiProperty({
    example: 'Dasturlash',
    description: 'Uchinchi variant',
  })
  @Column({
    type: DataType.STRING,
  })
  select_three: string;

  @ApiProperty({
    example: 'Dasturlash',
    description: "To'rtinchi variant",
  })
  @Column({
    type: DataType.STRING,
  })
  select_four: string;

  @ApiProperty({
    example: '1',
    description: "Nechinchi variant to'g'riligi",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  answer: number;
}
