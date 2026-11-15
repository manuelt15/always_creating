// Temas de color. El azul es el de :root; los demás se activan con data-theme en <html>.
// Los colores viven en app/globals.css. Aquí solo hay nombres y la muestra del selector.

export const THEME_KEY = 'ac-theme'
export const DEFAULT_THEME = 'azul'

export const THEMES = [
  { id: 'azul', label: 'Azul', swatch: '#1F4FEF', ink: '#040A1E' },
  { id: 'naranja', label: 'Naranja', swatch: '#FF5C1F', ink: '#120A06' },
  { id: 'mono', label: 'Mono', swatch: '#EDEDED', ink: '#0A0A0A' },
]

// Se ejecuta en <head> antes de pintar, para que no parpadee el tema por defecto.
export const themeBootScript = `try{var t=localStorage.getItem('${THEME_KEY}');if(${JSON.stringify(
  THEMES.map((theme) => theme.id).filter((id) => id !== DEFAULT_THEME),
)}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`

export function applyTheme(id) {
  const root = document.documentElement
  if (id === DEFAULT_THEME) delete root.dataset.theme
  else root.dataset.theme = id

  const theme = THEMES.find((t) => t.id === id)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme?.ink || '')

  try {
    localStorage.setItem(THEME_KEY, id)
  } catch {
    // Sin almacenamiento (modo privado): el tema vale para esta visita.
  }
}
