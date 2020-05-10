import React from 'react'
// import { createUseStyles } from 'react-jss'
import { Link as RouterLink } from 'react-router-dom'
// import {  } from 'react-icons/fa'
// import classNames from 'classnames'
// import moment from 'moment'

// import Store from '../../Store'
// import __ from '../helpers/Translation.helper'

// import Label from '../atoms/Label'
import Text from '../atoms/Text'

// import STYLES from '../../STYLES.const'
// const useStyles = createUseStyles({
// })

export default function Link({
  icon: Icon = null,
  route,
  variant = 'body1',
  color = false,
  className = false,
}) {
  // const [isChecked, setChecked] = useState(false)
  // const classes = useStyles()

  // const Classes = classNames({
  // })

  return (
    <RouterLink className={className} to={route.path}>
      {Icon}
      <Text
        variant={variant}
        color={color}
        content={`nav_${route.identifier}`}
      />
    </RouterLink>
  )
}
