import Layout from '@/layout'

const flightChangeManagerRouter = {
  path: '/flightChangeManager',
  component: Layout,
  redirect: 'noRedirect',
  name: 'FlightChangeManager',
  meta: {
    title: 'AdminService["Menu:FlightChangeManager"]',
    icon: 'el-icon-office-building'
  },
  children: [
    {
      path: 'flightChangeNotification',
      component: () => import('@/views/flight-change-notification/index'),
      name: 'flightChangeNotification',
      meta: {
        title: 'AdminService["Menu:FlightChangeNotification"]'
      }
    }
  ]
}

export default flightChangeManagerRouter
