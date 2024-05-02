import { Transform } from "class-transformer"

export type PaginationPresenterProps = {
  currentpage: number
  perPage: number
  lastPage: number
  total: number
}

export class PaginationPresenter {
  @Transform(({value}) => parseInt(value))
  currentpage: number
  @Transform(({value}) => parseInt(value))
  perPage: number
  @Transform(({value}) => parseInt(value))
  lastPage: number
  @Transform(({value}) => parseInt(value))
  total: number

  constructor(props: PaginationPresenterProps){
    this.currentpage = props.currentpage
    this.perPage = props.perPage
    this.lastPage = props.lastPage
    this.total = props.total
  }
}
