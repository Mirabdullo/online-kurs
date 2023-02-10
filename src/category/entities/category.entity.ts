
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'category', timestamps: true, paranoid: true })
export class Category extends Model<Category> {
    @ApiProperty({ example: '1', description: 'Unikal id' })
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
