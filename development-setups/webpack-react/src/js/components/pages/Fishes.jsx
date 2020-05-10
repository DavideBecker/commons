import React from 'react'

import Checklist from '../templates/Checklist'

import ROUTES from '../../ROUTES.const'

export default function Fishes() {
  return <Checklist src="fishes" route={ROUTES.CHECKLISTS.FISHES} />
}
