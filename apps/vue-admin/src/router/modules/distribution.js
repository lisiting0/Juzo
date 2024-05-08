/** When your routing table is too long, you can split it into small modules **/
/** 分销管理 **/
import Layout from '@/layout'

const distributionRouter = {
  path: '/distribution',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Distribution',
  meta: {
    title: 'AdminService["Menu:DistributionManagement"]',
    icon: 'el-icon-film'
  },
  children: [
    {
      path: 'issue',
      component: () => import('@/views/distribution/issue/index'),
      name: 'Issue',
      meta: {
        title: 'AdminService["Menu:IssueOrderManagement"]',
        noCache: true
      }
    },
    {
      path: 'issue-create',
      component: () => import('@/views/distribution/issue/create'),
      name: 'IssueCreate',
      meta: {
        title: 'AdminService["Menu:IssueOrderCreate"]',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'issue-create-ticket-issued',
      component: () => import('@/views/distribution/issue/create-ticket-issued'),
      name: 'issueCreateTicketIssued',
      meta: {
        title: 'AdminService["Menu:CreatingTicketedOrder"]',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'issue-detail',
      component: () => import('@/views/distribution/issue/detail'),
      name: 'IssueDetail',
      meta: {
        title: 'AdminService["Menu:IssueOrderDetail"]',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'change',
      component: () => import('@/views/distribution/change/index'),
      name: 'Change',
      meta: {
        title: 'AdminService["Menu:ChangeOrderManagement"]',
        noCache: true
      }
    },
    {
      path: 'change-detail',
      component: () => import('@/views/distribution/change/detail'),
      name: 'ChangeDetail',
      meta: {
        title: 'AdminService["Menu:ChangeOrderDetail"]',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'refund',
      component: () => import('@/views/distribution/refund/index'),
      name: 'Refund',
      meta: { title: 'AdminService["Menu:RefundManagement"]', noCache: true }
    },
    {
      path: 'refund-detail',
      component: () => import('@/views/distribution/refund/detail'),
      name: 'RefundDetail',
      meta: {
        title: 'AdminService["Menu:RefundOrderDetail"]',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'quality-orders',
      component: () => import('@/views/distribution/quality-orders/index'),
      name: 'QualityOrders',
      meta: {
        title: 'AdminService["Menu:QualityOrdersManagement"]',
        noCache: true
      }
    },
    {
      path: 'distribution-account',
      component: () => import('@/views/distribution/account/index'),
      name: 'DistributionAccount',
      meta: {
        title: 'AdminService["Menu:DistributionAccountManagement"]',
        noCache: true
      }
    },
    {
      path: 'registration-audit',
      component: () => import('@/views/distribution/registration-audit/index'),
      name: 'RegistrationAudit',
      meta: {
        title: 'AdminService["Menu:DistributorRegistrationAudit"]',
        noCache: true
      }
    },
    {
      path: 'credit-management',
      component: () => import('@/views/distribution/credit-management/index'),
      name: 'CreditManagement',
      meta: {
        title: 'AdminService["Menu:DistributionCreditManagement"]',
        noCache: true
      }
    },
    {
      path: 'credit-review',
      component: () => import('@/views/distribution/credit-review/index'),
      name: 'CreditReview',
      meta: {
        title: 'AdminService["Menu:CreditReview"]',
        noCache: true
      }
    },
    {
      path: 'platform-announcement',
      component: () => import('@/views/distribution/platform-announcement/index'),
      name: 'PlatformAnnouncement',
      meta: {
        title: 'AdminService["Menu:PlatformAnnouncementManagement"]',
        noCache: true
      }
    },
    {
      path: 'notification',
      component: () => import('@/views/distribution/notification/index'),
      name: 'Notification',
      meta: { title: 'AdminService["Menu:Notification"]', noCache: true }
    },
    {
      path: 'notification-configuration',
      component: () => import('@/views/distribution/notification-configuration/index'),
      name: 'NotificationConfiguration',
      meta: {
        title: 'AdminService["Menu:NotificationConfiguration"]',
        noCache: true
      }
    },
    {
      path: 'notification-configuration-create-update',
      component: () => import('@/views/distribution/notification-configuration/create-update'),
      name: 'NotificationConfigurationCreateUpdate',
      meta: {
        title: 'AdminService["Menu:NotificationConfigurationEdit"]',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'agent-group',
      component: () => import('@/views/distribution/agent-group/index'),
      name: 'TicketAgentGroup',
      meta: {
        title: 'AdminService["Menu:AgentLevelManagement"]',
        noCache: true
      }
    },
    {
      path: 'key-account-white-list',
      component: () => import('@/views/distribution/key-account-white-list/index'),
      name: 'keyAccountWhiteList',
      meta: {
        title: 'AdminService["Menu:KeyAccountWhiteList"]',
        noCache: true
      }
    }
  ]
}

export default distributionRouter
