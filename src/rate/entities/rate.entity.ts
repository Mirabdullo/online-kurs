import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";

@Table({tableName: "rate",timestamps: true, paranoid: true})
export class Rate extends Model<Rate> {
    @ApiProperty({example: "1", description: "Unilal id"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: "2", description: "baholagan studentning idsi"})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    student_id: number

    @ApiProperty({example: '2', description: "Kursning idsi"})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    course_id: number

    @ApiProperty({example: "5", description: "Cursga qoygan bahosi "})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    rate: number

    @ApiProperty({example: "Yaxshi kurs", description: "Kurs haqida fikri"})
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description: string

}
