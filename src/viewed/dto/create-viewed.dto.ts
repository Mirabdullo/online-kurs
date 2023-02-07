import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional } from "class-validator"

export class CreateViewedDto {
    @ApiProperty({example: '2', description: "Studentning idsi"})
    @IsNumber()
    student_id: number

    @ApiProperty({example: '2', description: "Course idsi"})
    @IsNumber()
    course_id: number

    @ApiProperty({example: '2', description: "Module idsi"})
    @IsNumber()
    module_id: number

    @ApiProperty({example: '2', description: "Lesson idsi"})
    @IsNumber()
    lesson_id: number

    @ApiProperty({example: '30%', description: "Modulni tugatgan qismi"})
    @IsOptional()
    @IsNumber()
    viewed: number

}
