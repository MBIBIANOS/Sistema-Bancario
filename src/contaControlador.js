const bancoDeDados = require('./bancoDeDados');

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  // Verificar se todos os campos foram informados
  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  // Verificar se já existe outro registro com o mesmo CPF
  if (bancoDeDados.existeContaComCPF(cpf)) {
    return res.status(400).json({ mensagem: 'Já existe uma conta com o CPF informado.' });
  }

  // Verificar se já existe outro registro com o mesmo E-mail
  if (bancoDeDados.existeContaComEmail(email)) {
    return res.status(400).json({ mensagem: 'Já existe uma conta com o E-mail informado.' });
  }

  // Criar uma nova conta
  const conta = bancoDeDados.criarConta(nome, cpf, data_nascimento, telefone, email, senha);

  res.status(201).json({
    numero: conta.numero,
    saldo: conta.saldo,
    usuario: {
      nome: conta.usuario.nome,
      cpf: conta.usuario.cpf,
      data_nascimento: conta.usuario.data_nascimento,
      telefone: conta.usuario.telefone,
      email: conta.usuario.email,
      senha: conta.usuario.senha
    }
  });
};

const atualizarUsuarioConta = (req, res) => {
  const numeroConta = req.params.numeroConta;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  // Verificar se foi passado, ao menos, um campo no body da requisição
  if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
    return res.status(400).json({ mensagem: 'É necessário informar ao menos um campo para atualização.' });
  }

  // Verificar se o numero da conta passado como parametro na URL é válido
  if (!bancoDeDados.existeConta(numeroConta)) {
    return res.status(404).json({ mensagem: 'Conta não encontrada.' });
  }

  // Verificar se o CPF já existe em outro registro
  if (cpf && bancoDeDados.existeOutraContaComCPF(numeroConta, cpf)) {
    return res.status(400).json({ mensagem: 'Já existe outra conta com o CPF informado.' });
  }

  // Verificar se o E-mail já existe em outro registro
  if (email && bancoDeDados.existeOutraContaComEmail(numeroConta, email)) {
    return res.status(400).json({ mensagem: 'Já existe outra conta com o E-mail informado.' });
  }

  // Atualizar os campos do usuário da conta bancária
  bancoDeDados.atualizarUsuarioConta(numeroConta, nome, cpf, data_nascimento, telefone, email, senha);

  res.status(200).json({ mensagem: 'Conta atualizada com sucesso!' });
};

const excluirConta = (req, res) => {
  const numeroConta = req.params.numeroConta;

  // Verificar se o numero da conta passado como parametro na URL é válido
  if (!bancoDeDados.existeConta(numeroConta)) {
    return res.status(404).json({ mensagem: 'Conta não encontrada.' });
  }

  // Excluir a conta bancária
  bancoDeDados.excluirConta(numeroConta);

  res.status(200).json({ mensagem: 'Conta excluída com sucesso!' });
};

const saldo = (req, res) => {
  const numeroConta = req.query.numero_conta;
  const senha = req.query.senha;

  // Verificar se o numero da conta e a senha foram informadas
  if (!numeroConta || !senha) {
    return res.status(400).json({ mensagem: 'Número da conta e senha são obrigatórios.' });
  }

  // Verificar se a conta bancária informada existe
  if (!bancoDeDados.existeConta(numeroConta)) {
    return res.status(404).json({ mensagem: 'Conta não encontrada.' });
  }

  // Verificar se a senha informada é válida para a conta bancária
  if (!bancoDeDados.validarSenha(numeroConta, senha)) {
    return res.status(400).json({ mensagem: 'Senha inválida.' });
  }

  // Consultar o saldo da conta bancária
  const saldo = bancoDeDados.consultarSaldo(numeroConta);

  res.status(200).json({ saldo: saldo });
};

const extrato = (req, res) => {
  const numeroConta = req.query.numero_conta;
  const senha = req.query.senha;

  // Verificar se o numero da conta e a senha foram informadas
  if (!numeroConta || !senha) {
    return res.status(400).json({ mensagem: 'Número da conta e senha são obrigatórios.' });
  }

  // Verificar se a conta bancária informada existe
  if (!bancoDeDados.existeConta(numeroConta)) {
    return res.status(404).json({ mensagem: 'Conta não encontrada.' });
  }

  // Verificar se a senha informada é válida para a conta bancária
  if (!bancoDeDados.validarSenha(numeroConta, senha)) {
    return res.status(400).json({ mensagem: 'Senha inválida.' });
  }

  // Consultar o extrato da conta bancária
  const extrato = bancoDeDados.consultarExtrato(numeroConta);

  res.status(200).json(extrato);
};

const listarContas = (req, res) => {
    const contas = bancoDeDados.listarContas();
    res.status(200).json(contas);
  };
  

module.exports = {
  criarConta,
  atualizarUsuarioConta,
  excluirConta,
  saldo,
  extrato,
  listarContas,
};
