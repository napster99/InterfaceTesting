var superagent = require('superagent');
var async = require('async');
var config = require('./config');

var t = require('./t');
var log = t.log;


// var count = 1;
// var tArr = [];

// function sendAjax(config, c) {
//   var startTime = +new Date();
//   superagent.get(config['url']).end(function(err, res) {
//     var endTime = +new Date();
//     if(!err) {
//       var casingTime = endTime - startTime;
//       tArr.push(casingTime);
//       console.log(config['url']+' successful ，time consuming ' + casingTime + 'ms');
//       count++;
//       if(count <= c) {
//         // setTimeout(function() {
//           sendAjax(config, c);
//         // },500);
//       }else{
//         console.log('平均耗时：' + tArr.allPlus()/tArr.length + '毫秒');
//       }
//     }
//   });
// }

Array.prototype.allPlus = function() {
  var n = 0;
  this.forEach(function(k) {
    n += k['casingTime'];
  });

  return n;
}

// sendAjax(config[0], 100);
// sendAjax(config[1], 100);
// sendAjax(config[2], 100);


/*
 *  同一链接生成相同链接数组
 */
function generateUnit(obj) {
  var c = getCount(obj), unitArr = [];
  for(var i=0; i<c; i++) {
    unitArr.push(obj);
  }

  return unitArr;
}

/*
 *  同一链接获取请求次数
 */
function getCount(obj) {
  return obj && obj['count'] || 100;
}

/*
 *  程序执行入口1
 */
function execution(obj, callback) {
  var config1 = generateUnit(obj), count = getCount(obj);
  async.timesSeries(count, function(n, callback){
    var startTime = +new Date();
    superagent.get(config1[n].url).end(function(err, res) {
      var endTime = +new Date();
      if(!err) {
        var casingTime = endTime - startTime;
        console.log(config1[n].url+' successful ，time consuming ' + casingTime + 'ms');
        callback(null, {
          'casingTime' : casingTime,
          'url'        : config1[n].url
        });
      }
    });
  }, function(err, results) {
      if(!err) {
        var averageTime = results.allPlus()/results.length;
        console.log('--------------平均耗时：'+ averageTime + 'ms--------------');
        callback(err, {
          'averageTime' : averageTime,
          'url'         : results[0]['url']
        });
      }
  });
}

/*
 *  程序执行入口2
 */
async.timesSeries(config.length,  function(n, callback) {
  execution(config[n],  function(err, results) {
    callback(null,results);
  });
},  function(err, results) {
  printCMD(results);
});


/*
 *  打印接口性能测试总体评估
 */
function printCMD(results) {
  console.log('\n\n');
  console.log('================接口性能测试总体评估START================');
  if(results instanceof Array) {
    results.forEach(function(k) {
      console.log('url：'+ k['url']);
      console.log('平均耗时：'+k['averageTime']+'ms');
    });
  }
  console.log('================接口性能测试总体评估END==================');
}