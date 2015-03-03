/* =============================================
 * 20150303
 * =============================================
 * Copyright Napster
 *
 * 测试接口配置文件
 * ============================================= */

//默认是GET请求  application/json  类型
var config = [

  {
   'url': 'http://www.zhanqi.tv/api/static/live.index/recommend-apps.json',
   'count' : 10,
   'query' : null
  },

  {
   'url': 'http://www.zhanqi.tv/api/touch/apps.banner',
   'count' : 10,
   'query' : null
  },

  {
   'url': 'http://www.zhanqi.tv/api/static/live.hots/15-1.json',
   'count' : 10,
   'query' : null
  },

  {
   'url': 'http://www.zhanqi.tv/api/static/game.lists/15-1.json',
   'count' : 10,
   'query' : null
  },

  {
   'url': 'http://www.zhanqi.tv/api/static/game.lives/13-20-1.json',
   'count' : 10,
   'query' : null
  },

  {
   'url': 'http://www.zhanqi.tv/api/user/follow.listall',
   'count' : 10,
   'query' : null
  },

  {
   'url': 'http://www.zhanqi.tv/api/static/live.gifts/561.json',
   'count' : 10,
   'query' : null
  }
  

]



module.exports = config;







