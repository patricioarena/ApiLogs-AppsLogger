import { Component } from '@angular/core';
import { TitleService } from './service/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public constructor(private titleService: TitleService ) {
    this.titleService.init('Reportes');
  }

}
