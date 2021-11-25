import { Compiler, Component, Injector, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string | undefined;
  public urls: string[] = [];

  constructor(
    private titleServive: TitleService,
    private router: Router,
    private compiler: Compiler,
    private injector: Injector
  ) { }

  ngOnInit() {
    this.title = this.titleServive.APP_TITLE;
    console.log(this.router.config);
    this.router.config.forEach(i => {
      this.getPaths(i);
    })
  }

  goTo(param){
    this.router.navigateByUrl(param);
  }

  getPaths(route: Route, parent: string = '') {
    if (route.redirectTo) {
      return;
    }
    if (route.children) {
      route.children.forEach(i => {
        this.getPaths(i, parent + route.path);
      });
    }
    else if (route.loadChildren) {
      (<any>this.router).configLoader.load(this.injector, route).subscribe(i => {
        i.routes.forEach(j => {
          this.getPaths(j, parent + route.path)
        });
      });
    }
    else if (route.path != null) {
      this.setPath(route.path, parent);
    }
  }
  setPath(path, parent) {
    let fullPath: string;
    if (path != null) {
      if (parent) {
        fullPath = `/${parent}/${path}`;
      }
      else {
        fullPath = `/${path}`
      }
    }
    this.urls.push(fullPath)
  }


}
