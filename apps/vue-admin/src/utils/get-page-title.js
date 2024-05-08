import defaultSettings from '@/settings'
import i18n from '@/lang'

const title = defaultSettings.title

export default function getPageTitle(key, newTitle) {
  const hasKey = i18n.te(key)
  if (hasKey) {
    const pageName = i18n.t(key)
    if (newTitle) {
      return `${pageName} - ${newTitle}`
    } else {
      return `${pageName} - ${title}`
    }
  }
  return `${title}`
}
