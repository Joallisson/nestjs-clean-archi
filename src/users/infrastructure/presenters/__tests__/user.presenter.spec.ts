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

  describe('constructor', () => {
    it('should be defined', () => {
      const sut = new UserPresenter(props)
      expect(sut.id).toEqual(props.id);
      expect(sut.email).toEqual(props.email);
      expect(sut.name).toEqual(props.name);
      expect(sut.createdAt).toEqual(props.createdAt);
    })
  })

})
