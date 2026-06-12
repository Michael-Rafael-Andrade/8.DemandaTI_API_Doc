const { Demanda } = require('../model/modelos.js');

// Lista todas as demandas, suporta filtro por status via query string
exports.listar = async function (req, res) {
    try {
        // cria objeto para filtro, se houver status válido na query string
        var where = {};
        const status_permitidos = [
            'pendente',
            'em_andamento',
            'concluido'
        ];
        if (req.query.status && status_permitidos.includes(req.query.status)) {
            where = {
                status: req.query.status
            }
        }

        const demandas = await Demanda.findAll({
            where, order: [['criada_em', 'DESC']]
        });
        return res.json(demandas);
    } catch (error) {
        console.error('Erro ao listar demandas: ', error);
        return res.status(500).json({ error: 'Erro ao listar demandas' });
    }
};

// Recupera uma demanda por id
exports.obter = async function (req, res) {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const demanda = await Demanda.findByPk(id);
        if (!demanda) {
            return res.status(404).json({ error: 'Demanda não encontrada' });
        }
        return res.json(demanda);
    } catch (error) {
        console.error('Erro ao recuperar demanda: ', error);
        return res.status(500).json({ error: 'Erro ao recuperar demanda' });
    }
};

// Cria uma nova demanda
exports.criar = async function (req, res) {
    // obtém dados via req.body também
    const demanda_enviada = {
        titulo: req.body.titulo,
        texto: req.body.texto,
        urgencia: req.body.urgencia,
        // status padrão 'pendente', definido no modelo
    };

    const errors = [];
    if (!demanda_enviada.titulo || demanda_enviada.titulo.trim() === '') {
        errors.push({ msg: 'Título é obrigatório' });
    }
    if (!demanda_enviada.texto || demanda_enviada.texto.trim() === '') {
        errors.push({ msg: 'Texto é obrigatório' });
    }
    const urg = Number(demanda_enviada.urgencia);
    if (!demanda_enviada.urgencia || Number.isNaN(urg) || urg < 1 || urg > 5) {
        errors.push({ msg: 'Urgência deve ser um número entre 1 e 5' });
    }

    if (errors.length > 0)
        return res.status(400).json({ errors });
    // Se passar de todas as validações vamos tentar salvar no banco de dados
    try {
        const nova_demanda = await Demanda.create({ titulo: demanda_enviada.titulo, texto: demanda_enviada.texto, urgencia: urg, usuario_id: req.user.id }); // inserir usuario_id: req.user.id para validação
        // código HTTP para criação de registro é 201 Created
        return res.status(201).json(nova_demanda);
    } catch (error) {
        console.error('Erro ao criar demanda:', error);
        return res.status(500).json({ error: 'Erro ao criar demanda' });
    }
};

// Atualiza uma demanda (aceita atualização parcial de campos relevantes)
exports.atualizar = async function (req, res) {
    const id_demanda = Number(req.params.id);

    // obtém dados via req.body também
    const demanda_enviada = {
        titulo: req.body.titulo,
        texto: req.body.texto,
        urgencia: req.body.urgencia,
        status: req.body.status,
    };

    if (!id_demanda || Number.isNaN(id_demanda) || !Number.isInteger(id_demanda) || id_demanda <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const errors = [];

    if (demanda_enviada.titulo !== undefined) {
        // Verifica se o campo foi enviado na requisição
        if (!demanda_enviada.titulo || demanda_enviada.titulo.trim() === '') {
            errors.push({ msg: 'Título é obrigatório' });
        }
    }

    if (demanda_enviada.texto !== undefined) {
        // Verifica se o campo foi enviado na requisição
        if (!demanda_enviada.texto || demanda_enviada.texto.trim() === '') {
            errors.push({ msg: 'Texto é obrigatório' });
        }
    }

    if (demanda_enviada.urgencia !== undefined) {
        // Verifica se o campo foi enviado na requisição
        const urg = Number(demanda_enviada.urgencia);
        if (!demanda_enviada.urgencia || Number.isNaN(urg) || urg < 1 || urg > 5) {
            errors.push({ msg: 'Urgência deve ser um número entre 1 e 5' });
        }
    }

    if (demanda_enviada.status !== undefined) {
        // Verifica se o campo foi enviado na requisição
        const status_permitidos = ['pendente', 'em_andamento', 'concluido'];
        if (!status_permitidos.includes(demanda_enviada.status)) {
            errors.push({ msg: 'Status inválido' });
        }
    }
    const status_permitidos = ['pendente', 'em_andamento', 'concluido'];
    if (!status_permitidos.includes(demanda_enviada.status)) {
        errors.push({ msg: 'Status inválido' });
    }

    if (errors.length > 0) return res.status(400).json({ errors });

    try {
        const demanda = await Demanda.findByPk(id_demanda);

        if (!demanda)
            return res.status(404).json({ error: 'Demanda não encontrada' });

        await demanda.update(demanda_enviada);

        return res.status(200).json(demanda);
    } catch (error) {
        console.error('Erro ao atualizar demanda: ', error);
        return res.status(500).json({ error: 'Erro ao atualizar demanda' });
    }
};

// Remove uma demanda
exports.deletar = async function (req, res) {
    const id = Number(req.params.id); // Pegar o id vindo do método GET na URL

    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const demanda_deletada = await Demanda.destroy({ where: { id } });
        if (demanda_deletada === 0)
            return res.status(404).json({ error: 'Demanda não encontrada' });

        // Código HTTP para resposta sem conteúdo é 204 No Content ( Resposta envio para aplicação que esta usando o meu serviço mas neste caso não envio nenhum conteúdo )
        return res.status(204).end(); // end(); fecha a conexão e não envio nenhum dado.
    } catch (error) {
        console.error('Erro ao deletar demanda: ', error);
        return res.status(500).json({ error: 'Erro ao deletar demanda' });
    }
};