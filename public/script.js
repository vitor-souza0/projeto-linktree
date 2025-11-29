const API_URL = '/api/mensagens';

const formRecado = document.getElementById('form-recado');
const inputAutor = document.getElementById('autor');
const inputMensagem = document.getElementById('mensagem');
const listaRecados = document.getElementById('lista-recados');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// --- [R]EAD ---
async function carregarMensagens() {
    try {
        const response = await fetch(API_URL);
        const mensagens = await response.json();

        listaRecados.innerHTML = '';

        if (mensagens.length === 0) {
            listaRecados.innerHTML = '<p>Nenhum recado ainda. Seja o primeiro!</p>';
            return;
        }

        mensagens.forEach(msg => {
            const item = document.createElement('div');
            item.className = 'recado-item';

            const dataFormatada = new Date(msg.data_criacao).toLocaleString('pt-BR');

            item.innerHTML = `
                <p>${msg.mensagem}</p>
                <div class="info">
                    Enviado por: <strong>${msg.autor}</strong><br>
                    <em>Em: ${dataFormatada}</em>
                </div>
            `;
            listaRecados.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao carregar recados:', error);
        listaRecados.innerHTML = '<p>Erro ao carregar recados.</p>';
    }
}

// --- [C]REATE ---
formRecado.addEventListener('submit', async (e) => {
    e.preventDefault();

    const autor = inputAutor.value.trim();
    const mensagem = inputMensagem.value.trim();

    if (!autor || !mensagem) {
        alert('Preencha nome e recado.');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ autor, mensagem }),
        });

        if (response.ok) {
            inputAutor.value = '';
            inputMensagem.value = '';
            await carregarMensagens();
        } else {
            alert('Erro ao enviar recado.');
        }
    } catch (error) {
        console.error('Erro ao enviar recado:', error);
    }
});

// --- Dark Mode ---
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', carregarMensagens);
