export class PaymentToModel {

  public valid: boolean = false;
  public person: any;

  constructor(person: any){
    this.person = person;
  }
  getValue(){
    JSON.stringify(this);
  }

}
