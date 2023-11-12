const zborovi = ["вештина", "пенкало", "заробен", "лаптоп", "умешност", "автограф", "заглавие", "жирафа", "коректор", "телескоп", "ѕвезда", "капсула", "тротинет", "јаболко", "кошула", "џемпер", "батерија", "премин", "октопод", "вселена", "ромбоид", "тротоар"];
izbor = Math.floor(Math.random() * zborovi.length);
golemina = zborovi[izbor].length;

let goleminaKol = document.getElementById('igra');
goleminaKol.style.setProperty('--num--columns', golemina);

let state = {odgovor: zborovi[izbor], grid: Array(5).fill().map(() => Array(golemina).fill('')), momentRedica: 0, momentKolona: 0};

function updateGrid(){
    for(let i = 0; i < state.grid.length; i++)
    {
        for(let j = 0; j < state.grid[i].length; j++)
        {
            const kocka = document.getElementById(`kocka${i}${j}`);
            kocka.textContent = state.grid[i][j];
        }
    }
}


function drawKocka(container, redica, kolona, bukva = '')
{
    const kocka = document.createElement('div');
    kocka.className = 'kocka';
    kocka.id = `kocka${redica}${kolona}`;

    kocka.textContent = bukva;
    container.appendChild(kocka);
    return kocka;
}

function drawGrid(container){
    const grid = document.createElement('div');
    grid.className = 'grid';

    for(let i = 0; i < 5; i++)
    {
        for(let j = 0; j < golemina; j++)
        {
            drawKocka(grid, i, j);
        }
    }

    container.appendChild(grid);
}

function vnesiTastatura()
{
    document.body.onkeydown =(e) => {
        const key = e.key;

        if(key === 'Enter')
        {
            if(state.momentRedica <= 5)
            {
                const zbor = momentZbor();
                if(validen(zbor))
                {
                    prikazi(zbor);
                    state.momentRedica++;
                    state.momentKolona = 0;
                }
                else{
                    alert("Зборот не е валиден.");
                }
            }
        }

        if(key === 'Backspace')
        {
            deleteBukva();
        }

        if(daliBukva(key))
        {
            doddajBukva(key);
        }

        updateGrid();
    };
}

function momentZbor(){
    return state.grid[state.momentRedica].join('');
}

function validen(zbor)
{
    return zborovi.includes(zbor);
}

function prikazi(guess){
    const redica = state.momentRedica;

    for(let i = 0; i < golemina; i++)
    {
        const kocka = document.getElementById(`kocka${redica}${i}`);
        const bukva = kocka.innerText;

        if(bukva == state.odgovor[i])
        {
            kocka.classList.add('tocna');
        }
        else if(state.odgovor.includes(bukva))
        {
            kocka.classList.add('gresna');
        }
        else{
            kocka.classList.add('prazna');
        }
    }

    const pogoden = state.odgovor == guess;
    const zavrsenaIgra = state.momentRedica == 5;

    if(pogoden)
    {
        alert('Успешна игра!');
    }
    else if(zavrsenaIgra)
    {
        alert('Играта не е успешна! Зборорт е' + state.odgovor);
    }
}

function daliBukva(key){
    return key.length == 1 && key.match(/[абвгдѓежзѕијклљмнњопрстќуфхцчџш]/i);

}

function doddajBukva(bukva){
    if(state.momentKolona == 8) return;
    state.grid[state.momentRedica][state.momentKolona] = bukva;
    state.momentKolona++;
}

function deleteBukva(){
    if(state.momentKolona == 0) return;
    state.momentKolona--;
    state.grid[state.momentRedica][state.momentKolona] = '';
}

function pocniNovaIgra(){
    izbor = Math.floor(Math.random() * zborovi.length);
    golemina = zborovi[izbor].length;
    state = {odgovor: zborovi[izbor], grid: Array(5).fill().map(() => Array(golemina).fill('')), momentRedica: 0, momentKolona: 0};
    updateGrid();
}

function start(){
    const igra = document.getElementById('igra');
    drawGrid(igra);

    vnesiTastatura();

    pocniNovaIgra();

    console.log(state.odgovor);
}

function novaIgra()
{
    pocniNovaIgra();
    updateGrid();
}

//start();

window.addEventListener('load', start, false);