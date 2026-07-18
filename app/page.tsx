"use client";

import { useEffect, useState } from "react";

type Stop = { time: string; title: string; note?: string; important?: boolean };
type VisualStep = { icon: string; time: string; title: string };
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
    fallback: "高铁延误就取消茶园散步；到店先吃饭再泡汤，避免空腹泡温泉。",
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
    fallback: "如 10:30 后才离开安溪，午餐改为路上简餐并直接去码头；轮渡延误则缩短私导。",
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
    fallback: "下雨就改为骑楼下短走；老人累时吃完花生汤直接回酒店。",
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
    fallback: "海况不好就取消游艇，改为酒店泳池、园林和五缘湾短走；生日宴时间不变。",
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
    fallback: "下雨或太热就留在酒店；如果最后一晚更换酒店，当天只保留入住和休息，不再加景点。",
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
    fallback: "车次较早就取消散步；车次较晚也不再加景点，把体力留给返程。",
  },
];

const checklist = [
  "高铁票与 6 人实名信息", "租车确认及还车门店地址", "7/30 14:30 船票与证件分工",
  "已订酒店确认号与相邻房备注", "7/31 13:30 鲜承午餐", "8/1 19:00 七尚生日宴",
  "蛋糕、花瓣、好事发生牌、长寿面", "8/2 最后一晚酒店确认", "8/3 高铁车次与送站时间",
  "常用药、晕船药、防晒和补液用品", "鼓浪屿轻便过夜包",
];

const menus = [
  { name: "安溪悦泉晚餐", total: "约 ¥872", items: "茶香温泉土鸡蛋 · 手剥傍林笋 · 铁观音茶香虾 · 山茶油土鸡 · 本地光鱼两吃 · 麻笋煲 · 小笋芥菜煲 · 幸福炒饭 · 湖头咸笋包" },
  { name: "华尔道夫鲜承午餐", total: "菜品 ¥1,388 + 服务费", items: "客家牛三宝 · 盐酒河田鸡 · 白切大红管 · 姜母鸭 · 海鲜泡饭 · 泉州卤面 · 时蔬 · 花生奶" },
  { name: "七尚生日宴", total: "约 ¥2,940", items: "土笋冻 · 鲜鲍 · 白切大管 · 鳝鱼羹 · 青蟹年糕 · 竹午鱼 · 蛏子皇 · 河田鸡 · 片皮鸭 · 芋泥香酥鸭 · 时蔬 · 焖饭 · 花生汤 · 长寿面" },
];

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

export default function Home() {
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState<number[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("xiamen-trip-checklist");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  const toggle = (index: number) => {
    const next = checked.includes(index) ? checked.filter((item) => item !== index) : [...checked, index];
    setChecked(next);
    window.localStorage.setItem("xiamen-trip-checklist", JSON.stringify(next));
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

  return (
    <main>
      <header className="hero">
        <nav className="topbar">
          <a className="brand" href="#top" aria-label="返回顶部"><span>屿</span> 厦门家宴之旅</a>
          <a className="map-link" href="/trip-overview.png" target="_blank">查看原行程图 ↗</a>
        </nav>
        <div className="hero-content" id="top">
          <p className="eyebrow">2026 · 6 位家人 · 6 天 5 晚</p>
          <h1>为 70 岁生日，<br /><em>慢慢走一趟厦门。</em></h1>
          <p className="hero-copy">山里泡汤、鼓浪屿散步、鹭江夜色与一场海边家宴。每天留足午休，让老人和孩子都舒服。</p>
          <div className="hero-tags"><span>🚄 全程高铁</span><span>🏨 最后一晚待确认</span><span>🎂 8 月 1 日生日宴</span></div>
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
            <img src={day.image} alt={day.imageAlt} />
            <figcaption><span>0{active + 1}</span>{day.imageCaption}</figcaption>
          </figure>
          <section className="easy-route" aria-label={`${day.date}老人看图版行程`}>
            <div className="easy-route-heading"><span>看图版 · 今日四步</span><b>沿着箭头走，一眼看懂今天</b></div>
            <img className="route-illustration" src={day.routeImage} alt={`${day.date}路线示意：${day.visualSteps.map(step => step.title).join("、")}`} />
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

      <section className="section picture-guide" id="pictures">
        <div className="section-heading">
          <div><p className="kicker">六日看图路线</p><h2>先看图片，再看时间</h2></div>
          <p>每张图代表一天。家里老人只要按日期从左到右看，就能知道当天的大致安排。</p>
        </div>
        <div className="picture-grid">
          {pictureGuide.map((item) => (
            <figure key={item.date}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <figcaption><span>{item.date}</span><b>{item.title}</b><small>{item.note}</small></figcaption>
            </figure>
          ))}
        </div>
        <a className="overview-poster" href="/trip-overview.png" target="_blank" rel="noreferrer">
          <div><span>一张图看完整行程</span><b>点开后可以放大查看</b></div>
          <img src="/trip-overview.png" alt="厦门七十岁生日家庭行程一张图总览" loading="lazy" />
        </a>
      </section>

      <section className="visual-journey" aria-label="旅途画卷">
        <div className="visual-title"><p className="kicker">旅途画卷</p><h2>从茶山，到海湾</h2><span>六天，一路慢慢走</span></div>
        <div className="photo-mosaic">
          {days.map((item, index) => (
            <button key={item.date} onClick={() => { setActive(index); document.getElementById("itinerary")?.scrollIntoView(); }} aria-label={`查看${item.date}${item.short}行程`}>
              <img src={item.image} alt={item.imageAlt} loading="lazy" />
              <span><small>{item.date}</small><b>{item.imageCaption}</b></span>
            </button>
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
        <div className="section-heading"><div><p className="kicker">三顿重点</p><h2>山海风味与生日家宴</h2></div><p>整体少辣、少油、少咸；照顾老人和孩子。</p></div>
        <div className="menu-grid">
          {menus.map((menu, index) => <article key={menu.name}><div className="menu-index">0{index + 1}</div><h3>{menu.name}</h3><b>{menu.total}</b><p>{menu.items}</p></article>)}
        </div>
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
        <div className="check-grid">
          {checklist.map((item, index) => <label className={checked.includes(index) ? "done" : ""} key={item}><input type="checkbox" checked={checked.includes(index)} onChange={() => toggle(index)} /><span>{checked.includes(index) ? "✓" : ""}</span>{item}</label>)}
        </div>
      </section>

      <section className="section tips">
        <div className="tip-card"><span>👟</span><div><b>鼓浪屿最费脚</b><p>坡路与石板路约 8,000-12,000 步，穿防滑步行鞋，不登日光岩顶。</p></div></div>
        <div className="tip-card"><span>🌦️</span><div><b>夏季炎热潮湿</b><p>户外尽量放在早晨或 17:00 以后，随身带防晒、雨具和补液用品。</p></div></div>
        <div className="tip-card"><span>💊</span><div><b>随身药品</b><p>常用药、晕船药、证件与儿童用品放过夜包，不进入寄存大箱。</p></div></div>
      </section>

      <footer><p>厦门 70 岁生日家庭行程</p><span>7 月 29 日 - 8 月 3 日 · 两老两大两小</span><a href="#top">回到顶部 ↑</a></footer>
      <nav className="mobile-nav"><a href="#itinerary">行程</a><a href="#pictures">看图</a><a href="#contact">联系</a><a href="#checklist">清单</a></nav>
    </main>
  );
}
