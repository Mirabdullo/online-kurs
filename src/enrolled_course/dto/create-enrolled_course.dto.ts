import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class CreateEnrolledCourseDto {
    @ApiProperty({example: "2", description: "Student id"})
    @IsNumber()
    student_id: number
    
    @ApiProperty({example: "2", description: "Course id"})
    @IsNumber()
    course_id: number

}
