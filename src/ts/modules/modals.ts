interface IBindModal {
  triggerSelector: string
  modalSelector: string
  closeSelector: string
}

export const modals = () => {
  function bindModal(args: IBindModal) {
    const { triggerSelector, modalSelector, closeSelector } = args
    const triggers = document.querySelectorAll(triggerSelector),
          modal: HTMLElement = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector)

    triggers.forEach((trigger) => {
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

    document.addEventListener('keydown', (e: any) => {
      if (e.key === 'Escape') {
        modal.style.display = 'none'
        document.body.style.overflow = ''
      }
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

  bindModal({
    triggerSelector: '.popup_engineer_btn',
    modalSelector: '.popup_engineer',
    closeSelector: '.popup_engineer .popup_close'
  })
  bindModal({
    triggerSelector: '.phone_link',
    modalSelector: '.popup',
    closeSelector: '.popup .popup_close'
  })
  // showModalByTime('.popup', 60000)
}

// export { modals }
