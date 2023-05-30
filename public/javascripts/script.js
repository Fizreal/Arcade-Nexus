const assignRoute = () => {
  let select = document.getElementById('list')
  let formAction = select.options[select.selectedIndex].value
  document.addToList.action = formAction
}
