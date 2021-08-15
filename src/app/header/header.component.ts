import { Component, OnInit } from '@angular/core';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: String | undefined;

  constructor(
    private titleServive: TitleService
  ) { }

  ngOnInit() {
    this.title = this.titleServive.APP_TITLE;
  }

}
