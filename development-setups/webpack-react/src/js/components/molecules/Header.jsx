import React from 'react'
// import { createUseStyles } from 'react-jss'
import { useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
// import classNames from 'classnames'
// import moment from 'moment'

// import Store from '../../Store'
import { createClasses } from '../../helpers/Style.helper'

import Text from '../atoms/Text'

// import STYLES from '../../STYLES.const'
const useStyles = createClasses((THEME) => ({
  header: {
    position: 'fixed',
    background: THEME.COLORS.DARK2.string(),
    paddingLeft: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 9999,
  },
  menuIcon: {
    margin: '0 8px',
    fontSize: 56,
    padding: 16,
    position: 'relative',
    bottom: 1,
    color: THEME.COLORS.WHITE2.string(),
    cursor: 'pointer',
  },
  label: {
    color: THEME.COLORS.WHITE1.string(),
  },
}))

export default function Header({
  setMenuHidden = () => false,
  menuHidden,
  route,
}) {
  // const [isChecked, setChecked] = useState(false)
  const classes = useStyles()

  // const Classes = classNames({
  // })

  return (
    <div className={classes.header}>
      {menuHidden ? (
        <FaTimes className={classes.menuIcon} onClick={setMenuHidden} />
      ) : (
        <FaBars className={classes.menuIcon} onClick={setMenuHidden} />
      )}
      <Text
        className={classes.label}
        content={`title_${route.identifier}`}
      ></Text>
    </div>
  )
}
