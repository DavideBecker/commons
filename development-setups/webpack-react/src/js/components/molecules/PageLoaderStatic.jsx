import React from 'react'
import { createUseStyles } from 'react-jss'
// import { Link } from 'react-router-dom'
import { FaCircleNotch } from 'react-icons/fa'
// import classNames from 'classnames'

// import Store from '../Store'
// import __ from '../helpers/Translation.helper'

// import Label from './Label'

import STYLES from '../../STYLES.const'
const useStyles = createUseStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: '$spin 500ms linear infinite',
    fontSize: 64,
    color: STYLES.COLORS.GRAY_MEDIUM.string(),
  },
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
})

export default function PageLoaderStatic({}) {
  // const [isChecked, setChecked] = useState(false)
  const classes = useStyles()

  // const Classes = classNames({
  // })

  return (
    <div className={classes.container}>
      <div className={classes.loader}>
        <FaCircleNotch />
      </div>
    </div>
  )
}
