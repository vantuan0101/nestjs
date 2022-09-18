import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class DocsDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  @IsNotEmpty()
  slug: string;
  @IsString()
  @IsNotEmpty()
  icon: string;
  @IsString()
  @IsNotEmpty()
  desc: string;
}
