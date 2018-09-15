import React from 'react'
import ReactDOM from 'react-dom'

import ComponentName from '../components/containers/ComponentName.component'

const rootComponents = {
    ComponentName
}

const init = () => {
    const reactComponents = document.querySelectorAll('.react-component-root')

    console.log(reactComponents)

    for(var elem of reactComponents) {
        if(rootComponents[elem.dataset.component]) {
            ReactDOM.render(React.createElement(rootComponents[elem.dataset.component]), elem)
        }
    }
}

export default {
    init
}
