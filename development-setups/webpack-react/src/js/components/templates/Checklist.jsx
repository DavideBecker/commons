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

import Collectible from '../molecules/Collectible'
import Template from './Base'

import STYLES from '../../STYLES.const'
import ROUTES from '../../ROUTES.const'
const useStyles = createUseStyles({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    maxWidth: STYLES.WIDTHS.L,
    // justifyContent: 'center',
    margin: '0 auto',
    height: '100%',
    position: 'relative',
  },
})

// const Row = ({ index, style }) => (
//   <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
//     Row {index}
//   </div>
// )

export default function Checklist({ src, route }) {
  const [data, setData] = useState(false)
  const classes = useStyles()

  // const Classes = classNames({
  // })

  if (!data) {
    import(`../../../data/${src}`).then((fetchedData) => {
      console.log(111, fetchedData)
      setData(fetchedData.default)
    })
    return null
  }

  console.log(data)

  return (
    <Template className={classes.container}>
      {/* <List
      height={300}
      itemData={data}
      itemSize={75}
      itemCount={data.length}
      > */}
      {/* height={300} itemCount={1000} itemSize={35} width={300} */}
      {/* <AutoSizer>
        {({ height, width }) => {
          console.log(height, width)
          return (
            <List
              className="List"
              itemData={{ type: src, all: data }}
              height={height}
              itemCount={data.length - 1}
              itemSize={75}
              width={width}
            >
              {Collectible}
            </List>
          )
        }}
      </AutoSizer> */}
      {data.map((v, i) => (
        // <LazyLoad
        //   key={v.id}
        //   placeholder={
        //     <span>
        //       <br />
        //       <br />
        //       <br />
        //       Loading...
        //       <br />
        //       <br />
        //       <br />
        //     </span>
        //   }
        //   height={50}
        // >
        <Collectible key={v.identifier} data={v} type={src} />
        // </LazyLoad>
      ))}
    </Template>
  )
}

// {data.map((v) => (
//   <Collectible key={v.id} data={v} type={src} />
// ))}
