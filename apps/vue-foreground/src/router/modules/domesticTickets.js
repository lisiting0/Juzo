/** When your routing table is too long, you can split it into small modules **/
/** 国内订单 **/
import Layout from '@/layout'

const domesticTicketsRouter = {
  path: '/domestic-tickets',
  component: Layout,
  redirect: 'noRedirect',
  name: 'DomesticTickets',
  meta: {
    title: 'AdminService["Menu:DomesticTickets"]',
    icon: 'el-icon-s-order'
  },
  children: [
    {
      path: 'ticket-booking',
      component: () => import('@/views/domestic-tickets/booking/index'),
      name: 'TicketBooking',
      meta: { title: 'AdminService["Menu:TicketBooking"]', noCache: true }
    },
    {
      path: 'ticket-passenger',
      component: () => import('@/views/domestic-tickets/booking/passenger'),
      name: 'TicketPassenger',
      meta: { title: 'AdminService["Menu:TicketBooking"]', noCache: true },
      hidden: true
    },
    {
      path: 'ticket-payment',
      component: () => import('@/views/domestic-tickets/booking/payment'),
      name: 'TicketPayment',
      meta: { title: 'AdminService["Menu:TicketBooking"]', noCache: true },
      hidden: true
    },
    {
      path: 'issue',
      component: () => import('@/views/domestic-tickets/issue/index'),
      name: 'Issue',
      meta: { title: 'AdminService["Menu:IssueOrderManagement"]', noCache: true }
    },
    {
      path: 'issue-detail',
      component: () => import('@/views/domestic-tickets/issue/detail'),
      name: 'IssueDetail',
      meta: {
        title: 'AdminService["Menu:IssueOrderDetail"]',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'refund',
      component: () => import('@/views/domestic-tickets/refund/index'),
      name: 'Refund',
      meta: { title: 'AdminService["Menu:RefundManagement"]', noCache: true }
    },
    {
      path: 'refund-detail',
      component: () => import('@/views/domestic-tickets/refund/detail'),
      name: 'RefundDetail',
      meta: {
        title: 'AdminService["Menu:RefundOrderDetail"]',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'change',
      component: () => import('@/views/domestic-tickets/change/index'),
      name: 'Change',
      meta: {
        title: 'AdminService["Menu:ChangeOrderManagement"]',
        noCache: true
      }
    },
    {
      path: 'change-detail',
      component: () => import('@/views/domestic-tickets/change/detail'),
      name: 'ChangeDetail',
      meta: {
        title: 'AdminService["Menu:ChangeOrderDetail"]',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'quality-orders',
      component: () => import('@/views/domestic-tickets/quality-orders/index'),
      name: 'QualityOrders',
      meta: {
        title: 'AdminService["Menu:QualityOrdersManagement"]',
        noCache: true
      }
    },
    {
      path: 'quality-order-payment',
      component: () => import('@/views/domestic-tickets/quality-orders/payment'),
      name: 'QualityOrdersPayment',
      hidden: true,
      meta: {
        title: 'AdminService["Menu:QualityOrdersManagement"]',
        noCache: true
      }
    }
  ]
}

export default domesticTicketsRouter
