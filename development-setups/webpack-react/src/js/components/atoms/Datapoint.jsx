import React from 'react'
// import { createUseStyles } from 'react-jss'
// import { Link } from 'react-router-dom'
// import {  } from 'react-icons/fa'
// import classNames from 'classnames'
// import moment from 'moment'

// import Store from '../../Store'
// import __ from '../helpers/Translation.helper'

import Text from '../atoms/Text'

// import STYLES from '../../STYLES.const'
// const useStyles = createUseStyles({
// })

export default function Datapoint({
  label = false,
  labelStyle = { emphasis: 'medium' },
  value = null,
  valueStyle = {},
}) {
  // const [isChecked, setChecked] = useState(false)
  // const classes = useStyles()

  // const Classes = classNames({
  // })

  return (
    <div>
      {label && <Text {...labelStyle}>{label}: </Text>}
      {value && <Text {...valueStyle}>{value !== true && value}</Text>}
    </div>
  )
}
