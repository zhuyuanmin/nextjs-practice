import App from 'next/app'
import Layout from '../components/layout'
import TestHoc from '../lib/test-hoc'
import { Provider } from 'react-redux'
// import 'antd/dist/antd.css'

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx)
      console.log(pageProps)
      return {
        pageProps
      }
    } else {
      return {}
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Layout>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    )
  } 
}

export default TestHoc(MyApp)
