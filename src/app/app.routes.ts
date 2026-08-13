import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';
import { authGuard } from './core/guards/auth-guard';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { Cadastro } from './pages/cadastro/cadastro';
import { Configuracoes } from './pages/configuracoes/configuracoes';
import { Inicio } from './pages/inicio/inicio';
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
        component: Inicio
      },
      {
        path: 'cadastro',
        component: Cadastro
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