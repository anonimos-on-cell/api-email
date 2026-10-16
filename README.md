# 📧 Sistema de Envio de E-mail

Aplicação Full Stack desenvolvida em **Node.js** com **Express** e **Nodemailer**, contendo uma interface web responsiva para o disparo automatizado de e-mails com suporte a HTML e anexos.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18 ou superior) instalado em sua máquina.

### Passo 1: Instalação das Dependências
Na pasta raiz do projeto, execute o seguinte comando no terminal:
```bash
npm install
```

### Passo 2: Configuração das Variáveis de Ambiente
1. Duplique o arquivo `.env.example` e renomeie a cópia para `.env`.
2. Preencha com as credenciais do seu provedor de e-mail (ex: Gmail, SendGrid, Mailgun, etc.):
```env
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
```
> **Nota para usuários do Gmail:** É necessário gerar uma **Senha de App (App Password)** nas configurações de segurança da sua Conta Google, pois senhas normais não funcionam com autenticação de dois fatores ativa.

### Passo 3: Executar a Aplicação
Inicie o servidor local:
```bash
npm start
```
Ou em modo de desenvolvimento (com reinicialização automática):
```bash
npm run dev
```

Abra o seu navegador e acesse: `http://localhost:3000`