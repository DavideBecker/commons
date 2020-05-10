import React from 'react'
// import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'
// import {  } from 'react-icons/fa'
// import classNames from 'classnames'
// import moment from 'moment'

import fishes from '../../../data/fishes'

// import Store from '../../Store'
// import __ from '../helpers/Translation.helper'

// import Collectible from '../molecules/Collectible'
import Template from '../templates/Base'

import ROUTES from '../../ROUTES.const'
// const useStyles = createUseStyles({
// })

export default function Home() {
  // const [isChecked, setChecked] = useState(false)
  // const classes = useStyles()

  // const Classes = classNames({
  // })

  return (
    <Template>
      <Link to={ROUTES.CHECKLISTS.FISHES.path}>
        <span>Sup</span>
      </Link>
    </Template>
  )
}
