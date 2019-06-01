(function () {

var link = document.querySelector(".page-footer__subscribe");

var popup = document.querySelector(".modal-subscribe");
var close = document.querySelector(".modal__close");
var overlay = document.querySelector(".modal__overlay");


link.addEventListener('click', function(evt) {
	 evt.preventDefault();
	 popup.classList.add('modal-show');
	 overlay.classList.add('modal__show-overlay');
});

close.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
    overlay.classList.remove("modal__show-overlay");
});

overlay.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
    overlay.classList.remove("modal__show-overlay");
});



})();
