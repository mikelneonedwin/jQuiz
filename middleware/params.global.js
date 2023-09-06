export default defineNuxtRouteMiddleware((to) => {
    useCookie('host', {
        default: () => useRequestHeaders().host
    });
})