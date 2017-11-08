export class NewAccount {

  constructor(public accountNumber : string,
              public BSB : string,
              public accountName : string,
              public toBeSaved: boolean,
              public valid : boolean){}
  getValue(){
    return JSON.stringify(this);
  }
}
