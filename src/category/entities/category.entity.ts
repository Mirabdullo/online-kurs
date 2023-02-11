
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'category', timestamps: true, paranoid: true })
export class Category extends Model<Category> {
    @ApiProperty({ example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: 'Unikal id' })
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @ApiProperty({ example: 'Matematika', description: 'Category nomi' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    category_name: string;

}
