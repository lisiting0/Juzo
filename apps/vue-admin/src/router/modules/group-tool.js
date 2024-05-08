import Layout from '@/layout'

const groupToolRouter = {
  path: '/groupTool',
  component: Layout,
  redirect: 'noRedirect',
  name: 'GroupTool',
  meta: {
    title: 'AdminService["Menu:GroupTool"]',
    icon: 'el-icon-office-building'
  },
  children: [
    {
      path: 'groupTool',
      component: () => import('@/views/group-tool/index'),
      name: 'groupTool',
      meta: {
        title: 'AdminService["Menu:GroupTool"]'
      }
    }
  ]
}

export default groupToolRouter
