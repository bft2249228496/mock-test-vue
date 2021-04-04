/*eslint-disable*/
import Mock from 'mockjs'

/*const data = Mock.mock({
  title: '@ctitle()',
  sentence: '@csentence()'
})*/
/*const data = Mock.mock({
  sentence: '@cparagraph()'
})*/

const {newsList} = Mock.mock(
  {
    'newsList|75': [
      {
        id: `@increment(1)`,
        image: `@image('100x100', '#50B347', '#FFF', '@ctitle')`,
        title: `@ctitle`,
        contain: `@cparagraph`,
        time: `@date(yyyy-MM-dd hh:mm:ss)`
      }
    ]
  }
)

//根据url获取参数
const getQuery = (url, name) => {
  // console.log(url)
  // console.log(name)
  const tempArr = url.split('?')
  const tempArr1 = tempArr[1].split('&')
  const tempArr2 = tempArr1.filter(item =>
    {
      return new RegExp(name).test(item)
    }
  )
  // console.log(tempArr1)
  // console.log(tempArr2)
  let str
  tempArr2.forEach(item => {
    const tempArr3 = item.split('=')
    str = tempArr3[1]
  })
  return str
}

//获取新闻列表
 Mock.mock(/\/api\/get\/news/, 'get', (options) => {
   // console.log(options)
   const pageIndex = getQuery(options.url, 'pageIndex')
   const pageSize = getQuery(options.url, 'pageSize')
   // console.log(pageIndex)
   // console.log(pageSize)
   const pageStart = (pageIndex - 1) * pageSize
   const pageEnd = pageIndex * pageSize
   const pageNewsList = newsList.slice(pageStart, pageEnd)
  return {
    status:200,
    message: '获取数组数据成功',
    total: newsList.length,
    pageNewsList: pageNewsList
  }
})

// 新增新闻方法
Mock.mock('/api/add/news', 'post', (options) => {
  // console.log(options)
  const body = JSON.parse(options.body)
  const title = body.titles
  const contain = body.contain
  // console.log(title, contain)
  const addNews = Mock.mock(
    {
      id: `@increment(1)`,
      image: `@image('100x100', '#50B347', '#FFF', '@ctitle')`,
      title: title,
      contain: contain,
      time: `@date(yyyy-MM-dd hh:mm:ss)`
    }
  )
  newsList.push(addNews)
  return {
    status:200,
    message: '添加成功',
    newsList: newsList
  }
})

//  删除新闻
Mock.mock('/api/delete/news', 'post', (options) => {
  // console.log(options)
  const body = JSON.parse(options.body)
  const index = newsList.findIndex(item => item.id === body.id)
  newsList.splice(index, 1)
  return {
    status:200,
    message: '删除成功',
    newsList: newsList
  }
})
// console.log(data)
