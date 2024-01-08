// Этот файл генерируется автоматически, его не следует редактировать вручную
import form from '@/widgets/form.js';

export default {
  'collapse': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/collapse.js'),
  'folder': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/folder.js'),
  'form': async () => { return { default: form }; },
  'menuPopup': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/menuPopup.js'),
  'mobileMenu': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/mobileMenu.js'),
  'mobileMenuButton': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/mobileMenuButton.js'),
  'passwordField': async () => { 
                    const componentPromise = import( /* webpackMode: "lazy-once" */ '@/widgets/passwordField.vue'); 
                    const createVueWidgetPromise = import( /* webpackMode: "lazy-once" */ '@/core/createVueWidget.js'); 
                    const [component, createVueWidget] = await Promise.all([componentPromise, createVueWidgetPromise]);
                    return { default: (element, data) => createVueWidget.default(component.default, element, data) }; 
                },
  'productPopup': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/productPopup.js'),
  'recipesBlock': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/recipesBlock.js'),
  'scrollTop': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/scrollTop.js'),
  'scrollWatcher': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/scrollWatcher.js'),
  'searchBlock': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/searchBlock.js'),
  'sliderBlock': async () => await import( /* webpackMode: "lazy-once" */ '@/widgets/sliderBlock.js'),
  'tabsSwitch': async () => await import( /* webpackMode: "lazy-once" */ /* webpackChunkName: "secondary" */ '@/widgets/tabsSwitch.js')
};
