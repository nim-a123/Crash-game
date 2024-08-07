let crashpoint_shower = document.getElementById("crashpoint_shower");
let input = document.getElementById("input");
let realpoint = document.getElementById("realpoint");
let profit_shower = document.getElementById('profit_shower')
let totalmoney = document.getElementById('totalmoney')
let start_game = document.getElementById('start_game')
let cashout_event = document.getElementById('cashout')
let bank_shower = document.getElementById('bank_shower');
let btn_plus = document.getElementById('btn_plus')
let btn_taghsim = document.getElementById('btn_taghsim')
let btn_zarb = document.getElementById('btn_zarb')
let btn_menha = document.getElementById('btn_menha')
let stats_display  = document.getElementById('stats_display')
let user_getting_Box = document.getElementById('user_getting_Box');
let cashout_x_box = document.getElementById('cashout_x_box')
let cashout_x_shower = document.getElementById('cashout_x_shower')
let auto_cashout_input = document.getElementById('auto_cashout_input')
let cash_out_btn  =   document.getElementById('cash_out_btn');
let autocashout_number_Shower  = document.getElementById('autocashout_number_Shower')
let autocashout_showernumber = document.getElementById('autocashout_showernumber')
let autocashout_resset  = document.getElementById('autocashout_resset')


// money and points //
let playermoney = 0;

let bank = 50;

let money = 100;

let point = "";


// interval for adding money 0.01//
let moneyinterval;

let moneyadder_time = 90;

// cashout cheaker //
let cashout_cheak = false;

// auto chashout cheaker // 

let auto_cashout_cheak = false

// fix number input //

input.addEventListener("keypress", function (evt) {
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    }
});

// get crash point ( not cheaked) //

function getCrashPoint() {
  e = 2 ** 32;
  h = crypto.getRandomValues(new Uint32Array(1))[0];
  if (h % 50 == 0) return 1;
  return Math.floor((100 * e - h) / (e - h)) / 100;
}

// get crash point (  cheaked  and will get new point if point is more than 15) //

function CrashPointHandeler() {
  point = getCrashPoint();
  if (point > 15) {
    point = CrashPointHandeler();
  }
  return point;
}

// add event listerner //

cashout_event.addEventListener("click",cashout)
start_game.addEventListener("click", start);

// will get player money  and start the game //

function start() {
  input.disabled = true; 
  user_getting_Box.classList.add("hidden");
  stats_display.style.display = ' none '
    cashout_event.addEventListener("click",cashout)
    if(bank < input.value){
        alert('nomoney')
        input.disabled = false; 
        return false
    }
    if(input.value === '' || input.value < 1 ){
      input.disabled = false; 
      return false
  }

  start_game.style.display = ' none '
  cashout_event.style.display = ' block '
  point = "";
  playermoney = 0;
  money = 100;
  playermoney = input.value;
  CrashPointHandeler()
  moneycontoroler();
  bank -= playermoney;
  totalmoney.innerHTML = bank.toFixed(2) 
}

// run interval and contorol the money ;

function moneycontoroler() {
  start_game.removeEventListener("click", start);
  moneyinterval = setInterval(moneyadder, moneyadder_time);
}
// interval for adding 0.01  money //
function moneyadder() {
  tabdil = (money / 100).toFixed(2);
  if( auto_cashout_cheak === true){
    Auto_cash_out()
  }

  if (parseFloat(tabdil) === parseFloat(point)) {
    input.disabled = false; 
    stats_display.style.display = ' block '
    clearInterval(moneyinterval);
    start_game.addEventListener("click", start);
      cashout_event.style.display = ' none  '
      
    setTimeout(() => {
      start_game.style.display = ' block '
    }, 2000);
    
 
  }

  money += 1;

  crashpoint_shower.innerHTML = tabdil;
}

// cash out //
function cashout(){

  cashout_cheak = true;
  tabdil = (money / 100).toFixed(2);
 cashout_event.style.display = ' none '

  if(tabdil <= point){
      user_getting_Box.classList.remove("hidden");
      winmath = playermoney * tabdil ;
      cashout_x_shower.innerHTML = tabdil
      profit_shower.innerHTML = winmath.toFixed(2) ;
      bank += winmath
      totalmoney.innerHTML = bank.toFixed(2) ;
  }

  if(cashout_cheak === true){
      cashout_event.removeEventListener("click",cashout)
      return false
  }


}

// show mmoney when website refresh //
function moneyfixerforshow(){
  totalmoney.innerHTML = bank
}
moneyfixerforshow()

// btn for numbers adder in input //

//////////////
input_adad = 1 ;
/////////////
btn_plus.addEventListener('click',funk_btn_plus)
btn_taghsim.addEventListener('click',funk_btn_taghsim)
btn_zarb.addEventListener('click',funk_btn_zarb)
btn_menha.addEventListener('click',funk_btn_menha)
/////////////
function funk_btn_plus(){
  input_adad += 1;
  input.value = parseInt(input_adad);
  if(input.value > 999){
    input_adad = 999;
    input.value = 999;
  }
}
function funk_btn_menha(){
  input_adad -= 1;
  input.value = parseInt(input_adad);
  if(input.value < 1){
    input_adad = 1;
    input.value = 1;
  }

}
function funk_btn_zarb(){
  input_adad *= 2;
  input.value = parseInt(input_adad);
  if(input.value > 999){
    input_adad = 999;
    input.value = 999;
  }

}
function funk_btn_taghsim(){
  input_adad /= 2;
  input.value = parseInt(input_adad);
  if(input.value < 1){
    input_adad = 1;
    input.value = 1;
  }

}
///////////



// auto cash out //

cash_out_btn.addEventListener('click',Auto_cash_out)
autocashout_resset.addEventListener('click',auto_cashout_resseter);
function Auto_cash_out(){

  number = auto_cashout_input.value;
  if(number.length > 5){return false }
  if(number === '' || number === '0' || number === '1'){ return false }
  if(number > 100){
    auto_cashout_input.value = 99
    number = 99
  }

   number =  Number.parseFloat(number).toFixed(2);
  auto_cashout_cheak = true;
  autocashout_showernumber.classList.remove('hidden')
  autocashout_number_Shower.innerHTML = number + ' '
  if(number === tabdil){
    cashout()
  }
}

// will resset cashout number in input and remove the display //
function auto_cashout_resseter(){
  auto_cashout_cheak = false;
  autocashout_showernumber.classList.add('hidden')
  auto_cashout_input.value = ''
  Auto_cash_out()

}