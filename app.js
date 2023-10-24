let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

function exibirTextos(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagensIniciais() {
    exibirTextos('h1', 'Jogo do número secreto');
    exibirTextos('p', 'Escolha um número de 1 a 10');
}

exibirMensagensIniciais();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextos('h1', 'Acertou, parabéns.');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextos('p', msgTentativas);

        document.querySelector('#reiniciar').removeAttribute('disabled');
    } else {
        if (chute)
            if (chute > numeroSecreto) {
                exibirTextos('p', 'O número secreto é menor')
            } else {
                exibirTextos('p', 'O número secreto é maior')
            }
        tentativas++;
        limparCampos();
    }
}

verificarChute();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtsDeElementosNaLista = listaDeNumeroSorteados.length;

    if (qtsDeElementosNaLista == numeroLimite) {
        listaDeNumeroSorteados = [];
    }

    if(listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampos() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampos();
    tentativas = 0;
    exibirMensagensIniciais();
    document.querySelector('#reiniciar').setAttribute('disabled', true);
}