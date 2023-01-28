import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'teacher', timestamps: true, paranoid: true })
export class Teacher extends Model<Teacher> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Akmal', description: 'Teacherning ismi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Teacherning familiyasi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: 'akmal@gmail.com',
    description: 'Teacherning emaili',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '#$H@#J@#', description: 'Teacherning paroli' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: '039q4uriojf03fh03-rih4qefjq9rf-3pojedfq-weod-p3rj',
    description: 'Teacherning hashlangan refresh tokeni',
  })
  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @ApiProperty({
    example: 'true / false',
    description: "Teacher ban yoki yo'qligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
}
