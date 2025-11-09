let translate = {
    en: {
        game: "Memory Block",
        hello: "Hello:",
        tries: "Wrong Tries:",
        start: "Start Game",
        finish: "New Game",
        new: "You Finished with no. Of Tries: "
    },
    ar: {
        game: "لعبة الذاكره",
        hello: "اهلا:",
        tries: "المحاولات الخاطئه:",
        start: "ابدا اللعبه",
        finish: "لعبه جديده",
        new: "لقد انهيت بعدد محاولات: "
    }
};

export function changeLanguage(){
    let language = translate[$('html').attr("lang")];
    document.title = language['game'];
    $(".hello .hi").html(`${language['hello']}`);
    $(".tries .try").html(`${language['tries']}`);
    $(".start").html(`${language['start']}`);
    $(".finish").html(`${language['finish']}`);
    $(".new .text").html(`${language['new']}`);
}