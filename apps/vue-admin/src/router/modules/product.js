import Layout from '@/layout'

const productRouter = {
  path: '/product',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  name: 'Product',
  meta: {
    title: 'AdminService["Menu:ProductManagement"]',
    icon: 'el-icon-s-shop',
    policy: ''
  },
  children: [
    {
      path: 'product',
      component: () => import('@/views/product/product/index'),
      name: 'Product',
      meta: {
        title: 'AdminService["Menu:ProductManagement"]',
        // policy: 'EasyAbp.Abp.SettingUi.ShowSettingPage',
        // icon: 'el-icon-setting',
        noCache: true
      }
    },
    {
      path: 'policy',
      component: () => import('@/views/product/policy/index'),
      name: 'Policy',
      meta: {
        title: 'AdminService["Menu:PolicyManagement"]',
        noCache: true
      }
    },
    {
      path: 'policy-create-update',
      component: () => import('@/views/product/policy/create-update'),
      name: 'PolicyCreateUpdate',
      meta: {
        title: 'AdminService["Menu:PolicyCreateUpdate"]',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'agent-configuration',
      component: () => import('@/views/product/agent-configuration/index'),
      name: 'AgentProductConfigure',
      meta: {
        title: 'AdminService["Menu:AgentProductConfigure"]',
        // policy: 'EasyAbp.Abp.SettingUi.ShowSettingPage',
        // icon: 'el-icon-setting',
        noCache: true
      }
    },
    {
      path: 'supplier-configuration',
      component: () => import('@/views/product/supplier-configuration/index'),
      name: 'SupplierProductConfigure',
      meta: {
        title: 'AdminService["Menu:SupplierProductConfigure"]',
        // policy: 'EasyAbp.Abp.SettingUi.ShowSettingPage',
        // icon: 'el-icon-setting',
        noCache: true
      }
    },
    {
      path: 'fare-base-rule',
      component: () => import('@/views/product/fare-base-rule/index'),
      name: 'FareBaseRule',
      meta: {
        title: 'AdminService["Menu:FareBaseRule"]',
        // policy: 'EasyAbp.Abp.SettingUi.ShowSettingPage',
        // icon: 'el-icon-setting',
        noCache: true
      }
    }
  ]
}

export default productRouter
