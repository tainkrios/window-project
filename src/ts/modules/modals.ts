import { ClassElement } from "typescript"

const modals = () => {
  interface BindModal {
    triggerSelector: string
    modalSelector: string
    closeSelector: string
  }
  function bindModal(
    args: BindModal
    ) {
    const triggers = document.querySelectorAll(args.triggerSelector),
          modal: HTMLElement = document.querySelector(args.modalSelector),
          close = document.querySelector(args.closeSelector)

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

  bindModal({triggerSelector: '.popup_engineer_btn', modalSelector: '.popup_engineer', closeSelector: '.popup_engineer .popup_close'})
  bindModal({triggerSelector : '.phone_link', modalSelector: '.popup', closeSelector: '.popup .popup_close'})
  // showModalByTime('.popup', 60000)
}

export default modals