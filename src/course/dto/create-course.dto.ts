import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: '1', description: 'Qaysi categoriyaga tegishliligi' })
  @IsNumber()
  category_id: number;

  @ApiProperty({ example: 'AAT buhgalteriya', description: 'Course nomi' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Curse haqida',
    description: 'Course haqida malumotlar',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 'image.jpeg', description: 'Course foni uchun rasm' })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ example: '', description: 'Course narxi' })
  @IsOptional()
  @IsNumber()
  price: number;
}
