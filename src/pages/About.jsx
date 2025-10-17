import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function About() {
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateContactForm = ({ from_name, from_email, message }) => {
    if (!from_name.trim() || !from_email.trim() || !message.trim()) {
      return 'Por favor completa todos los campos.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email.trim())) {
      return 'Por favor ingresa un correo válido.';
    }
    return null;
  };

  const clearMessages = () => {
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
  };

  const handleSubmitWhatsApp = e => {
    e.preventDefault();
    if (loading) return;

    const err = validateContactForm(form);
    if (err) {
      setError(err);
      clearMessages();
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    const phoneNumber = '56937450359'; // tu número real
    const messageText = `Hola AnimeKai Store! Soy ${form.from_name}.
Email: ${form.from_email}
Mensaje: ${form.message}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      messageText
    )}`;
    window.open(url, '_blank');

    setSuccess('Mensaje abierto en WhatsApp ✅');
    setForm({ from_name: '', from_email: '', message: '' });
    setLoading(false);
    clearMessages();
  };

  const handleSubmitEmail = e => {
    e.preventDefault();
    if (loading) return;

    const err = validateContactForm(form);
    if (err) {
      setError(err);
      clearMessages();
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    emailjs
      .sendForm(
        'service_sabqg8a',     // Service ID
        'template_9pfxrzm',    // Template ID
        formRef.current,       // Form ref
        'PSU86fj00YKilqrFG'   // Public Key
      )
      .then(() => {
        setSuccess('Correo enviado con éxito ✅');
        setForm({ from_name: '', from_email: '', message: '' });
        setLoading(false);
        clearMessages();
      })
      .catch(err => {
        console.error('Error EmailJS:', err);
        setError('Error al enviar el mensaje ❌');
        setLoading(false);
        clearMessages();
      });
  };

  return (
    <section id="about" className="container">
      <h2>Quiénes Somos</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            <strong>AnimeKai Store</strong> es una tienda especializada en productos de anime y manga, ofreciendo figuras, pósters, ropa y accesorios de tus series favoritas.
          </p>
          <p>
            Nuestro objetivo es entregar productos de calidad, con envíos rápidos y atención personalizada.
          </p>
        </div>

        <form ref={formRef} className="contact-form" onSubmit={handleSubmitWhatsApp}>
          <h3>Contáctanos</h3>

          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="from_name"
              value={form.from_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Correo:</label>
            <input
              type="email"
              name="from_email"
              value={form.from_email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mensaje:</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {error && <span className="error-message">{error}</span>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <button
            type="submit"
            style={{ backgroundColor: '#25d366' }}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar por WhatsApp'}
          </button>

          <button
            type="button"
            onClick={handleSubmitEmail}
            style={{ marginTop: '0.5rem', backgroundColor: '#5d62fb' }}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar por Correo'}
          </button>
        </form>
      </div>
    </section>
  );
}
