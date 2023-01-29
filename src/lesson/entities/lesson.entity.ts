import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'category', timestamps: true, paranoid: true })
export class Lesson extends Model<Lesson> {
    static image(image: any) {
      throw new Error('Method not implemented.');
    }
    @ApiProperty({ example: '1', description: 'Unikal id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

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
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    module_id: number;

    @ApiProperty({ example: 'Image', description: 'Image nomi' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image: string;

}
