import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/helpers/auth.guard';

const AuthModule = () => import('./auth/auth.module').then(x => x.AuthModule);
const ProductModule = () => import('./product/product.module').then(x => x.ProductModule);

const routes: Routes = [
  { path: '', loadChildren: ProductModule, canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: AuthModule },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
