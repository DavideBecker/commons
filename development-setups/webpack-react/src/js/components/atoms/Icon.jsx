import React from 'react'
// import { createUseStyles } from 'react-jss'
// import { Link } from 'react-router-dom'
// import {  } from 'react-icons/fa'
// import classNames from 'classnames'
// import moment from 'moment'

// import Store from '../../Store'
// import __ from '../helpers/Translation.helper'

// import Label from '../atoms/Label'

// import STYLES from '../../STYLES.const'
// const useStyles = createUseStyles({
// })

export default function Icon({ src, size = '100%' }) {
  // const [isChecked, setChecked] = useState(false)
  // const classes = useStyles()

  // const Classes = classNames({
  // })

  return (
    <img
      width={size}
      height={size}
      src={`${
        process.env.NODE_ENV == 'development'
          ? '/'
          : '/animal-crossing/new-horizons/'
      }dist/img/${src}`}
    />
  )
}
