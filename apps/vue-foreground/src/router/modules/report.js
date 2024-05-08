/** When your routing table is too long, you can split it into small modules **/
/** 报表中心 **/
import Layout from '@/layout'

const reportRouter = {
  path: '/report',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Report',
  meta: {
    title: 'AdminService["Menu:ReportCenter"]',
    icon: 'el-icon-s-data'
  },
  children: [
    {
      path: 'purchases-report',
      component: () => import('@/views/report/purchases/index'),
      name: 'PurchasesReport',
      meta: { title: 'AdminService["Menu:PurchasesReport"]', noCache: true }
    },
    {
      path: 'balance-report',
      component: () => import('@/views/report/balance/index'),
      name: 'BalanceReport',
      meta: { title: 'AdminService["Menu:BalanceReport"]', noCache: true }
    },
    {
      path: 'monthly-bill-report',
      component: () => import('@/views/report/monthly-bill/index'),
      name: 'MonthlyBillReport',
      meta: { title: 'AdminService["Menu:MonthlyBillReport"]', noCache: true }
    }
  ]
}

export default reportRouter
