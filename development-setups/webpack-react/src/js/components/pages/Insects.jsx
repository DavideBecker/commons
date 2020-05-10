import React from 'react'

import Checklist from '../templates/Checklist'

import ROUTES from '../../ROUTES.const'

export default function Insects() {
  return <Checklist src="insects" route={ROUTES.CHECKLISTS.INSECTS} />
}
