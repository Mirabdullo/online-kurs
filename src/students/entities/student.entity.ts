import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'student', timestamps: true, paranoid: true })
export class Student extends Model<Student> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Akmal', description: 'Studentning ismi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Studentning familiyasi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: 'akmal@gmail.com',
    description: 'Studentning emaili',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '#$H@#J@#', description: 'Studentning paroli' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;


  @ApiProperty({
    example: '039q4uriojf03fh03-rih4qefjq9rf-3pojedfq-weod-p3rj',
    description: 'Studentning hashlangan refresh tokeni',
  })
  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @ApiProperty({
    example: 'true / false',
    description: "Student ban yoki yo'qligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;
}
