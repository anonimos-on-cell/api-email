// const express = require('express');
// const app = express();

// // Porta onde a API vai rodar
// const PORT = 4000;

// // Middleware para entender JSON no corpo da requisição
// app.use(express.json());

// // Rota POST para receber o envio de textos ou códigos
// app.post('/enviar', (req, res) => {
//     const { tipo, destinatario, conteudo } = req.body;

//     // Validação básica dos campos
//     if (!tipo || !conteudo) {
//         return res.status(400).json({ 
//             erro: 'Os campos "tipo" e "conteudo" são obrigatórios.' 
//         });
//     }

//     // Simulação de processamento (aqui você integraria com Twilio, Email, etc)
//     console.log(`[LOG] Tipo: ${tipo}`);
//     console.log(`[LOG] Destinatário: ${destinatario || 'Não informado'}`);
//     console.log(`[LOG] Conteúdo: ${conteudo}`);

//     // Resposta de sucesso da API
//     return res.status(200).json({
//         sucesso: true,
//         mensagem: 'Dado recebido e processado com sucesso!',
//         dadosRecebidos: { tipo, destinatario, conteudo }
//     });
// });



// // Iniciar o servidor
// app.listen(PORT, () => {
//     console.log(`Servidor rodando em http://localhost:${PORT}`);
// });




