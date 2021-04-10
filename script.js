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