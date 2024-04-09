import { SearchableRepositoryInterface } from '@/shared/domain/repositories/searchable-repository-contracts'
import { UserEntity } from '../entities/user.entity'
import {
          SearchParams as DefaultSearchParams,
          SearchResult as DefaultSearchResult
        } from '@/shared/domain/repositories/searchable-repository-contracts'


export namespace UserRepository{
  export type Filter = string

  export class SearchParams extends DefaultSearchParams{}

  export class SearchResult extends DefaultSearchResult<UserEntity, Filter>{}

  export interface Repository
    extends SearchableRepositoryInterface<
      UserEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    findByEmail(email: string): Promise<UserEntity>
    emailExists(email: string): Promise<void>
  }
}

