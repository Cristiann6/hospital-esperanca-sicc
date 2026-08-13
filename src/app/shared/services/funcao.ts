import { Injectable } from '@angular/core';
import { Funcao } from '../models/funcao.model';

@Injectable({ providedIn: 'root' })
export class FuncaoService {
  private funcoes: Funcao[] = [
    {
      id: 1,
      nome: 'Técnico de Enfermagem',
      descricao: 'Atua no cuidado direto ao paciente',
      setor: 'Enfermagem',
      episObrigatorios: ['Luva de Látex', 'Máscara N95'],
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Técnico de Manutenção',
      descricao: 'Responsável por reparos e manutenção predial',
      setor: 'Manutenção',
      episObrigatorios: ['Luva de Látex'],
      status: 'Ativo'
    }
  ];

  private proximoId = 3;

  listar(): Funcao[] {
    return [...this.funcoes];
  }

  criar(dados: Omit<Funcao, 'id'>): Funcao {
    const nova: Funcao = { id: this.proximoId++, ...dados };
    this.funcoes.push(nova);
    return nova;
  }

  atualizar(id: number, dados: Omit<Funcao, 'id'>): void {
    const index = this.funcoes.findIndex((f) => f.id === id);
    if (index !== -1) {
      this.funcoes[index] = { id, ...dados };
    }
  }

  excluir(id: number): void {
    this.funcoes = this.funcoes.filter((f) => f.id !== id);
  }
}
