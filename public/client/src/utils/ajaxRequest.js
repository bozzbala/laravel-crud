// Функция для отправки асинхронного AJAX-запроса
export default async function ajaxRequest(url, data) {
    try {
        // Используем метод fetch для отправки POST-запроса
        return fetch(url, {
            method: 'POST', // Метод запроса
            mode: 'same-origin', // Режим запроса (один и тот же источник)
            cache: 'reload', // Кэширование (перезагрузка)
            credentials: 'same-origin', // Передача креденциалов (один и тот же источник)
            headers: {
                'Content-Type': 'application/json', // Тип содержимого (JSON)
                'X-Parent-Accept': window.Application.x_parent_accept || "", // Дополнительный заголовок (по желанию)
            },
            redirect: 'follow', // Редирект (следовать)
            referrerPolicy: 'same-origin', // Политика реферрера (один и тот же источник)
            body: JSON.stringify(data) // Преобразование данных в JSON и передача тела запроса
        }).then(async (response) => {
            // Обработка ответа
            const responseText = await response.text();

            try {
                // Попытка парсинга ответа как JSON
                return JSON.parse(responseText);
            } catch (err) {
                // Обработка ошибки парсинга
                return {
                    error: err
                };
            }
        });
    } catch (err) {
        // Обработка ошибки запроса
        return {
            error: err
        };
    }
}
