"use client";

import { useEffect, useState } from "react";

type Stop = { time: string; title: string; note?: string; important?: boolean };
type VisualStep = { icon: string; time: string; title: string };
type Dish = { name: string; price: number; note?: string };
type Menu = { id: string; name: string; serviceRate: number; dishes: Dish[] };
type Day = {
  date: string;
  weekday: string;
  short: string;
  place: string;
  theme: string;
  hotel: string;
  strength: string;
  color: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  routeImage: string;
  visualSteps: VisualStep[];
  stops: Stop[];
  fallback: string;
};

const days: Day[] = [
  {
    date: "7月29日", weekday: "周三", short: "安溪", place: "广州 → 厦门北 → 安溪", theme: "山里放松，恢复体力", hotel: "安溪悦泉行馆", strength: "低强度", color: "green", image: "/trip-images/day-1.jpg", imageAlt: "安溪茶山与温泉", imageCaption: "茶山晨雾 · 温泉初醒", routeImage: "/route-images/route-1.jpg", visualSteps: [{ icon:"🚄", time:"上午", title:"高铁出发" },{ icon:"🚙", time:"12:00", title:"厦门北取车" },{ icon:"♨️", time:"下午", title:"茶山泡温泉" },{ icon:"🍲", time:"晚上", title:"酒店吃晚餐" }],
    stops: [
      { time: "上午", title: "广州东站乘高铁前往厦门北" },
      { time: "约 12:00", title: "厦门北站取车", note: "核对儿童座椅、行李空间和次日还车门店", important: true },
      { time: "12:15", title: "车站附近简单午餐后前往安溪", note: "车程约 1.5 小时" },
      { time: "下午", title: "入住、午休、茶园散步或泡温泉", note: "泡汤每轮 20-30 分钟，中间补水" },
      { time: "傍晚", title: "酒店园林拍全家照" },
      { time: "晚上", title: "酒店中餐厅晚餐，早点休息" },
    ],
    fallback: "如遇高铁延误：取消茶园散步；到店先吃饭再泡汤，避免空腹泡温泉。",
  },
  {
    date: "7月30日", weekday: "周四", short: "鼓浪屿", place: "安溪 → 华尔道夫 → 鼓浪屿", theme: "转换场景最多的一天", hotel: "鼓浪屿晃岩 36", strength: "中强度", color: "blue", image: "/trip-images/day-2.jpg", imageAlt: "鼓浪屿红瓦别墅与海岸", imageCaption: "红瓦绿荫 · 海岛慢行", routeImage: "/route-images/route-2.jpg", visualSteps: [{ icon:"🚙", time:"10:15", title:"驾车返回厦门" },{ icon:"🧳", time:"11:45", title:"寄存大件行李" },{ icon:"⛴️", time:"14:30", title:"坐船上岛" },{ icon:"👟", time:"17:00", title:"鼓浪屿慢走" }],
    stops: [
      { time: "08:00", title: "早餐、温泉或茶园散步" },
      { time: "最迟 10:15", title: "退房，开车返回厦门", important: true },
      { time: "约 11:45", title: "华尔道夫寄存大件行李", note: "只带一晚过夜包上岛" },
      { time: "12:40", title: "前往租车门店还车" },
      { time: "13:40 前", title: "抵达东渡客运码头安检候船", important: true },
      { time: "14:30", title: "东渡客运码头 → 三丘田码头", note: "船票已购买", important: true },
      { time: "约 15:30", title: "晃岩 36 入住、休息" },
      { time: "17:00", title: "2 小时轻松私人讲解", note: "晃岩路老别墅、港仔后、菽庄花园外围；不登日光岩顶" },
      { time: "晚上", title: "岛上简单闽南菜" },
    ],
    fallback: "如遇轮渡延误：缩短私人讲解；如遇停航：联系酒店调整上岛安排，改在市区休息，不冒险赶船。",
  },
  {
    date: "7月31日", weekday: "周五", short: "厦门城", place: "鼓浪屿 → 华尔道夫 → 中山路", theme: "从人文岛屿回到城市", hotel: "厦门华尔道夫", strength: "中低强度", color: "orange", image: "/trip-images/day-3.jpg", imageAlt: "鹭江道蓝调时刻与鼓浪屿夜景", imageCaption: "骑楼灯火 · 鹭江夜色", routeImage: "/route-images/route-3.jpg", visualSteps: [{ icon:"🏡", time:"上午", title:"岛上早餐散步" },{ icon:"⛴️", time:"10:30", title:"坐船下岛" },{ icon:"🍽️", time:"13:30", title:"鲜承午餐" },{ icon:"🌃", time:"19:00", title:"中山路夜游" }],
    stops: [
      { time: "07:30", title: "早餐，岛上轻松散步" },
      { time: "10:30", title: "退房、下岛", note: "酒店协助把行李送到码头" },
      { time: "12:00", title: "华尔道夫取回寄存行李" },
      { time: "13:30", title: "鲜承 HOKKLO 午餐", note: "已预约；使用两间 FHR 餐饮额度", important: true },
      { time: "15:00", title: "入住、午休或泳池", note: "至少休息 3 小时，不安排下午茶" },
      { time: "19:00", title: "中山路平民小吃", note: "沙茶面、海蛎煎、五香卷、烧肉粽、花生汤" },
      { time: "约 21:00", title: "鹭江道看鼓浪屿夜景", note: "平路约 30 分钟，累了直接打车" },
    ],
    fallback: "如遇下雨：改为骑楼下短走；如老人疲劳：吃完花生汤直接回酒店。",
  },
  {
    date: "8月1日", weekday: "周六", short: "生日", place: "华尔道夫 → 七尚 → 五缘湾", theme: "70 岁生日正日", hotel: "厦门七尚酒店", strength: "低强度", color: "teal", image: "/trip-images/day-4.jpg", imageAlt: "海湾夕阳下的七十岁生日家宴", imageCaption: "海湾夕照 · 七十家宴", routeImage: "/route-images/route-4.jpg", visualSteps: [{ icon:"🚙", time:"13:30", title:"前往七尚" },{ icon:"🏨", time:"下午", title:"入住午休" },{ icon:"🛥️", time:"17:00", title:"可选游艇" },{ icon:"🎂", time:"19:00", title:"生日晚宴" }],
    stops: [
      { time: "08:00", title: "早餐、泳池或房间休息" },
      { time: "上午", title: "不安排景点，午餐从简" },
      { time: "13:30", title: "退房前往七尚", note: "车程约 20-25 分钟" },
      { time: "14:30", title: "入住、午休、酒店园林" },
      { time: "17:00", title: "可选五缘湾动力游艇 1 小时", note: "仅在天气、海况和老人状态合适时安排" },
      { time: "18:00", title: "洗澡、换衣、拍生日照" },
      { time: "19:00", title: "厦餐厅生日晚宴", note: "简单花瓣、“好事发生”牌、赠送长寿面", important: true },
      { time: "约 20:30", title: "长寿面、切蛋糕、全家合照" },
    ],
    fallback: "如遇海况不好：取消游艇，改为酒店泳池、园林和五缘湾短走；生日宴时间不变。",
  },
  {
    date: "8月2日", weekday: "周日", short: "度假", place: "完整度假日 · 不赶景点", theme: "给老人和孩子留一整天慢下来", hotel: "最后一晚待确认", strength: "极低强度", color: "violet", image: "/trip-images/day-5.jpg", imageAlt: "厦门海湾度假酒店无边泳池", imageCaption: "海湾闲日 · 慢慢享受", routeImage: "/trip-images/day-5.jpg", visualSteps: [{ icon:"☕", time:"上午", title:"早餐与散步" },{ icon:"🏊", time:"午前", title:"泳池或休息" },{ icon:"😴", time:"午后", title:"午餐与午睡" },{ icon:"🌅", time:"傍晚", title:"海湾慢走" }],
    stops: [
      { time: "08:00-10:00", title: "睡到自然醒、早餐", note: "可在酒店园林或五缘湾短走" },
      { time: "10:00-12:00", title: "孩子泳池，老人房间休息", note: "不安排跨城景点" },
      { time: "12:00-14:30", title: "酒店轻午餐与完整午休", important: true },
      { time: "15:00-17:00", title: "泳池、Spa、房间静坐或整理照片" },
      { time: "17:00-18:30", title: "天气好再去海湾短走", note: "8/1 游艇如因天气取消，可视状态挪到此时" },
      { time: "18:30 后", title: "轻松晚餐，提前整理部分行李" },
    ],
    fallback: "如遇下雨或高温：留在酒店；如最后一晚更换酒店：当天只保留入住和休息，不再加景点。",
  },
  {
    date: "8月3日", weekday: "周一", short: "返程", place: "最后一晚酒店 → 厦门北 → 广州", theme: "不加景点，从容回家", hotel: "温暖到家", strength: "低强度", color: "rose", image: "/trip-images/day-5.jpg", imageAlt: "厦门海湾与悠闲度假时光", imageCaption: "最后一晨 · 从容归家", routeImage: "/route-images/route-5.jpg", visualSteps: [{ icon:"☕", time:"08:00", title:"早餐与短走" },{ icon:"🧳", time:"09:30", title:"检查行李" },{ icon:"🚙", time:"退房后", title:"前往厦门北" },{ icon:"🚄", time:"当天", title:"高铁回广州" }],
    stops: [
      { time: "08:00-09:30", title: "早餐、最后一次散步或池边坐坐" },
      { time: "09:30-11:00", title: "打包并逐项检查", note: "证件、充电器、药品和儿童用品" },
      { time: "按车次", title: "退房或寄存行李", note: "如车次较晚，可先寄存再简餐" },
      { time: "发车前", title: "前往厦门北站", note: "交通与进站合计预留 75-90 分钟", important: true },
      { time: "当天", title: "高铁返回广州东，平安到家", note: "尽量安排相邻座位，车上备简餐和水" },
    ],
    fallback: "如车次较早：取消散步；如车次较晚：也不再加景点，把体力留给返程。",
  },
];

