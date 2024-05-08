/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const basicRouter = {
  path: '/basic',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Basic',
  meta: {
    title: 'AdminService["Menu:BasicManagement"]',
    icon: 'el-icon-office-building'
  },
  children: [
    {
      path: 'airline',
      component: () => import('@/views/basic/airline/index'),
      name: 'Airline',
      meta: { title: 'AdminService["Menu:AirlineManagement"]', noCache: true }
    },
    // {
    //   path: 'terminal',
    //   component: () => import('@/views/basic/terminal/index'),
    //   name: 'Terminal',
    //   meta: { title: 'AdminService["Menu:TerminalManagement"]', noCache: true }
    // },
    {
      path: 'cabin',
      component: () => import('@/views/basic/cabin/index'),
      name: 'Cabin',
      meta: { title: 'AdminService["Menu:CabinManagement"]', noCache: true }
    },
    // {
    //   path: 'flight',
    //   component: () => import('@/views/basic/flight/index'),
    //   name: 'Flight',
    //   meta: { title: 'AdminService["Menu:FlightManagement"]', noCache: true }
    // },
    {
      path: 'airport',
      component: () => import('@/views/basic/airport/index'),
      name: 'Airport',
      meta: { title: 'AdminService["Menu:AirportManagement"]', noCache: true }
    },
    {
      path: 'regular',
      component: () => import('@/views/basic/regular/index'),
      name: 'Regular',
      meta: { title: 'AdminService["Menu:RegulationManagement"]', noCache: true }
    }
  ]
}

export default basicRouter
