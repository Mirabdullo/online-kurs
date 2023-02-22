import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../../category/entities/category.entity';

@Table({ tableName: 'course', timestamps: true, paranoid: true })
export class Course extends Model<Course> {

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

  @ApiProperty({ example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: 'Qaysi categoriyaga tegishliligi' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  category_id: string;

  @ApiProperty({ example: 'AAT buhgalteriya', description: 'Course nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Curse haqida',
    description: 'Course haqida malumotlar',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: 'image.jpeg', description: 'Course foni uchun rasm' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ApiProperty({ example: 'image.jpeg', description: 'Course foni uchun rasm' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  logo: string;

  @ApiProperty({ example: '', description: 'Course narxi' })
  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  price: number;

  @BelongsTo(() => Category)
  category: Category;
}
