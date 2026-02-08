import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { Env } from '../index';

export const contact = new OpenAPIHono<{ Bindings: Env }>();

const contactRequestSchema = z.object({
  name: z.string().min(2).openapi({ example: 'John Doe' }),
  email: z.string().email().openapi({ example: 'john@example.com' }),
  subject: z.string().min(2).openapi({ example: 'Inquiry' }),
  message: z.string().min(10).openapi({ example: 'Hello, I would like to discuss a project.' }),
}).openapi('ContactRequest');

const contactResponseSchema = z.object({
  success: z.boolean().openapi({ example: true }),
  message: z.string().openapi({ example: 'Message sent successfully' }),
}).openapi('ContactResponse');

const sendContactRoute = createRoute({
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: contactRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: contactResponseSchema,
        },
      },
      description: 'Contact message sent',
    },
    400: {
      content: {
        'application/json': {
          schema: z.object({ error: z.string(), details: z.any() }),
        },
      },
      description: 'Invalid input',
    },
    500: {
      content: {
        'application/json': {
          schema: z.object({ error: z.string(), details: z.string() }),
        },
      },
      description: 'Server error',
    },
  },
});

contact.openapi(sendContactRoute, async (c) => {
  const { name, email, subject, message } = c.req.valid('json');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'ttdehof@gmail.com',
        subject: `New Contact: ${subject}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
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