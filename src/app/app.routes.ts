import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';
import { authGuard } from './core/guards/auth-guard';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Configuracoes } from './pages/configuracoes/configuracoes';
import { Login } from './pages/login/login';
import { RecuperarSenha } from './pages/recuperar-senha/recuperar-senha';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'recuperar-senha',
    component: RecuperarSenha
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'configuracoes',
        component: Configuracoes,
        canActivate: [adminGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
