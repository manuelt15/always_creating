import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

// Remitente: tiene que ser una dirección del dominio verificado en Resend (alwayscreating.es).
// onboarding@resend.dev es el remitente de pruebas de Resend y solo entrega al correo dueño de
// la cuenta: con él, quien escribe nunca recibe el enlace de confirmación.
export const FROM_EMAIL  = process.env.FROM_EMAIL  || 'onboarding@resend.dev'
export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'contact.manueltorres@gmail.com'

// El SDK no lanza cuando Resend rechaza un envío: devuelve { error }. Aquí se comprueba y se
// registra, para que un fallo de correo no pase en silencio.
export async function sendEmail(params) {
  try {
    const { data, error } = await resend.emails.send({ from: FROM_EMAIL, ...params })
    if (error) {
      console.error(`Resend rechazó el correo "${params.subject}":`, error.name, error.message)
      return { ok: false, error }
    }
    return { ok: true, id: data?.id }
  } catch (err) {
    console.error(`Fallo al enviar "${params.subject}":`, err.message)
    return { ok: false, error: err }
  }
}
