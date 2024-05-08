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
      path: 'inventory',
      component: () => import('@/views/ticket-management/inventory/index'),
      name: 'Inventory',
      meta: { title: 'AdminService["Menu:TicketInventory"]', noCache: true }
    },
    {
      path: 'issuance',
      component: () => import('@/views/ticket-management/issuance/index'),
      name: 'Issuance',
      meta: { title: 'AdminService["Menu:TicketIssuance"]', noCache: true }
    },
    {
      path: 'return',
      component: () => import('@/views/ticket-management/return/index'),
      name: 'Return',
      meta: { title: 'AdminService["Menu:TicketReturn"]', noCache: true }
    },
    {
      path: 'avoidance',
      component: () => import('@/views/ticket-management/avoidance/index'),
      name: 'avoidance',
      meta: { title: 'AdminService["Menu:TicketAvoidance"]', noCache: true }
    },
    {
      path: 'recycling',
      component: () => import('@/views/ticket-management/recycling/index'),
      name: 'recycling',
      meta: { title: 'AdminService["Menu:TicketRecycling"]', noCache: true }
    }
  ]
}

export default ticketRouter
