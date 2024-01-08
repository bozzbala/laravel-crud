// Импорт Swiper и необходимых модулей и стилей
import Swiper, { Navigation, EffectFade, Autoplay, Pagination } from 'swiper';
import 'swiper/scss'; // Импорт основных стилей Swiper
import 'swiper/scss/effect-fade'; // Импорт стилей для эффекта "fade"

// Вижет слайдера с использованием Swiper
export default function (element, data) {
    // Инициализация Swiper с переданным элементом и настройками
    element.swiper = new Swiper(element.querySelector(".swiper"), {
        modules: [Navigation, EffectFade, Autoplay, Pagination], // Подключение необходимых модулей
        slidesPerView: 1, // Количество отображаемых слайдов
        effect: "fade", // Эффект перехода между слайдами
        speed: data.transition, // Скорость перехода между слайдами
        loop: true, // Бесконечное циклическое воспроизведение слайдов
        autoplay: {
            delay: data.timeout, // Задержка между автоматическим переключением слайдов
        },
        pagination: {
            el: element.querySelector(".swiper-pagination"), // Элемент для отображения пагинации
            type: 'bullets', // Тип пагинации (точки)
            clickable: true // Возможность кликать по точкам для перехода к соответствующему слайду
        },
        navigation: {
            nextEl: element.querySelector(".swiper-button-next"), // Элемент для переключения на следующий слайд
            prevEl: element.querySelector(".swiper-button-prev"), // Элемент для переключения на предыдущий слайд
        },
    });
};

// @widgetLoadingMode:lazy-once