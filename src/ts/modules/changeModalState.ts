import { checkNumInputs } from "./modules"

// interface IChangeModalState {
//   windowForm: string
//   windowWidth: string
//   windowHeight: string
//   windowType: string
//   windowProfile: string
// }

export const changeModalState = (state: any) => {
  // const { windowForm, windowWidth, windowHeight, windowType, windowProfile } = state

  const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox')
  
  checkNumInputs('#width')
  checkNumInputs('#height')

  const bindActionToElems = (event: string, element: any, prop: string) => {
    element.forEach((item: any, index: number) => {
      item.addEventListener(event, () => {
        switch(item.nodeName) {
          case 'SPAN' :
            state[prop] = index
            break
          case 'INPUT' :
            if (item.getAttribute('type') === 'radio') {
              state[prop] = index ? 'Теплое' : 'Холодное'
            } else {
              state[prop] = item.value
            }
            break
          case 'SELECT' :
            state[prop] = item.value
            break
        }

        console.log('state :', state)
      })
    })
  }

  bindActionToElems('click', windowForm, 'form')
  bindActionToElems('input', windowWidth, 'width')
  bindActionToElems('input', windowHeight, 'height')
  bindActionToElems('change', windowType, 'type')
  bindActionToElems('change', windowProfile, 'profile')
}