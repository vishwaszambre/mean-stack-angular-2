import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogComponent } from './components/blog/blog.component';
import { AuthGuard } from './guards/auth.guards';
import { NotAuthGuard } from './guards/notAuth.guards';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuard]
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