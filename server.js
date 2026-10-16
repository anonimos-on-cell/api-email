require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: 'Muitos e-mails enviados a partir deste IP. Tente novamente mais tarde.' }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/api/enviar-email', emailLimiter, upload.single('anexo'), async (req, res) => {
    let filePath = null;

    try {
        const { to, subject, message } = req.body;
        filePath = req.file ? req.file.path : null;

        if (!to || !subject || !message) {
            if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
            return res.status(400).json({ 
                success: false, 
                message: 'Preencha todos os campos obrigatórios (destinatário, assunto e mensagem).' 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) {
            if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
            return res.status(400).json({ 
                success: false, 
                message: 'E-mail do destinatário inválido.' 
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: process.env.SMTP_PORT == '465',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: \`"Sistema de Envio" <\${process.env.SMTP_USER}>\`,
            to: to,
            subject: subject,
            html: \`<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">\${message}</div>\`,
            attachments: filePath ? [{ filename: req.file.originalname, path: filePath }] : []
        };

        await transporter.sendMail(mailOptions);

        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return res.status(200).json({ 
            success: true, 
            message: 'E-mail enviado com sucesso!' 
        });

    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        if (filePath && fs.existsSync(filePath)) {
            try { fs.unlinkSync(filePath); } catch (e) {}
        }
        return res.status(500).json({ 
            success: false, 
            message: 'Erro interno ao tentar enviar o e-mail. Verifique as configurações do servidor.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(\`🚀 Servidor rodando na porta \${PORT} (http://localhost:\${PORT})\`);
});