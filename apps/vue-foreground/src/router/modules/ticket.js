/** When your routing table is too long, you can split it into small modules **/
/** 票证管理 **/
import Layout from '@/layout'

const ticketRouter = {
  path: '/ticket',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Ticket',
  meta: {
    title: 'AdminService["Menu:TicketManagement"]',
    icon: 'el-icon-s-ticket'
  },
  children: [
    {
      path: 'issuance',
      component: () => import('@/views/ticket/issuance/index'),
      name: 'TicketIssuance',
      meta: { title: 'AdminService["Menu:TicketIssuance"]', noCache: true }
    },
    {
      path: 'return',
      component: () => import('@/views/ticket/return/index'),
      name: 'TicketReturn',
      meta: { title: 'AdminService["Menu:TicketReturn"]', noCache: true }
    },
    {
      path: 'itinerary-printing',
      component: () => import('@/views/ticket/itinerary-printing/index'),
      name: 'ItineraryPrinting',
      meta: { title: 'AdminService["Menu:ItineraryPrinting"]', noCache: true }
    }
  ]
}

export default ticketRouter
