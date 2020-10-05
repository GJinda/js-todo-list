function createDom(tpl) {
  const div = document.createElement('div');
  div.innerHTML = tpl;
  return div.children[0];
}

function $(selector) {
  return document.querySelector(selector);
}

function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function hasClass(element, className) {
  return element.classList.contains(className);
}

const nowTime = $('.now-time')
const timeIcon = $('.time-icon')
const helloWord = $('.hello-word')

const todoList = $('.todo-list')

window.onload = () => {
  setInterval(() => {
    let helloMessage = getHelloMessage()
    appendTimeIcon(helloMessage.duringTime)
    appendNowTime(helloMessage.nowTime)
    appendHelloWord(helloMessage.helloWord)
  }, 1000);
}

//section hello
function getHelloMessage() {
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()

  let nowTimeStr = `${hour}:${minute < 10 ? '0' + minute : minute}`

  if (hour < 6) {
    duringTimeStr = 'night'
    helloWordStr = `It's late at night, sleep early.`
  } else if (hour < 12) {
    duringTimeStr = 'morning'
    helloWordStr = `Good morning, dear.`
  } else if (hour < 18) {
    duringTimeStr = 'afternoon'
    helloWordStr = `Good afternoon, dear.`
  } else {
    duringTimeStr = 'evening'
    helloWordStr = `Good evening, dear.`
  }

  let message = {
    nowTime: nowTimeStr,
    duringTime: duringTimeStr,
    helloWord: helloWordStr
  }
  return message
}

function getTimeIconStr(duringTimeStr) {
  return `
    <i class="iconfont ${duringTimeStr}-line"></i>
  `
}

function appendTimeIcon(duringTimeStr) {
  const timeIconStr = getTimeIconStr(duringTimeStr)
  const timeIconDom = createDom(timeIconStr)
  timeIcon.innerHTML = ""
  timeIcon.appendChild(timeIconDom)
}

function appendNowTime(nowTimeStr) {
  nowTime.innerHTML = nowTimeStr
}

function appendHelloWord(helloWordStr) {
  helloWord.innerHTML = helloWordStr
}

//section todo
function getRemainWord(deadline) {
  let date = new Date()

  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDay()
  let hour = date.getHours()
  let minute = date.getMinutes()

  let yearDiff = Math.abs(year - deadline.year)
  let monthDiff = Math.abs(month - deadline.month)
  let dayDiff = Math.abs(day - deadline.day)
  let hourDiff = Math.abs(hour - deadline.hour)
  let minuteDiff = Math.abs(minute - deadline.minute)

  let remainWord = ""

  if (year != deadline.year) {
    let isLess = year < deadline.year
    let isLessOneYear = yearDiff == 1 && monthDiff < 12
    remainWord = isLessOneYear ? (isLess ? `in ${12 - monthDiff} months` : `${12 - monthDiff} months ago`) : (isLess ? `in ${yearDiff} years` : `${yearDiff} years ago`)
    return remainWord
  }

  if (month != deadline.month) {
    let isLess = month < deadline.month
    let isLessOneMonth = monthDiff == 1 && dayDiff < 31
    remainWord = isLessOneMonth ? (isLess ? `in ${31 - dayDiff} days` : `${31 - dayDiff} days ago`) : (isLess ? `in ${monthDiff} months` : `${monthDiff} months ago`)
    return remainWord
  }

  if (day != deadline.day) {
    let isLess = day < deadline.day
    let isLessOneDay = dayDiff == 1 && hourDiff < 24
    remainWord = isLessOneDay ? (isLess ? `in ${24 - hourDiff} hours` : `${24 - hourDiff} hours ago`) : (isLess ? `in ${dayDiff} days` : `${dayDiff} days ago`)
    return remainWord
  }

  if (hour != deadline.hour) {
    let isLess = hour < deadline.hour
    let isLessOneHour = hourDiff == 1 && minuteDiff < 60
    remainWord = isLessOneHour ? (isLess ? `in ${60 - minuteDiff} minutes` : `${60 - minuteDiff} minutes ago`) : (isLess ? `in ${hourDiff} hours` : `${hourDiff} hours ago`)
    return remainWord
  }

  if (minute != deadline.minute) {
    remainWord = minute < deadline.minute ? `in ${minuteDiff}` : `${minuteDiff} ago`
    return remainWord
  }
}

// let todoitem = {
//   title: "",
//   deadline: {
//     year: Number,
//     month: String,
//     day: Number,
//     hour: Boolean,
//     minute: ""
//   },
//   priority: "",
//   create_time: "",
//   remind_type: ""
// }

function getTodoItemStr(todoItem) {
  let deadline = todiItem.deadline
  let remainWord = getRemainWord(deadline)
  return `
    <li class="todo-item">
      <div class="top">
        <div class="time">${deadline.hour}:${deadline.minute < 10 ? '0' + deadline.minute : deadline.minute}</div>
        <div class="tag ${todoItem.priority}"></div>
      </div>
      <div class="content">${todoItem.title}</div>
      <div class="bottom">${remainWord}</div>
      <i class="iconfont ${todoItem.remind_type}"></i>
    </li>
  `
}

function appendTodoItem(todoItem) {
  const todoItemStr = getTodoitemStr(todoItem)
  const todoItemDom = createDom(todoItemStr)
  todoList.appendChild(todoItemDom)
}