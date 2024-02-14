import { SearchableRepositoryInterface } from '@/shared/domain/repositories/searchable-repository-contracts'
import { UserEntity } from '../entities/user.entity'

export interface UserRepository
  extends SearchableRepositoryInterface<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>
  emailExists(email: string): Promise<void>
}
