
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateLessonDto {
    @ApiProperty({ example: 'lesson', description: 'Title nomi' })
    @IsNotEmpty()
    @IsString({ message: "title must be a string" })
    title: string


    @ApiProperty({ example: 'Video', description: 'Videoning nomi' })
    @IsNotEmpty()
    @IsString({ message: "video must be a string" })
    video: string


    @ApiProperty({ example: 'description', description: 'description nomi' })
    @IsString({ message: "description must be a string" })
    description: string


    @ApiProperty({ example: '155', description: 'Module idsi' })
    @IsNotEmpty()
    @IsUUID()
    module_id: string

    @ApiProperty({ example: 'Rasm', description: 'rasm nomi' })
    @IsNotEmpty()
    @IsString({ message: "image must be a number" })
    image: string
}
