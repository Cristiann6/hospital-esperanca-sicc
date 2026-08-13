import { Injectable } from '@angular/core';

export interface UsuarioAutenticado {
  nome: string;
  email: string;
  matricula: string;
  perfil: 'Administrador' | 'RH' | 'Técnico de Segurança';
  iniciais: string;
}

interface UsuarioLogin extends UsuarioAutenticado {
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly usuarios: UsuarioLogin[] = [
    {
      nome: 'Cristian Freitas',
      email: 'cristian@hospitalesperanca.com',
      matricula: '1001',
      senha: 'admin123',
      perfil: 'Administrador',
      iniciais: 'CF'
    },
    {
      nome: 'Mariana Souza',
      email: 'mariana@hospitalesperanca.com',
      matricula: '1002',
      senha: 'rh123',
      perfil: 'RH',
      iniciais: 'MS'
    },
    {
      nome: 'Carlos Mendes',
      email: 'carlos@hospitalesperanca.com',
      matricula: '1003',
      senha: 'seg123',
      perfil: 'Técnico de Segurança',
      iniciais: 'CM'
    }
  ];

  private usuarioAtual: UsuarioAutenticado | null = null;

  login(identificacao: string, senha: string): boolean {
    const valorNormalizado = identificacao.trim().toLowerCase();

    const usuarioEncontrado = this.usuarios.find(
      (usuario) =>
        (
          usuario.email.toLowerCase() === valorNormalizado ||
          usuario.matricula === valorNormalizado
        ) &&
        usuario.senha === senha
    );

    if (!usuarioEncontrado) {
      this.usuarioAtual = null;
      return false;
    }

    this.usuarioAtual = {
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
      matricula: usuarioEncontrado.matricula,
      perfil: usuarioEncontrado.perfil,
      iniciais: usuarioEncontrado.iniciais
    };

    return true;
  }

  logout(): void {
    this.usuarioAtual = null;
  }

  estaAutenticado(): boolean {
    return this.usuarioAtual !== null;
  }

  obterUsuarioAtual(): UsuarioAutenticado | null {
    return this.usuarioAtual;
  }

  ehAdministrador(): boolean {
    return this.usuarioAtual?.perfil === 'Administrador';
  }

  ehRH(): boolean {
    return this.usuarioAtual?.perfil === 'RH';
  }

  ehTecnicoSeguranca(): boolean {
    return this.usuarioAtual?.perfil === 'Técnico de Segurança';
  }
}