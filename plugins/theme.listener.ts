export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) { // Используем мета-флаг вместо process.client
    const colorMode = useColorMode()
    const systemQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateSystemTheme = (event: MediaQueryListEvent) => {
      if (colorMode.preference === 'system') {
        colorMode.value = event.matches ? 'dark' : 'light'
      }
    }

    // Инициализация при загрузке
    if (colorMode.preference === 'system') {
      colorMode.value = systemQuery.matches ? 'dark' : 'light'
    }

    // Слушатель изменений
    systemQuery.addEventListener('change', updateSystemTheme)

    // Очистка при уничтожении
    nuxtApp.hook('app:beforeMount', () => {
      systemQuery.removeEventListener('change', updateSystemTheme)
    })
  }
})