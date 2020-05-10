import React, { Fragment } from 'react'
import { createUseStyles } from 'react-jss'
// import { Link } from 'react-router-dom'
// import {  } from 'react-icons/fa'
// import classNames from 'classnames'
import moment from 'moment'

import Store from '../../Store'
// import __ from '../helpers/Translation.helper'

// import Label from './Label'
import ActivityChip from '../atoms/ActivityChip'

import STYLES from '../../STYLES.const'
const useStyles = createUseStyles({
  activityListWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    // maxWidth: 200,
    width: '100%',
  },
})

export default function ActivityChipList({ seasons }) {
  // const [isChecked, setChecked] = useState(false)
  const classes = useStyles()

  // const Classes = classNames({
  // })

  const now = moment()

  return (
    <div className={classes.activityListWrapper}>
      {seasons.map((isEnabled, month) => (
        <ActivityChip
          key={month}
          isEnabled={isEnabled}
          isCurrent={month == now.month()}
          prefix="month"
          text={Store.invoke('moment').localeData().monthsShort()[month]}
        />
      ))}
    </div>
  )
}
