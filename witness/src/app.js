/**
 * Created by Aaronphy on 16/5/12.
 */

let config = {};

let Witness = {

  sendLog: function (data, isImmediate = false) {
    let img = new Image();
    let id = 'img_' + Math.random();
    let param = data;
    let timestamp = new Date().getTime();
    let src;
    let from = config.from || source.from;
    from = from || 'unknown';
    param._input_charset = 'utf-8';

    src=`//wgo.mmstat.com/easygo.100.300.1?cache=${timestamp}&gmkey=&gokey=name=${data.name}&point=${data.point}&start=${config.start}&logtype=2`;
    //防止垃圾回收造成打点丢失
    window[id] = img;
    img.onload = img.onerror = function () {
      window[id] = null;
    };
    if (isImmediate) {
      img.setAttribute('src', src);
    } else {
      //防止http请求造成操作卡顿
      setTimeout(()=> {
        img.setAttribute('src', src);
      }, 500);
    }

  },
  /**
   *
   * @param data
   */
  setLog: function () {
    config['start'] = new Date().getTime();
  }

};
module.exports = {Witness};
