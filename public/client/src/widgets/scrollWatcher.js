export default function (element, data) {   
    const scrollElement = element.querySelector("div");
    
    scrollElement.addEventListener("scroll", update, {
        passive: true,
    });

    window.addEventListener("resize", update, {
        passive: true,
    });

    setTimeout(update, 50);

    function update() {
        const scroll = scrollElement.scrollLeft;

        if (scrollElement.scrollWidth > scrollElement.offsetWidth) {
            element.classList.add("has-scroll");

            if (scroll < 1) {
                element.classList.add("scroll-begin");
            } else {
                element.classList.remove("scroll-begin");
            }
    
            if (scroll > (scrollElement.scrollWidth - scrollElement.offsetWidth - 1)) {
                element.classList.add("scroll-end");
            } else {
                element.classList.remove("scroll-end");
            }
        } else {
            element.classList.remove("has-scroll");
            element.classList.remove("scroll-begin");
            element.classList.remove("scroll-end");
        }
    }
};

// @widgetLoadingMode:lazy-once
// @widgetLoadingChunk:secondary