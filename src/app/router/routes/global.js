export default [
  {
    description: 'home',
    method: 'get',
    url: '/',
    view: 'index',
  },
  {
    description: 'Dashboard',
    method: 'get',
    url: '/manager',
    auth: 'isAuthenticated',
    view: 'manager',
  },
  {
    description: 'LAI - Ladder Dynamic Include',
    method: 'post',
    url: '/lai',
    controller: 'LaiController',
    action: 'render',
  },
  {
    description: 'LAI - test route',
    method: 'get',
    url: '/lai/test',
    controller: 'LaiController',
    action: 'testAsync',
    view: 'testAsync',
  },
]
