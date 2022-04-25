interface ITabs {
  headerSelector: string
  tabSelector: string
  contentSelector: string
  activeClass: string
}

export const tabs = (args: ITabs) => {
  const { headerSelector, tabSelector, contentSelector, activeClass } = args
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
    content[i].style.display = 'block'
    tabs[i].classList.add(activeClass)
  }

  hideTabContent()
  showTabContent()

  header.addEventListener('click', (e: any) => {
    const target = e.target
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
  })
}