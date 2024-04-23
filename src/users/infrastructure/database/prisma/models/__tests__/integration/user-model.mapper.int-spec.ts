import { PrismaClient } from "@prisma/client"
import { execSync } from "node:child_process"


describe('UserModelMapper integration tests', () => {
  let prismaService: PrismaClient
  let props: any

  beforeAll(async () => {
    execSync(
      'npx dotenv-cli -e .env.test -- npx prisma migrate deploy --schema ./src/shared/infrastructure/database/prisma/schema.prisma'
    )
    prismaService: new PrismaClient()
    await prismaService.$connect()
  })
})
