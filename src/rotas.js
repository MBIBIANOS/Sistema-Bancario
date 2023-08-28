const express = require('express');
const router = express.Router();
const {
  criarConta,
  atualizarUsuarioConta,
  excluirConta,
  saldo,
  extrato,
  listarContas,
} = require('./contaControlador');
const {
  depositar,
  sacar,
  transferir,
} = require('./transacaoControlador');

// Rota para criar uma nova conta bancária
router.post('/contas', criarConta);

// Rota para atualizar os dados do usuário de uma conta bancária
router.put('/contas/:numeroConta/usuario', atualizarUsuarioConta);

// Rota para excluir uma conta bancária
router.delete('/contas/:numeroConta', excluirConta);

// Rota para obter o saldo de uma conta bancária
router.get('/contas/saldo', saldo);

// Rota para obter o extrato de uma conta bancária
router.get('/contas/extrato', extrato);

// Rota para depositar em uma conta bancária
router.post('/transacoes/depositar', depositar);

// Rota para sacar de uma conta bancária
router.post('/transacoes/sacar', sacar);

// Rota para transferir entre contas bancárias
router.post('/transacoes/transferir', transferir);

// Rota para listar todas as contas
router.get('/contas', listarContas);

module.exports = router;
