import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './estoque.html',
  styleUrl: './estoque.css'
})
export class Estoque {


  movimentacao = {
    epi: 'Capacete de Segurança',
    tipo: 'Entrada',
    quantidade: 0,
    responsavel: ''
  };


  equipamentos = [
    {
      nome: 'Capacete de Segurança',
      categoria: 'Proteção da cabeça',
      quantidade: 50,
      minimo: 20,
      status: 'Disponível'
    },

    {
      nome: 'Luva de Proteção',
      categoria: 'Proteção das mãos',
      quantidade: 15,
      minimo: 30,
      status: 'Baixo'
    },

    {
      nome: 'Óculos de Proteção',
      categoria: 'Proteção ocular',
      quantidade: 85,
      minimo: 20,
      status: 'Disponível'
    }
  ];



  historico = [
    {
      data: '29/07/2026',
      tipo: 'Entrada',
      epi: 'Capacete de Segurança',
      quantidade: 50,
      responsavel: 'Administrador'
    }
  ];



  salvarMovimentacao() {


    const equipamento = this.equipamentos.find(
      item => item.nome === this.movimentacao.epi
    );


    if (!equipamento) {
      return;
    }



    if (this.movimentacao.tipo === 'Entrada') {

      equipamento.quantidade += Number(this.movimentacao.quantidade);

    } else {

      equipamento.quantidade -= Number(this.movimentacao.quantidade);

    }



    equipamento.status =
      equipamento.quantidade <= equipamento.minimo
        ? 'Baixo'
        : 'Disponível';



    this.historico.push({

      data: new Date().toLocaleDateString(),

      tipo: this.movimentacao.tipo,

      epi: this.movimentacao.epi,

      quantidade:
        this.movimentacao.tipo === 'Entrada'
          ? this.movimentacao.quantidade
          : -this.movimentacao.quantidade,

      responsavel: this.movimentacao.responsavel

    });



    this.movimentacao.quantidade = 0;
    this.movimentacao.responsavel = '';

  }


}