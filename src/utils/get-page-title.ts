import defaultSettings from '@/settings.ts'

const title = defaultSettings.title || 'Vue Element Admin'

export default function getPageTitle(pageTitle: unknown) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
