export default defineEventHandler(async(event) => {
  const body = await readBody(event)

  const config = useRuntimeConfig()

  const userEmail = config.public.emailUser
  const passEmail = config.emailPass
  const contactEmail = config.public.contactEmail

  // NOTE: form data validation
  if (!body.name || !body.email || !body.message || !body.termsAccepted) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  try {
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.createTransport({
      host: 's108.cyber-folks.pl',
      port: 465,
      auth: {
        user: userEmail,
        pass: passEmail,
      },
    })

    await transporter.sendMail({
      from: userEmail,
      to: contactEmail,
      replyTo: body.email,
      subject: `Nowa wiadomość od ${body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #D17AB3;">Nowa wiadomość od ${body.name}</h2>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Wiadomość:</strong></p>
          <blockquote style="background-color: #ffffff; border-left: 4px solid #D17AB3; padding-left: 10px; color: #000000;">
            ${body.message}
          </blockquote>
          <p style="color: #D17AB3; margin-top: 16px;">Wiadomość wygenerowana automatycznie z formularza kontaktowego Bluvv.</p>
        </div>
      `
    })

    return {
      data: {
        success: true,
        message: 'Wiadomość wysłana',
      },
    }
  } catch (error) {
    console.error('Błąd wysyłania e-maila: ', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
