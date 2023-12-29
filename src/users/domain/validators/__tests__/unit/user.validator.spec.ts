import { UserRules, UserValidator, UserValidatorFactory } from "../../user.validator"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"

let sut: UserValidator

describe('UserValidator unit tests', () => {

  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })

  it('Valid case for user validator class', () => {
    const props = UserDataBuilder({})
    const isValid = sut.validate(props)
    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRules(props))
  })

  it('Invalidation cases for name field', () => {
    let isValid = sut.validate(null as any)
    expect(isValid).toBeFalsy()
    expect(sut.erros['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 255 characters'
    ])

    isValid = sut.validate({
      ...UserDataBuilder({}),
      name: '' as any
    })
    expect(isValid).toBeFalsy()
    expect(sut.erros['name']).toStrictEqual(['name should not be empty'])

    isValid = sut.validate({
      ...UserDataBuilder({}),
      name: 10 as any
    })
    expect(isValid).toBeFalsy()
    expect(sut.erros['name']).toStrictEqual([
      'name must be a string',
      'name must be shorter than or equal to 255 characters'
    ])

    isValid = sut.validate({
      ...UserDataBuilder({}),
      name: 'a'.repeat(256) as any
    })
    expect(isValid).toBeFalsy()
    expect(sut.erros['name']).toStrictEqual([
      'name must be shorter than or equal to 255 characters'
    ])

  })

  it('Invalidation cases for email field', () => {
    let isValid = sut.validate(null as any)
    expect(isValid).toBeFalsy()
    expect(sut.erros['email']).toStrictEqual([
      'email should not be empty',
      'email must be a string',
      'email must be an email',
      'email must be shorter than or equal to 255 characters'
    ])

    isValid = sut.validate({
      ...UserDataBuilder({}),
      email: '' as any
    })
    expect(isValid).toBeFalsy()
    expect(sut.erros['email']).toStrictEqual([
      'email should not be empty',
      'email must be an email'
    ])

    isValid = sut.validate({
      ...UserDataBuilder({}),
      email: 10 as any
    })
    expect(isValid).toBeFalsy()
    expect(sut.erros['email']).toStrictEqual([
      'email must be a string',
      'email must be an email',
      'email must be shorter than or equal to 255 characters'
    ])

    isValid = sut.validate({
      ...UserDataBuilder({}),
      email: 'a'.repeat(256) as any
    })
    expect(isValid).toBeFalsy()
    expect(sut.erros['email']).toStrictEqual([
      'email must be an email',
      'email must be shorter than or equal to 255 characters'
    ])

  })

  it('Invalidation cases for password field', () => {
    let isValid = sut.validate(null as any)
    expect(isValid).toBeFalsy()
    expect(sut.erros['password']).toStrictEqual([
      'password should not be empty',
      'password must be a string',
      'password must be shorter than or equal to 100 characters'
    ])

    isValid = sut.validate({
      ...UserDataBuilder({}),
      password: '' as any
    })
    expect(isValid).toBeFalsy()
    expect(sut.erros['password']).toStrictEqual(['password should not be empty'])

    isValid = sut.validate({
      ...UserDataBuilder({}),
      password: 10 as any
    })
    expect(isValid).toBeFalsy()
    expect(sut.erros['password']).toStrictEqual([
      'password must be a string',
      'password must be shorter than or equal to 100 characters'
    ])

    isValid = sut.validate({
      ...UserDataBuilder({}),
      password: 'a'.repeat(256) as any
    })
    expect(isValid).toBeFalsy()
    expect(sut.erros['password']).toStrictEqual([
      'password must be shorter than or equal to 100 characters'
    ])

  })

})
