import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'order',
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import('./views/order/order.module').then((m) => m.OrdersModule),
      },
      {
        path: 'cart',
        canActivate: [AuthGuardService],

        loadChildren: () =>
          import('./views/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'users',
        canActivate: [AuthGuardService, AdminGuardService],
        //sadece admin girebiliyor
        loadChildren: () =>
          import('./views/users/users-routing.module').then(
            (m) => m.UsersRoutingModule
          ),
      },
      {
        path: 'product/:id',
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import('./views/product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'chat',
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import('./views/chat/chat.module').then((m) => m.ChatModule),
      },
      {
        path: 'pages',
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'report',
        canActivate: [AuthGuardService],

        loadChildren: () =>
          import('./views/reports/report.module').then(
            (m) => m.ReportRoutingModule
          ),
      },
    ],
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
