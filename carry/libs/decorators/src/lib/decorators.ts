import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
  SetMetadata,
} from '@nestjs/common';

export const UserEmail = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = (await request.user) as Record<string, string>;

    if (!user || typeof user.email !== 'string') {
      console.error('User is not authenticated or email is missing.');
      throw new BadRequestException(
        'User is not authenticated or email is missing.'
      );
    }

    return user.email;
  }
);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
