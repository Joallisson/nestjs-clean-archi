import { validateSync } from "class-validator";
import { FieldsErros, ValidatorFieldsInterface } from "./validator-fields.interface";

export abstract class  ClassValidatorFields<PropsValidated>
implements ValidatorFieldsInterface<PropsValidated>{

  erros: FieldsErros = null;
  validatedData: PropsValidated = null;

  validate(data: any): boolean {
    const erros = validateSync(data)
    if (erros.length) {
      this.erros = {}
      for(const error of erros){
        const field = error.property
        this.erros[field] = Object.values(error.constraints)
      }
    }else{
      this.validatedData = data
    }

    return !erros.length
  }

}
