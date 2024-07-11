let atividades = [
    {
        nome: 'Academia',
        data: new Date("2024-07-20 10:00"),
        concluido: false,
    },
    {
        nome: 'Jantar',
        data: new Date("2024-09-05 09:00"),
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

function criaItemDaAtividade(atividade) {

    function inputCheckBox() {
        let input = `
        <input
        onchange="concluirAtividade(event)"
        value="${atividade.data}"
         type="checkbox" 
         id="checkBox"/>`;

        if (atividade.concluido) {
            input = `<input type="checkbox" id="checkBox" checked/>`;
        }
        return input;
    }

    // função que usa da biblioteca "Day.js" para formatar a data 
    const input = inputCheckBox();
    const formatar = formatador(atividade.data);
    return `
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
}

function ExibirAtividade() {
    const section = document.querySelector('section');
    section.innerHTML = '';

    if (atividades.length === 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
        return;
    }

    for (let atividade of atividades) {
        section.innerHTML += criaItemDaAtividade(atividade);
    }
}
ExibirAtividade();

function salvarAtividade(e) {
    e.preventDefault();
    const dadosForm = new FormData(e.target);

    const nome = dadosForm.get('atividade');
    const dia = dadosForm.get('data');
    const hora = dadosForm.get('hora');
    const data = `${dia} ${hora}`;

    const retornarAtividade = () => {
        const NovaAtividade = {
            nome,
            data,
            concluido: false,
        }
        
        const atividadeExiste = atividades.find(atividade => {
            return atividade.data === NovaAtividade.data;
        });
        
        if(atividadeExiste) {
            return alert('Dia/Hora não disponível');
        }   
        
        atividades = [NovaAtividade, ...atividades];
        ExibirAtividade();
        console.log(NovaAtividade);
    }
    retornarAtividade();
}

const selectDias = () => {
    const dias = [
        "2024-07-11",
        "2024-07-12",
        "2024-07-13",
        "2024-07-14",
        "2024-07-16",
        "2024-07-17",
        "2024-07-18",
        "2024-07-19",
        "2024-07-20",
        "2024-07-21",
    ]
    let selectDias = '';

    for (let dia of dias) {
        const formatar = formatador(dia);
        selectDias += `
        <option value="${dia}">
        ${formatar.dia.numerico}
        de ${formatar.mês}
        </option>
        `
    }

    document
        .querySelector('select[name="data"]')
        .innerHTML = selectDias;
}
selectDias();

const selectHoras = () => {
    let selectHoras = '';
    for (let i = 6; i < 23; i++) {
        const hora = String(i).padStart(2,'0');
        selectHoras += `
        <option value="${hora}:00">
        ${hora}:00
        </option>
        `
    }

    document
        .querySelector('select[name="hora"]')
        .innerHTML = selectHoras;
}

selectHoras();

const concluirAtividade = (event) => {
    const input = event.target;
    const dataInput = input.value;

    const atividade = atividades.find(atividade => {
        return atividade.data == dataInput;
    });

    if(!atividade) {
        return;
    }

    atividade.concluido = !atividade.concluido
}
