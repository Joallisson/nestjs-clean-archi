import { instanceToPlain } from "class-transformer"
import { UserCollectionPresenter, UserPresenter } from "../../user.presenter"
import { PaginationPresenter } from "@/shared/infrastructure/presenters/pagination.presenter"

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

describe('UserCollectionPresenter unit tests', () => {
  const createdAt =  new Date()
  const props = {
    id: '9880cfaf-b8a1-4fc0-a09e-580bec7e779c',
    name: 'John Doe',
    email: 'a@a.com',
    password: '1234',
    createdAt
  }

  describe('constructor', () => {
    it('should set values', () => {
      const sut = new UserCollectionPresenter({
        items: [props],
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1
      })
      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
      expect(sut.meta).toStrictEqual(
        new PaginationPresenter({
          currentPage: 1,
          perPage: 2,
          lastPage: 1,
          total: 1
        })
      );
      expect(sut.data).toStrictEqual([new UserPresenter(props)]);
    })
  })

  it('should presenter data', () => {
    let sut = new UserCollectionPresenter({
      items: [props],
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
      total: 1
    })
    let output = instanceToPlain(sut)
    expect(output).toStrictEqual({
      data: [
        {
          id: '9880cfaf-b8a1-4fc0-a09e-580bec7e779c',
          name: 'John Doe',
          email: 'a@a.com',
          createdAt: createdAt.toISOString()
        }
      ],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1
      }
    })

    sut = new UserCollectionPresenter({
      items: [props],
      currentPage: '1' as any,
      perPage: '2' as any,
      lastPage: '1' as any,
      total: '1' as any
    })
    output = instanceToPlain(sut)
    expect(output).toStrictEqual({
      data: [
        {
          id: '9880cfaf-b8a1-4fc0-a09e-580bec7e779c',
          name: 'John Doe',
          email: 'a@a.com',
          createdAt: createdAt.toISOString()
        }
      ],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1
      }
    })
  })

})
