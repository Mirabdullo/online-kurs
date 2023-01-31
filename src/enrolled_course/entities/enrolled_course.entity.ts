import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "enrolled_course", timestamps: true, paranoid: true})
export class EnrolledCourse extends Model<EnrolledCourse> {
    @ApiProperty({example: "2", description: "UNikal id"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: "2", description: "Student id"})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    student_id: number

    @ApiProperty({example: "2", description: "Course id"})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    course_id: number
}
