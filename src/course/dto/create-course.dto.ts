import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Qaysi categoriyaga tegishliligi',
  })
  @IsUUID()
  category_id: string;

  @ApiProperty({ example: 'AAT buhgalteriya', description: 'Course nomi' })
  @IsNotEmpty()
  @IsString({ message: 'title satr bolishi kerak' })
  title: string;

  @ApiProperty({ example: 'AAT buhgalteriya', description: 'Course sub titile' })
  @IsNotEmpty()
  @IsString({ message: 'sub title satr bolishi kerak' })
  sub_title: string;


  @ApiProperty({
    example: 'Curse haqida',
    description: 'Course haqida malumotlar',
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({ example: 'image.jpeg', description: 'Course foni uchun rasm' })
  @IsOptional()
  @IsString()
  price: number;

  @ApiProperty({ example: '3', description: 'Course darajasi' })
  @IsOptional()
  @IsNumberString()
  level: number;

  @ApiProperty({ example: '66', description: 'Coursegi darslar soni' })
  @IsOptional()
  @IsNumberString()
  lessons: number;


  @ApiProperty({ example: '66', description: 'Coursegi darslar soni' })
  @IsOptional()
  image: string;


  @ApiProperty({ example: '66', description: 'Coursegi darslar soni' })
  @IsOptional()
  logo: string;

}
