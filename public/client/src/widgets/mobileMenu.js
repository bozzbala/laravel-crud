export default function (element, data) {
    window.addEventListener("openmobilemenu", function () {
        element.classList.add("open");
        document.body.classList.add('no-scroll');
    });

    window.addEventListener("closemobilemenu", function () {
        element.classList.remove("open");
        document.body.classList.remove('no-scroll');
    });

    element.addEventListener("click", function (event) {
        window.dispatchEvent(new CustomEvent('closemobilemenu'));
    });
    
    element.querySelector(".mobile-menu").addEventListener("click", function (event) {
        event.stopPropagation();
    });
};

// @widgetLoadingMode:lazy-once
// @widgetLoadingChunk:secondary