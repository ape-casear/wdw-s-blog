<template>
  <div>
    <div id = "content">
      <div class="article-title-box">
        <span class="article-type">原</span>
        <h2>{{toViewData.title}}论三项无尽出装时间对于船长的作用</h2>
      </div>
      <div class="article-info-box">
        <div class="article-bar-top d-flex">
          <span class="time">{{toViewData.pub_time}}2016年10月10日 12:06:23</span>
          <div class="float-right">
            <span class="read-count">阅读数：{{toViewData.browse_count}}33806</span>
          </div>
        </div>
	    </div>
       <div style="height:1px; width:100%; margin-top:10px; margin-bottom=20px; border-top:1px #aaa solid"></div>
      <vue-markdown :source="content"></vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown  from 'vue-markdown';
export default {
  props:['toViewData'],
  name: "BlogMarkDown",
  data () {
      return {
        content: `# axios

[![npm version](https://img.shields.io/npm/v/axios.svg?style=flat-square)](https://www.npmjs.org/package/axios)
[![build status](https://img.shields.io/travis/axios/axios.svg?style=flat-square)](https://travis-ci.org/axios/axios)
[![code coverage](https://img.shields.io/coveralls/mzabriskie/axios.svg?style=flat-square)](https://coveralls.io/r/mzabriskie/axios)
[![npm downloads](https://img.shields.io/npm/dm/axios.svg?style=flat-square)](http://npm-stat.com/charts.html?package=axios)
[![gitter chat](https://img.shields.io/gitter/room/mzabriskie/axios.svg?style=flat-square)](https://gitter.im/mzabriskie/axios)
[![code helpers](https://www.codetriage.com/axios/axios/badges/users.svg)](https://www.codetriage.com/axios/axios)

Promise based HTTP client for the browser and node.js
![wdw](../assets/logo.png)
## Features

- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
- Make [http](http://nodejs.org/api/http.html) requests from node.js
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client side support for protecting against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 8+ ✔ |

[![Browser Matrix](https://saucelabs.com/open_sauce/build_matrix/axios.svg)](https://saucelabs.com/u/axios)

## Installing

Using npm:

\`\`\`bash
$ npm install axios
\`\`\`

Using bower:

\`\`\`bash
$ bower install axios
\`\`\`

Using cdn:

\`\`\`html
<script src="https://unpkg.com/axios/dist/axios.min.js"><\/script>
\`\`\`
`
      }
  },
  components: {
      VueMarkdown 
  },
  methods: {
    getParams () {
      console.log(123)
    }
  },
  watch: {
    $route:function(){
      console.log('router')
    }
  },
  mounted: function () {
    console.log('md mouted');
  }

}
</script>

<style>
  .time{
    font-size: 14px;
    opacity: 0.7;
  }
  .float-right{
    margin-left: auto;
    float: right;
  }
  .article-type{
    color:rgb(181, 190, 146);
    border: 1px solid rgb(208, 218, 172);
    border-radius: 50%;
    width: 22px;height: 24px;
    float: left;
    font-size:20px;
    margin-right: 10px;
  }
  #content{
    position:relative;
    text-align: left;
    padding:20px;
  }
</style>


