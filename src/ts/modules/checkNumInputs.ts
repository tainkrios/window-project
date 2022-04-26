export const checkNumInputs = (inputs: string) => {
  const numInputs = document.querySelectorAll<HTMLInputElement>(inputs)
  
  numInputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/, '')
    })
  })
}
