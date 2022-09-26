export const imgerror = {
  inserted(el, binding, vnode) {
    // console.log(el)
    el.onerror = () => {
      el.src = binding.value
    }
  }
}
