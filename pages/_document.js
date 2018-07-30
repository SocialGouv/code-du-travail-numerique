import Document, { Head, Main, NextScript } from 'next/document'
import GitHubForkRibbon from "react-github-fork-ribbon";
import Header from '../src/Header.js'
import { ServerStyleSheet } from 'styled-components'


export default class MyDocument extends Document {

  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <title>Code du travail numérique</title>
          <link rel="shortcut icon" href="/static/favicon.ico"/>
          <link rel="stylesheet" href="/_next/static/style.css"/>
          <link rel="stylesheet" href="//cdn.rawgit.com/etalab/template.data.gouv.fr/master/src/main.css"/>
          {this.props.styleTags}
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,es6,Array.prototype.includes"></script>
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Header />
          <GitHubForkRibbon
            href="//github.com/SocialGouv/code-du-travail-explorer"
            target="_blank"
            position="right"
            color="green"
          >
            version bêta
          </GitHubForkRibbon>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }

}
