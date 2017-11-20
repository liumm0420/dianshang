//  导入vue
import Vue from 'vue'

// 导入路由
import VueRouter from 'vue-router'
// 导入路径所对应的组件
import MiHome from '../pages/MiHome'

import MiPhone from '../components/MiPhone'
import MLogin from '../components/MLogin'
import ZhuCe from '../components/ZhuCe'
import PanDuan from '../components/PanDuan'
import UserInfo from '../pages/UserInfo'
import SetMi from '../components/SetMi'
import MiGood from '../pages/MiGood'
import MiQuit from '../pages/MiQuit'
import FaBu from '../pages/FaBu'
import CateGory from '../pages/CateGory'
import ShopCart from '../pages/ShopCart'
import MiSearch from '../pages/MiSearch'
import MiOrder from '../components/MiOrder'
import DaiFu from '../components/DaiFu'
import DaiShou from '../components/DaiShou'
import MiAddress from '../pages/MiAddress'
import MAddress from '../pages/MAddress'
import NewAddress from '../pages/NewAddress'
import MiSettle from '../pages/MiSettle';
import PayMoney from '../pages/PayMoney';
import DiZhi from '../pages/DiZhi';
import MiReply from '../pages/MiReply';
import TouXiang from '../pages/TouXiang';
import ReplyPage from '../pages/ReplyPage';
import MiComment from '../pages/MiComment';
import MiHeart from '../pages/MiHeart';
import MiMessage from '../pages/MiMessage';



// import ChaJian from '../components/ChaJian'


Vue.use(VueRouter);
// 路由配置
const routes = [
  {
  path: '/',
  component: MiHome
  },
  {
    path: '/login',
    component: MLogin
  },
  {
    path: '/zhuce',
    component: ZhuCe
  },
  {
    path:'/panduan',
    component:PanDuan
  },
  {
    path:'/userinfo',
    component:UserInfo
  },
  {
    path:'/setting',
    component:SetMi
  },
  {
    path:'/good/:id',
    component:MiGood
  },
  {
    path:'/edit/:id',
    component:MiQuit
  },
  {
    path:'/fabu',
    component:FaBu
  },
  {
    path:'/category',
    component:CateGory
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/search',
    component:MiSearch
  },
  {
    path:'/order',
    component:MiOrder
  },
  {
    path:'/pay',
    component:DaiFu
  },
  {
    path:'/shou',
    component:DaiShou
  },
  {
    path:'/address',
    component:MAddress
  },
  {
    path:'/newadds',
    component:NewAddress
  },
  {
    path:'/order/:id',
    component:MiReply
  },
  {
    path:'/settle',
    component:MiSettle
  },
  {
    path:'/chooseaddr',
    component:MiAddress
  },
  {
    path:'/paymoney',
    component:PayMoney
  },
  {
    path:'/touxiang',
    component:TouXiang
  },
  {
    path:'/reply/:id',
    component:ReplyPage
  },
  {
    path:'/reply/:id/:id',
    component:MiComment
  },
  {
    path:'/heart',
    component:MiHeart
  },
  {
    path:'/message',
    component:MiMessage
  },
  
]
// 导出实例
export default new VueRouter({
    routes
})