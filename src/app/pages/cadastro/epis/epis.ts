import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Epi } from '../../../shared/models/epi.model';
import { EpiService } from '../../../shared/services/epi';

@Component({
  selector: 'app-epis',
  imports: [CommonModule, FormsModule],
  templateUrl: './epis.html',
  styleUrl: './epis.css'
})
export class Epis {
  epis: Epi[] = [];
  termoBusca = '';

  modalAberto = false;
  modoEdicao = false;
  epiEmEdicaoId: number | null = null;

  formulario: Omit<Epi, 'id'> = this.formularioVazio();

  epiParaExcluir: Epi | null = null;

  tentouSalvar = false;

  constructor(private epiService: EpiService) {
    this.carregar();
  }

  private carregar(): void {
    this.epis = this.epiService.listar();
  }

  private formularioVazio(): Omit<Epi, 'id'> {
    return {
      codigo: '',
      nome: '',
      descricao: '',
      ca: '',
      validade: '',
      fabricante: '',
      categoria: '',
      estoqueMinimo: 0,
      status: 'Ativo'
    };
  }

  get episFiltrados(): Epi[] {
    const termo = this.termoBusca.trim().toLowerCase();

    if (!termo) {
      return this.epis;
    }

    return this.epis.filter((e) =>
      e.nome.toLowerCase().includes(termo) ||
      e.codigo.toLowerCase().includes(termo) ||
      e.categoria.toLowerCase().includes(termo)
    );
  }

  abrirNovo(): void {
    this.modoEdicao = false;
    this.epiEmEdicaoId = null;
    this.formulario = this.formularioVazio();
    this.tentouSalvar = false;
    this.modalAberto = true;
  }

  abrirEdicao(epi: Epi): void {
    this.modoEdicao = true;
    this.epiEmEdicaoId = epi.id;
    this.formulario = {
      codigo: epi.codigo,
      nome: epi.nome,
      descricao: epi.descricao,
      ca: epi.ca,
      validade: epi.validade,
      fabricante: epi.fabricante,
      categoria: epi.categoria,
      estoqueMinimo: epi.estoqueMinimo,
      status: epi.status
    };
    this.tentouSalvar = false;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  formularioValido(): boolean {
    return !!(
      this.formulario.codigo.trim() &&
      this.formulario.nome.trim() &&
      this.formulario.ca.trim() &&
      this.formulario.validade.trim() &&
      this.formulario.fabricante.trim() &&
      this.formulario.categoria.trim()
    );
  }

  salvar(): void {
    this.tentouSalvar = true;

    if (!this.formularioValido()) {
      return;
    }

    if (this.modoEdicao && this.epiEmEdicaoId !== null) {
      this.epiService.atualizar(this.epiEmEdicaoId, this.formulario);
    } else {
      this.epiService.criar(this.formulario);
    }

    this.carregar();
    this.modalAberto = false;
  }

  confirmarExclusao(epi: Epi): void {
    this.epiParaExcluir = epi;
  }

  cancelarExclusao(): void {
    this.epiParaExcluir = null;
  }

  excluir(): void {
    if (!this.epiParaExcluir) {
      return;
    }

    this.epiService.excluir(this.epiParaExcluir.id);
    this.epiParaExcluir = null;
    this.carregar();
  }
}
