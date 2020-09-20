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

window.onload = () => {
  setInterval(() => {
    let helloMessage = getHelloMessage()
    appendTimeIcon(helloMessage.duringTime)
    appendNowTime(helloMessage.nowTime)
    appendHelloWord(helloMessage.helloWord)
  }, 1000);
}

function getHelloMessage() {
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()

  let nowTimeStr = `${hour}:${minute < 10 ? '0' + minute : minute}`
  let duringTimeStr = `${hour < 6 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'}`
  let helloWordStr = `Good ${duringTimeStr}, dear.`

  let message = {
    nowTime: nowTimeStr,
    duringTime: duringTimeStr,
    helloWord: helloWordStr
  }
  return message
}

function getTimeIconStr(duringTimeStr){
  return `
    <i class="iconfont ${duringTimeStr}-line"></i>
  `
}

function appendTimeIcon(duringTimeStr){
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