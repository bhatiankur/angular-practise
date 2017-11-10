
import { Program } from './Program';
import { AlternateIdentificationType } from './AlternateIdentificationType';

export interface BankInfo {
    code?: string;
    currencyCode?: string;
    defaultProgramId?: string;
    defaultProgramNumber?: string;
    countryCode?: string;
    programs?: Array<Program>;
    alternativeIdentificationTypes?: Array<AlternateIdentificationType>;
    customerRequiresSsn?: boolean;
}