const checklist = [
  "高铁票与 6 人实名信息", "租车确认及还车门店地址", "7/30 14:30 船票与证件分工",
  "已订酒店确认号与相邻房备注", "7/31 13:30 鲜承午餐", "8/1 19:00 七尚生日宴",
  "蛋糕、花瓣、好事发生牌、长寿面", "8/2 最后一晚酒店确认", "8/3 高铁车次与送站时间",
  "常用药、晕船药、防晒和补液用品", "鼓浪屿轻便过夜包",
];

const checklistCategories = [
  { title: "交通与证件", icon: "🚄", items: [0, 1, 2, 8] },
  { title: "酒店与餐饮", icon: "🏨", items: [3, 4, 5, 7] },
  { title: "生日准备", icon: "🎂", items: [6] },
  { title: "随身用品", icon: "🧳", items: [9, 10] },
];

const menus: Menu[] = [
  { id: "anxi", name: "安溪悦泉晚餐", serviceRate: 0, dishes: [
    { name: "茶香温泉土鸡蛋", price: 38 }, { name: "古法手剥傍林笋", price: 38 },
    { name: "铁观音茶香虾", price: 128 }, { name: "山茶油小黄姜煎土鸡", price: 158 },
    { name: "本地光鱼两吃", price: 228 }, { name: "土猪肉焖安溪麻笋煲", price: 88 },
    { name: "原香小笋芥菜煲", price: 88 }, { name: "幸福炒饭", price: 58 },
    { name: "湖头咸笋包（6个）", price: 48 },
  ]},
  { id: "waldorf", name: "华尔道夫鲜承午餐", serviceRate: 0.15, dishes: [
    { name: "荠菜煎炒客家牛三宝", price: 298 }, { name: "客家盐酒河田鸡", price: 188 },
    { name: "白切东山深海手钓大红管", price: 298 }, { name: "鲜承姜母鸭", price: 158 },
    { name: "鲜承海鲜泡饭", price: 138 }, { name: "泉州卤面", price: 98 },
    { name: "时令田园蔬菜", price: 58 }, { name: "花生奶（4位）", price: 152 },
  ]},
  { id: "lohkah", name: "七尚生日宴", serviceRate: 0.15, dishes: [
    { name: "贵妃蚌土笋冻（1位）", price: 87 }, { name: "红葱酥南日鲜鲍（4只）", price: 228 },
    { name: "白切海钓东山大管", price: 247 }, { name: "沙虫双脆鳝鱼羹", price: 87 },
    { name: "永安黄椒烧青蟹仔年糕", price: 427, note: "请做少辣" }, { name: "陈年萝卜焗竹午鱼", price: 257 },
    { name: "嫩姜芽炒蛏子皇", price: 257 }, { name: "韭香浸长汀河田鸡", price: 127 },
    { name: "黑金果木片皮鸭", price: 397 }, { name: "芋泥香酥鸭", price: 77 },
    { name: "自制腊肉蒸时令鲜笋", price: 127 }, { name: "红菇柴火豆腐", price: 117 },
    { name: "椒榄菜焗扁豆", price: 57 }, { name: "猫爪菇烧芋仔佐火腿", price: 157 },
    { name: "梅干菜猪油焖饭", price: 197 }, { name: "冻花生汤（2位）", price: 94 },
    { name: "生日长寿面（赠送）", price: 0 },
  ]},
];

