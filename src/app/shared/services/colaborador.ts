import { Injectable } from '@angular/core';
import { Colaborador } from '../models/colaborador.model';

@Injectable({ providedIn: 'root' })
export class ColaboradorService {
  private colaboradores: Colaborador[] = [
    {
      id: 1,
      matricula: '2001',
      nome: 'Ana Paula Ribeiro',
      cpf: '123.456.789-00',
      setor: 'Enfermagem',
      funcao: 'Técnica de Enfermagem',
      admissao: '2023-03-14',
      contato: '(11) 98888-1234',
      status: 'Ativo'
    },
    {
      id: 2,
      matricula: '2002',
      nome: 'Bruno Costa Lima',
      cpf: '234.567.890-11',
      setor: 'Manutenção',
      funcao: 'Técnico de Manutenção',
      admissao: '2022-07-01',
      contato: '(11) 97777-5678',
      status: 'Ativo'
    }
  ];

  private proximoId = 3;

  listar(): Colaborador[] {
    return [...this.colaboradores];
  }

  criar(dados: Omit<Colaborador, 'id'>): Colaborador {
    const novo: Colaborador = { id: this.proximoId++, ...dados };
    this.colaboradores.push(novo);
    return novo;
  }

  atualizar(id: number, dados: Omit<Colaborador, 'id'>): void {
    const index = this.colaboradores.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.colaboradores[index] = { id, ...dados };
    }
  }

  excluir(id: number): void {
    this.colaboradores = this.colaboradores.filter((c) => c.id !== id);
  }
}
