import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateRateDto {
    @ApiProperty({example: "2", description: "baholagan studentning idsi"})
    @IsNumber()
    student_id: number

    @ApiProperty({example: '2', description: "Kursning idsi"})
    @IsNumber()
    course_id: number

    @ApiProperty({example: "5", description: "Cursga qoygan bahosi "})
    @IsNumber()
    rate: number

    @ApiProperty({example: "Yaxshi kurs", description: "Kurs haqida fikri"})
    @IsOptional()
    @IsString()
    description: string
}
