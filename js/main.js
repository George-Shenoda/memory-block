import { changeLanguage } from "./translate.js";

if(window.localStorage.lang){
    $('html').attr("lang", window.localStorage.lang)
}
if(window.localStorage.dir){
    $('html').attr("dir", window.localStorage.dir)
}
if(window.localStorage.audio){
    if (window.localStorage.audio === 'yes'){
        $('.btn#audio').html(`<i class="fa-solid fa-volume-high"></i>`)
        $('.btn#audio').removeClass("no")
    }
    else{
        $('.btn#audio').html(`<i class="fa-solid fa-volume-xmark"></i>`)
        $('.btn#audio').addClass("no")
    }
}

changeLanguage()

$(".btn#lang").click(function (e) { 
    if($('html').attr("lang") == 'en'){
        $('html').attr("lang", 'ar')
        $('html').attr("dir", 'rtl')
        window.localStorage.lang = 'ar';
        window.localStorage.dir = 'rtl';
    }
    else{
        $('html').attr("lang", 'en')
        $('html').attr("dir", 'ltr')
        window.localStorage.lang = 'en';
        window.localStorage.dir = 'ltr';
    }
    changeLanguage()
});

$('.btn#audio').click(function (e){
    if($('.btn#audio').hasClass('no')){
        $('.btn#audio').html(`<i class="fa-solid fa-volume-high"></i>`)
        $('.btn#audio').removeClass("no")
        window.localStorage.audio = 'yes';
    }
    else{
        $('.btn#audio').html(`<i class="fa-solid fa-volume-xmark"></i>`)
        $('.btn#audio').addClass("no")
        window.localStorage.audio = 'no';
    }


})
let duration = 1000;
let blocks = Array.from($('.game-blocks .block'))
let randomOrder = [...Array(blocks.length).keys()]
$('.block').click(function (e) {
    isFlipped(this)
    if (blocks.filter(flipped => $(flipped).hasClass("match")).length === blocks.length) {
        $('.game-blocks').addClass("clicked")
        setTimeout(() => {
            randomOrder = [...Array(blocks.length).keys()];
            shuffle(randomOrder);
            $('.game-blocks .block').each(function (index) {
                $(this).css('order', randomOrder[index]);
                $(this).removeClass('match');
            });
            $('.tries .no').text('0');
            $('.game-blocks').removeClass('clicked');
        }, 500)
        $('.finished .Tries').text($('.tries .no').text())
        $('.finished').css('display', 'block')
    }
})



$('.start').click( function (e) {
    const userName = window.prompt("Please enter your name:");
    if(userName){
        $(".hello .name").text(userName)
    }
    else{
        $(".hello .name").text("unknown")
    }
    $(this).parent().css('display', 'none');
    $('.game-blocks .block').addClass("clicked")
    setTimeout(() => {
        $('.game-blocks .block').removeClass("clicked")
    },duration)
})

$('.finish').click(function (e){
    $(this).parent().remove();
    $('.game-blocks .block').addClass("clicked")
    setTimeout(() => {
        $('.game-blocks .block').removeClass("clicked")
    },duration)
})

shuffle(randomOrder)



$('.game-blocks .block').each(function(index){
    $(this).css("order" , randomOrder[index])
})

function shuffle(array){
    let current = array.length,
        temp,
        random;
    
    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random]
        array[random] = temp
    }
    return array
}

function isFlipped(block){
    let tries = $('.tries .no').text()
    $(block).addClass("clicked");
    let allFlipped = blocks.filter(flipped => $(flipped).hasClass("clicked"))
    if(allFlipped.length === 2){
        $('.game-blocks').addClass("noClicking")
        setTimeout(() =>{
            $('.game-blocks').removeClass("noClicking")
        }, duration)
        if ($(allFlipped[0]).data('tech') === $(allFlipped[1]).data('tech')){
            $(allFlipped[0]).removeClass("clicked")
            $(allFlipped[1]).removeClass("clicked")
            $(allFlipped[0]).addClass("match")
            $(allFlipped[1]).addClass("match")
            if(! $('.btn#audio').hasClass("no")){
                $('#success')[0].play()
            }
        }
        else{
            tries++;
            $('.tries .no').text(tries)
            if(! $('.btn#audio').hasClass("no")){
                $('#fail')[0].play()
            }
            setTimeout(() =>{
                $(allFlipped[0]).removeClass("clicked")
                $(allFlipped[1]).removeClass("clicked")
            }, duration)
        }
    }
}