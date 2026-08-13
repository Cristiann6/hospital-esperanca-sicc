import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Colaborador } from '../../../shared/models/colaborador.model';
import { ColaboradorService } from '../../../shared/services/colaborador';

@Component({
  selector: 'app-colaboradores',
  imports: [CommonModule, FormsModule],
  templateUrl: './colaboradores.html',
  styleUrl: './colaboradores.css'
})
export class Colaboradores {
  colaboradores: Colaborador[] = [];
  termoBusca = '';

  modalAberto = false;
  modoEdicao = false;
  colaboradorEmEdicaoId: number | null = null;

  formulario: Omit<Colaborador, 'id'> = this.formularioVazio();

  colaboradorParaExcluir: Colaborador | null = null;

  tentouSalvar = false;

  constructor(private colaboradorService: ColaboradorService) {
    this.carregar();
  }

  private carregar(): void {
    this.colaboradores = this.colaboradorService.listar();
  }

  private formularioVazio(): Omit<Colaborador, 'id'> {
    return {
      matricula: '',
      nome: '',
      cpf: '',
      setor: '',
      funcao: '',
      admissao: '',
      contato: '',
      status: 'Ativo'
    };
  }

  get colaboradoresFiltrados(): Colaborador[] {
    const termo = this.termoBusca.trim().toLowerCase();

    if (!termo) {
      return this.colaboradores;
    }

    return this.colaboradores.filter((c) =>
      c.nome.toLowerCase().includes(termo) ||
      c.matricula.toLowerCase().includes(termo) ||
      c.setor.toLowerCase().includes(termo)
    );
  }

  abrirNovo(): void {
    this.modoEdicao = false;
    this.colaboradorEmEdicaoId = null;
    this.formulario = this.formularioVazio();
    this.tentouSalvar = false;
    this.modalAberto = true;
  }

  abrirEdicao(colaborador: Colaborador): void {
    this.modoEdicao = true;
    this.colaboradorEmEdicaoId = colaborador.id;
    this.formulario = {
      matricula: colaborador.matricula,
      nome: colaborador.nome,
      cpf: colaborador.cpf,
      setor: colaborador.setor,
      funcao: colaborador.funcao,
      admissao: colaborador.admissao,
      contato: colaborador.contato,
      status: colaborador.status
    };
    this.tentouSalvar = false;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  formularioValido(): boolean {
    return !!(
      this.formulario.matricula.trim() &&
      this.formulario.nome.trim() &&
      this.formulario.cpf.trim() &&
      this.formulario.setor.trim() &&
      this.formulario.funcao.trim() &&
      this.formulario.admissao.trim()
    );
  }

  salvar(): void {
    this.tentouSalvar = true;

    if (!this.formularioValido()) {
      return;
    }

    if (this.modoEdicao && this.colaboradorEmEdicaoId !== null) {
      this.colaboradorService.atualizar(this.colaboradorEmEdicaoId, this.formulario);
    } else {
      this.colaboradorService.criar(this.formulario);
    }

    this.carregar();
    this.modalAberto = false;
  }

  confirmarExclusao(colaborador: Colaborador): void {
    this.colaboradorParaExcluir = colaborador;
  }

  cancelarExclusao(): void {
    this.colaboradorParaExcluir = null;
  }

  excluir(): void {
    if (!this.colaboradorParaExcluir) {
      return;
    }

    this.colaboradorService.excluir(this.colaboradorParaExcluir.id);
    this.colaboradorParaExcluir = null;
    this.carregar();
  }
}
