// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'
import AirportEnum from '@/enum/Airport'
import CityEnum from '@/enum/City'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 日期只显示时分
 * @param {String} string
 */
export function substringHourMinutes(date) {
  return date.substring(0, 5)
}

/**
 * 使用 replace() 方法和正则表达式进行替换
 * @param {String} string
 */
export function hourMinSecondReplace(timeString) {
  const split = timeString.split(':')
  return parseInt(split[0]) + 'h' + parseInt(split[1]) + 'm'
}

/**
 * 日期只显示月日
 * @param {String} string
 */
export function substringMonthDate(date) {
  return date.substring(5)
}

/**
 * 根据年月日显示周几
 * @param {String} string
 */
export function showDay(departureDate) {
  const date = new Date(departureDate)
  const day = date.getDay()
  let dayText = ''
  switch (day) {
    case 0:
      dayText = '周日'
      break
    case 1:
      dayText = '周一'
      break
    case 2:
      dayText = '周二'
      break
    case 3:
      dayText = '周三'
      break
    case 4:
      dayText = '周四'
      break
    case 5:
      dayText = '周五'
      break
    case 6:
      dayText = '周六'
      break
    default:
      console.log('无效的星期数')
      break
  }
  return dayText
}

/**
 * 截断
 * @param {Int}
 * @returns
 */
export function substringText(val) {
  return val.substring(1, 10)
}

export function airportNameFilter(key) {
  return AirportEnum.Airport[key]
}

export function cityNameFilter(key) {
  return CityEnum.City[key]
}