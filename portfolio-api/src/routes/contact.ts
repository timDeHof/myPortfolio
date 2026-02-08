import { Hono } from 'hono';
import { z } from 'zod';
import { Env } from '../index';

export const contact = new Hono<{ Bindings: Env }>();

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

contact.post('/', async (c) => {
  const body = await c.req.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: 'Invalid input', details: result.error.format() }, 400);
  }

  const { name, email, subject, message } = result.data;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Change to your verified domain later
        to: 'ttdehof@gmail.com',
        subject: `New Contact: ${subject}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return c.json({ error: 'Failed to send email', details: error }, 500);
    }

    return c.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    return c.json({ error: 'Internal Server Error', details: (error as Error).message }, 500);
  }
});