const initialMenuSelections = Object.fromEntries(
  menus.map((menu) => [menu.id, menu.dishes.map((_, index) => index)])
) as Record<string, number[]>;

const hotelMessages = [
  {
    id: "huangyan",
    icon: "🏡",
    title: "鼓浪屿晃岩 36",
    text: "您好，我们预订了7月30日入住晃岩36号，一行6人，包含两位老人和两个小孩。请问能否协助安排三丘田码头到酒店的行李接送？下午希望安排约2小时的轻松人文讲解，以老别墅和外围平路为主，不登日光岩顶。谢谢！",
  },
  {
    id: "waldorf",
    icon: "🏨",
    title: "厦门华尔道夫",
    text: "您好，我们预订了7月31日入住的两间房，此行是为长辈庆祝70岁生日。烦请关联两间订单，并尽量安排连通房或相邻房。我们已预约当日13:30鲜承午餐，结账时需要协助拆分挂账。感谢！",
  },
  {
    id: "lohkah",
    icon: "🎂",
    title: "七尚生日晚宴",
    text: "您好，我们已预约8月1日19:00厦餐厅生日晚宴，共6位，为长辈庆祝70岁生日。烦请安排相对安静的位置，菜品少油、少盐、少辣，并确认长寿面、简单花瓣布置和“好事发生”立牌。结账时请协助将合规消费分别挂到两间客房。谢谢！",
  },
];

