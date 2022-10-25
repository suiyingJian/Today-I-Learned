// // 合并数组对象
// let arrObj = [
//     {a: 1, b: 2},
//     {a: 1, b: 2,c: 3},
//     {a: 2, b: 1},
//     {a: 2, b: 1,c: 3},
// ]
// arrObj.map((item,index) => {   // 合并 数据
//     arrObj.map((items,index2) => {
//     // 合并的判断条件
//           if(item.a == items.a){  // 把所有 a 相等的合并到一个对象里
//             Object.assign(item,items)
//           }
//     })
// })
// let result = []; // 去重   数据
// let obj = {};
// for(let i = 0; i < arrObj.length; i ++){
//   for (let j = i + 1; j < arrObj.length; j ++) {
//           // 要保留的值
//     if( arrObj[i].a === arrObj[j].a ){  //  去除 a 相等的这条数据
//       ++ i;
//     }
//   }
//   result.push(arrObj[i])
// }
//  console.log(result)


let arr1 = [
    { id: 3, city: '上海' },
    { id: 1, city: '北京' },
    { id: 4, city: '成都' },
  ]
  let arr2 = [
    { id: 1, city: '北京' },
    { id: 2, city: '天津' },
    { id: 3, city: '上海' },
    { id: 5, city: '云南' }
  ]
  removeDp(arr1, arr2)
  function removeDp (arr1, arr2) {
    let arr = arr1.concat(arr2)
    let obj = {}
    let newArray = arr.reduce((pre, cur) => {
      if (!obj[cur.id]) {
          obj[cur.id] = true
          console.log(cur.id);
        pre.push(cur)
      }
      return pre
    }, [])
    console.log(newArray)
  }
  