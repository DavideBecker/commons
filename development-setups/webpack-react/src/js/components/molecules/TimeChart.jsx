import React, { Fragment } from 'react'
import { createUseStyles } from 'react-jss'
// import { Link } from 'react-router-dom'
// import {  } from 'react-icons/fa'
// import classNames from 'classnames'
import moment from 'moment'

// import Store from '../Store'
// import __ from '../helpers/Translation.helper'

// import Label from './Label'
import TimeChip from '../atoms/TimeChip'

// import STYLES from '../../STYLES.const'
const useStyles = createUseStyles({
  timeChartWrapper: {
    display: 'flex',
    flexDirection: 'row',
    // maxWidth: 200,
    width: '100%',
  },
})

export default function TimeChart({ hours }) {
  // const [isChecked, setChecked] = useState(false)
  const classes = useStyles()

  // const Classes = classNames({
  // })

  const now = moment()

  return (
    <div className={classes.timeChartWrapper}>
      {hours.map((isEnabled, hour) => (
        <TimeChip
          key={hour}
          isEnabled={isEnabled}
          isCurrent={hour == now.hour()}
          hour={hour}
        />
      ))}
    </div>
  )
}
