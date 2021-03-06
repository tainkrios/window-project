interface ITabs {
  headerSelector: string
  tabSelector: string
  contentSelector: string
  activeClass: string
  display?: string
}

export const tabs = (args: ITabs) => {
  const { headerSelector, tabSelector, contentSelector, activeClass, display = 'block' } = args
  const header = document.querySelector(headerSelector),
        tabs = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll<HTMLElement>(contentSelector)

  function hideTabContent() {
    content.forEach((cont) => {
      cont.style.display = 'none'
    })

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass)
    })
  }

  function showTabContent(i: number = 0) {
    content[i].style.display = display
    tabs[i].classList.add(activeClass)
  }

  hideTabContent()
  showTabContent()

  const activateTab = (target: any) => {
    if (
      target &&
      (target.classList.contains(tabSelector.replace(/\./, '')) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, '')))
    ) {
      tabs.forEach((tab, index) => {
        if (target == tab || target.parentNode == tab) {
          hideTabContent()
          showTabContent(index)
        }
      })
    }
  }

  header.addEventListener('click', (e: any) => {
    const target = e.target
    activateTab(target)
  })

  header.addEventListener('keydown', (e: any) => {
    const target = e.target
    if (e.key === 'Enter') {
      activateTab(target)
    }
  })
}