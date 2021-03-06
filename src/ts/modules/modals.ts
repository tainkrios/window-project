interface IBindModal {
  triggerSelector: string
  modalSelector: string
  closeSelector: string
  closeClickOverlay?: boolean
}

export const modals = () => {
  function bindModal(args: IBindModal) {
    const { triggerSelector, modalSelector, closeSelector, closeClickOverlay = true } = args
    const triggers = document.querySelectorAll(triggerSelector),
          modal: HTMLElement = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll<HTMLElement>('[data-modal]'),
          scroll = calsScroll()

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e: any) => {
        if (e.target) {
          e.preventDefault()
        }

        windows.forEach(window => {
          window.style.display = 'none'
        })

        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        document.body.style.marginRight = `${scroll}px`
      })
    })

    close.addEventListener('click', () => {
      closeModal()
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        closeModal()
      }
    })

    const closeModal = () => {
      windows.forEach(window => {
        window.style.display = 'none'
      })

      modal.style.display = 'none'
      document.body.style.overflow = ''
      document.body.style.marginRight = `0px`
    }
  }

  function showModalByTime(selector: string, time: number) {
    setTimeout(() => {
      document.querySelector<HTMLElement>(selector).style.display = 'block'
      document.body.style.overflow = 'hidden'
    }, time)
  }

  function calsScroll() {
    const div = document.createElement('div')

    div.style.width = '50px'
    div.style.height = '50px'
    div.style.overflowY = 'scroll'
    div.style.visibility = 'hidden'

    document.body.append(div)

    const scrollWidth = div.offsetWidth - div.clientWidth

    div.remove()

    return scrollWidth
  }

  bindModal({
    triggerSelector: '.popup_engineer_btn',
    modalSelector: '.popup_engineer',
    closeSelector: '.popup_engineer .popup_close',
  })

  bindModal({
    triggerSelector: '.phone_link',
    modalSelector: '.popup',
    closeSelector: '.popup .popup_close'
  })
  
  bindModal({
    triggerSelector: '.popup_calc_btn',
    modalSelector: '.popup_calc',
    closeSelector: '.popup_calc_close'
  })

  bindModal({
    triggerSelector: '.popup_calc_button',
    modalSelector: '.popup_calc_profile',
    closeSelector: '.popup_calc_profile_close',
    closeClickOverlay: false
  })

  bindModal({
    triggerSelector: '.popup_calc_profile_button',
    modalSelector: '.popup_calc_end',
    closeSelector: '.popup_calc_end_close',
    closeClickOverlay: false
  })
  // showModalByTime('.popup', 60000)
}