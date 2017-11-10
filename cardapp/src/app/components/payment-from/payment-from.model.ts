export class PaymentFromModel {
    modelIsValid: boolean = false;
    constructor(
        public account: any,
        public ourDescription: string,
        public theirDescription: string,
        public amount: string,
        public saveDescriptionForRecipient: boolean) {}

}
