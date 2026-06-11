const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../model/modelos');
const { JWT_SECRET } = require('../config/passport');

// Cadastra um novo usuário
exports.cadastro = async function (req, res) {
    const novo_usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
    };

    const errors = [];

    if (!novo_usuario.nome || novo_usuario.nome.trim() === '') {
        errors.push({
            msg: 'Nome é obrigatório'
        });
    }

    // tratamento para normalizar o email, removendo espaços e convertendo para minúsculas
    const email_normalizado = (novo_usuario.email || '').trim().toLowerCase();

    // recurso para tentar identificar emails válidos
    const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email_normalizado || !regex_email.test(email_normalizado)) {
        errors.push({
            msg: 'E-mail inválido'
        });
    }

    if (!novo_usuario.senha || novo_usuario.senha.length < 6) {
        errors.push({
            msg: 'Senha deve ter no mínimo 6 caracteres'
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            errors
        });
    }

    try {
        const usuario_existente = await Usuario.findOne({
            where: {
                email: email_normalizado
            }
        });
        if (usuario_existente) {
            return res.status(400).json({
                errors: [{
                    msg: 'Já existe um usuário cadastrado com este e-mail'
                }]
            });
        }

        // geração de hash da senha com bcypt, utilizando 10 round de salt (padrão recomendado)
        const senha_hash = await bcrypt.hash(novo_usuario.senha, 10);

        const usuario_criado = await Usuario.create({
            nome: novo_usuario.nome,
            email: email_normalizado,
            senha_hash: senha_hash,
        });

        // retorna os dados do usuário criado, sem expo a senha_hash
        return res.status(201).json({
            id: usuario_criado.id,
            nome: usuario_criado.nome,
            email: usuario_criado.email,
            perfil: usuario_criado.perfil,
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário: ', error);
        return res.status(500).json({
            error: 'Erro ao cadastrar usuário'
        });
    }
};

// Autentica um usuário e retorna um token JWT
// Aqui fazemos a verificação manual com bcrypt e geramos o token com jwt.sign().
exports.login = async function(req, res){
    const email_normalizado = (req.body.email || '').trim().toLowerCase();
    const senha = req.body.senha;

    if(!email_normalizado || !senha){
        return res.status(400).json({
            errors: [{
                msg: 'E-mail e senha são obrigatórios'
            }]
        });
    }

    try {
        // busca o usuário pelo e-mail no banco
        const usuario = await Usuario.findOne({
            where: {
                email: email_normalizado
            }
        });

        if(!usuario){
            return res.status(401).json({
                errors: [{
                    msg: 'Credenciais inválidas'
                }]
            });
        }

        // verifica se a senha enviada corresponde ao hash armazenado
        const senha_valida = await bcrypt.compare(senha, usuario.senha_hash);
        if(!senha_valida){
            return res.status(401).json({
                errors: [{
                    msg: 'Credenciais inválidas'
                }]
            });
        }

        // gera o token JWT com id e perfil do usuário no payload
        // expiresIn: '24h' - token expira em 24 horas
        const token = jwt.sign(
            {   
                id: usuario.id,
                perfil: usuario.perfil
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil,
            },
        });
    } catch (error){
        console.error('Erro ao fazer login: ', error);
        return res.status(500).json({
            error: 'Erro ao fazer login'
        });
    }
};