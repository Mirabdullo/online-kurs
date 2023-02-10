import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Modules } from '../../modules/entities/module.entity';

@Table({ tableName: 'lessons', timestamps: true, paranoid: true })
export class Lesson extends Model<Lesson> {
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

  @ApiProperty({ example: 'Title', description: 'title nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'Video', description: 'Video nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  video: string;

  @ApiProperty({ example: 'Description', description: 'Description nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: '52225', description: 'module_id idsi' })
  @ForeignKey(() => Modules)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  module_id: number;

  @BelongsTo(() => Modules)
  module: Modules;
}
