import { PartialType } from '@nestjs/mapped-types';
import { CreateTextureDto } from './create-texture.dto';

export class UpdateTextureDto extends PartialType(CreateTextureDto) {}
