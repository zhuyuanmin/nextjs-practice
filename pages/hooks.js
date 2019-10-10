import React, {
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
  memo,
  useMemo,
  useCallback
} from 'react'
import { connect } from 'react-redux'

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

const myContext = React.createContext('')

function MyCount() {
  // const [count, setCount] = useState(0)
  const [count, dispatchCount] = useReducer(countReducer, 0)
  const context = useContext(myContext)
  const inputRef = useRef()
  const countRef = useRef()
  countRef.current = count
  const config = useMemo(() => ({
    text: 'xxx',
    color: 'red'
  }), [count])
  const onClickButton = useCallback(() => dispatchCount({type: 'add'}), [])

  useEffect(() => {
    console.log(inputRef.current)
    const interval = setInterval(() => {
      // setCount(count => count + 1)
      dispatchCount({ type: 'minus' })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, []) // 第三参数为依赖，该依赖发生变化后才会重新调用useEffect，[]表示只执行一次
  // dom 渲染之前执行
  useLayoutEffect(() => {
    const interval = setInterval(() => {
      // setCount(count => count + 1)
      dispatchCount({ type: 'minus' })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const btnClick = useCallback(() => {
    setTimeout(() => {
      console.log(countRef.current)
    }, 2000)
  }, [])

  return <myContext.Provider>
    <span> { count } </span>
    <input ref={inputRef} type="text"/>
    <Child child={context} onClick={btnClick}></Child>
  </myContext.Provider>
}

const Child = memo((props) => {
  return (
    <span>{ props.child }</span>
  )
})

export default connect(state => ({
  count: state.count.count,
  username: state.user.username
}), dispatch => ({
  add: num => dispatch({ type: 'add', num }),
  rename: name => dispatch({ type: 'updateName', name })
}))(MyCount)