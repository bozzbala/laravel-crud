export default function (element, data) {
    document.body.addEventListener("click", function (event) {
        element.classList.remove("open");
    });
    
    element.querySelector(".search-button").addEventListener("click", function (event) {
        element.classList.toggle("open");

        if (element.classList.contains("open")) {
            setTimeout(function () {
                element.querySelector(".search-field").focus();
            }, 200);
        }
    });

    element.addEventListener("click", function (event) {
        event.stopPropagation();
    });
};

// @widgetLoadingMode:lazy-once
// @widgetLoadingChunk:secondary