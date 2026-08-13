import { Injectable } from '@angular/core';
import { Epi } from '../models/epi.model';

@Injectable({ providedIn: 'root' })
export class EpiService {
  private epis: Epi[] = [
    {
      id: 1,
      codigo: 'EPI-001',
      nome: 'Luva de Látex',
      descricao: 'Luva de procedimento descartável',
      ca: '12345',
      validade: '2027-01-31',
      fabricante: 'MedSafe',
      categoria: 'Proteção das mãos',
      estoqueMinimo: 100,
      status: 'Ativo'
    },
    {
      id: 2,
      codigo: 'EPI-002',
      nome: 'Máscara N95',
      descricao: 'Respirador facial PFF2',
      ca: '67890',
      validade: '2026-11-30',
      fabricante: '3M',
      categoria: 'Proteção respiratória',
      estoqueMinimo: 50,
      status: 'Ativo'
    }
  ];

  private proximoId = 3;

  listar(): Epi[] {
    return [...this.epis];
  }

  criar(dados: Omit<Epi, 'id'>): Epi {
    const novo: Epi = { id: this.proximoId++, ...dados };
    this.epis.push(novo);
    return novo;
  }

  atualizar(id: number, dados: Omit<Epi, 'id'>): void {
    const index = this.epis.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.epis[index] = { id, ...dados };
    }
  }

  excluir(id: number): void {
    this.epis = this.epis.filter((e) => e.id !== id);
  }
}
