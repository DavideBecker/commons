import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
// import LazyLoad from 'react-lazyload'
// import { FixedSizeList as List } from 'react-window'
// import AutoSizer from 'react-virtualized-auto-sizer'
// import { Link } from 'react-router-dom'
// import {  } from 'react-icons/fa'
// import classNames from 'classnames'
// import moment from 'moment'

// import Store from '../../Store'
// import __ from '../helpers/Translation.helper'

import Text from '../atoms/Text'
import Template from './Base'

import STYLES from '../../STYLES.const'
const useStyles = createUseStyles({
  container: {
    maxWidth: STYLES.WIDTHS.L,
    margin: '0 auto',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default function WIP({ src, route }) {
  const classes = useStyles()

  return (
    <Template className={classes.container}>
      <Text>Under construction</Text>
    </Template>
  )
}
