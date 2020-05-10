import React, { useState } from 'react'
// import { createUseStyles } from 'react-jss'
// import { Link } from 'react-router-dom'
import {
  FaRegSquare,
  FaRegCheckSquare,
  FaChevronDown,
  FaChevronLeft,
} from 'react-icons/fa'
import classNames from 'classnames'
// import moment from 'moment'

import Store from '../../Store'
// import __ from '../../helpers/Translation.helper'
import { createClasses } from '../../helpers/Style.helper'
import { formatThousands } from '../../helpers/Format.helper'

import Text from '../atoms/Text'
import Icon from '../atoms/Icon'
import Datapoint from '../atoms/Datapoint'
import SeasonChipList from '../molecules/SeasonChipList'
import TimeChart from '../molecules/TimeChart'
// import Label from '../atoms/Label'

const useStyles = createClasses((THEME) => ({
  container: {
    width: '100%',
    padding: '16px 8px',
    background: THEME.COLORS.WHITE1.string(),
    // boxShadow: STYLES.SHADOWS.BASE,
    borderBottom: `1px solid ${THEME.COLORS.GRAY_LIGHT.string()}`,
  },
  row: {
    width: '100%',
    // margin: 8,
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    padding: 8,
  },
  icon: {
    margin: '0 12px 0 8px',
  },
  interactableIcon: {
    cursor: 'pointer',
    opacity: 0.5,

    '&:hover': {
      opacity: 0.8,
    },
  },
  expand: {
    padding: 8,
    marginLeft: 8,
  },
  details: {
    display: 'flex',
    marginTop: 16,
    padding: '0 8px',

    [THEME.BREAKPOINTS.DOWN('M')]: {
      flexDirection: 'column',
    },
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  left: {
    flex: '1 1 100%',
  },
  right: {
    alignItems: 'flex-end',
    whiteSpace: 'nowrap',
  },
  section: {
    flex: '1 1 50%',
    paddingRight: 24,

    '&:last-child': {
      paddingRight: 8,
    },

    [THEME.BREAKPOINTS.DOWN('M')]: {
      marginBottom: 16,

      '&:last-child': {
        marginBottom: 8,
      },
    },
  },
  label: {
    margin: '8px 0 4px 0',
  },

  checked: {
    '&$container': {
      opacity: 0.3,
    },
  },
}))

export default function Collectible({ data, type }) {
  // const { type, all } = data
  const { identifier, seasons, location, time, price, size = false } = data
  const [isChecked, setChecked] = useState(Store.get(`${type}.${identifier}`))
  const [isExpanded, setExpanded] = useState(false)
  const classes = useStyles()

  const containerStyles = classNames({
    [classes.container]: true,
    [classes.checked]: isChecked,
  })

  function updateChecked() {
    setChecked(!isChecked)
    Store.set(`${type}.${identifier}`, !isChecked)
  }

  return (
    <div className={containerStyles}>
      <div className={classes.row}>
        <div
          onClick={updateChecked}
          className={[classes.col, classes.checkbox].join(' ')}
        >
          {isChecked ? (
            <FaRegCheckSquare className={classes.interactableIcon} size="24" />
          ) : (
            <FaRegSquare className={classes.interactableIcon} size="24" />
          )}
        </div>
        <div className={[classes.col, classes.icon].join(' ')}>
          <Icon size="42" src={`${type}/${identifier}.png`} />
        </div>
        <div className={[classes.col, classes.left].join(' ')}>
          <div className="name">
            <Text
              className={classes.name}
              variant="body1"
              emphasis="medium"
              content={`${type}_${identifier}`}
            />
          </div>
          <div className="price">
            <Text className={classes.price} variant="body1">
              {formatThousands(price)}
            </Text>
          </div>
        </div>
        <div className={[classes.col, classes.right].join(' ')}>
          {size && (
            <Datapoint
              label="Size"
              labelStyle={{ emphasis: 'medium', variant: 'body2' }}
              value={size}
              valueStyle={{ variant: 'body2' }}
            />
          )}
          <Datapoint
            value={true}
            valueStyle={{
              variant: 'body2',
              opacity: 'med',
              content: `location_${location}`,
            }}
          />
          {/* <Datapoint value="River (Cliffs)" valueStyle={{ variant: 'body2' }} /> */}
        </div>
        <div
          onClick={() => setExpanded(!isExpanded)}
          className={[classes.col, classes.expand].join(' ')}
        >
          {isExpanded ? (
            <FaChevronDown className={classes.interactableIcon} size="24" />
          ) : (
            <FaChevronLeft className={classes.interactableIcon} size="24" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className={classes.details}>
          <div className={classes.section}>
            <Text
              className={classes.label}
              component="div"
              variant="body2"
              emphasis="medium"
              content="headline_seasons"
              uppercase
            />
            <SeasonChipList seasons={seasons} />
          </div>
          <div className={classes.section}>
            <Text
              className={classes.label}
              component="div"
              variant="body2"
              emphasis="medium"
              content="headline_time"
              uppercase
            />
            <TimeChart hours={time} />
          </div>
        </div>
      )}

      {/* <div className={classes.section}>
        <Text variant="body1" content={`${type}_${id}`} />
        <div>
          <Text
            variant="body2"
            opacity="med"
            content={`location_${location}`}
          />
          <Text variant="body2" opacity="med">
            &nbsp;•&nbsp;
          </Text>
          <Text className={classes.label} variant="caption" opacity="med">
            {price}
          </Text>
        </div>
      </div>
      <div className={classes.section}>
        <Text
          className={classes.label}
          component="div"
          variant="caption"
          opacity="med"
          content="headline_seasons"
        />
        <SeasonChipList seasons={seasons} />
      </div>
      <div className={classes.section}>
        <Text
          className={classes.label}
          component="div"
          variant="caption"
          opacity="med"
          content="headline_time"
        />
        <TimeChart hours={time} />
      </div> */}
    </div>
  )
}
