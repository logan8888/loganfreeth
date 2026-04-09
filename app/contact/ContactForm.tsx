'use client'

export default function ContactForm() {
  return (
    <form
      action="/api/contact"
      method="POST"
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <style>{`
        .lf-input {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 15px;
          padding: 12px 16px;
          border-radius: 7px;
          border: 1.5px solid #E5E0D9;
          background: #FFFFFF;
          color: #1C1C1A;
          outline: none;
          width: 100%;
          transition: border-color 0.15s ease;
        }
        .lf-input:focus { border-color: #1C1C1A; }
        .lf-label {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1C1C1A;
          letter-spacing: 0.02em;
        }
        .lf-submit {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 16px 28px;
          border-radius: 8px;
          border: none;
          background: #1C1C1A;
          color: #F9F7F4;
          cursor: pointer;
          align-self: flex-start;
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
        }
        .lf-submit:hover { transform: translateY(-2px); }
        .lf-submit:active { transform: translateY(0); opacity: 0.85; }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="name" className="lf-label">Your name</label>
        <input type="text" id="name" name="name" required autoComplete="name" className="lf-input" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="email" className="lf-label">Email address</label>
        <input type="email" id="email" name="email" required autoComplete="email" className="lf-input" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="subject" className="lf-label">Subject</label>
        <select id="subject" name="subject" className="lf-input" style={{ cursor: 'pointer' }}>
          <option value="order">Order enquiry</option>
          <option value="commission">Commission request</option>
          <option value="wholesale">Wholesale / Trade</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="message" className="lf-label">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="lf-input"
          style={{ resize: 'vertical' }}
        />
      </div>

      <button type="submit" className="lf-submit">
        Send message
      </button>
    </form>
  )
}
