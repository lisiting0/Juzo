/** When your routing table is too long, you can split it into small modules **/
/** 配置管理 **/
import Layout from '@/layout'

const configurationRouter = {
  path: '/configuration',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Configuration',
  meta: {
    title: 'AdminService["Menu:ConfigurationManagement"]',
    icon: 'el-icon-s-tools'
  },
  children: [
    {
      path: 'black-screen',
      component: () => import('@/views/configuration-management/black-screen/index'),
      name: 'BlackScreenConfiguration',
      meta: { title: 'AdminService["Menu:BlackScreenConfiguration"]', noCache: true }
    },
    {
      path: 'other',
      component: () => import('@/views/configuration-management/other/index'),
      name: 'OtherConfiguration',
      meta: {
        title: 'AdminService["Menu:OtherConfiguration"]',
        noCache: true
      }
    },
    {
      path: 'payment',
      component: () => import('@/views/configuration-management/payment/index'),
      name: 'paymentConfiguration',
      meta: {
        title: 'AdminService["Menu:PaymentConfiguration"]',
        noCache: true
      }
    },
    {
      path: 'issueTicketSelf',
      component: () => import('@/views/configuration-management/issue-ticket-self-configuration/index'),
      name: 'IssueTicketSelfConfiguration',
      meta: {
        title: 'AdminService["Menu:IssueTicketSelfConfiguration"]',
        noCache: true
      }
    },
    {
      path: 'issueTicketSelfTime',
      component: () => import('@/views/configuration-management/issue-ticket-self-time-configuration/index'),
      name: 'IssueTicketSelfTimeConfiguration',
      meta: {
        title: 'AdminService["Menu:IssueTicketSelfTimeConfiguration"]',
        noCache: true
      }
    }
  ]
}

export default configurationRouter
