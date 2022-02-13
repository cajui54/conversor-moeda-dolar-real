let model = new Model();
/*Combox*/
let $combox01 = document.getElementById('combox01');
let $combox02 = document.getElementById('combox02');
/* img Combox*/
let $firstImgCmb = document.getElementById('first-img');
let $secondImgCmb = document.getElementById('second-img');
let $btnReverse = document.getElementById('btnReverse');
/*label*/
let $labels = document.querySelectorAll('.field__lbl');
/*input txt*/
let txtNumber1 = document.getElementById('txtNumber1');
let txtNumber2 = document.getElementById('txtNumber2');

$combox01.addEventListener('change', changerForDolarToReal);
$combox02.addEventListener('change', changerForRealToDolar);

let $spnTotallyReal = document.getElementById('spnTotallyReal');
let $spnTotallyDolar = document.getElementById('spnTotallyDollar');

let $btnConfirm = document.getElementById('btnConfirm');
let $btnCancel = document.getElementById('btnCancel');
function changerForDolarToReal(){
    if(this.value == 'dolar'){
        dolarToReal();
    }
    else if(this.value == 'real'){
        realToDolar();
    }
}

function changerForRealToDolar(){
    if(this.value == 'real'){
        dolarToReal();
    }
    else if(this.value == 'dolar'){
        realToDolar();
    }
}
$btnReverse.addEventListener('click',()=>{
    if($combox01.value == 'dolar' && $combox02.value == 'real'){
         realToDolar();    
    }
    else if($combox01.value == 'real' && $combox02.value == 'dolar'){
        dolarToReal(); 
    }
});
function realToDolar(){
    $firstImgCmb.src = './img/flagBrazil.png';
    $combox01.value = 'real';

    $secondImgCmb.src = './img/flagUSA.jpg';
    $combox02.value = 'dolar';

    $labels[0].textContent = 'R$:';
    $labels[1].textContent = 'US$:';
    
    showInputs();
}
function dolarToReal(){
    $firstImgCmb.src = './img/flagUSA.jpg';
    $combox01.value = 'dolar';

    $secondImgCmb.src = './img/flagBrazil.png';
    $combox02.value = 'real';
    
    txtNumber2.readOnly = true;

    $labels[0].textContent = 'US$:';
    $labels[1].textContent = 'R$:';

    showInputs();
}

async function showInputs(){
    let _dolar = await model.loadAPIDolar();
    let oneDolar = 1;
    if($combox01.value == 'dolar' && $combox02.value == 'real'){
        txtNumber1.value = parseFloat(oneDolar).toFixed(2);
        txtNumber2.value = parseFloat(_dolar.USDBRL.ask).toFixed(2);
    }else{
        txtNumber1.value = parseFloat(_dolar.USDBRL.ask).toFixed(2);
        txtNumber2.value = parseFloat(oneDolar).toFixed(2);
    }
}
//atualiza API a cada 30 segundos;
setInterval(()=>{
    updateDolar();
}, 30000);

async function updateDolar(){
    let _dolar = await model.loadAPIDolar();

    if($combox01.value == 'dolar' && $combox02.value == 'real'){
        txtNumber2.value = parseFloat(_dolar.USDBRL.ask).toFixed(2);
    }
    else{
        txtNumber1.value = parseFloat(_dolar.USDBRL.ask).toFixed(2);
    }
}

$btnConfirm.addEventListener('click',()=>{
    if(checkFeilds()){
        let _scroll = '#spnTotallyDollar';
        outputValues();
        scrollTo(_scroll);
    }
});
function scrollTo(_element){
    document.querySelector(_element).scrollIntoView({behavior: 'smooth'});
}
async function outputValues(){
    if($combox01.value == 'dolar' && $combox02.value == 'real'){
        let totally =  await model.totallyInReal(parseFloat(txtNumber1.value));
        $spnTotallyReal.innerText = formatCurrencyBRL(totally);
        $spnTotallyDolar.innerText =  formatCurrencyUSD(txtNumber1.value);
    }
    else{
        let totally = await model.totallyInDolar(parseFloat(txtNumber1.value));
        $spnTotallyDolar.innerText = formatCurrencyUSD(totally);
        $spnTotallyReal.innerText = formatCurrencyBRL(txtNumber1.value); 
    }
}
function checkFeilds(){
    let msg = '';

    if(txtNumber1.value == ''){
        msg = 'um erro inesperado ocorreu, campo obrigatório não preenchindo!';
        txtNumber1.focus();
    }
    if(txtNumber2.value == ''){
        msg = 'um erro inesperado ocorreu, campo obrigatório não preenchindo!';
        txtNumber2.focus();
    }
    if(msg != ''){
        alert(msg);
        return false;
    }
    return true;
}
function formatCurrencyBRL(_value){
    let formatMoney = new Intl.NumberFormat('pt-Br',{
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
    return formatMoney.format(_value);
}
function formatCurrencyUSD(_value){
    let formatMoney = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    return formatMoney.format(_value);
}
$btnCancel.addEventListener('click', ()=>{
    showInputs();
    $spnTotallyDolar.innerText = 'US$: 0.00';
    $spnTotallyReal.innerText = 'R$: 0,00';
});

async function showValueHeightAndLow(){
    let _valueDolar = await model.loadAPIDolar();
    spnHeight.innerText = formatCurrencyBRL(_valueDolar.USDBRL.high);
    spnLow.innerText = formatCurrencyBRL(_valueDolar.USDBRL.low);
}
showValueHeightAndLow();
dolarToReal();








