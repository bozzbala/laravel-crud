// Функция для проверки, является ли ссылка внешней
function isExternal(location) {
    // Создание объекта URL с заданным адресом и базовым адресом текущей страницы
    const url = new URL(location, window.location.href);
    // Сравнение хостов ссылки и текущей страницы
    return url.host !== window.location.host;
}

// Обработка ссылок
export default function processLinks() {
    // Поиск всех элементов 'a' на странице
    const linksElements = document.querySelectorAll('a');

    // Итерация по найденным элементам
    linksElements.forEach(async (element) => {
        // Получение атрибута 'href' из элемента
        const href = element.href;
        // Проверка наличия атрибутов 'data-fancybox', 'data-fancybox-group' и 'data-iframe'
        const useFancybox = element.dataset.fancybox;
        const useGroup = element.dataset.fancyboxGroup;
        const useIframe = element.dataset.iframe;

        // Если используется iframe
        if (useIframe !== undefined) {
            // Добавление слушателя события click
            element.addEventListener("click", async function (event) {
                // Отмена стандартного действия по клику
                event.preventDefault();
                // Динамический импорт модуля fancybox.js
                const Fancybox = await import("@/utils/fancybox.js");
                const fancybox = Fancybox.default;

                // Показ iframe в Fancybox
                fancybox.show([
                    {
                        src: href,
                        type: "iframe",
                        preload: false
                    },
                ], {
                    mainClass: "no-paddings"
                });
            });
        }
        // Если используется Fancybox
        else if (useFancybox !== undefined) {
            // Добавление слушателя события click
            element.addEventListener("click", async function (event) {
                // Отмена стандартного действия по клику
                event.preventDefault();
                // Динамический импорт модуля fancybox.js
                const Fancybox = await import("@/utils/fancybox.js");
                const fancybox = Fancybox.default;

                // Если указана группа изображений для Fancybox
                if (useGroup) {
                    // Поиск всех элементов с атрибутом 'data-fancybox-group' равным указанной группе
                    const elements = Array.from(window.document.querySelectorAll('[data-fancybox-group="' + useGroup + '"]'));

                    // Подготовка данных для Fancybox из элементов группы
                    const fancyboxElements = elements.map(function (galleryElement) {
                        return {
                            src: galleryElement.href,
                            type: "image",
                            preload: false,
                        };
                    });

                    // Показ группы изображений в Fancybox с указанием стартового индекса
                    fancybox.show(fancyboxElements, {
                        startIndex: elements.indexOf(element)
                    });
                } else {
                    // Показ одиночного изображения в Fancybox
                    fancybox.show([
                        {
                            src: href,
                            type: "image",
                            preload: false,
                        },
                    ]);
                }
            });
        }
        // Если ссылка внешняя
        else if (isExternal(href)) {
            // Установка атрибутов 'rel' и 'target' для открытия ссылки в новой вкладке и с указанием nofollow
            element.setAttribute("rel", "nofollow");
            element.setAttribute("target", "_blank");
        }
    });
}
