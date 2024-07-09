
function pegarSection() {
    const div = ExibirNoHtml();
    console.log(div);
    const section = document.querySelector('section');
    section.innerHTML = div;
}
pegarSection();

function criaObjeto() {
    const data = new Date("2024-08-15 12:00");
    const obj = new Object();
    obj.nome = 'alexsa';
    obj.sobrenome = 'delicia';
    obj.horas = data.getHours();
    obj.finalizou = false;
    return obj;
}

function ExibirNoHtml() {
    const obj = criaObjeto();
    let input = `<input type="checkbox"/>`;
    
    if (obj.horas === 12) {
        obj.finalizou = true;
    }
    if (obj.finalizou) {
        input = `<input type="checkbox" checked/>`;
    }
    return `
    <div>
        <p>
            ${input}
            <span>${obj.nome} ${obj.sobrenome}</span> sai amanhã às ${obj.horas}
            </p>
            </div>    
            `
        }
        