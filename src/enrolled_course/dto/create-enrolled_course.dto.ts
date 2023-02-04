import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional } from "class-validator"

export class CreateEnrolledCourseDto {
    @ApiProperty({example: "2", description: "Student id"})
    @IsOptional()
    @IsNumber()
    student_id: number
    
    @ApiProperty({example: "2", description: "Course id"})
    @IsOptional()
    @IsNumber()
    course_id: number

}
