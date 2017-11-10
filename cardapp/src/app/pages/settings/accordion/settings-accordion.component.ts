import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { SettingsTabComponent } from '../settings.component';

@Component({
  selector: 'app-settings-accordion',
  templateUrl: './settings-accordion.component.html',
  styleUrls: ['./settings-accordion.component.scss']
})
export class SettingsAccordionComponent implements OnInit {

  @Input()
  title: String;

  @Input()
  componentType: Type<SettingsTabComponent>;

  @Output()
  opened = new EventEmitter();

  @ViewChild('content', {read: ViewContainerRef})
  contentContainer: ViewContainerRef;

  componentInstance: SettingsTabComponent;

  constructor(private resolver: ComponentFactoryResolver) { }

  get isOpen() {
    return this.contentContainer.length !== 0;
  }

  ngOnInit() {
  }

  onViewClick() {
    if (!this.isOpen) {
      const factory = this.resolver.resolveComponentFactory(this.componentType);
      this.componentInstance = this.contentContainer.createComponent(factory).instance;
      this.opened.emit(this);
    } else {
      this.contentContainer.clear();
    }

  }

  onSaveClick() {
    this.componentInstance.save();
  }

}
