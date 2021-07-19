import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '61728e10a990d59dc518897e9b60b7';
        const client = new SiteClient(TOKEN);

        // Validar dados antes de sair cadastrando
        const registroCriado = await client.items.create ({
            itemType: "972643", //ID Model de comunidades criado pelo Dato
            ...request.body,
            // title: "Comunidade Teste",
            // imageUrl: "https://567.cdn.simplo7.net/static/567/sku/155904889667441.png" 
        })
        console.log(registroCriado);

        response.json({
            dados: 'Teste',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem.'
    })
    
}