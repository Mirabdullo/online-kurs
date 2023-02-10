import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'admin', timestamps: true, paranoid: true })
export class Admin extends Model<Admin> {
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

  @ApiProperty({ example: 'Akmal', description: 'Adminning ismi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Karimov', description: 'Adminning familiyasi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: 'akmal@gmail.com',
    description: 'Adminning emaili',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '#$H@#J@#', description: 'Adminning paroli' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: '039q4uriojf03fh03-rih4qefjq9rf-3pojedfq-weod-p3rj',
    description: 'Adminning hashlangan refresh tokeni',
  })
  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @ApiProperty({
    example: 'true / false',
    description: "Admin ban yoki yo'qligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'true / false',
    description: "Admin creator yoki yo'qligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;
}
