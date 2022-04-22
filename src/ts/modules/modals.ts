import { ClassElement } from "typescript"

const modals = () => {
  interface BindModal {
    triggerSelector: string
    modalSelector: string
    closeSelector: string
  }
  function bindModal({
    triggerSelector: string, 
    modalSelector: string, 
    closeSelector: string
    }) {
    const triggers = document.querySelectorAll(triggerSelector),
          modal: HTMLElement = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector)

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e: any) => {
        if (e.target) {
          e.preventDefault()
        }

        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
      })
    })

    close.addEventListener('click', () => {
      modal.style.display = 'none'
      document.body.style.overflow = ''
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'
        document.body.style.overflow = ''
      }
    })
  }

  function showModalByTime(selector: string, time: number) {
    setTimeout(() => {
      document.querySelector<HTMLElement>(selector).style.display = 'block'
      document.body.style.overflow = 'hidden'
    }, time)
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close')
  bindModal('.phone_link', '.popup', '.popup .popup_close')
  // showModalByTime('.popup', 60000)
}

export default modals