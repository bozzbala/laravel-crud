<script>
export default {
    inheritAttrs: false, // Не наследовать атрибуты родительского элемента
    props: {
        placeholder: String // Пропс placeholder с типом String
    },
    data() {
        return {
            showPassword: false // Состояние, показывать ли пароль или нет
        };
    },
    methods: {
        toggle() {
            this.showPassword = !this.showPassword; // Метод для переключения видимости пароля
        },
    }
}
</script>

<template>
    <div class="floating-label-input password-field">
        <!-- Поле ввода с привязанными атрибутами и динамическим типом в зависимости от showPassword -->
        <input class="input-field"  v-bind="$attrs" :type="showPassword ? 'text' : 'password'" placeholder="&nbsp;">
        
        <!-- Отображение подписи к полю ввода -->
        <span class="input-label">{{ placeholder }}</span> 
        
        <!-- Иконка "глаза" для отображения пароля, активирующая метод toggle -->
        <svg-icon class="icon" v-if="!showPassword" name="eye" @click="toggle"/>
        
        <!-- Иконка "закрытого глаза" для скрытия пароля, активирующая метод toggle -->
        <svg-icon class="icon" v-else name="eye-off" @click="toggle"/>
    </div>
</template>

<style lang="scss" scoped>
.password-field {
    position: relative;

    .icon {
        position: absolute;
        right: 0;
        top: 15px;
    }
}

// @widgetLoadingMode:lazy-once
</style>
