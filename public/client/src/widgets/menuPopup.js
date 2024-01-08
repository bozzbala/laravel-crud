export default function (element, data) {    
    document.body.addEventListener("click", function (event) {
        element.querySelector(".menu-list-2").classList.remove("open");
    });

    element.querySelector(".menu-link-1").addEventListener("click", function (event) {
        element.querySelector(".menu-list-2").classList.toggle("open");
    });

    element.addEventListener("click", function (event) {
        event.stopPropagation();
    });
};

// @widgetLoadingMode:lazy-once
// @widgetLoadingChunk:secondary