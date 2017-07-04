import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path:'register',
    component:RegisterComponent
  }
  //{ path: '*', component: PageNotFoundComponent }
];

/*@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot[appRoutes]],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})*/
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
//export class AppRoutingModule { }