import { UserOutput } from '@/users/application/dtos/user-output';
import { UsersController } from '../../users.controller';
import { SignupUseCase } from '@/users/application/usecases/signup.usecase';
import { SignupDto } from '../../dtos/signup.dto';
import { SigninUseCase } from '@/users/application/usecases/signin.usecase';
import { SigninDto } from '../../dtos/signin.dto';
import { UpdateUserUseCase } from '@/users/application/usecases/update-user.usecase';
import { UpdateUserDto } from '../../dtos/update-user.dto';

describe('UsersController unit tests', () => {
  let sut: UsersController
  let id: string
  let props: UserOutput

  beforeEach(async () => {
    sut = new UsersController()
    id = 'fa6976c8-6085-49cc-857b-6ac4e6cead34'
    props = {
      id,
      name: 'John Doe',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date()
    }
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a user', async () => {
    const output: SignupUseCase.Output = props
    const mockSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    }
    sut['signupUseCase'] = mockSignupUseCase as any
    const input: SignupDto = {
      name: 'John Doe',
      email: 'a@a.com',
      password: '1234',
    }
    const result = await sut.create(input)
    expect(output).toStrictEqual(result);
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input)
  });

  it('should update a user', async () => {
    const output: UpdateUserUseCase.Output = props
    const mockUpdateUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    }
    sut['updateUserUseCase'] = mockUpdateUserUseCase as any
    const input: UpdateUserDto = {
      name: 'New name',
    }
    const result = await sut.update(id, input)
    expect(output).toStrictEqual(result);
    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({id, ...input})
  });


});
