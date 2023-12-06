export type FieldsErros = {
  [field: string]: string[]
}

export interface ValidatorFieldsInterface<PropsValidated>{
  erros: FieldsErros,
  validatedData: PropsValidated,
  validate(data: any): boolean
}
