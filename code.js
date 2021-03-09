let screen=document.getElementById("text-screen");
let sum =document.getElementById("+");
let divide = document.getElementById("/");
let multiply = document.getElementById("X");
let subtract = document.getElementById("-");
let equalButton= document.getElementById("=");
let repeat;
let rates;
let ILS;
let USD;
let result;
let iterationSum =0;
let iterationMul=0;
let iterationSub=0;
let iterationDivi=0;
let previous
let pressed

async function getTheExchangeRates(){
const currency= await fetch('https://api.exchangeratesapi.io/latest');
const oobj = await currency.json()
 rates = oobj.rates
 ILS = rates.ILS
 USD = rates.USD
}

getTheExchangeRates()


function add(){
    if(multiply.disabled==true|divide.disabled==true|subtract.disabled==true){previous="";}
    if(iterationMul!=0|iterationDivi!=0|iterationSub!=0){equal()}
    if(iterationSum == 0){
        result = parseFloat(screen.value)
    }
    else if(iterationSum!=0){
        result = result + parseFloat(screen.value)
        round()
        screen.value = result;
    }
    iterationSum++
    pressed = 1; 
    iterationMul=0;
    iterationSub=0;
    iterationDivi=0;
    console.log(result)
    sum.disabled = true;
    subtract.disabled = false;
    multiply.disabled = false;
    divide.disabled = false;
    equalButton.disabled = true;
    equalBtnActive = 0;
    previous="+";
}

function sub(){
    if(multiply.disabled==true|divide.disabled==true|sum.disabled==true){previous="";}
    if(iterationMul!=0|iterationSum!=0|iterationDivi!=0){equal()}
    if(iterationSub == 0){
        result = parseFloat(screen.value)
    }
    else if(iterationSub!=0){
        result = result - parseFloat(screen.value)
        round()
        screen.value = result;
    }
    iterationSub++
    pressed = 1; 
    console.log(result)
    iterationMul=0;
    iterationSum=0;
    iterationDivi=0;
    sum.disabled = false;
    subtract.disabled = true;
    multiply.disabled = false;
    divide.disabled = false;
    equalButton.disabled = true;
    equalBtnActive = 0;
    previous="-";
}

function mul(){
    if(sum.disabled==true|divide.disabled==true|subtract.disabled==true){previous="";}
    if(iterationDivi!=0|iterationSum!=0|iterationSub!=0){equal()}
    if(iterationMul == 0){
        result = parseFloat(screen.value)
    }
    else if(iterationMul!=0){
        result = result * parseFloat(screen.value)
        round()
        screen.value = result;
    }

    iterationMul++
    pressed = 1; 
    iterationSum=0;
    iterationSub=0;
    iterationDivi=0;
    equalBtnActive = 0;
    sum.disabled = false;
    subtract.disabled = false;
    multiply.disabled = true;
    divide.disabled = false;
    equalButton.disabled = true;
    previous="*";

}
function divi(){
    if(multiply.disabled==true|sum.disabled==true|subtract.disabled==true){previous="";}
    if(iterationMul!=0|iterationSum!=0|iterationSub!=0){equal()}
    
    if(iterationDivi == 0){
       result = parseFloat(screen.value);
    }
    else if(iterationDivi!=0){
        result = result / parseFloat(screen.value)
        round()
        if(parseFloat(screen.value)==0){result="Error"}
        screen.value = result;
    }

    iterationDivi++
    pressed = 1; 
    console.log(result)
    iterationMul=0;
    iterationSub=0;
    iterationSum=0;
    sum.disabled = false;
    subtract.disabled = false;
    multiply.disabled = false;
    divide.disabled = true;
    equalButton.disabled = true;
    equalBtnActive = 0;
    previous="/";
}

function equal(){
repeat = parseFloat(screen.value);
if(previous== "+")
{result = result + parseFloat(screen.value)} 

else if(previous=="-")
{result = result - parseFloat(screen.value)}   

else if(previous=="*")
{result = result * parseFloat(screen.value);} 

else if(previous=="/")
{result = result / parseFloat(screen.value)
 if(parseFloat(screen.value)==0){result="Error"}
} 
round()
screen.value=result;
}

function equalBtn(){
    if(equalBtnActive==0){
        equal()
    }
    else{
        if(previous== "+")
{result = result + repeat;} 

else if(previous=="-")
{result = result - repeat;}   

else if(previous=="*")
{result = result * repeat;} 

else if(previous=="/")
{result = result / repeat;
 if(parseFloat(screen.value)==0){result="Error"}
} 
round()
screen.value=result;
    }
    equalBtnActive =1;
    iterationSum=0;
    iterationSub=0;
    iterationDivi=0;
    iterationMul=0;
}






function clr(){
    screen.value='';
    result=0;
    pressed=0;
    previous="";
    iterationMul=0;
    iterationSub=0;
    iterationSum=0;
    iterationDivi=0;
    repeat =0;
    equalBtnActive = 0;
    sum.disabled = false;
    subtract.disabled = false;
    multiply.disabled = false;
    divide.disabled = false;
    equalButton.disabled = false;
    }

function clk(num){ 
    let check = screen.value;
    if(check.length<=16){
    if(pressed==1){
        screen.value=`${num}`
        pressed = 0;
    }
    else{
    screen.value+=`${num}`;}}

    sum.disabled = false;
    subtract.disabled = false
    multiply.disabled = false;
    divide.disabled = false;
    equalButton.disabled = false;
    equalBtnActive = 0;
}
    
function round(){
    let n =Math.floor(result);
    let checkFrac = n.toString()
    if(result<=10**12){
    result= (Math.round(result*10**(14-checkFrac.length)))/10**(14-checkFrac.length); }
    else if(result>10**12){
        result= (Math.round(result*100))/100; 
    }
    
}

function EURtoILS(){
    let temp = screen.value;
    temp = parseFloat(temp)
    temp = temp*ILS;
    screen.value=`${temp}`;
}

function ISLtoEUR(){
    let temp = screen.value;
    temp = parseFloat(temp)
    temp = temp/ILS;
    screen.value=`${temp}`;
}

function USDtoILS(){
    let temp = screen.value;
    temp = parseFloat(temp)
    let USDRate = ILS/USD;
    temp = temp*USDRate;
    screen.value=`${temp}`;
}

function ILStoUSD(){
    let temp = screen.value;
    temp = parseFloat(temp)
    let USDRate = ILS/USD;
    temp = temp/USDRate;
    screen.value=`${temp}`;
}