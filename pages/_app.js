import App from 'next/app'
import Layout from '../components/layout'
// import 'antd/dist/antd.css'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
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
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  } 
}