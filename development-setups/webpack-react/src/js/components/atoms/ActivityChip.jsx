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
  chipWrapper: {
    whiteSpace: 'noWrap',
    // color: STYLES.FONT_SIZES.CAPTION,
    flex: '0 0 16.666666667%',
    padding: 4,
    textAlign: 'center',
  },
  chip: {
    opacity: 0.5,
    border: '2px solid transparent',
    backgroundColor: STYLES.COLORS.SUBTILE.string(),
    borderRadius: 8,
    padding: 2,
  },
  enabled: {
    opacity: 1,
    color: '#FFF',
    backgroundColor: STYLES.COLORS.GREEN.string(),
  },
  current: {
    opacity: 1,
    borderColor: STYLES.COLORS.RED.string(),
  },
})

export default function ActivityChip({
  isCurrent = false,
  isEnabled = false,
  text,
}) {
  // const [isChecked, setChecked] = useState(false)
  const classes = useStyles()

  const chipClasses = classNames({
    [classes.chip]: true,
    [classes.enabled]: isEnabled,
    [classes.current]: isCurrent,
  })

  return (
    <div className={classes.chipWrapper}>
      <div className={chipClasses}>
        {text}
        {/* <Label text={`${prefix}_${text}`} /> */}
      </div>
    </div>
  )
}
