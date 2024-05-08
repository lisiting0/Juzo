/** When your routing table is too long, you can split it into small modules **/
/** 消息中心 **/
import Layout from '@/layout'

const messageRouter = {
  path: '/message',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Message',
  meta: {
    title: 'AdminService["Menu:MessageCenter"]',
    icon: 'el-icon-chat-line-square'
  },
  children: [
    {
      path: 'platform-announcement',
      component: () => import('@/views/message/platform-announcement/index'),
      name: 'PlatformAnnouncement',
      meta: { title: 'AdminService["Menu:PlatformAnnouncement"]', noCache: true }
    },
    {
      path: 'notification-configuration',
      component: () => import('@/views/message/notification-configuration/index'),
      name: 'NotificationConfiguration',
      meta: { title: 'AdminService["Menu:NotificationConfiguration"]', noCache: true }
    },
    {
      path: 'notification',
      component: () => import('@/views/message/notification/index'),
      name: 'Notification',
      meta: { title: 'AdminService["Menu:Notification"]', noCache: true }
    },
    {
      path: 'notification-configuration-edit',
      component: () => import('@/views/message/notification-configuration/edit'),
      name: 'NotificationConfigurationEdit',
      meta: {
        title: 'AdminService["Menu:NotificationConfigurationEdit"]',
        noCache: true
      },
      hidden: true
    }
    // {
    //   path: 'sms',
    //   component: () => import('@/views/message/sms/index'),
    //   name: 'CustomisedSMS',
    //   meta: { title: 'AdminService["Menu:CustomisedSMS"]', noCache: true }
    // }
  ]
}

export default messageRouter
