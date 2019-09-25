import Router from 'next/router'

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hasChangeStart',
  'hasChangeComplete'
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})

export default () => {

  return (
    <span> Hello </span>
  )
}
