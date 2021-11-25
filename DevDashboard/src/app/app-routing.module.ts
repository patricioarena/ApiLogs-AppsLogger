import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogViewComponent } from './log-view/log-view.component';
import { LogConfigComponent } from './log-config/log-config.component'
import { ChangeRolesComponent } from './change-roles/change-roles.component';

const routes: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full' },
  { path: 'logs', component: LogViewComponent, data: { title: 'Logs' } },
  { path: 'logs-config', component: LogConfigComponent, data: { title: 'Logs-Config' } },
  { path: 'change-roles', component: ChangeRolesComponent, data: { title: 'Change-Roles' } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
