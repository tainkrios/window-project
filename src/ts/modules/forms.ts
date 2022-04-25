export const forms = () => {
  const forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll<HTMLInputElement>('input[name="user_phone"]')

  phoneInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/, '')
    })
  })

  const message = {
    loading: 'Загрузка...',
    sucsess: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
  }

  const postData = async (url: string, data: FormData) => {
    document.querySelector('.status').innerHTML = message.loading
    const res = await fetch(url, {
      method: 'POST',
      body: data
    })
    return await res.text()
  }

  const clearInputs = () => {
    inputs.forEach(input => {
      input.value = ''
    })
  }

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      let statusMessage = document.createElement('div')
      statusMessage.classList.add('status')
      form.appendChild(statusMessage)

      const formData = new FormData(form)

      postData('assets/server.php', formData)
        .then(res => {
          console.log('res :', res)
          statusMessage.innerHTML = message.sucsess
        })
        .catch(() => statusMessage.innerHTML = message.failure)
        .finally(() => {
          clearInputs()
          setTimeout(() => {
            statusMessage.remove
          }, 5000)
        })
    })
  })
}