import testWebp from './modules/testWebp.js';

testWebp();

window.addEventListener('load', () => {
  document.querySelector('#transition-none').removeAttribute('id');
});
