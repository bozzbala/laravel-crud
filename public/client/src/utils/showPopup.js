import html2Element from "@/utils/html2Element.js";
import noScroll from "@/utils/noScroll.js";

// Стек для управления отображением всплывающих окон
const popupsStack = [];
// Текущее отображаемое всплывающее окно
let currentPopup = null;

/**
 * Отображает всплывающее окно с переданным контентом и параметрами.
 * @param {string|HTMLElement} content - Контент всплывающего окна (HTML-код или DOM-элемент).
 * @param {Object} options - Дополнительные параметры для настройки отображения всплывающего окна.
 * @returns {Object} - Объект управления всплывающим окном.
 */
export default function showPopup(content, options) {
    // Создаем объект для управления всплывающим окном
    const control = {};
    
    // Добавляем всплывающее окно в стек
    popupsStack.push({
        content: content,
        options: options || {},
        control: control
    });

    // Обновляем стек отображаемых всплывающих окон
    updateStack();

    // Возвращаем объект управления всплывающим окном
    return control;
}

/**
 * Обновляет стек отображаемых всплывающих окон.
 */
function updateStack() {
    // Если уже отображается всплывающее окно или стек пуст, выходим из функции
    if (currentPopup || popupsStack.length < 1) {
        return;
    }

    // Получаем данные текущего всплывающего окна из стека
    currentPopup = popupsStack.shift();

    // Извлекаем контент и параметры
    const content = currentPopup.content;
    const options = currentPopup.options;

    // HTML-шаблон для всплывающего окна (можно задать через параметры)
    const template = options.template || `
        <div class="popup-overlay">
            <div class="popup-window">
                <button type="button" class="popup-close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M7.172 14.242 10 11.414l2.828 2.828 1.414-1.414L11.414 10l2.828-2.828-1.414-1.414L10 8.586 7.172 5.758 5.758 7.172 8.586 10l-2.828 2.828 1.414 1.414Z"/><path fill="currentColor" d="M10 20c5.514 0 10-4.486 10-10S15.514 0 10 0 0 4.486 0 10s4.486 10 10 10Zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8Z"/></svg>
                </button>
                <div class="popup-content"></div>
            </div>
        </div>
    `;

    // Создаем DOM-элемент на основе HTML-шаблона
    let popupElement = html2Element(template);
    const popupWindow = popupElement.querySelector('.popup-window');
    const popupCloseButton = popupElement.querySelector('.popup-close-button');
    const popupContent = popupElement.querySelector('.popup-content');
    
    // Добавляем пользовательский класс к корневому элементу, если указан в параметрах
    if (options.rootClass) {
        if (Array.isArray(options.rootClass)) {
            options.rootClass.forEach(c => popupElement.classList.add(c));
        } else if (typeof options.rootClass === 'string' || options.rootClass instanceof String) {
            popupElement.classList.add(options.rootClass);
        }
    }

    // Заполняем содержимое всплывающего окна
    if (typeof content === 'string' || content instanceof String) {
        popupContent.innerHTML = content;
    } else if (content instanceof HTMLElement) {
        popupContent.appendChild(content);
    } else {
        // Если контент не является строкой или DOM-элементом, удаляем всплывающее окно и обновляем стек
        popupElement.remove();
        updateStack();
    }

    // Навешиваем обработчики событий для закрытия всплывающего окна
    popupElement.addEventListener("click", close);
    popupCloseButton.addEventListener("click", close);
    popupWindow.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Задержка перед добавлением класса "visible" для анимации
    setTimeout(function () {
        if (popupElement) {
            popupElement.classList.add("visible");
        }
        noScroll.hideScroll();
    }, 10);

    // Функция для закрытия всплывающего окна
    function close() {
        // Вызываем колбэк onClose, если он указан в параметрах
        if (currentPopup.options.onClose) {
            currentPopup.options.onClose();
        }
        
        // Сбрасываем текущее всплывающее окно
        currentPopup = null;

        // Удаляем всплывающее окно с анимацией и восстанавливаем прокрутку
        if (popupElement) {
            popupElement.addEventListener("transitionend", function(event) {
                if (popupElement) {
                    // Если указан параметр keepContentOnClose, восстанавливаем контент в исходное положение
                    if (options.keepContentOnClose) {
                        document.body.appendChild(content);
                    }

                    // Удаляем всплывающее окно из DOM
                    popupElement.remove();
                    popupElement = null;
                    noScroll.showScroll();
                }
            });

            // Убираем класс "visible" для запуска анимации закрытия
            popupElement.classList.remove("visible");
        }
        
        // Обновляем стек отображаемых всплывающих окон
        updateStack();
    }

    // Добавляем функцию закрытия всплывающего окна в объект управления
    currentPopup.control.close = close;

    // Добавляем всплывающее окно в DOM
    document.body.appendChild(popupElement);
}
