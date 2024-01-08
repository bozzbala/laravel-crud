import { nanoid } from 'nanoid'

// Виджет фолдер (aka more)
export default function (element, data) {
    // Выполнение в следующем тике
    setTimeout(function () {
        // Генерация уникального идентификатора для данного фолдера
        const id = nanoid();
        // Исходное состояние фолдера (по умолчанию "closed", может быть "open")
        const initialState = (data.state || "closed") == "open";
        // Высота фолдера в свернутом состоянии (по умолчанию 100)
        const collapsedHeight = data.collapsedHeight || 100;
        // Сотояние display для видимой кнопки "Открыть" / "Закрыть" (по умолчанию "inline")
        const visibleButtonDisplay = data.visibleButtonDisplay || "inline";
        // Элементы фолдера: кнопки открытия и закрытия, контейнер и содержимое
        const openButton = element.querySelector(".folder-open");
        const closeButton = element.querySelector(".folder-close");
        const wrap = element.querySelector(".folder-wrap");
        const content = element.querySelector(".folder-content");

        // Получение высоты содержимого
        let height = content.offsetHeight;
        // Переменная для отслеживания текущего состояния фолдера (открыто или закрыто)
        let isOpen = initialState;

        // Обработчик события "click" для кнопки открытия
        openButton.addEventListener("click", function () {
            open();
        });

        // Обработчик события "click" для кнопки закрытия
        closeButton.addEventListener("click", function () {
            close();
        });

        // Обработчик события "transitionend" для завершения анимации
        wrap.addEventListener("transitionend", function () {
            // Если фолдер открыт, установить высоту контейнера в "auto" после завершения анимации
            if (isOpen) {
                wrap.style.height = "auto";
            }
        });

        // Инициализация состояния фолдера при загрузке страницы
        if (initialState) {
            open();
        } else {
            close();
        }

        // Функция для открытия фолдера
        function open() {
            // Проверка высоты содержимого и установка состояния "открыто"
            if (height > collapsedHeight) {
                openButton.style.display = visibleButtonDisplay;
                openButton.style.position = "absolute";
                openButton.style.visibility = "hidden";
                openButton.style.opacity = "0";

                closeButton.style.display = visibleButtonDisplay;
                closeButton.style.position = "static";
                closeButton.style.visibility = "visible";
                closeButton.style.opacity = "1";

                if (!isOpen) {
                    isOpen = true;
                    const height = content.offsetHeight;

                    element.classList.add("folder-open");
                    wrap.style.height = height + "px";
                } else {
                    wrap.style.height = "auto";
                }
            } else {
                // Если высота содержимого недостаточна, установить высоту в "auto" и скрыть кнопки
                wrap.style.height = "auto";
                closeButton.style.display = "none";
                openButton.style.display = "none";
            }
        }

        // Функция для закрытия фолдера
        function close() {
            // Проверка высоты содержимого и установка состояния "закрыто"
            if (height > collapsedHeight) {
                closeButton.style.display = visibleButtonDisplay;
                closeButton.style.position = "absolute";
                closeButton.style.visibility = "hidden";
                closeButton.style.opacity = "0";

                openButton.style.display = visibleButtonDisplay;
                openButton.style.position = "static";
                openButton.style.visibility = "visible";
                openButton.style.opacity = "1";

                if (isOpen) {
                    isOpen = false;
                    const height = content.offsetHeight;

                    element.classList.remove("folder-open");
                    wrap.style.height = height + "px";
                    // Установка таймаута для начала анимации после установки высоты
                    setTimeout(function () {
                        wrap.style.height = collapsedHeight + "px";
                    }, 1);
                } else {
                    wrap.style.height = collapsedHeight + "px";
                }
            } else {
                // Если высота содержимого недостаточна, установить высоту в "auto" и скрыть кнопки
                wrap.style.height = "auto";
                closeButton.style.display = "none";
                openButton.style.display = "none";
            }
        }

        // Функция для обновления состояния фолдера
        function update() {
            console.log("func update");
            height = content.offsetHeight;
            // Проверка текущего состояния и вызов соответствующей функции
            if (isOpen) {
                open();
            } else {
                close();
            }
        }

        // Добавление слушателя события "update" для обновления состояния фолдера
        element.addEventListener("update", update);
    }, 0);
}

// @widgetLoadingMode:lazy-once
// @widgetLoadingChunk:secondary