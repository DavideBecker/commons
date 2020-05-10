import { createUseStyles } from 'react-jss'
import STYLES from '../STYLES.const'

import Store from '../Store'

export function createClasses(jss) {
  return createUseStyles(jss(STYLES))
}

export const formatThousands = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
