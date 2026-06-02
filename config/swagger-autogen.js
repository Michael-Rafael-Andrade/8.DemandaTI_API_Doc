const swaggerAutogen = require('swagger-autogen')();

const doc = {
    // informações básicas da API
    info: {
        title: 'DemandasTI API',
        version: '1.0.0',
        description: 'API REST para gerenciamento de demandas de TI',
    },

    // servidor onde a API está disponível
    host: 'localhost:3000',

    // protocolo usado(http ou https)
    schemes: ['http'],

    // Schemas/Modelos de Dados utilizados nos serviços da API
    definitions: {

        // retorno completo de uma demanda, usado nas respostas
        Demanda: {
            id: 1,
            titulo: 'Instalar impressora',
            texto: 'Necessário instalar driver da impressora HP',
            urgencia: 3,
            status: 'pendente',
            criada_em: '2026-05-27T10:00:00.000Z',
            atualizada_em: '2026-05-27T10:00:00.000Z',
        },

        // dados necessários para criar uma nova demanda (POST)
        NovaDemanda: {
            $titulo: 'Instala impressora',   // $ = campo obrigatório
            $texto: 'Necessário instalar driver da impressora HP', // $ = campo obrigatório
            $urgencia: 3,  // $ = campo obrigatório
        },

        // dados opcionais para atualizar uma demanda (PUT)
        atualizarDemanda: {
            titulo: 'instalar impressora',  // não tem o $ porque os campos podem ser opcionais
            texto: 'Driver atualizado',
            urgencia: 2,
            status: 'em_andamento',
        },
    },
};

// local de criação do arquivo de documentação gerado
const arquivo_saida = './config/swagger_output.json';

// arquivos onde estão definidas as rotas da API
// swagger se você quer conhecer os arquivos do meu serviço deve procurar na rota app.js (Leitura)
const arquivo_rotas = ['./app.js'];

// gerando a documentação a partir dos comentários @swagger nos arquivos de rotas
swaggerAutogen(arquivo_saida, arquivo_rotas, doc);