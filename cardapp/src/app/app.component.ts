import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BankInfoService } from './services/bankInfoService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHomeNav = false;

  constructor(private translate: TranslateService, private bankInfoService: BankInfoService) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.bankInfoService.getBankInfo();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
