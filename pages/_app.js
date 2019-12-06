import App, { Container } from 'next/app'
import Layout from '../components/Layout'
import withRedux from '../lib/with-redux'
import { Provider } from 'react-redux'
import Router from 'next/router'
import Loading from '../components/Loading'
import Link from 'next/link'
// import 'antd/dist/antd.css'

class MyApp extends App {
  state = {
    loading: false
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }

  stopLoading = () => {
    this.setState({
      loading: false
    })
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }

  static async getInitialProps(ctx) {
    const { Component } = ctx
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx)
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
      <Provider store={reduxStore}>
        {this.state.loading ? <Loading /> : null}
        <Layout>
          <Link href="/"><a>Index</a></Link>|
          <Link href="/detail"><a>Detail</a></Link>
          <hr />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  } 
}

export default withRedux(MyApp)
