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
      path: 'roles',
      component: () => import('@/views/identity/roles/index'),
      name: 'Roles',
      meta: {
        title: 'AbpIdentity["Roles"]'
        // policy: 'AbpIdentity.Roles'
      }
    },
    {
      path: 'account',
      component: () => import('@/views/identity/account/index'),
      name: 'Account',
      meta: {
        title: 'AdminService["Menu:AccountManagement"]'
        // policy: 'AbpIdentity.Users'
      }
    },
    {
      path: 'departments',
      component: () => import('@/views/identity/departments/index'),
      name: 'Departments',
      meta: {
        title: 'AdminService["Menu:Departments"]'
        // policy: 'AbpIdentity.Users'
      }
    }
  ]
}
export default identityRouter
