import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { JssProvider } from 'react-jss'
import moment from 'moment'

import detectBrowserLanguage from 'detect-browser-language'
import { supportedLanguages } from './helpers/Translation.helper'

import Store from './Store'

import ROUTES from './ROUTES.const'

const userLang = detectBrowserLanguage()
const lang = userLang.substring(0, userLang.indexOf('-'))

Store.populate({
  version: 1,
  language: supportedLanguages.includes(Store.get('language'))
    ? Store.get('language')
    : supportedLanguages.includes(lang)
    ? lang
    : 'en',
})

Store.addAction('moment', moment().locale(Store.get('language')))

import Router from './Router'

function App() {
  const [language, setLanguage] = useState(Store.get('language'))

  Store.sub('language', setLanguage)

  return <Router />
}

ReactDOM.render(
  <JssProvider>
    <App />
  </JssProvider>,
  document.getElementById('app')
)
