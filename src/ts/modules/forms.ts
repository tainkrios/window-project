import { checkNumInputs } from "./modules"

export const forms = (state: any) => {
  const forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input')

  checkNumInputs('input[name="user_phone"]')

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
      const statusMessage = document.createElement('div')
      statusMessage.classList.add('status')
      form.append(statusMessage)

      const formData = new FormData(form)
      if (form.getAttribute('data-calc') === 'end') {
        for (const key in state) {
          formData.append(key, state[key])
        }
      }

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