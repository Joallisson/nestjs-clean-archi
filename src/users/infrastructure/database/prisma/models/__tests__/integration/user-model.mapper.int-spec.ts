import { PrismaClient, User } from "@prisma/client"
import { execSync } from "node:child_process"
import { UserModelMapper } from "../../user-model.mapper"
import { ValidationError } from "@/shared/domain/errors/validation-error"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { setuptPrismaTests } from "@/shared/infrastructure/database/prisma/testing/setup-prisma-tests"


describe('UserModelMapper integration tests', () => {
  let prismaService: PrismaClient
  let props: any

  beforeAll(async () => {
    setuptPrismaTests()
    prismaService = new PrismaClient()
    await prismaService.$connect()
  })

  beforeEach(async () => {
    await prismaService.user.deleteMany()
    props = {
      id: 'a6084909-a48a-4798-ab82-b2a9422f298c',
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date(),
    }
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('should throws error when user model is invalid', async () => {
    const model: User = Object.assign(props, {name: null})
    expect(() => UserModelMapper.toEntity(model)).toThrowError(ValidationError)
  })

  it('should convert a user model to a user entity', async () => {
    const model: User = await prismaService.user.create({data: props})
    const sut = await UserModelMapper.toEntity(model)
    expect(sut).toBeInstanceOf(UserEntity)
    expect(sut.toJSON()).toStrictEqual(props)
  })
})
