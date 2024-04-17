import { SearchResult } from "@/shared/domain/repositories/searchable-repository-contracts"
import { PaginationOutputMapper } from "../../pagination-output"

describe('PaginationOutputMapper unit tests', () => {
  it('should convert SearchResult in output', () => {
    const result = new SearchResult({
      items: ['faker'] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: '',
      sortDir: '',
      filter: 'faker'
    })
    const sut = PaginationOutputMapper.toOutput(result.items, result)
    expect(sut).toStrictEqual({
      items: ['faker'],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1
    })
  })
})
