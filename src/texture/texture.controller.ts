import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TextureService } from './texture.service';
import { CreateTextureDto } from './dto/create-texture.dto';
import { UpdateTextureDto } from './dto/update-texture.dto';

@Controller('texture')
export class TextureController {
  constructor(private readonly textureService: TextureService) {}

  @Post()
  create(@Body() createTextureDto: CreateTextureDto) {
    return this.textureService.create(createTextureDto);
  }

  @Get()
  findAll() {
    return this.textureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextureDto: UpdateTextureDto) {
    return this.textureService.update(+id, updateTextureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textureService.remove(+id);
  }
}
