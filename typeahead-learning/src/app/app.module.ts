import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TypeaheadPersonComponent } from './typeahead-person/typeahead-person.component';
import { PersonRowComponent } from './person-row/person-row.component';

@NgModule({
  declarations: [
    AppComponent,
    TypeaheadPersonComponent,
    PersonRowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
