import React, { Fragment } from 'react'
import { createUseStyles } from 'react-jss'
import { vsprintf } from 'sprintf-js'

import __ from '../../helpers/Translation.helper'

export default function Label({ text, args }) {
  let t = __(text)
  if (args) t = vsprintf(t, args)
  return <Fragment>{t}</Fragment>
}
