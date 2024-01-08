/**
 * Обрабатывает ответ от AJAX-запроса и вызывает соответствующие колбэки в зависимости от результата.
 * @param {Object} response - Объект ответа от сервера.
 * @param {Function} successCallback - Функция обратного вызова в случае успешного запроса.
 * @param {Function} errorCallback - Функция обратного вызова в случае ошибки запроса.
 */
export default function processAjaxResponse(response, successCallback, errorCallback) {
    // Проверяем, успешен ли запрос
    if (response && response.result && response.result === "success") {
        // Если успешен, вызываем функцию обратного вызова для успешного запроса
        successCallback(response.msg, response);
    } else {
        // Если запрос не успешен, подготавливаем сообщение об ошибке и дополнительные данные
        let errorMessage = "Произошла ошибка";
        let errorData = null;

        if (response && response.error) {
            // Если есть сообщение об ошибке, записываем его в переменную
            console.error(response.error);
            errorMessage = response.error.toString ? response.error.toString() : "" + response.error;
        }

        if (response && response.data) {
            // Если есть дополнительные данные, записываем их в переменную
            errorData = response.data;
        }

        // Вызываем функцию обратного вызова для обработки ошибки
        errorCallback(errorMessage, errorData);
    }
}
