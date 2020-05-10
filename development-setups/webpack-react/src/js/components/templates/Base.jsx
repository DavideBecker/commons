import React, { useState, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { createUseStyles } from 'react-jss'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
// import moment from 'moment'

// import Store from '../../Store'
import __ from '../../helpers/Translation.helper'
import { createClasses, isMobile } from '../../helpers/Style.helper'

import Header from '../molecules/Header'
import MainNavigation from '../molecules/MainNavigation'

import STYLES from '../../STYLES.const'
import ROUTES from '../../ROUTES.const'
const useStyles = createClasses((THEME) => ({
  app: {
    paddingTop: 56,
    transition: `all 240ms ${THEME.TRANSITIONS.ELASTIC}`,
    paddingLeft: 250,
    height: '100%',

    [THEME.BREAKPOINTS.DOWN('M')]: {
      // paddingTop: 0,
      paddingLeft: 0,
    },
  },
  menuHidden: {
    paddingLeft: 0,
  },
  navWrapper: {},
}))

export default function Template({ children, className }) {
  const [menuHidden, setMenuHidden] = useState(
    !isMobile && window.innerWidth > STYLES.BREAKPOINTS.M
  )
  const classes = useStyles()
  const location = useLocation()

  const currentRoute =
    ROUTES.ALL.find((v) => v.path == location.pathname) || ROUTES.PAGES.HOME

  function updateMenuState() {
    setMenuHidden(!menuHidden)
  }

  const appClasses = classNames({
    [classes.app]: true,
    [classes.menuHidden]: !menuHidden,
  })

  return (
    <Fragment>
      <Helmet>
        <title>{__(`title_${currentRoute.identifier}`)}</title>
      </Helmet>
      <Header
        route={currentRoute}
        menuHidden={menuHidden}
        setMenuHidden={updateMenuState}
      />
      <MainNavigation menuHidden={menuHidden} />
      <div className={appClasses}>
        <div className={className}>{children}</div>
      </div>
    </Fragment>
  )
}
