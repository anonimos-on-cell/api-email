# 🏛️ Documentação de Arquitetura - Sistema de Envio de E-mail

Este documento descreve as decisões técnicas, fluxo de dados e práticas de segurança adotadas no desenvolvimento do sistema.

---

## 1. Escolha Tecnológica
* **Back-end:** Node.js + Express. Escolhido por sua alta performance em I/O assíncrono e ecossistema maduro.
* **Biblioteca de E-mail:** Nodemailer. O padrão da indústria em Node.js para envio seguro via SMTP, suporte nativo a streams, HTML e anexos múltiplos.
* **Uploads:** Multer. Middleware eficiente para manipulação de `multipart/form-data`, permitindo o recebimento seguro de anexos em disco temporário antes do disparo.
* **Front-end:** HTML5, CSS3 Moderno (Variáveis CSS/Flexbox) e JavaScript Vanilla (Fetch API) para evitar dependências pesadas de frameworks, garantindo leveza e carregamento instantâneo.

---

## 2. Fluxo de Dados (Data Flow)
1. **Preenchimento:** O usuário preenche os campos na interface web (`index.html`) e opcionalmente seleciona um arquivo.
2. **Submissão via AJAX:** O JavaScript (`main.js`) intercepta o evento de submit e envia os dados via `FormData` (`POST /api/enviar-email`).
3. **Recepção e Validação (Server-side):**
   * O `server.js` valida se os campos obrigatórios estão preenchidos e se o e-mail do destinatário é válido.
   * O middleware **Multer** armazena o arquivo temporariamente na pasta `/uploads`.
4. **Disparo SMTP:** O **Nodemailer** monta o payload da mensagem (com HTML e anexo) e conecta-se ao servidor SMTP externo utilizando as credenciais protegidas do arquivo `.env`.
5. **Limpeza e Resposta:**
   * Após o sucesso ou falha do envio, o arquivo temporário salvo no disco é imediatamente apagado (`fs.unlinkSync`), evitando vazamento de espaço em disco.
   * Uma resposta JSON é retornada ao front-end para exibir o feedback visual adequado ao usuário.

---

## 3. Boas Práticas e Segurança Aplicadas
* **Proteção de Credenciais:** Uso rigoroso de variáveis de ambiente (`dotenv`) para evitar o hardcoding de senhas e chaves de API no código-fonte.
* **Rate Limiting:** Implementação de `express-rate-limit` para mitigar ataques de negação de serviço (DoS) ou abuso de disparo em massa a partir de um único IP.
* **Validação de Entrada:** Validação de formato de e-mail e sanitização de campos críticos tanto no front-end quanto no back-end.
* **Gerenciamento de Arquivos Temporários:** Arquivos anexados são limpos automaticamente do servidor após o envio ou em caso de exceções, preservando recursos do sistema.