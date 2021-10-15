//BACK TO TOP START
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};
let topButton = document.getElementById("backTop");
let arrowUp = document.getElementById('arrowUP')

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 400) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

}
//BACK TO TOP END

//HERO IMAGE SLIDE START
let heroImg = document.getElementById('heroImg');
let x = 0

const heroSlider = () => {

    x += .2
    heroImg.style.left = x + 'vw';

    if (x < 34) {
        requestAnimationFrame(heroSlider)
    } else {
        addLazyToImg();
        document.querySelector('.gallery').style.display = 'block';
    }
}
const addLazyToImg = () => {
    const images = document.querySelectorAll('img');
    // loop start from 1 to ommit the heroImage
    for (let i = 1; i < images.length; i++) {
        for (let i = 0; i < images.length; i++) {
            images[i].classList.add('lazy');
        }
    }
}

const start = () => {
    requestAnimationFrame(heroSlider)
}
window.onload = () => {
    start();
}
// const addLazyLoading = () =>{

// }
// addLazyLoading();
//setTimeout(heroSlider, 5000)
//HERO IMAGE SLIDE END

//lazy loading jquery
// http://jquery.eisbehr.de/lazy/

$(document).ready(function(){
    $("img.lazy").lazyload({
        effect: "fadeIn"
    });           
});
