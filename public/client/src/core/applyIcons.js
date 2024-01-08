// Импорт списка иконок
import iconsList from "@/genIcons.js";
// Импорт утилиты для создания элемента из HTML-строки
import html2Element from "@/utils/html2Element.js";

// Подстановка иконок
export default function applyIcons() {
    // Задержка выполнения функции на 10 миллисекунд
    setTimeout(function () {
        // Поиск всех элементов с атрибутом 'data-icon'
        const iconElements = document.querySelectorAll('[data-icon]');

        // Итерация по найденным элементам
        iconElements.forEach(async (element) => {
            // Получение имени иконки из атрибута 'data-icon'
            const iconName = element.dataset["icon"];

            // Проверка наличия имени иконки
            if (!iconName) {
                console.log(element);
                throw new Error("No icon name");
            }

            // Получение содержимого иконки из списка
            const iconContent = iconsList[iconName];

            // Проверка наличия содержимого для иконки
            if (!iconContent) {
                console.log(element);
                throw new Error("Unknown icon: " + iconName);
            }

            // Создание нового элемента из HTML-строки иконки
            const newElement = html2Element(iconContent);

            // Вставка нового элемента перед текущим элементом
            element.parentNode.insertBefore(newElement, element);
            // Удаление текущего элемента
            element.remove();

            // Копирование классов из текущего элемента в новый элемент
            for (const c of element.classList) {
                newElement.classList.add(c);
            }
        });

        // Поиск всех элементов с атрибутом 'data-icon-inside'
        const iconInsideElements = document.querySelectorAll('[data-icon-inside]');

        // Итерация по найденным элементам
        iconInsideElements.forEach(async (element) => {
            // Получение имени иконки из атрибута 'data-icon-inside'
            const iconName = element.dataset["iconInside"];

            // Проверка наличия имени иконки
            if (!iconName) {
                console.log(element);
                throw new Error("No icon name");
            }

            // Получение содержимого иконки из списка
            const iconContent = iconsList[iconName];

            // Проверка наличия содержимого для иконки
            if (!iconContent) {
                console.log(element);
                throw new Error("Unknown icon: " + iconName);
            }

            // Замена содержимого элемента на HTML-строку иконки
            element.innerHTML = iconContent;
        });
    }, 10);
}
