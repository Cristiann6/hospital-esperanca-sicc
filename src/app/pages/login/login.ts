import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../shared/services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  identificacao = '';
  senha = '';

  mostrarSenha = false;
  carregando = false;
  tentouEnviar = false;

  mensagemSucesso = '';
  mensagemErro = '';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {}

  alternarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  identificacaoValida(): boolean {
    const valor = this.identificacao.trim();

    if (!valor) {
      return false;
    }

    // Se tiver @, valida como e-mail.
    if (valor.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(valor);
    }

    // Sem @, valida como matrícula numérica de 4 a 10 dígitos.
    const matriculaRegex = /^\d{4,10}$/;
    return matriculaRegex.test(valor);
  }

  entrar(): void {
    this.tentouEnviar = true;
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (!this.identificacaoValida() || !this.senha.trim()) {
      return;
    }

    this.carregando = true;

    setTimeout(() => {
      const loginValido = this.authService.login(
        this.identificacao,
        this.senha
      );

      this.carregando = false;

      if (!loginValido) {
        this.mensagemErro =
          'Matrícula, e-mail ou senha inválidos. Verifique os dados informados.';

        this.changeDetector.markForCheck();
        return;
      }

      this.mensagemSucesso = 'Login realizado com sucesso.';

      this.changeDetector.markForCheck();

      this.router.navigate(['/dashboard']);
    }, 1200);
  }
}