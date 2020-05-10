import React, { Children } from 'react'
import { createUseStyles } from 'react-jss'
// import { Link } from 'react-router-dom'
// import {  } from 'react-icons/fa'
import classNames from 'classnames'
// import moment from 'moment'

// import Store from '../../Store'
// import __ from '../helpers/Translation.helper'

import Label from '../atoms/Label'

import STYLES from '../../STYLES.const'
const useStyles = createUseStyles({
  text: {
    color: STYLES.COLORS.GRAY_TEXT.string(),
    fontWeight: 400,
    opacity: 0.95,
  },
  h1: {
    fontSize: STYLES.FONT_SIZES.H1,
  },
  h2: { fontSize: STYLES.FONT_SIZES.H2 },
  h3: { fontSize: STYLES.FONT_SIZES.H3 },
  h4: { fontSize: STYLES.FONT_SIZES.H4 },
  h5: { fontSize: STYLES.FONT_SIZES.H5 },
  h6: { fontSize: STYLES.FONT_SIZES.H6 },
  subline: { fontSize: STYLES.FONT_SIZES.SUBLINE },
  body1: { fontSize: STYLES.FONT_SIZES.BODY1 },
  body2: { fontSize: STYLES.FONT_SIZES.BODY2 },
  caption: { fontSize: STYLES.FONT_SIZES.CAPTION },

  whiteColor: { color: STYLES.COLORS.WHITE1.string() },
  grayColor: { color: STYLES.COLORS.GRAY_DARK.string() },

  boldEmphasis: { fontWeight: 700 },
  mediumEmphasis: { fontWeight: 500 },
  regularEmphasis: { fontWeight: 400 },
  lightEmphasis: { fontWeight: 300 },

  highOpacity: { opacity: 0.95 },
  mediumOpacity: { opacity: 0.6 },
  lowOpacity: { opacity: 0.3 },

  uppercase: { textTransform: 'uppercase' },
})

export default function Text({
  component = 'span',
  variant,
  opacity,
  emphasis,
  children,
  color,
  className = false,
  content = false,
  uppercase = false,
}) {
  // const [isChecked, setChecked] = useState(false)
  const classes = useStyles()

  const textClasses = classNames({
    [className]: className,
    [classes.text]: true,
    [classes.h1]: variant == 'h1',
    [classes.h2]: variant == 'h2',
    [classes.h3]: variant == 'h3',
    [classes.h4]: variant == 'h4',
    [classes.h5]: variant == 'h5',
    [classes.h6]: variant == 'h6',
    [classes.subline]: variant == 'subline',
    [classes.body1]: variant == 'body1',
    [classes.body2]: variant == 'body2',
    [classes.caption]: variant == 'caption',

    [classes.whiteColor]: color == 'white',
    [classes.grayColor]: color == 'gray',

    [classes.boldEmphasis]: emphasis == 'bold',
    [classes.mediumEmphasis]: emphasis == 'medium',
    [classes.regularEmphasis]: emphasis == 'regular',
    [classes.lightEmphasis]: emphasis == 'light',

    [classes.highOpacity]: opacity == 'high',
    [classes.mediumOpacity]: opacity == 'med',
    [classes.lowOpacity]: opacity == 'low',

    [classes.uppercase]: uppercase,
  })

  const Comp = component
  const txt = children || <Label text={content} />

  return <Comp className={textClasses}>{txt}</Comp>
}
