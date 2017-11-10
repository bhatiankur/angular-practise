export class NewToAccountModel {

  constructor(public accountNumber : string,
              public BSB : string,
              public accountName : string,
              public toBeSaved: boolean,
              public destinationType: string,
              public mobileNumber: string,
              public emailAddress: string,
              public valid : boolean){}
  getValue(){
    return JSON.stringify(this);
  }
}
