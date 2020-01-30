import axios from 'axios'


export function request(config) {
  //  1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/hy',
    timeout: 5000
  })

  //2.axios的拦截器
instance.interceptors.request.use(config=>{
// console.log(config);
//拦截后需要返回 不然发送后无法发出  会请求失败

// 1.作用：比如config中的一些信息不符合服务器的要求

// 2.比如每次发送网络请求的时候，都希望在界面显示一个请求图标


// 3.某些网络请求：(比如登陆(token)),必须携带一些特殊的信息
return config
},
err=>{
console.log(err);
})
//响应式拦截
instance.interceptors.response.use(res=>{
    return res.data
},err=>{
    console.log(err);
})


  // 3.发送真正的网络请求
  return instance(config)
  //这个默认的返回值就是一个promise
}

