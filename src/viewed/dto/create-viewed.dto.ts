import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional } from "class-validator"

export class CreateViewedDto {
    @ApiProperty({example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: "Studentning idsi"})
    @IsNumber()
    student_id: string

    @ApiProperty({example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: "Course idsi"})
    @IsNumber()
    course_id: string

    @ApiProperty({example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: "Module idsi"})
    @IsNumber()
    module_id: string

    @ApiProperty({example: '173ef952-79bb-489d-9cfc-62db0d8114b4', description: "Lesson idsi"})
    @IsNumber()
    lesson_id: string

    @ApiProperty({example: '30%', description: "Modulni tugatgan qismi"})
    @IsOptional()
    @IsNumber()
    viewed: number

}
