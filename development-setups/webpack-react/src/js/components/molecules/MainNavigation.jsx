import React, { useState } from 'react'
// import { createUseStyles } from 'react-jss'
import {
  FaFish,
  FaBug,
  FaHome,
  FaCalendarAlt,
  FaEgg,
  FaGlobeEurope,
  FaPaintBrush,
} from 'react-icons/fa'
import classNames from 'classnames'
// import moment from 'moment'

// import Store from '../../Store'
import { createClasses } from '../../helpers/Style.helper'

import Link from '../atoms/Link'
import Text from '../atoms/Text'

import ROUTES from '../../ROUTES.const'
import STYLES from '../../STYLES.const'
const useStyles = createClasses((THEME) => ({
  container: {},
  outerNavigation: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    background: THEME.COLORS.DARK3.string(),
    boxShadow: THEME.SHADOWS.M,
    position: 'fixed',
    width: '100%',
    left: -250,
    top: 55,
    bottom: 0,
    overflowY: 'auto',
    maxWidth: 250,
    zIndex: '9999',
    padding: 16,
    transition: `all 240ms ${THEME.TRANSITIONS.ELASTIC}`,

    [THEME.BREAKPOINTS.DOWN('S')]: {
      width: '100%',
      maxWidth: '100%',
      left: '-100vw',
    },

    '& a': {
      textDecoration: 'none',
    },
  },
  outerLinkWrapper: {
    position: 'relative',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  outerLink: {
    display: 'block',
    color: THEME.COLORS.WHITE2.string(),
  },
  pageLink: {
    padding: '8px 12px 8px 24px',
    display: 'flex',
    fontSize: 24,
    borderRadius: 6,
    border: `1px solid transparent`,
    position: 'relative',
    left: -128,
    transition: `left 560ms ${THEME.TRANSITIONS.ELASTIC}`,

    '&:hover': {
      borderColor: THEME.COLORS.DARK2.lighten(0.4).string(),
      background: THEME.COLORS.DARK2.string(),
    },
  },
  icon: {
    marginRight: 12,
    fontSize: 16,
    position: 'relative',
    top: 1,
    color: THEME.COLORS.WHITE3.string(),
  },
  outerLinkWithChildren: {
    fontWeight: 700,
    color: THEME.COLORS.WHITE3.string(),
    cursor: 'default',
    fontSize: 14,
    padding: '24px 16px 8px 16px',
    textTransform: 'uppercase',
    position: 'relative',
    left: -64,
    transition: `left 480ms ${THEME.TRANSITIONS.ELASTIC}`,
  },
  innerNavigation: {
    // display: 'none',
    // position: 'absolute',
    width: '100%',
    minWidth: '170px',
    // top: '100%',
    // left: 0,
    // zIndex: '999',
    // boxShadow: STYLES.SHADOWS.M,
  },
  innerLink: {
    padding: '8px 12px 8px 24px',
    display: 'flex',
    fontWeight: 500,
    color: THEME.COLORS.WHITE2.string(),
  },

  menuHidden: {
    '& $outerNavigation': {
      left: 0,
    },

    '& $pageLink': {
      left: 0,
    },

    '& $outerLinkWithChildren': {
      left: 0,
    },
  },
}))

export default function Name({ menuHidden }) {
  // const [isChecked, setChecked] = useState(false)
  const classes = useStyles()

  const containerClasses = classNames({
    [classes.container]: true,
    [classes.menuHidden]: menuHidden,
  })

  return (
    <div className={containerClasses}>
      <nav className={classes.navWrapper}>
        <ul className={classes.outerNavigation}>
          <li className={classes.outerLinkWrapper}>
            <Link
              variant="body1"
              color="white"
              icon={<FaHome className={classes.icon} />}
              className={[classes.outerLink, classes.pageLink].join(' ')}
              route={ROUTES.PAGES.HOME}
            />
          </li>
          <li className={classes.outerLinkWrapper}>
            <Text
              className={[
                classes.outerLinkWithChildren,
                classes.outerLink,
              ].join(' ')}
              variant="body1"
              color="white"
              content={`nav_${ROUTES.PAGES.GUIDES.identifier}`}
            />
            <ul className={classes.innerNavigation}>
              <li className={classes.innerLinkWrapper}>
                <Link
                  className={[classes.innerLink, classes.pageLink].join(' ')}
                  variant="body1"
                  color="white"
                  icon={<FaPaintBrush className={classes.icon} />}
                  route={ROUTES.GUIDES.ART}
                />
              </li>
            </ul>
          </li>
          <li className={classes.outerLinkWrapper}>
            <Text
              className={[
                classes.outerLinkWithChildren,
                classes.outerLink,
              ].join(' ')}
              variant="body1"
              color="white"
              content={`nav_${ROUTES.PAGES.CHECKLISTS.identifier}`}
            />
            <ul className={classes.innerNavigation}>
              <li className={classes.innerLinkWrapper}>
                <Link
                  className={[classes.innerLink, classes.pageLink].join(' ')}
                  variant="body1"
                  color="white"
                  icon={<FaCalendarAlt className={classes.icon} />}
                  route={ROUTES.CHECKLISTS.DAILY}
                />
              </li>
              <li className={classes.innerLinkWrapper}>
                <Link
                  className={[classes.innerLink, classes.pageLink].join(' ')}
                  variant="body1"
                  color="white"
                  icon={<FaBug className={classes.icon} />}
                  route={ROUTES.CHECKLISTS.INSECTS}
                />
              </li>
              <li className={classes.innerLinkWrapper}>
                <Link
                  className={[classes.innerLink, classes.pageLink].join(' ')}
                  variant="body1"
                  color="white"
                  icon={<FaFish className={classes.icon} />}
                  route={ROUTES.CHECKLISTS.FISHES}
                />
              </li>
            </ul>
          </li>
          <li className={classes.outerLinkWrapper}>
            <Text
              className={[
                classes.outerLinkWithChildren,
                classes.outerLink,
              ].join(' ')}
              variant="body1"
              color="white"
              content={`nav_${ROUTES.PAGES.EVENTS.identifier}`}
            />
            <ul className={classes.innerNavigation}>
              <li className={classes.innerLinkWrapper}>
                <Link
                  className={[classes.innerLink, classes.pageLink].join(' ')}
                  variant="body1"
                  color="white"
                  icon={<FaEgg className={classes.icon} />}
                  route={ROUTES.EVENTS.BUNNY_DAY}
                />
              </li>
              <li className={classes.innerLinkWrapper}>
                <Link
                  className={[classes.innerLink, classes.pageLink].join(' ')}
                  variant="body1"
                  color="white"
                  icon={<FaGlobeEurope className={classes.icon} />}
                  route={ROUTES.EVENTS.EARTH_DAY}
                />
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
