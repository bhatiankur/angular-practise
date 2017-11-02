import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  filterString: string;

  public html = `
  <span class="btn btn-danger">Never trust not sanitized HTML!!!</span>`;

  triggerfilter() {
    console.log('Input text changes..' + this.filterString);
  }

  listAll() {
    console.log('list all is called..');
  }

  closePopup() { 
    console.log('[popup closed]');
  }

}
