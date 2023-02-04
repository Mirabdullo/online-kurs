import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateModuleDto {
    @ApiProperty({ example: '1', description: 'Course id' })
    @IsNumber()
    course_id: number;

    @ApiProperty({ example: 'Title', description: 'title nomi' })
    @IsNotEmpty()
    @IsString()
    title: string;


    @ApiProperty({ example: 'Description', description: 'Description nomi' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'image.jpeg', description: 'Image module' })
    @IsOptional()
    @IsString()
    image: string;

}
