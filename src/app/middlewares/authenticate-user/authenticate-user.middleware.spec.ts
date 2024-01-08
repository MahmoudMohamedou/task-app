import { AuthenticateUserMiddleware } from './authenticate-user.middleware';

describe('AuthenticateUserMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthenticateUserMiddleware()).toBeDefined();
  });
});
