import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../../auth.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service'
import { ConfigService } from '@nestjs/config'
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module'

describe('AuthService unit tests', () => {
  let sut: AuthService
  let module: TestingModule
  let jwtService: JwtService
  let envConfigService: EnvConfigService
  let configService: ConfigService

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [EnvConfigModule, JwtModule],
      providers: [AuthService],
    }).compile()
  })

  beforeEach(async () => {
    jwtService = new JwtService({
      global: true,
      secret: 'fake_secret',
      signOptions: {
        expiresIn: 86400,
        subject: 'fakeId',
      },
    })

    configService = new ConfigService()
    envConfigService = new EnvConfigService(configService)
    sut = new AuthService(jwtService, envConfigService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
