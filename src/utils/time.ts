export const getTime = () => {
  let title = ''
  const hour = new Date().getHours()
  if (hour < 9) {
    title = '上午好'
  } else if (hour < 14) {
    title = '中午好'
  } else if (hour < 18) {
    title = '下午好'
  } else {
    title = '晚上好'
  }
  return title
}