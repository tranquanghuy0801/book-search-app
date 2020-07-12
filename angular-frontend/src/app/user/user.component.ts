import { Component, OnInit , Input, EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: firebase.User;
  @Output() logoutClick: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.logoutClick.emit();
  }
  

}
