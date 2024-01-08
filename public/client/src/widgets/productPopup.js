import html2Element from '@/utils/html2Element.js';
import genIcons from "@/genIcons.js";

var popupElement;

function openPopup(data) {
    const title = data.title ? '<div class="product-popup-title">' + data.title + '</div>' : '';
    const subtitle = data.subtitle ? '<div class="product-popup-subtitle">' + data.subtitle + '</div>' : '';
    const content = data.content ? '<div class="product-popup-text">' + data.content + '</div>' : '';

    history.replaceState(null, null, "#" + data.staticUrl);

    popupElement = html2Element(`
        <div class="product-popup-overlay">
            <div class="product-popup">
                <div class="product-popup-content">
                    <button class="product-close" type="button">${genIcons.closePopup}</button>
                    ${subtitle}
                    ${title}
                    ${content}
                </div>
            </div>
        </div>
    `);

    document.body.classList.add('no-scroll');
    document.body.appendChild(popupElement);

    popupElement.addEventListener("click", function (event) {
        event.preventDefault();
        closePopup();
    });

    popupElement.querySelector('.product-popup').addEventListener("click", function (event) {
        event.preventDefault();
    });
    
    popupElement.querySelector('.product-close').addEventListener("click", function (event) {
        closePopup();
    });
    
    setTimeout(() => {
        popupElement.classList.add('open');
    }, 50);
}

function closePopup() {
    popupElement.classList.remove('open');
    document.body.classList.add('no-scroll');

    history.replaceState(null, null, ' ');

    setTimeout(() => {
        popupElement.remove();
        document.body.classList.remove('no-scroll');
    }, 500);
}

export default function (element, data) {
    const productPopup = data.productPopup;
    
    element.addEventListener("click", function (event) {
        openPopup(productPopup);
    });

    if ("#" + data.productPopup.staticUrl == window.location.hash) {
        openPopup(productPopup);
    }
};

// @widgetLoadingMode:lazy-once
// @widgetLoadingChunk:secondary