import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SALT_ROUND, context } from 'config';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await hash(password, SALT_ROUND);
    const newUser = await context.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return newUser;
  }

  async findAll() {
    const users = await context.user.findMany();
    return users;
  }

  async findUserById(id: string) {
    const user = await context.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await context.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, password: true },
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    let hashedPassword;

    if (password) {
      hashedPassword = await hash(password, SALT_ROUND);
    }
    const updatedUser = await context.user.update({
      data: {
        ...updateUserDto,
        password: hashedPassword,
      },
      where: { id },
    });
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await context.user.delete({
      where: { id },
    });
    return deletedUser;
  }
}
