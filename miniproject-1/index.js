const griddisplay = document.querySelector('#grid');
const resultdisplay = document.querySelector('#score');

const cardArray =[
    {
        name:"cat", img: "images/cat.png"
    },
    {
        name:"dog", img: "images/dog.png"
    },
    {
        name:"evil", img: "images/evil.png"
    },
    {
        name:"gift", img: "images/gift.png"
    },
    {
        name:"shock", img: "images/shock.png"
    },
    {
        name:"silent", img: "images/silent.png"
    },
    {
        name:"cat", img: "images/cat.png"
    },
    {
        name:"dog", img: "images/dog.png"
    },
    {
        name:"evil", img: "images/evil.png"
    },
    {
        name:"gift", img: "images/gift.png"
    },
    {
        name:"shock", img: "images/shock.png"
    },
    {
        name:"silent", img: "images/silent.png"
    }
]

cardArray.sort(() => 0.5 - Math.random())

generateboard();

function generateboard() {
    for(let i=0; i<cardArray.length; i++){
        const card = document.createElement('img');
        card.setAttribute('src','images/solid_black.png');
        card.setAttribute('data_id',  i);
        card.addEventListener('click',flipcard);

        griddisplay.appendChild(card);
    }

}


card_chosen = [];
card_chosen_id = [];

function flipcard() {
    const card_id = this.getAttribute('data_id');
    this.setAttribute('src', cardArray[card_id].img);
    card_chosen_id.push(card_id);
    card_chosen.push(cardArray[card_id].name);

    if(card_chosen.length === 2){
        setTimeout(checkmatch,700);
    }

    
}
cardswon = [];
function checkmatch(){
    const cards = document.querySelectorAll('img');

    if(card_chosen[0] == card_chosen[1])
    {
        cards[card_chosen_id[0]].setAttribute('src', 'images/Grey.png');
        cards[card_chosen_id[1]].setAttribute('src', 'images/Grey.png');
        cards[card_chosen_id[0]].removeEventListener('click',flipcard);
        cards[card_chosen_id[1]].removeEventListener('click',flipcard);
        cardswon.push(card_chosen);
        resultdisplay.innerHTML = cardswon.length;
    }
    else{
        cards[card_chosen_id[0]].setAttribute('src', 'images/solid_black.png');
        cards[card_chosen_id[1]].setAttribute('src', 'images/solid_black.png');
    }

    card_chosen = [];
    card_chosen_id = [];

    if(cardswon.length == cardArray.length/2){
        alert("Congrats !! You WON the match");
    }
}