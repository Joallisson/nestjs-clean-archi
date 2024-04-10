import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserInMemoryRepository } from "../../user-in-memory.repository"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { NotFoundError } from "@/shared/domain/errors/not-found-error"
import { ConflictError } from "@/shared/domain/errors/conflict-error copy"

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository

  beforeEach(() => {
    sut = new UserInMemoryRepository()
  })

  it('Should throw error when not found - findByEmail method', async () => {
    await expect(sut.findByEmail('a@a.com')).rejects.toThrow(
      new NotFoundError('Entity not found using email a@a.com')
    )
  })

  it('Should find an entity by email - findByEmail method', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    const result = await sut.findByEmail(entity.email)
    await expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should throw error when not found - emailExists method', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConflictError('Email address already used')
    )
  })

  it('Should not throw an error when not find an email - emailExists method', async () => {
    expect.assertions(0)
    await sut.emailExists('a@a.com')
  })

  it('Should filter name field using filter param', async () => {
    const items = [
      new UserEntity(UserDataBuilder({name: 'Test'})),
      new UserEntity(UserDataBuilder({name: 'TEST'})),
      new UserEntity(UserDataBuilder({name: 'fake'})),
    ]
    const spyFilter = jest.spyOn(items, 'filter')
    const itemsFiltered = await sut['applyFilter'](items, 'TEST')
    expect(spyFilter).toHaveBeenCalled()
    expect(itemsFiltered).toStrictEqual([items[0], items[1]])
  })
})
