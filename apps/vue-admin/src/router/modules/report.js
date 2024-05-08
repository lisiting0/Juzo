/** When your routing table is too long, you can split it into small modules **/
/** 票证管理 **/
import Layout from '@/layout'

const reportRouter = {
  path: '/report',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Report',
  meta: {
    title: 'AdminService["Menu:ReportManagement"]',
    icon: 'el-icon-s-data'
  },
  children: [
    {
      path: 'issue-report',
      component: () => import('@/views/report/issue/index'),
      name: 'IssueReport',
      meta: { title: 'AdminService["Menu:SalesIssueReport"]', noCache: true }
    },
    {
      path: 'refund-report',
      component: () => import('@/views/report/refund/index'),
      name: 'RefundReport',
      meta: { title: 'AdminService["Menu:SalesRefundReport"]', noCache: true }
    },
    {
      path: 'change-report',
      component: () => import('@/views/report/change/index'),
      name: 'ChangeReport',
      meta: { title: 'AdminService["Menu:SalesChangeReport"]', noCache: true }
    },
    {
      path: 'transation-flow-report',
      component: () => import('@/views/report/transation-flow/index'),
      name: 'TransactionFlowReport',
      meta: { title: 'AdminService["Menu:TransactionFlowReport"]', noCache: true }
    },
    {
      path: 'summary-report',
      component: () => import('@/views/report/summary/index'),
      name: 'MonthlySummaryReport',
      meta: { title: 'AdminService["Menu:MonthlySummaryReport"]', noCache: true }
    },
    {
      path: 'issue-refund-change-report',
      component: () => import('@/views/report/issue-refund-change/index'),
      name: 'IssueRefundChangeReport',
      meta: { title: 'AdminService["Menu:IssueRefundChangeReport"]', noCache: true }
    }
  ]
}

export default reportRouter
