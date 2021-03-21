/*eslint-disable*/
import Mock from 'mockjs'

/*const data = Mock.mock({
  title: '@ctitle()',
  sentence: '@csentence()'
})*/
/*const data = Mock.mock({
  sentence: '@cparagraph()'
})*/
const {list} = Mock.mock(
  {
    'list|8': [
      {
        name: '@cname',
        id: '@increment(1)',
        address: '@city(true)'
      }
    ]
  }
)

Mock.mock('/api/get/list', 'get', () => {
  return {
    status:200,
    message: '获取数组数据成功',
    list: list
  }
})
// console.log(data)
