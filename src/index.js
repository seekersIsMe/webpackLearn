import obj from './js/index';
import './css/index.css';
import './less/index.less';
import './scss/index.scss';
obj.getName();
obj.doAjax().then((data) => {
  console.log(data)
})
console.log('oksssss')
// if (module.hot) {
//   // 实现热更新
//   module.hot.accept();
// }