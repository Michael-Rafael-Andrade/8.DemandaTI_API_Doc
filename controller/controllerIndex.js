// retorna informações sobre o serviço e sua disponibilidade
exports.index = async function (req, res) {
    const resposta = {
        nome: "API de Demandas de TI",
        status: "online",
        timestamp: new Date().toLocaleString(),
        versao: '1.0',
        ambiente: "desenvolvimento"
    }

    /* Cache - utilizamos o "no-store" para impedir que esta informação seja armazenada em cache*/
    // configuração de cache HTTP para não permitir cacheamento da resposta
    res.set('Cache-Control', 'no-store');

    return res.json(resposta);
};

// retorna a lista de serviços implementados
exports.lista_servicos = async function( req, res ){
    const servicos = [
        { funcionalidade: 'Informações do Serviço', rota: '/' },
        { funcionalidade: 'Lista de Serviços', rota: '/servicos'},
        { funcionalidade: 'Listar Demandas', rota: '/api/demandas'},
        { funcionalidade: 'Obter Demanda', rota: '/api/demandas/:id'},
        { funcionalidade: 'Criar Demanda', rota: '/api/demandas'},
        { funcionalidade: 'Atualizar Demanda', rota: '/api/demandas/:id'},
        { funcionalidade: 'Excluir Demanda', rota: '/api/demandas/:id'},
    ]

    // configuração de cache HTTP
    res.set('Cache-Control', 'no-cache, public');

    return res.json(servicos);
};

