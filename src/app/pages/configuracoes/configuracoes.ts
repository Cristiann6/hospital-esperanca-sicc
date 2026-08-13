import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type AbaConfiguracao =
  | 'usuarios'
  | 'perfis'
  | 'permissoes'
  | 'preferencias';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  ativo: boolean;
}

interface Perfil {
  nome: string;
  descricao: string;
  permissoes: string[];
}

@Component({
  selector: 'app-configuracoes',
  imports: [FormsModule],
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.css'
})
export class Configuracoes {
  abaAtiva: AbaConfiguracao = 'usuarios';

  perfilSelecionado = 'Administrador';

  termoBusca = '';

  mensagemSucesso = '';

  usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Cristian Freitas',
      email: 'cristian@hospitalesperanca.com',
      perfil: 'Administrador',
      ativo: true
    },
    {
      id: 2,
      nome: 'Mariana Souza',
      email: 'mariana@hospitalesperanca.com',
      perfil: 'RH',
      ativo: true
    },
    {
      id: 3,
      nome: 'Carlos Mendes',
      email: 'carlos@hospitalesperanca.com',
      perfil: 'Técnico de Segurança',
      ativo: false
    }
  ];

  perfis: Perfil[] = [
    {
      nome: 'Administrador',
      descricao: 'Acesso completo ao sistema e às configurações.',
      permissoes: [
        'Dashboard',
        'Colaboradores',
        'Gestão de EPIs',
        'Estoque',
        'Treinamentos',
        'Relatórios',
        'Configurações'
      ]
    },
    {
      nome: 'RH',
      descricao: 'Gerencia colaboradores e consultas administrativas.',
      permissoes: [
        'Dashboard',
        'Colaboradores'
      ]
    },
    {
      nome: 'Técnico de Segurança',
      descricao: 'Responsável pelos EPIs, estoque e treinamentos.',
      permissoes: [
        'Dashboard',
        'Gestão de EPIs',
        'Estoque',
        'Treinamentos',
        'Relatórios'
      ]
    }
  ];

  notificacaoEstoque = true;
  notificacaoValidade = true;
  notificacaoTreinamento = false;

  alterarAba(aba: AbaConfiguracao): void {
    this.abaAtiva = aba;
    this.mensagemSucesso = '';
  }

  abrirPermissoes(nomePerfil: string): void {
    this.perfilSelecionado = nomePerfil;
    this.abaAtiva = 'permissoes';
    this.mensagemSucesso = '';
  }

  perfilAtual(): Perfil | undefined {
    return this.perfis.find(
      (perfil) => perfil.nome === this.perfilSelecionado
    );
  }

  perfilPossuiPermissao(nomePermissao: string): boolean {
    return (
      this.perfilAtual()?.permissoes.includes(nomePermissao) ?? false
    );
  }

  alternarPermissao(nomePermissao: string): void {
    const perfil = this.perfilAtual();

    if (!perfil) {
      return;
    }

    const indice = perfil.permissoes.indexOf(nomePermissao);

    if (indice >= 0) {
      perfil.permissoes.splice(indice, 1);
    } else {
      perfil.permissoes.push(nomePermissao);
    }

    this.mensagemSucesso =
      `Permissões do perfil ${perfil.nome} atualizadas.`;
  }

  usuariosFiltrados(): Usuario[] {
    const busca = this.termoBusca.trim().toLowerCase();

    if (!busca) {
      return this.usuarios;
    }

    return this.usuarios.filter((usuario) =>
      usuario.nome.toLowerCase().includes(busca) ||
      usuario.email.toLowerCase().includes(busca) ||
      usuario.perfil.toLowerCase().includes(busca)
    );
  }

  alternarStatus(usuario: Usuario): void {
    usuario.ativo = !usuario.ativo;

    this.mensagemSucesso = usuario.ativo
      ? 'Usuário ativado com sucesso.'
      : 'Usuário inativado com sucesso.';
  }

  salvarPreferencias(): void {
    this.mensagemSucesso = 'Preferências salvas com sucesso.';
  }
}