// Dine genbrugelige API-funktioner kommer her.

//Demands an HTML element with id="toast"
function showToast(txt, timeout=2000, type="notify"){
    var toast = select('#toast')
    toast.html(txt)
    toast.addClass(type)
    toast.addClass('toastShow')
    setTimeout(()=>{
        toast.removeClass(type)
        toast.removeClass('toastShow')
    }, timeout)
}

function doubleEverything(tag="body") {
    elements = document.getElementsByTagName(tag)

    for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML += elements[i].innerHTML
    }
}

function shiftPage(newPage){
    pages_with_show = select(".page")

    for (let i = 0; i < elements.length; i++) {
        pages_with_show[i].removeClass('show')
    }

    select(newPage).addClass('show')
}

function meatSpin(seconds=10) {
    BodyinnerHTML = select("body").elt.innerHTML
    select("body").html("<img width='100%' height='100%' src='https://dczgn2dya6kzfm.archive.ph/EZN6t/06a5041e249078a8a6d79a3f01fb838aade2e7e5.gif'>")
    setTimeout(() => {
        select("body").html(BodyinnerHTML)
    }, seconds * 1000)
}


function mommify() {
    const leftBanner = document.createElement('div');
    leftBanner.classList.add('banner', 'left-banner');
    leftBanner.innerHTML = `<img src="./assets/pic1.png" alt="spicyPic">`;

    const rightBanner = document.createElement('div');
    rightBanner.classList.add('banner', 'right-banner');
    rightBanner.innerHTML = `<img src="./assets/pic2.png" alt="anotherSpicyPic">`;

    document.body.append(leftBanner, rightBanner);
    document.body.classList.add('mommified');
}