const pictureGuide = [
  { date: "7月29日", title: "茶山与温泉", note: "高铁 · 取车 · 安溪慢下来", image: "/route-images/route-1.jpg", alt: "广州乘高铁到厦门北，再前往安溪茶山温泉的路线插画" },
  { date: "7月30日", title: "轻装上鼓浪屿", note: "寄存行李 · 轮渡 · 老别墅", image: "/route-images/route-2.jpg", alt: "安溪返回厦门、寄存行李、乘轮渡上鼓浪屿的路线插画" },
  { date: "7月31日", title: "骑楼与鹭江夜色", note: "下岛 · 鲜承 · 中山路", image: "/route-images/route-3.jpg", alt: "鼓浪屿下岛、华尔道夫午餐和中山路夜游的路线插画" },
  { date: "8月1日", title: "海湾生日家宴", note: "午休 · 游艇可选 · 生日宴", image: "/route-images/route-4.jpg", alt: "入住七尚、五缘湾游艇和七十岁生日晚宴的路线插画" },
  { date: "8月2日", title: "完整度假日", note: "早餐 · 泳池 · 午睡 · 慢走", image: "/trip-images/day-5.jpg", alt: "海湾度假酒店泳池与悠闲休息场景" },
  { date: "8月3日", title: "从容坐高铁回家", note: "早餐 · 行李 · 厦门北 · 广州", image: "/route-images/route-5.jpg", alt: "早餐后整理行李，前往厦门北乘高铁返程的路线插画" },
];

const hotelGallery = [
  { image: "/gallery/huangyan-exterior.jpg", title: "晃岩36 · 南洋别墅", note: "鼓浪屿上的百年建筑外观", alt: "鼓浪屿晃岩36酒店南洋风格外观", source: "https://slh.com/hotels/huang-yan-36-hotel" },
  { image: "/gallery/huangyan-room.jpg", title: "晃岩36 · 客房", note: "复古细节与安静休息空间", alt: "鼓浪屿晃岩36酒店复古风格客房", source: "https://slh.com/hotels/huang-yan-36-hotel" },
  { image: "/gallery/qishang-courtyard.webp", title: "七尚 · 庭院", note: "水、石材与绿意交织", alt: "厦门七尚酒店庭院景观", source: "https://www.klook.com/activity/70377-staycation-lohkah-hotel-spa-xia-men/" },
  { image: "/gallery/qishang-restaurant.webp", title: "七尚 · 餐厅", note: "生日晚宴环境参考", alt: "厦门七尚酒店餐厅环境", source: "https://www.klook.com/activity/70377-staycation-lohkah-hotel-spa-xia-men/" },
  { image: "/gallery/qishang-pool.webp", title: "七尚 · 泳池", note: "8月2日完整度假日", alt: "厦门七尚酒店户外泳池", source: "https://www.klook.com/activity/70377-staycation-lohkah-hotel-spa-xia-men/" },
];

const journeyMoments = [
  { image: "/trip-images/day-1.jpg", date: "7月29日", title: "茶山初见 · 温泉醒旅", alt: "安溪茶山和温泉度假风景", day: 0, shape: "tall" },
  { image: "/route-images/route-1.jpg", date: "第一程", title: "高铁穿山，向海而行", alt: "从广州乘高铁前往厦门和安溪的插画", day: 0 },
  { image: "/trip-images/day-2.jpg", date: "7月30日", title: "红瓦绿荫 · 海岛慢行", alt: "鼓浪屿红瓦别墅和海岸", day: 1, shape: "wide" },
  { image: "/gallery/huangyan-exterior.jpg", date: "鼓浪屿", title: "住进百年南洋别墅", alt: "晃岩36南洋别墅外观", day: 1 },
  { image: "/gallery/huangyan-room.jpg", date: "岛上一夜", title: "推门，是旧时光", alt: "晃岩36复古客房", day: 1 },
  { image: "/trip-images/day-3.jpg", date: "7月31日", title: "骑楼灯火 · 鹭江夜色", alt: "鹭江道蓝调时刻与鼓浪屿夜景", day: 2, shape: "wide" },
  { image: "/trip-images/day-4.jpg", date: "8月1日", title: "海湾夕照 · 七十家宴", alt: "海湾夕阳下的七十岁生日家宴", day: 3, shape: "wide" },
  { image: "/gallery/qishang-courtyard.webp", date: "七尚", title: "水院微风，慢慢入席", alt: "七尚酒店水景庭院", day: 3 },
  { image: "/gallery/qishang-restaurant.webp", date: "生日之夜", title: "灯亮起来，家人围坐", alt: "七尚酒店餐厅环境", day: 3 },
  { image: "/gallery/qishang-pool.webp", date: "8月2日", title: "不赶景点，只享受海湾", alt: "七尚酒店户外泳池", day: 4, shape: "tall" },
  { image: "/route-images/route-5.jpg", date: "8月3日", title: "带着照片，从容回家", alt: "从厦门北坐高铁返回广州的插画", day: 5 },
];

