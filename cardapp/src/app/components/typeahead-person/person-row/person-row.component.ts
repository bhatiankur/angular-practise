import {Component, Directive, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {HttpObservable, RestClient} from "../../../services/rest-client.service";
import {AuthService} from "../../../services/auth.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";


@Component({
  selector: 'app-person-row',
  templateUrl: './person-row.component.html',
  styleUrls: ['./person-row.component.css']
})
export class PersonRowComponent implements OnInit {

  @Input() person: any;
  @Output() selectedPerson: any;
  @Output() deleted: any;

  modalRef: BsModalRef;

  deleteAction : HttpObservable<any>;

  constructor(private rest: RestClient, private auth: AuthService, private modalService: BsModalService) {
    console.log('In person Constructor');
    this.selectedPerson = new EventEmitter();
    this.deleted = new EventEmitter();
  }

  ngOnInit() {
    console.log('In person ngOnInit' + this.person.name);
    console.log(this.person)
  }

  selectPerson(person: any) {
    console.log(person.name + ' was selected for transaction');
    this.selectedPerson.emit(person);
  }

  //take the delete action
  deleteContact(person: any): boolean {
    console.log(person.name + ' contact was selected to deleted in person-row component.');
    this.deleteAction = this.rest.delete('/user/contact/' + person.customer.id);
    this.deleteAction.subscribe(() => {
        console.log('deleted from server');
        //emit the deleted person so that the client side list get updated
        this.deleted.emit(this.person);
    });
   return false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.deleteContact(this.person);
  }

  decline(): void {
    this.modalRef.hide();
  }

}
