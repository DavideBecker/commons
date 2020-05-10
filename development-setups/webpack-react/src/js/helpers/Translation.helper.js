import languages from '../../translations/translations.yaml'
import Store from '../Store'

export const supportedLanguages = ['en']

export default function (key, langOverride = 'en') {
  const lang = Store.get('language') || langOverride
  if (!languages[key]) {
    console.warn(key, 'does not exist in translations')
    return `[${key}]`
  }
  if (!languages[key][lang]) {
    console.warn(
      key,
      'does not exist in language',
      lang,
      'falling back to english'
    )
    return languages[key].en
  }
  return languages[key][lang]
}
