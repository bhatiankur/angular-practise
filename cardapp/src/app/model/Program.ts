
export interface Program {
    programId?: string;
    programName?: string;
    programNumber?: string;
    monthlyFeeWait?: number;
    monthlyFeeTrigger?: string;
    atmPromos?: string;
    atmPromoCycle?: string;
    issueCard?: boolean;
    customerFeeSetId?: string;
    binNumber?: string;
    extension?: string;
    secondLine?: string;
    updateMonthlyFeeData?: boolean;
}
