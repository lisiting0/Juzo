/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const identityRouter = {
  path: '/identity',
  component: Layout,
  redirect: 'noRedirect', // 重定向地址，在面包屑中点击会重定向去的地址
  alwaysShow: true, // 一直显示根路由
  name: 'Identity',
  meta: {
    title: 'AdminService["Menu:SystemManagement"]',
    icon: 'user' // el-icon-setting
  },
  children: [
    {
      path: 'account-information',
      component: () => import('@/views/identity/account-information/index'),
      name: 'AccountInformation',
      meta: {
        title: 'AdminService["Menu:AccountInformation"]',
        noCache: true
      }
    },
    {
      path: 'sub-account',
      component: () => import('@/views/identity/sub-account/index'),
      name: 'SubAccountManagement',
      meta: {
        title: 'AdminService["Menu:SubAccountManagement"]',
        noCache: true
        // policy: 'AbpIdentity.Users'
      }
    },
    {
      path: 'permanent-passenger',
      component: () => import('@/views/identity/frequent-flyer/index'),
      name: 'PermanentPassengerManagement',
      meta: {
        title: 'AdminService["Menu:PermanentPassengerManagement"]',
        noCache: true
        // policy: 'AbpIdentity.Users'
      }
    },
    {
      path: 'balance',
      component: () => import('@/views/identity/balance/index'),
      name: 'BalanceManagement',
      meta: {
        title: 'AdminService["Menu:BalanceManagement"]',
        noCache: true
        // policy: 'AbpIdentity.Users'
      }
    },
    {
      path: 'sms-assistant',
      component: () => import('@/views/identity/sms-assistant/index'),
      name: 'SMSAssistant',
      meta: {
        title: 'AdminService["Menu:SMSAssistant"]',
        noCache: true
        // policy: 'AbpIdentity.Users'
      }
    }
  ]
}
export default identityRouter
