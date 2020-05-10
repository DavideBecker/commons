import React from 'react'
import { createUseStyles } from 'react-jss'

import STYLES from '../../STYLES.const'
const useStyles = createUseStyles({
  button: {
    background: 'transparent',
    fontSize: 16,
    border: `2px solid ${STYLES.COLORS.GRAY_DARK.darken(0.1).string()}`,
    color: STYLES.COLORS.GRAY_DARK.string(),
    borderRadius: '6px',
    cursor: 'pointer',
    padding: '6px 12px',
    display: 'inline-block',

    '&:hover': {
      background: STYLES.COLORS.GRAY_DARK.string(),
      color: '#FFF',
    },
  },
})

export default function ({ children, onClick }) {
  const classes = useStyles()

  return (
    <button className={classes.button} onClick={onClick}>
      {children}
    </button>
  )
}
