import React, { useState } from 'react';

/**
 * ContactForm
 * - Modo 1 (por defecto): muestra el contenido del correo y usa mailto: para abrir el cliente
 * - Modo 2 (opcional): enviar a Formspree usando fetch (necesitas crear un endpoint en Formspree y pegarlo abajo)
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: 'Vicente', email: 'vicentejavierbueno', subject: '', message: '' });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function openMailClient() {
    // Construir body y subject codificados
    const subject = encodeURIComponent(
      form.subject || `Contacto de ${form.name || 'visitante'}`
    );
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    // Reemplaza 'tucorreo@example.com' por tu dirección real
    const to = 'tucorreo@example.com';
    globalThis.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  async function sendToFormspree(e) {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      // Cambia este endpoint por el de tu proyecto Formspree (por ejemplo: https://formspree.io/f/xxxxxx)
      const FORM_ENDPOINT = 'https://formspree.io/f/your-id';
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
      });
      if (res.ok) setResult({ ok: true, message: 'Enviado correctamente (Formspree).' });
      else setResult({ ok: false, message: `Error al enviar: ${res.status}` });
    } catch (err) {
      setResult({ ok: false, message: err.message });
    } finally {
      setSending(false);
    }
  }

  function handlePreview(e) {
    e.preventDefault();
    setPreviewOpen(p => !p);
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <h2>Contacto</h2>
      <form onSubmit={sendToFormspree}>
        <div style={{ display: 'grid', gap: 8 }}>
          <label>
            Nombre
            {' '}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Tu email
            {' '}
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Asunto
            {' '}
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
          </label>

          <label>
            Mensaje
            {' '}
            <textarea
              name="message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={openMailClient} disabled={!form.email || !form.message}>
              Abrir en cliente (mailto)
            </button>

            <button type="submit" disabled={sending}>
              {sending ? 'Enviando...' : 'Enviar (Formspree)'}
            </button>

            <button type="button" onClick={handlePreview}>
              {previewOpen ? 'Ocultar preview' : 'Ver preview'}
            </button>
          </div>
        </div>
      </form>

      {previewOpen && (
        <section style={{ marginTop: 12, padding: 12, border: '1px solid #ddd' }}>
          <h3>Preview del correo</h3>
          <p><strong>Para:</strong> tucorreo@example.com</p>
          <p><strong>Asunto:</strong> {form.subject || `Contacto de ${form.name || 'visitante'}`}</p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{`Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`}</pre>
        </section>
      )}

      {result && (
        <p style={{ marginTop: 8, color: result.ok ? 'green' : 'red' }}>{result.message}</p>
      )}

      <section style={{ marginTop: 16, fontSize: 14 }}>
        <h4>Notas</h4>
        <ul>
          <li>Cambia la variable <code>to</code> dentro de <code>openMailClient</code> por tu email real.</li>
          <li>Para enviar sin abrir el cliente, crea un endpoint gratis en Formspree y reemplaza <code>FORM_ENDPOINT</code>.</li>
          <li>También puedes usar EmailJS (cliente JS) — consulta su documentación para enviar directamente sin backend.</li>
        </ul>
      </section>
    </div>
  );
}