const mapStops = [
  { icon: "🚄", name: "厦门北站", note: "取车与返程进站", query: "厦门北站" },
  { icon: "♨️", name: "安溪悦泉行馆", note: "第一晚茶山温泉", query: "安溪悦泉行馆" },
  { icon: "⛴️", name: "厦鼓码头", note: "东渡客运码头候船", query: "厦门邮轮中心厦鼓码头" },
  { icon: "🏡", name: "鼓浪屿晃岩36", note: "三丘田码头上岛入住", query: "鼓浪屿晃岩36酒店" },
  { icon: "🏨", name: "厦门华尔道夫", note: "寄存、午餐与住宿", query: "厦门华尔道夫酒店" },
  { icon: "🌃", name: "中山路步行街", note: "晚餐小吃与骑楼", query: "厦门中山路步行街" },
  { icon: "🎂", name: "厦门七尚酒店", note: "生日宴与海湾度假", query: "厦门七尚酒店" },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState<number[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState(menus[0].id);
  const [menuSelections, setMenuSelections] = useState<Record<string, number[]>>(initialMenuSelections);
  const [elderMode, setElderMode] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("xiamen-trip-checklist");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setChecked(parsed.filter((value) => Number.isInteger(value) && value >= 0 && value < checklist.length));
      }
    } catch {
      window.localStorage.removeItem("xiamen-trip-checklist");
    }
    try {
      const savedMenus = window.localStorage.getItem("xiamen-trip-menu-selections");
      if (savedMenus) {
        const parsedMenus = JSON.parse(savedMenus) as Record<string, number[]>;
        setMenuSelections((current) => ({ ...current, ...parsedMenus }));
      }
    } catch {
      window.localStorage.removeItem("xiamen-trip-menu-selections");
    }
    setElderMode(window.localStorage.getItem("xiamen-trip-elder-mode") === "true");
  }, []);

  const toggle = (index: number) => {
    setChecked((current) => {
      const next = current.includes(index) ? current.filter((item) => item !== index) : [...current, index].sort((a, b) => a - b);
      window.localStorage.setItem("xiamen-trip-checklist", JSON.stringify(next));
      return next;
    });
  };

  const toggleDish = (menuId: string, dishIndex: number) => {
    setMenuSelections((current) => {
      const selected = current[menuId] || [];
      const nextForMenu = selected.includes(dishIndex) ? selected.filter((item) => item !== dishIndex) : [...selected, dishIndex].sort((a, b) => a - b);
      const next = { ...current, [menuId]: nextForMenu };
      window.localStorage.setItem("xiamen-trip-menu-selections", JSON.stringify(next));
      return next;
    });
  };

  const setDishes = (menuId: string, indices: number[]) => {
    setMenuSelections((current) => {
      const next = { ...current, [menuId]: indices };
      window.localStorage.setItem("xiamen-trip-menu-selections", JSON.stringify(next));
      return next;
    });
  };

  const toggleElderMode = () => {
    setElderMode((current) => {
      const next = !current;
      window.localStorage.setItem("xiamen-trip-elder-mode", String(next));
      return next;
    });
  };

  const copyMessage = async (id: string, message: string) => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const field = document.createElement("textarea");
      field.value = message;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1800);
  };

  const day = days[active];
  const activeMenu = menus.find((menu) => menu.id === activeMenuId) || menus[0];
  const activeMenuSelected = menuSelections[activeMenu.id] || [];
  const menuSubtotal = activeMenu.dishes.reduce((sum, dish, index) => activeMenuSelected.includes(index) ? sum + dish.price : sum, 0);
  const menuService = Math.round(menuSubtotal * activeMenu.serviceRate * 100) / 100;
  const menuTotal = menuSubtotal + menuService;
  const money = (value: number) => `¥${value.toLocaleString("zh-CN", { minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 })}`;

  return (
    <main className={elderMode ? "elder-mode" : ""}>
      <header className="hero">
        <nav className="topbar">
          <a className="brand" href="#top" aria-label="返回顶部"><span>屿</span> 厦门家宴之旅</a>
          <div className="nav-actions"><a className="pdf-link" href="/xiamen-family-trip-picture.pdf" download>下载图文 PDF ↓</a><a className="map-link" href="/trip-overview.png" target="_blank">查看原行程图 ↗</a></div>
        </nav>
        <div className="hero-content" id="top">
          <p className="eyebrow">2026 · 6 位家人 · 6 天 5 晚</p>
          <h1>为 70 岁生日，<br /><em>慢慢走一趟厦门。</em></h1>
          <p className="hero-copy">山里泡汤、鼓浪屿散步、鹭江夜色与一场海边家宴。每天留足午休，让老人和孩子都舒服。</p>
          <div className="hero-tags"><span>🚄 全程高铁</span><span>🏨 最后一晚待确认</span><span>🎂 8 月 1 日生日宴</span><button type="button" className={elderMode ? "active" : ""} onClick={toggleElderMode} aria-pressed={elderMode}>👓 {elderMode ? "已开启大字版" : "老人阅读模式"}</button></div>
        </div>
        <div className="sea" aria-hidden="true"><i></i><i></i><i></i></div>
      </header>

      <section className="quick-strip" aria-label="关键预订">
        <div><b>7/29 · 12:00</b><span>厦门北站取车</span></div>
        <div><b>7/30 · 14:30</b><span>东渡 → 三丘田</span></div>
        <div><b>7/31 · 13:30</b><span>鲜承午餐</span></div>
        <div><b>8/1 · 19:00</b><span>七尚生日宴</span></div>
        <div className="pending"><b>8/2 · 待确认</b><span>最后一晚住宿</span></div>
        <div><b>8/3 · 按车次</b><span>厦门北返广州</span></div>
      </section>

      <section className="section last-night" id="last-night">
        <div className="decision-head">
          <div><p className="kicker">最后一晚住宿</p><h2>先保留选择，舒适优先</h2></div>
          <span className="decision-status">待确认</span>
        </div>
        <p className="decision-intro">最终版 PDF 以“七尚续住”为参考方案；目前尚未决定，因此下面只做比较，不把任何选项写成已预订。</p>
        <div className="decision-grid">
          <article className="recommended"><span className="choice-label">参考方案 A</span><h3>七尚续住一晚</h3><p>不用搬行李，8 月 2 日可完整休息，对老人和孩子最轻松。</p><ul><li>生日宴后原地休息</li><li>泳池、园林与五缘湾慢走</li><li>现金券价格与适用条件需再核对</li></ul></article>
          <article><span className="choice-label">候选方案 B</span><h3>更换其他酒店</h3><p>若积分、免房券或返程位置明显更合适，可以作为备选。</p><ul><li>需要再次打包与转场</li><li>8 月 2 日不再安排额外景点</li><li>“厦门游”聊天中的候选酒店待补充</li></ul></article>
        </div>
        <div className="decision-rule"><b>建议判断方式</b><span>若价差不大，优先“不换酒店”；只有新酒店的价值或位置明显更好时，再考虑转场。</span></div>
      </section>

      <section className="itinerary section" id="itinerary">
        <div className="section-heading">
          <div><p className="kicker">每日行程</p><h2>一眼看懂，随时切换</h2></div>
          <p>点选日期查看当天安排。红点是不能错过的已确认时间。</p>
        </div>
        <div className="day-tabs" role="tablist" aria-label="选择日期">
          {days.map((item, index) => (
            <button key={item.date} className={active === index ? "active" : ""} onClick={() => setActive(index)} role="tab" aria-selected={active === index}>
              <span>{item.date}</span><b>{item.short}</b><small>{item.weekday}</small>
            </button>
          ))}
        </div>

        <article className={`day-card ${day.color}`}>
          <figure className="day-photo">
            <img src={day.image} alt={day.imageAlt} loading="lazy" decoding="async" />
            <figcaption><span>0{active + 1}</span>{day.imageCaption}</figcaption>
          </figure>
          <section className="easy-route" aria-label={`${day.date}老人看图版行程`}>
            <div className="easy-route-heading"><span>看图版 · 今日四步</span><b>沿着箭头走，一眼看懂今天</b></div>
            <img className="route-illustration" src={day.routeImage} alt={`${day.date}路线示意：${day.visualSteps.map(step => step.title).join("、")}`} loading="lazy" decoding="async" />
            <div className="visual-steps">
              {day.visualSteps.map((step, index) => <div key={step.title}><span className="step-icon">{step.icon}</span><span className="step-copy"><small>{step.time}</small><b>{step.title}</b></span>{index < day.visualSteps.length - 1 && <i aria-hidden="true">→</i>}</div>)}
            </div>
          </section>
          <div className="day-summary">
            <p className="day-number">DAY {active + 1}</p>
            <h3>{day.place}</h3>
            <p>{day.theme}</p>
            <div className="hotel-card"><span>今晚入住</span><b>{day.hotel}</b></div>
            <span className="intensity">☀ {day.strength}</span>
          </div>
          <div className="timeline">
            <h4 className="detail-title">详细时间表</h4>
            {day.stops.map((stop) => (
              <div className={`stop ${stop.important ? "important" : ""}`} key={`${stop.time}-${stop.title}`}>
                <time>{stop.time}</time>
                <div><b>{stop.title}</b>{stop.note && <p>{stop.note}</p>}</div>
              </div>
            ))}
            <div className="fallback"><span>天气 / 体力备选</span><p>{day.fallback}</p></div>
          </div>
        </article>
      </section>

      <section className="section map-guide" id="maps">
        <div className="section-heading"><div><p className="kicker">一键导航</p><h2>到哪里，点哪里</h2></div><p>点击后打开高德地图搜索地点，适合在微信里临出发时使用。</p></div>
        <div className="map-stop-grid">
          {mapStops.map((stop) => (
            <a key={stop.name} href={`https://uri.amap.com/search?keyword=${encodeURIComponent(stop.query)}&city=厦门&view=map&src=xiamen-family-trip`} target="_blank" rel="noreferrer">
              <span>{stop.icon}</span><div><b>{stop.name}</b><small>{stop.note}</small></div><i>导航 ↗</i>
            </a>
          ))}
        </div>
      </section>

      <section className="section picture-guide" id="pictures">
        <div className="section-heading">
          <div><p className="kicker">六日看图路线</p><h2>先看图片，再看时间</h2></div>
          <p>每张图代表一天。家里老人只要按日期从左到右看，就能知道当天的大致安排。</p>
        </div>
        <div className="picture-grid">
          {pictureGuide.map((item) => (
            <figure key={item.date}>
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              <figcaption><span>{item.date}</span><b>{item.title}</b><small>{item.note}</small></figcaption>
            </figure>
          ))}
        </div>
        <a className="overview-poster" href="/trip-overview.png" target="_blank" rel="noreferrer">
          <div><span>一张图看完整行程</span><b>点开后可以放大查看</b></div>
          <img src="/trip-overview.webp" alt="厦门七十岁生日家庭行程一张图总览" loading="lazy" decoding="async" />
        </a>
      </section>

      <section className="visual-journey" aria-label="旅途画卷">
        <div className="visual-title"><p className="kicker">旅途画卷</p><h2>从茶山，到海湾</h2><span>六天，一路慢慢走</span></div>
        <div className="photo-mosaic">
          {journeyMoments.map((item) => (
            <button className={item.shape || ""} key={`${item.date}-${item.title}`} onClick={() => { setActive(item.day); document.getElementById("itinerary")?.scrollIntoView(); }} aria-label={`查看${item.date}行程`}>
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              <span><small>{item.date}</small><b>{item.title}</b></span>
            </button>
          ))}
        </div>
      </section>

      <section className="section hotel-gallery" aria-label="酒店实景图片">
        <div className="section-heading"><div><p className="kicker">酒店实景参考</p><h2>住进旅途的风景里</h2></div><p>增加晃岩36和七尚的真实环境图片；实际房型、布置和天气以入住当天为准。</p></div>
        <div className="hotel-photo-grid">
          {hotelGallery.map((photo, index) => (
            <figure key={photo.image} className={index === 0 ? "featured" : ""}>
              <img src={photo.image} alt={photo.alt} loading="lazy" decoding="async" />
              <figcaption><div><b>{photo.title}</b><span>{photo.note}</span></div><a href={photo.source} target="_blank" rel="noreferrer">图片来源 ↗</a></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="principles section">
        <div className="section-heading light"><div><p className="kicker">全程节奏</p><h2>这趟旅行，不追打卡</h2></div></div>
        <div className="principle-grid">
          <article><span>01</span><h3>每天午休</h3><p>午后最热时回酒店，孩子游泳，老人午睡。</p></article>
          <article><span>02</span><h3>轻装上岛</h3><p>大件寄存华尔道夫，只带一晚过夜包去鼓浪屿。</p></article>
          <article><span>03</span><h3>天气优先</h3><p>台风或强对流时，以酒店活动替代轮渡、游艇和长走。</p></article>
        </div>
      </section>

      <section className="section dining" id="dining">
        <div className="section-heading"><div><p className="kicker">三顿重点 · 可勾选</p><h2>山海风味与生日家宴</h2></div><p>点菜时勾选或取消，菜品小计、服务费和预计总消费会实时更新。</p></div>
        <div className="menu-tabs" role="tablist" aria-label="选择正餐菜单">
          {menus.map((menu) => <button key={menu.id} className={activeMenu.id === menu.id ? "active" : ""} onClick={() => setActiveMenuId(menu.id)} role="tab" aria-selected={activeMenu.id === menu.id}>{menu.name}</button>)}
        </div>
        <article className="menu-calculator">
          <div className="menu-calculator-head"><div><span>当前菜单</span><h3>{activeMenu.name}</h3></div><b>{activeMenuSelected.length} / {activeMenu.dishes.length} 道已选</b></div>
          <div className="menu-actions" aria-label="菜单快捷选择">
            <button onClick={() => setDishes(activeMenu.id, activeMenu.dishes.map((_, index) => index))}>全部勾选</button>
            <button onClick={() => setDishes(activeMenu.id, [])}>全部清空</button>
            <button className="recommended" onClick={() => setDishes(activeMenu.id, initialMenuSelections[activeMenu.id])}>恢复推荐</button>
          </div>
          <div className="dish-grid">
            {activeMenu.dishes.map((dish, index) => {
              const selected = activeMenuSelected.includes(index);
              return <label className={selected ? "selected" : ""} key={dish.name}>
                <input type="checkbox" checked={selected} onChange={() => toggleDish(activeMenu.id, index)} />
                <span className="dish-check">{selected ? "✓" : ""}</span>
                <span className="dish-name"><b>{dish.name}</b>{dish.note && <small>{dish.note}</small>}</span>
                <strong>{money(dish.price)}</strong>
              </label>;
            })}
          </div>
          <div className="menu-totals" aria-live="polite">
            <div><span>已选菜品小计</span><b>{money(menuSubtotal)}</b></div>
            <div className={activeMenu.serviceRate ? "" : "muted-total"}><span>服务费{activeMenu.serviceRate ? "（15%）" : "（无）"}</span><b>{money(menuService)}</b></div>
            <div className="grand-total"><span>预计总消费</span><b>{money(menuTotal)}</b></div>
          </div>
          <p className="menu-save-note">菜品勾选状态也会保存在这台设备上。</p>
        </article>
        <div className="birthday-callout"><div><span>8月1日 · 19:00</span><h3>厦餐厅 · 70 岁生日晚宴</h3><p>18:50 前到包房拍照，约 20:30 上长寿面、切蛋糕、全家合照。两间 FHR 客房分别挂账，退房前逐张核对。</p></div><strong>好事<br />发生</strong></div>
      </section>

      <section className="section contact-helper" id="contact">
        <div className="section-heading"><div><p className="kicker">酒店沟通助手</p><h2>需要时，一键复制</h2></div><p>已把老人、孩子、生日安排和挂账需求写好，微信里直接复制给酒店即可。</p></div>
        <div className="message-grid">
          {hotelMessages.map((message) => (
            <article key={message.id}>
              <div className="message-head"><span>{message.icon}</span><h3>{message.title}</h3></div>
              <p>{message.text}</p>
              <button onClick={() => copyMessage(message.id, message.text)} className={copied === message.id ? "copied" : ""}>
                {copied === message.id ? "✓ 已复制" : "复制给酒店"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section checklist" id="checklist">
        <div className="section-heading"><div><p className="kicker">出发前清单</p><h2>{checked.length} / {checklist.length} 项已准备</h2></div><p>勾选状态会保存在这台设备上。</p></div>
        <div className="progress"><i style={{ width: `${checked.length / checklist.length * 100}%` }} /></div>
        <div className="check-category-grid">
          {checklistCategories.map((category) => (
            <article key={category.title}>
              <h3><span>{category.icon}</span>{category.title}<small>{category.items.filter((index) => checked.includes(index)).length}/{category.items.length}</small></h3>
              <div className="check-grid">
                {category.items.map((index) => <label className={checked.includes(index) ? "done" : ""} key={checklist[index]}><input type="checkbox" checked={checked.includes(index)} onChange={() => toggle(index)} /><span>{checked.includes(index) ? "✓" : ""}</span>{checklist[index]}</label>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section tips">
        <div className="tip-card"><span>👟</span><div><b>鼓浪屿最费脚</b><p>坡路与石板路约 8,000-12,000 步，穿防滑步行鞋，不登日光岩顶。</p></div></div>
        <div className="tip-card"><span>🌦️</span><div><b>夏季炎热潮湿</b><p>户外尽量放在早晨或 17:00 以后，随身带防晒、雨具和补液用品。</p></div></div>
        <div className="tip-card"><span>💊</span><div><b>随身药品</b><p>常用药、晕船药、证件与儿童用品放过夜包，不进入寄存大箱。</p></div></div>
      </section>

      <footer><p>厦门 70 岁生日家庭行程</p><span>7 月 29 日 - 8 月 3 日 · 两老两大两小</span><a href="#top">回到顶部 ↑</a></footer>
      <nav className="mobile-nav"><a href="#itinerary">行程</a><a href="#maps">导航</a><a href="#pictures">看图</a><a href="#contact">联系</a><a href="#checklist">清单</a></nav>
    </main>
  );
}
