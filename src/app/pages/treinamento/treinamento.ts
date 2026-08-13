import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Participante {
  nome: string;
  setor: string;
  presenca: boolean;
}

export interface Treinamento {
  id?: number;
  norma?: string;
  titulo: string;
  instrutor?: string;
  cargaHoraria?: number;
  dataRealizacao?: string;
  dataValidade?: string;
  status: 'Agendado' | 'Concluído' | 'Vencido';
  participantes: Participante[];
}

@Component({
  selector: 'app-gestao-treinamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './treinamento.html',
  styleUrls: ['./treinamento.css']
})
export class Treinamentos {
  // Filtros de Busca       
  termoBusca: string = '';
  statusFiltro: string = 'TODOS';

  // Controle de Estado dos Modais
  exibirModal: boolean = false;
  modoEdicao: boolean = false;
  treinamentoSelecionado: Treinamento | null = null;

  // Form Models
  novoTreinamento: Partial<Treinamento> = { participantes: [] };
  novoParticipante: Participante = { nome: '', setor: '', presenca: false };

  // Base de Dados Simulado
  treinamentos: Treinamento[] = [
    {
      id: 1,
      norma: 'NR-35',
      titulo: 'Trabalho em Altura',
      instrutor: 'Carlos Silva',
      dataRealizacao: '2026-05-10',
      dataValidade: '2027-05-10',
      cargaHoraria: 8,
      status: 'Concluído',
      participantes: [
        { nome: 'João Pedro', setor: 'Manutenção', presenca: true },
        { nome: 'Ana Maria', setor: 'Operações', presenca: false }
      ]
    },
    {
      id: 2,
      norma: 'NR-10',
      titulo: 'Segurança em Instalações Elétricas',
      instrutor: 'Mariana Costa',
      dataRealizacao: '2026-09-15',
      dataValidade: '2028-09-15',
      cargaHoraria: 16,
      status: 'Agendado',
      participantes: [
        { nome: 'Lucas Lima', setor: 'Elétrica', presenca: false }
      ]
    }
  ];

  // Filtra a lista de treinamentos em tempo real
  get treinamentosFiltrados(): Treinamento[] {
    return this.treinamentos.filter(t => {
      const atendeBusca = !this.termoBusca || 
        t.titulo.toLowerCase().includes(this.termoBusca.toLowerCase()) ||
        (t.norma && t.norma.toLowerCase().includes(this.termoBusca.toLowerCase())) ||
        (t.instrutor && t.instrutor.toLowerCase().includes(this.termoBusca.toLowerCase()));

      const atendeStatus = this.statusFiltro === 'TODOS' || t.status === this.statusFiltro;

      return atendeBusca && atendeStatus;
    });
  }

  // --- GERENCIAMENTO DE MODAIS (CRIAR / EDITAR / DELETAR) ---

  abrirModalNovo(): void {
    this.modoEdicao = false;
    this.novoTreinamento = {
      titulo: '',
      norma: '',
      cargaHoraria: undefined,
      instrutor: '',
      dataRealizacao: '',
      status: 'Agendado',
      participantes: []
    };
    this.novoParticipante = { nome: '', setor: '', presenca: false };
    this.exibirModal = true;
  }

  abrirModalEditar(treinamento: Treinamento): void {
    this.modoEdicao = true;
    // Clona o objeto para evitar alterações diretas na tabela antes de salvar
    this.novoTreinamento = JSON.parse(JSON.stringify(treinamento));
    if (!this.novoTreinamento.participantes) {
      this.novoTreinamento.participantes = [];
    }
    this.novoParticipante = { nome: '', setor: '', presenca: false };
    this.exibirModal = true;
  }

  fecharModal(): void {
    this.exibirModal = false;
  }

  salvarTreinamento(): void {
    if (!this.novoTreinamento.titulo || !this.novoTreinamento.dataRealizacao) {
      alert('Preencha os campos obrigatórios (Título e Data de Realização).');
      return;
    }

    if (this.modoEdicao) {
      const index = this.treinamentos.findIndex(t => t.id === this.novoTreinamento.id);
      if (index !== -1) {
        this.treinamentos[index] = { ...(this.novoTreinamento as Treinamento) };
      }
    } else {
      const novoItem: Treinamento = {
        ...(this.novoTreinamento as Treinamento),
        id: Date.now(),
        participantes: this.novoTreinamento.participantes || []
      };
      this.treinamentos.push(novoItem);
    }

    this.fecharModal();
  }

  excluirTreinamento(treinamento: Treinamento): void {
    if (confirm(`Deseja realmente excluir o treinamento "${treinamento.titulo}"?`)) {
      this.treinamentos = this.treinamentos.filter(t => t.id !== treinamento.id);
    }
  }

  // --- MANIPULAÇÃO DE PARTICIPANTES NO MODAL ---

  adicionarParticipanteModal(): void {
    if (this.novoParticipante.nome.trim()) {
      if (!this.novoTreinamento.participantes) {
        this.novoTreinamento.participantes = [];
      }
      this.novoTreinamento.participantes.push({ ...this.novoParticipante });
      this.novoParticipante = { nome: '', setor: '', presenca: false };
    }
  }

  removerParticipanteModal(index: number): void {
    if (this.novoTreinamento.participantes) {
      this.novoTreinamento.participantes.splice(index, 1);
    }
  }

  // --- MODAL DE DETALHES DOS PARTICIPANTES ---

  verParticipantes(treinamento: Treinamento): void {
    this.treinamentoSelecionado = treinamento;
  }

  fecharDetalhes(): void {
    this.treinamentoSelecionado = null;
  }
}