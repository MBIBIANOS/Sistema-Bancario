const bancoDeDados = require('./bancoDeDados');

const depositar = (req, res) => {
  const numeroConta = req.body.numero_conta;
  const valor = req.body.valor;

  // Verificar se o numero da conta e o valor do depósito foram informados
  if (!numeroConta || !valor) {
    return res.status(400).json({ mensagem: 'Número da conta e valor são obrigatórios.' });
  }

  // Verificar se a conta bancária informada existe
  if (!bancoDeDados.existeConta(numeroConta)) {
    return res.status(404).json({ mensagem: 'Conta não encontrada.' });
  }

  // Verificar se o valor do depósito é válido
  if (valor <= 0) {
    return res.status(400).json({ mensagem: 'Valor de depósito inválido.' });
  }

  // Realizar o depósito na conta bancária
  bancoDeDados.depositar(numeroConta, valor);

  res.status(200).json({ mensagem: 'Depósito realizado com sucesso!' });
};

const sacar = (req, res) => {
  const numeroConta = req.body.numero_conta;
  const valor = req.body.valor;
  const senha = req.body.senha;

  // Verificar se o numero da conta, o valor do saque e a senha foram informados
  if (!numeroConta || !valor || !senha) {
    return res.status(400).json({ mensagem: 'Número da conta, valor e senha são obrigatórios.' });
  }

  // Verificar se a conta bancária informada existe
  if (!bancoDeDados.existeConta(numeroConta)) {
    return res.status(404).json({ mensagem: 'Conta não encontrada.' });
  }

  // Verificar se a senha informada é uma senha válida para a conta informada
  if (!bancoDeDados.validarSenha(numeroConta, senha)) {
    return res.status(400).json({ mensagem: 'Senha inválida.' });
  }

  // Verificar se há saldo disponível para saque
  if (!bancoDeDados.temSaldoSuficiente(numeroConta, valor)) {
    return res.status(400).json({ mensagem: 'Saldo insuficiente.' });
  }

  // Realizar o saque da conta bancária
  bancoDeDados.sacar(numeroConta, valor);

  res.status(200).json({ mensagem: 'Saque realizado com sucesso!' });
};

const transferir = (req, res) => {
  const numeroContaOrigem = req.body.numero_conta_origem;
  const numeroContaDestino = req.body.numero_conta_destino;
  const valor = req.body.valor;
  const senha = req.body.senha;

  // Verificar se o número da conta de origem, de destino, senha da conta de origem e valor da transferência foram informados
  if (!numeroContaOrigem || !numeroContaDestino || !valor || !senha) {
    return res.status(400).json({ mensagem: 'Número da conta de origem, número da conta de destino, valor e senha são obrigatórios.' });
  }

  // Verificar se a conta bancária de origem informada existe
  if (!bancoDeDados.existeConta(numeroContaOrigem)) {
    return res.status(404).json({ mensagem: 'Conta de origem não encontrada.' });
  }

  // Verificar se a conta bancária de destino informada existe
  if (!bancoDeDados.existeConta(numeroContaDestino)) {
    return res.status(404).json({ mensagem: 'Conta de destino não encontrada.' });
  }

  // Verificar se a senha informada é uma senha válida para a conta de origem informada
  if (!bancoDeDados.validarSenha(numeroContaOrigem, senha)) {
    return res.status(400).json({ mensagem: 'Senha inválida.' });
  }

  // Verificar se há saldo disponível na conta de origem para a transferência
  if (!bancoDeDados.temSaldoSuficiente(numeroContaOrigem, valor)) {
    return res.status(400).json({ mensagem: 'Saldo insuficiente.' });
  }

  // Realizar a transferência de recursos entre contas
  bancoDeDados.transferir(numeroContaOrigem, numeroContaDestino, valor);

  res.status(200).json({ mensagem: 'Transferência realizada com sucesso!' });
};

module.exports = {
  depositar,
  sacar,
  transferir,
};
