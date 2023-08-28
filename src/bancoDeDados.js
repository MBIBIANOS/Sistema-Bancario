const contas = [];

const criarConta = (nome, cpf, data_nascimento, telefone, email, senha) => {
  const numero = contas.length + 1;
  const conta = {
    numero: numero,
    saldo: 0,
    usuario: {
      nome: nome,
      cpf: cpf,
      data_nascimento: data_nascimento,
      telefone: telefone,
      email: email,
      senha: senha,
    },
    transacoes: [], // Incluir o array de transações no objeto de conta
  };
  contas.push(conta);
  return conta;
};

const existeContaComCPF = (cpf) => {
  return contas.some((conta) => conta.usuario.cpf === cpf);
};

const existeContaComEmail = (email) => {
  return contas.some((conta) => conta.usuario.email === email);
};

const existeOutraContaComCPF = (numeroConta, cpf) => {
  return contas.some((conta) => conta.numero !== numeroConta && conta.usuario.cpf === cpf);
};

const existeOutraContaComEmail = (numeroConta, email) => {
  return contas.some((conta) => conta.numero !== numeroConta && conta.usuario.email === email);
};

const existeConta = (numeroConta) => {
  return contas.some((conta) => conta.numero === numeroConta);
};

const validarSenha = (numeroConta, senha) => {
  const conta = contas.find((conta) => conta.numero === numeroConta);
  return conta.usuario.senha === senha;
};

const atualizarUsuarioConta = (numeroConta, nome, cpf, data_nascimento, telefone, email, senha) => {
  const conta = contas.find((conta) => conta.numero === numeroConta);
  if (nome) {
    conta.usuario.nome = nome;
  }
  if (cpf) {
    conta.usuario.cpf = cpf;
  }
  if (data_nascimento) {
    conta.usuario.data_nascimento = data_nascimento;
  }
  if (telefone) {
    conta.usuario.telefone = telefone;
  }
  if (email) {
    conta.usuario.email = email;
  }
  if (senha) {
    conta.usuario.senha = senha;
  }
};

const excluirConta = (numeroConta) => {
  const index = contas.findIndex((conta) => conta.numero === numeroConta);
  contas.splice(index, 1);
};

const consultarSaldo = (numeroConta) => {
  const conta = contas.find((conta) => conta.numero === numeroConta);
  return conta.saldo;
};

const depositar = (numeroConta, valor) => {
  const conta = contas.find((conta) => conta.numero === numeroConta);
  conta.saldo += valor;
  
  const transacao = {
    tipo: "deposito",
    valor: valor,
    data: new Date().toISOString()
  };
  conta.transacoes.push(transacao);
};

const sacar = (numeroConta, valor) => {
  const conta = contas.find((conta) => conta.numero === numeroConta);
  conta.saldo -= valor;
  
  const transacao = {
    tipo: "saque",
    valor: valor,
    data: new Date().toISOString()
  };
  conta.transacoes.push(transacao);
};

const transferir = (numeroContaOrigem, numeroContaDestino, valor) => {
  const contaOrigem = contas.find((conta) => conta.numero === numeroContaOrigem);
  const contaDestino = contas.find((conta) => conta.numero === numeroContaDestino);
  contaOrigem.saldo -= valor;
  contaDestino.saldo += valor;
  
  const transacaoEnviada = {
    tipo: "transferencia",
    valor: valor,
    data: new Date().toISOString(),
    contaOrigem: numeroContaOrigem,
    contaDestino: numeroContaDestino
  };
  const transacaoRecebida = {
    tipo: "transferencia",
    valor: valor,
    data: new Date().toISOString(),
    contaOrigem: numeroContaOrigem,
    contaDestino: numeroContaDestino
  };
  contaOrigem.transacoes.push(transacaoEnviada);
  contaDestino.transacoes.push(transacaoRecebida);
};

const consultarExtrato = (numeroConta) => {
  const conta = contas.find((conta) => conta.numero === numeroConta);
  const extrato = {
    depositos: [],
    saques: [],
    transferenciasEnviadas: [],
    transferenciasRecebidas: [],
  };

  // Filtrar as transações relacionadas à conta no extrato
  for (const transacao of conta.transacoes) {
    if (transacao.tipo === "deposito") {
      extrato.depositos.push(transacao);
    } else if (transacao.tipo === "saque") {
      extrato.saques.push(transacao);
    } else if (transacao.tipo === "transferencia") {
      if (transacao.contaOrigem === numeroConta) {
        extrato.transferenciasEnviadas.push(transacao);
      } else if (transacao.contaDestino === numeroConta) {
        extrato.transferenciasRecebidas.push(transacao);
      }
    }
  }

  return extrato;
};

const listarContas = () => {
  return contas;
};

const temSaldoSuficiente = (numeroConta, valor) => {
  const conta = contas.find((conta) => conta.numero === numeroConta);

  if (!conta) {
    return false; // Conta não encontrada
  }

  return conta.saldo >= valor;
};

module.exports = {
  contas,
  criarConta,
  existeContaComCPF,
  existeContaComEmail,
  existeOutraContaComCPF,
  existeOutraContaComEmail,
  existeConta,
  validarSenha,
  atualizarUsuarioConta,
  excluirConta,
  consultarSaldo,
  depositar,
  sacar,
  transferir,
  consultarExtrato,
  listarContas,
  temSaldoSuficiente,
};
