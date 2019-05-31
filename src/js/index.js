export default {
  getName() {
    console.log('测试')
  },
  doAjax() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('异步成功12')
      }, 1000);
    });
  }
}