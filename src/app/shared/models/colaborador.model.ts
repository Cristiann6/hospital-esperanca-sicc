export type StatusColaborador = 'Ativo' | 'Inativo';

export interface Colaborador {
  id: number;
  matricula: string;
  nome: string;
  cpf: string;
  setor: string;
  funcao: string;
  admissao: string;
  contato: string;
  status: StatusColaborador;
}
