import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: 'Matematika', description: 'Course nomi' })
    @IsNotEmpty()
    @IsString()
    category_name: string;
}
