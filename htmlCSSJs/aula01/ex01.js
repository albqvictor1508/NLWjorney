const criaAtividades = () => {
    const atividades = [
        {
            nome: 'Academia',
            data: new Date("2024-07-20 10:00"),
            concluido: false,
        },
        {
            nome: 'Jantar',
            data: new Date("2024-09-5 09:00"),
            concluido: false,
        },
        {
            nome: 'Codar',
            data: new Date(),
            concluido: true,
        },
        {
            nome: 'Piscina com minha mulher',
            data: new Date("2024-09-10 14:30"),
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

//função que usa da biblioteca "Day.js" para formatar a data 
    function formatador(data) {
        return {
            dia: {
                numerico: dayjs(data).format('DD'),
                semana: {
                    longo: dayjs(data).format('dddd'),
                    curto: dayjs(data).format('ddd'),
                }
            },
            mês: dayjs(data).format('MMMM'),
            hora: dayjs(data).format('HH:mm')
        }
    }

    const input = inputCheckBox();
    const formatar = formatador(atividade.data);
    const itemAtividade =  `
    <div>
        <p>
            ${input}
            <span>${atividade.nome}</span>
            <time>
            ${formatar.dia.semana.longo}, dia
            ${formatar.dia.numerico} de
            ${formatar.mês} às 
            ${formatar.hora}h
            </time>
        </p>
    </div>
    `
    ExibirAtividade(itemAtividade)
}

 function ExibirAtividade(atividade) {
    const section = document.querySelector('section');
    section.innerHTML += atividade;
}
