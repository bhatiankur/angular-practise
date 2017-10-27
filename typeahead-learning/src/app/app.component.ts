import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public personIsPicked($event){
    console.log('Received in the containing component --> Picked ' + $event.name);
  }
}
