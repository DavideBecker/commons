import React from 'react'
import { createUseStyles } from 'react-jss'
// import { Link } from 'react-router-dom'
// import {  } from 'react-icons/fa'
import classNames from 'classnames'

// import Store from '../Store'
// import __ from '../helpers/Translation.helper'

import Label from './Label'

import STYLES from '../../STYLES.const'
const useStyles = createUseStyles({
  chip: {
    whiteSpace: 'noWrap',
    height: 8,
    outline: '2px solid transparent',
    backgroundColor: STYLES.COLORS.SUBTILE.string(),
    borderRadius: 0,
    flex: '0 0 4.166666667%'
  },
  enabled: {
    backgroundColor: STYLES.COLORS.GREEN.string()
  },
  current: {
    zIndex: 999,
    outlineColor: STYLES.COLORS.RED.string()
  }
})

export default function ActivityChip({ isCurrent = false, isEnabled = false }) {
  // const [isChecked, setChecked] = useState(false)
  const classes = useStyles()

  const chipClasses = classNames({
    [classes.chip]: true,
    [classes.enabled]: isEnabled,
    [classes.current]: isCurrent
  })

  return <div className={chipClasses}></div>
}
