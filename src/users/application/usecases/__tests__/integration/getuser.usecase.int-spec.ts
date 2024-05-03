import { DatabaseModule } from "@/shared/infrastructure/database/database.module"
import { setuptPrismaTests } from "@/shared/infrastructure/database/prisma/testing/setup-prisma-tests"
import { UserPrismaRepository } from "@/users/infrastructure/database/prisma/repositories/user-prisma.repository"
import { Test, TestingModule } from "@nestjs/testing"
import { PrismaClient } from "@prisma/client"
import { GetUserUseCase } from "../../getuser.usecase"
import { NotFoundError } from "@/shared/domain/errors/not-found-error"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"

describe('GetUserUseCase integration tests', () => {
  const prismaService = new PrismaClient()
  let sut: GetUserUseCase.UseCase
  let repository: UserPrismaRepository
  let module: TestingModule

  beforeAll(async () => {
    setuptPrismaTests()
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)]
    }).compile()
    repository = new UserPrismaRepository(prismaService as any)
  })

  beforeEach(async () => {
    sut = new GetUserUseCase.UseCase(repository)
    await prismaService.user.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  it('should throws an error when entity not found', async () => {
    await expect(sut.execute({id: 'FakeId'})).rejects.toThrow(new NotFoundError('UserModel not found using ID FakeId'))
  })

  it('should return a entity', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    const model = await prismaService.user.create({
      data: entity.toJSON()
    })

    const output = await sut.execute({id: entity._id})
    expect(output).toMatchObject(model)
  })
})