let ROUTES = {}

ROUTES.PAGES = {
  HOME: {
    identifier: 'home',
    path: '/',
    component: 'Home',
  },
}

ROUTES.ALL = [...Object.values(ROUTES.PAGES)]

ROUTES.getTitle = (title) => `${title} • Project Name`

export default ROUTES
