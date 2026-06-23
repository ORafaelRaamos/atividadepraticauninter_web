/* Seleciona todos os elementos com animação de entrada */
const reveals = document.querySelectorAll('.reveal');

/* Seleciona os links da navegação e as seções */
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

/* 
   ANIMAÇÃO DE ENTRADA AO ROLAR A PÁGINA
    */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

/* 
   Destaque do link ativo na nav
   = */
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('ativo'));
            const id = entry.target.getAttribute('id');
            const active = document.querySelector(`nav a[href="#${id}"]`);
            if (active) active.classList.add('ativo');
        }
    });
}, { threshold: 0.5 });

sections.forEach(sec => navObserver.observe(sec));

/* 
   Troca de Tema claro para Tema Escuro 
    */
const btnTema = document.getElementById('btn-tema');

btnTema.addEventListener('click', () => {
    document.body.classList.toggle('tema-claro');

    /* Atualiza o ícone do botão conforme o tema */
    if (document.body.classList.contains('tema-claro')) {
        btnTema.textContent = '☀️';
        btnTema.title = 'Alternar para tema escuro';
    } else {
        btnTema.textContent = '🌙';
        btnTema.title = 'Alternar para tema claro';
    }
});

/* =
   Validação e envio do Formulário
   */
const form = document.querySelector('form');
const msgSucesso = document.getElementById('msg-sucesso');
const msgErro = document.getElementById('msg-erro');

form.addEventListener('submit', (e) => {
    /* Impede o envio padrão do formulário */
    e.preventDefault();

    const nome = document.getElementById('campo-nome').value.trim();
    const email = document.getElementById('campo-email').value.trim();
    const mensagem = document.getElementById('campo-mensagem').value.trim();

    /* Oculta mensagens anteriores */
    msgSucesso.style.display = 'none';
    msgErro.style.display = 'none';

    /* Validação: campos vazios */
    if (nome === '' || email === '' || mensagem === '') {
        msgErro.textContent = 'Por favor, preencha todos os campos.';
        msgErro.style.display = 'block';
        return;
    }

    /* Validação: formato de e-mail */
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        msgErro.textContent = 'Informe um e-mail válido. Ex: usuario@dominio.com';
        msgErro.style.display = 'block';
        return;
    }

    /* Simulação de envio: limpa os campos e exibe sucesso */
    form.reset();
    msgSucesso.style.display = 'block';
});