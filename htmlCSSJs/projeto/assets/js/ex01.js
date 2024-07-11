let atividades = [
    {
        nome: 'Academia',
        data: new Date("2024-07-20 10:00"),
        concluido: false,
    },
    {
        nome: 'Café da manhã',
        data: new Date("2024-09-05 09:00"),
        concluido: false,
    },
    {
        nome: 'Codar',
        data: new Date(),
        concluido: true,
    },
    {
        nome: 'Piscina',
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
    <div class="atividades-div">
        <p class="atividade-content">
            ${input}
            <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
            <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <span>${atividade.nome}</span>
            </p>
            <time class="full">
            ${formatar.dia.semana.longo},
            dia ${formatar.dia.numerico}
            de ${formatar.mês} às
            ${formatar.hora}
            </time>
            <time class="short">
            ${formatar.dia.semana.curto},
            ${formatar.dia.numerico}
            <div>
            ${formatar.hora}
            </div>
            </time>
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
