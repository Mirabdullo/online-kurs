import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'admin', timestamps: true, paranoid: true })
export class ModuleTests extends Model<ModuleTests> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Qaysi coursega tegishliligi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  course_id: number;

  @ApiProperty({ example: '1', description: 'Qaysi modulega tegishliligi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  module_id: number;

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
    description: "Uchinchi variant",
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
