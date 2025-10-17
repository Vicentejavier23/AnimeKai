export function validateContactForm({ name, email, message }) {
  const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  if (!name || !email || !message) return 'Por favor completa todos los campos.'
  if (!emailPattern.test(email)) return 'Por favor ingresa un correo válido.'
  return ''
}
