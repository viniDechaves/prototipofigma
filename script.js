function checkAnswer(direcao, index) {
    var resposta = document.getElementById(direcao + '-' + index).querySelectorAll('input');
    var palavra = '';

    for (var i = 0; i < resposta.length; i++) {
        palavra += resposta[i].value;
    }

    if ((direcao === 'horizontal' && palavra === 'CASA') || (direcao === 'vertical' && palavra === 'CARRO')) {
        document.getElementById('result').textContent = 'Você acertou!';
    } else {
        document.getElementById('result').textContent = '';
    }
}
