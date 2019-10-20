import { cloneElement } from 'react'

const style = {
  width: '100%',
  maxWidth: 1200,
  margin: '0 auto',
  paddingLeft: 20,
  paddingRight: 20
}

export default ({ children, renderer }) => {
  return cloneElement(renderer, {
    style: Object.assign({}, style, renderer.props.style),
    children
  })
}