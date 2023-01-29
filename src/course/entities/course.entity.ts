import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'course', timestamps: true, paranoid: true })
export class Course extends Model<Course> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  
  @ApiProperty({ example: '1', description: 'Qaysi categoriyaga tegishliligi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;


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

  @ApiProperty({ example: '', description: 'Course narxi' })
  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  price: number;

}
