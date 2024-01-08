export default function (element, data) {
    element.addEventListener("click", function (event) {
        if (element.classList.contains("open")) {
            window.dispatchEvent(new CustomEvent('closemobilemenu'));
        } else {
            window.dispatchEvent(new CustomEvent('openmobilemenu'));
        }
    });

    window.addEventListener("openmobilemenu", function () {
        element.classList.add("open");
    });

    window.addEventListener("closemobilemenu", function () {
        element.classList.remove("open");
    });
};

// @widgetLoadingMode:lazy-once
// @widgetLoadingChunk:secondary