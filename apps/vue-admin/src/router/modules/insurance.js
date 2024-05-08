/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const insuranceRouter = {
  path: '/insurance',
  component: Layout,
  redirect: 'noRedirect', // 重定向地址，在面包屑中点击会重定向去的地址
  alwaysShow: true, // 一直显示根路由
  name: 'Insurance',
  meta: {
    title: 'AdminService["Menu:InsuranceManagement"]',
    icon: 'el-icon-tickets'
  },
  children: [
    {
      path: 'insurance-configuration',
      component: () => import('@/views/insurance-management/insurance-configuration/index'),
      name: 'Configuration',
      meta: {
        title: 'AdminService["Menu:InsuranceConfigure"]'
        // policy: 'AbpIdentity.Roles'
      }
    },
    {
      path: 'insurance-order',
      component: () => import('@/views/insurance-management/insurance-order/index'),
      name: 'Order',
      meta: {
        title: 'AdminService["Menu:InsuranceOrder"]'
        // policy: 'AbpIdentity.Roles'
      }
    },
    {
      path: 'distributor-insurance-configuration',
      component: () => import('@/views/insurance-management/distributor-insurance-configuration/index'),
      name: 'DistributorConfiguration',
      meta: {
        title: 'AdminService["Menu:DistributorInsuranceConfigure"]'
        // policy: 'AbpIdentity.Users'
      }
    }
  ]
}
export default insuranceRouter
