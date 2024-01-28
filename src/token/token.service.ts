import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { context } from 'config';

@Injectable()
export class TokenService {
  async create(createTokenDto: CreateTokenDto) {
    return await context.token.create({
      data: createTokenDto,
    });
  }

  findAll() {
    return `This action returns all token`;
  }

  findOne(id: string) {
    return `This action returns a #${id} token`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, _updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  async remove(id: string) {
    return await context.token.delete({
      where: { id },
    });
  }

  async removeUserToken(userId: string, token: string) {
    return await context.token.delete({
      where: {
        token,
        userId,
      },
    });
  }
}
