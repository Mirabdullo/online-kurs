
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateCourseHighlightDto {
  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Student id',
  })
  @IsOptional()
  @IsUUID()
  course_id: string;

  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Course id',
  })
  @IsOptional()
  @IsUUID()
  highlight_id: string;
}
