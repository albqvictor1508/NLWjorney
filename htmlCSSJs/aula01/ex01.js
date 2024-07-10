const criaAtividades = () => {
    const atividades = [
        {
            nome: 'Academia',
            data: new Date("2024-07-20 10:00"),
            concluido: false,
        },
        {
            nome: 'Jantar',
            data: new Date("2024-09-30 09:00"),
            concluido: true,
        },
        {
            nome: 'Codar',
            data: new Date(),
            concluido: false,
        }
    ];
    for(let atividade in atividades) {
        criaItemDaAtividade(atividades[atividade]);
    }
}
criaAtividades();

function criaItemDaAtividade(atividade) {
    
    function inputCheckBox() {
        let input = `<input type="checkbox" id="checkBox"/>`;

        if(atividade.concluido) {
            input = `<input type="checkbox" id="checkBox" checked/>`;
        }
        return input;
    }

    const input = inputCheckBox();
    const itemAtividade =  `
    <div>
        <p>
            ${input}
            <span>${atividade.nome}</span>
            <time>${atividade.data}</time>
        </p>
    </div>
    `
    ExibirAtividade(itemAtividade)
}

function ExibirAtividade(atividade) {
    const section = document.querySelector('section');
    section.innerHTML += atividade;
}
