import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {BsModalService, ModalBackdropComponent, ModalModule, PopoverModule} from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { SupportComponent } from './pages/support/support.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RestClient } from './services/rest-client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { TypeaheadPersonComponent } from './components/typeahead-person/typeahead-person.component';
import { PersonRowComponent } from './components/typeahead-person/person-row/person-row.component';
import { TransactionListComponent} from './components/transaction-list/transaction-list.component';
import { BankInfoService } from './services/bankInfoService';
import { CurrencyComponent} from './components/transaction-list/currency/currency.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AccountSelectorComponent } from './components/account-selector/account-selector.component';
import {TypeaheadModule} from './directives/typeahead'
import { SettingsAccordionComponent } from './pages/settings/accordion/settings-accordion.component';
import { CardSecurityComponent } from './pages/settings/cardSecurity/card-limits.component';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import { NotificationsComponent } from './pages/settings/notifications/notifications.component';
import { PaymentFromComponent } from './components/payment-from/payment-from-component';
import { WaivCurrencyPipe } from './pipes/waiv-currency.pipe';
import { CurrencyPipe } from '@angular/common';
import { AccountSecurityComponent } from './pages/settings/accountSecurity/account-security.component';
import { TypeaheadPersonSelectorComponent } from './components/typeahead-person-selector/typeahead-person-selector.component';


import { NewPayeeComponent } from './components/new-payee/new-payee.component';
import { ToggleButtonsComponent, ToggleButtonsItemComponent } from './components/toggle-buttons/toggle-buttons.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    AccountsComponent,
    PaymentComponent,
    SettingsComponent,
    AccountDetailsComponent,
    SupportComponent,
    LoadingComponent,
    TypeaheadPersonComponent,
    PersonRowComponent,
    AccountSelectorComponent,
    SettingsAccordionComponent,
    CardSecurityComponent,
    AccountSecurityComponent,
    ProfileComponent,
    NotificationsComponent,
    TransactionListComponent,
    LoadingComponent,
    PaymentFromComponent,
    WaivCurrencyPipe,
    NewPayeeComponent,
    ToggleButtonsComponent,
    ToggleButtonsItemComponent,
    DatePickerComponent,
    TypeaheadPersonSelectorComponent
  ],
  entryComponents: [ProfileComponent, NotificationsComponent, CardSecurityComponent, AccountSecurityComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthService],

        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'accounts'
          },
          {
            path: 'accounts',
            component: AccountsComponent
          },
          {
            path: 'payment',
            component: PaymentComponent
          },
          {
            path: 'settings',
            component: SettingsComponent
          },
          {
            path: 'account-details',
            component: AccountDetailsComponent
          },
          {
            path: 'support',
            component: SupportComponent
          },
        ]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: '**', redirectTo: ''
      }
    ])
  ],
  providers: [
    AuthService,
    RestClient,
    BankInfoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    BsModalService,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
