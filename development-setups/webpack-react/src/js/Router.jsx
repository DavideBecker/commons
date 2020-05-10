import React, { useEffect, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom'

const Home = lazy(() =>
  import(
    // webpackChunkName: "Home"
    './components/pages/Home'
  )
)

const pages = { Home }

import PageLoaderStatic from './components/molecules/PageLoaderStatic'

function allRoutes(routes) {
  return Object.keys(routes).map((key) => routes[key])
}

import ROUTES from './ROUTES.const'
function Switcher() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  // const textPages = [
  //   ROUTES.APP.STATIC
  // ].map(path => <Route key={path} exact path={path} component={TextPage} />)

  const eventPages = allRoutes(ROUTES.EVENTS).map((ROUTE) => (
    <Route
      key={ROUTE.component}
      exact
      path={ROUTE.path}
      component={pages[ROUTE.component]}
    />
  ))

  const checklistPages = allRoutes(ROUTES.CHECKLISTS).map((ROUTE) => {
    return (
      <Route
        key={ROUTE.component}
        exact
        path={ROUTE.path}
        component={pages[ROUTE.component]}
      />
    )
  })

  const guidePages = allRoutes(ROUTES.GUIDES).map((ROUTE) => {
    return (
      <Route
        key={ROUTE.component}
        exact
        path={ROUTE.path}
        component={pages[ROUTE.component]}
      />
    )
  })

  try {
    return (
      <Suspense fallback={<PageLoaderStatic />}>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path={ROUTES.PAGES.CHECKLISTS} component={Home} /> */}
          {/* <Route exact path={ROUTES.PAGES.EVENTS} component={Home} /> */}
          {/* {textPages} */}
          {guidePages}
          {checklistPages}
          {eventPages}
          {/* <Route
            exact
            path={`${ROUTES.APP.PRODUCTS}/:ean`}
            component={ProductDetails}
          /> */}

          {/* Error Pages */}
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Suspense>
    )
  } catch (err) {
    console.log(err)
  }
}

export default function AppRouter() {
  return (
    <Router
      basename={
        process.env.NODE_ENV == 'development'
          ? '/'
          : '/animal-crossing/new-horizons'
      }
    >
      <Switcher />
    </Router>
  )
}
