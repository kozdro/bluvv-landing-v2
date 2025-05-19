export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  const body = await readBody(event)

  if (!body.email) {
    return {
      success: false,
      message: 'Missing required email field',
    }
  }

  try {
    const apiKey = config.mailerLiteApiKey
    const listId = config.public.mailerLiteListId

    if (!apiKey) {
      throw new Error('API key for MailerLite is missing')
    }

    const url = 'https://connect.mailerlite.com/api/subscribers'

    const response = await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email: body.email,
        groups: [listId]
      }),
    })

    if (!response?.data) {
      throw new Error('MailerLite API error')
    }

    return {
      data: {
        success: true,
        message: 'Subscriber added successfully',
      }
    }
  } catch (error) {
    console.error('MailerLite error: ', error)

    return {
      data: {
        success: false,
        message: error.message || 'An error occurred while adding the subscriber',
      }
    }
  }
})
