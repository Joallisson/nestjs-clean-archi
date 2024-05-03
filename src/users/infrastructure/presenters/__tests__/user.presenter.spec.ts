import { instanceToPlain } from "class-transformer"
import { UserPresenter } from "../user.presenter"

describe('UsersPresenter unit tests', () => {
  const createdAt =  new Date()
  const props = {
    id: '9880cfaf-b8a1-4fc0-a09e-580bec7e779c',
    name: 'John Doe',
    email: 'a@a.com',
    password: '1234',
    createdAt
  }
  let sut: UserPresenter

  beforeEach(() => {
    sut = new UserPresenter(props)
  })

  describe('constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.email).toEqual(props.email);
      expect(sut.name).toEqual(props.name);
      expect(sut.createdAt).toEqual(props.createdAt);
    })
  })

  it('should presenter data', () => {
    const output = instanceToPlain(sut)
    expect(output).toStrictEqual({
      id: '9880cfaf-b8a1-4fc0-a09e-580bec7e779c',
      name: 'John Doe',
      email: 'a@a.com',
      createdAt: createdAt.toISOString()
    })
  })

})
