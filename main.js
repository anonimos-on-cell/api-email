document.getElementById('emailForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');
    const responseMessage = document.getElementById('responseMessage');

    const formData = new FormData(this);

    submitBtn.disabled = true;
    btnText.style.display = 'none';
    spinner.style.display = 'block';
    responseMessage.style.display = 'none';

    try {
        const response = await fetch('/api/enviar-email', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        responseMessage.style.display = 'block';
        if (response.ok && result.success) {
            responseMessage.className = 'alert success';
            responseMessage.textContent = result.message;
            this.reset();
        } else {
            responseMessage.className = 'alert error';
            responseMessage.textContent = result.message || 'Erro ao enviar o e-mail.';
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        responseMessage.style.display = 'block';
        responseMessage.className = 'alert error';
        responseMessage.textContent = 'Erro de conexão com o servidor. Tente novamente.';
    } finally {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        spinner.style.display = 'none';
    }
});