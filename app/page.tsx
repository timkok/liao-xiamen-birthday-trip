"use client";

import { useEffect, useMemo, useState } from "react";
import restaurantMenuData from "./restaurant-menus.json";

type Stop = { time: string; title: string; note?: string; important?: boolean };
type VisualStep = { icon: string; time: string; title: string };
type Dish = { name: string; price: number; note?: string; tags?: string[] };
type Menu = { id: string; name: string; serviceRate: number; dishes: Dish[] };
type CatalogDish = { id: number; restaurant: string; section: string; name: string; price: number; unit: string; notes: string; spicy: boolean; preorder: boolean };
type Day = {
  date: string;
  weekday: string;
  short: string;
  place: string;
  theme: string;
  hotel: string;
  strength: string;
  transport: string;
  mustDo: string;
  leaveBy: string;
  leaderTip: string;
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
    date: "Jul 29", weekday: "Wed", short: "Tea Hills", place: "Guangzhou → Xiamen North → Anxi", theme: "Let the tea hills wash away our travel tiredness", hotel: "Yuequan Retreat · 安溪悦泉行馆", strength: "Easy", transport: "High-speed train · 7-seat car into the hills", mustDo: "Check the child seat and luggage space", leaveBy: "Follow our train time", leaderTip: "Let Grandma and Grandpa rest first. Hot-spring rounds should be 20–30 minutes, with water breaks in between.", color: "green", image: "trip-images/day-1.jpg", imageAlt: "Tea hills and hot springs in Anxi", imageCaption: "Tea mist wakes · Warm springs welcome us", routeImage: "route-images/route-1.jpg", visualSteps: [{ icon:"🚄", time:"Morning", title:"Take the train" },{ icon:"🚙", time:"12:00", title:"Pick up our car" },{ icon:"♨️", time:"Afternoon", title:"Hot-spring time" },{ icon:"🍲", time:"Evening", title:"Family dinner" }],
    stops: [
      { time: "Morning", title: "High-speed train from Guangzhou East to Xiamen North" },
      { time: "Around 12:00", title: "Pick up our car at Xiamen North", note: "Check the child seat, luggage space, and return location", important: true },
      { time: "12:15", title: "Quick lunch, then drive to Anxi", note: "About 1.5 hours" },
      { time: "Afternoon", title: "Check in, nap, walk through the tea garden, or soak", note: "20–30 minutes per soak, with water breaks" },
      { time: "Sunset", title: "Take our first family photo in the garden" },
      { time: "Evening", title: "Dinner at the hotel and an early night" },
    ],
    fallback: "If the train is late, skip the tea-garden walk. Eat before using the hot spring.",
  },
  {
    date: "Jul 30", weekday: "Thu", short: "Island", place: "Anxi → Waldorf Astoria → Gulangyu", theme: "Cross the water into a world of red roofs and music", hotel: "Huangyan 36 · 鼓浪屿晃岩36", strength: "Medium", transport: "Drive · Store bags · Return car · Ferry", mustDo: "Arrive by 13:40 · Ferry at 14:30", leaveBy: "Check out by 10:15", leaderTip: "Photograph every luggage tag. The adults split the passports, and we take only one small overnight bag to the island.", color: "blue", image: "trip-images/day-2.jpg", imageAlt: "Red-roof villas and the coast of Gulangyu", imageCaption: "Follow the tide · Dream under red roofs", routeImage: "route-images/route-2.jpg", visualSteps: [{ icon:"🚙", time:"10:15", title:"Drive to Xiamen" },{ icon:"🧳", time:"11:45", title:"Store big bags" },{ icon:"⛴️", time:"14:30", title:"Ferry to the island" },{ icon:"👟", time:"17:00", title:"Island walk" }],
    stops: [
      { time: "08:00", title: "Breakfast, hot spring, or a tea-garden walk" },
      { time: "By 10:15", title: "Check out and drive back to Xiamen", important: true },
      { time: "Around 11:45", title: "Store big bags at the Waldorf Astoria", note: "Take only one overnight bag" },
      { time: "12:40", title: "Return the rental car" },
      { time: "By 13:40", title: "Security and ferry check-in at Dongdu", important: true },
      { time: "14:30", title: "Ferry to Sanqiutian Pier", note: "Tickets are booked", important: true },
      { time: "Around 15:30", title: "Check in at Huangyan 36 and rest" },
      { time: "17:00", title: "Easy two-hour private island walk", note: "Old villas and garden paths; no steep summit climb" },
      { time: "Evening", title: "A simple Southern Fujian dinner" },
    ],
    fallback: "If the ferry is delayed, shorten the walk. If ferries stop, stay in the city and never rush or take risks.",
  },
  {
    date: "Jul 31", weekday: "Fri", short: "City Lights", place: "Gulangyu → Waldorf Astoria → Zhongshan Road", theme: "From island morning light to riverside lanterns", hotel: "Waldorf Astoria Xiamen · 厦门华尔道夫", strength: "Easy–Medium", transport: "Ferry off the island · Taxi to the hotel", mustDo: "HOKKLO lunch at 13:30", leaveBy: "Leave the island around 10:30", leaderTip: "Rest for at least three hours after lunch. Share small bites at night, and take a taxi back whenever Grandma feels tired.", color: "orange", image: "trip-images/day-3.jpg", imageAlt: "Blue hour along Lujiang Road", imageCaption: "Arcade lights · River reflections", routeImage: "route-images/route-3.jpg", visualSteps: [{ icon:"🏡", time:"Morning", title:"Island breakfast" },{ icon:"⛴️", time:"10:30", title:"Ferry back" },{ icon:"🍽️", time:"13:30", title:"HOKKLO lunch" },{ icon:"🌃", time:"19:00", title:"Night food walk" }],
    stops: [
      { time: "07:30", title: "Breakfast and an easy island walk" },
      { time: "10:30", title: "Check out and take the ferry back", note: "The hotel helps send bags to the pier" },
      { time: "12:00", title: "Pick up our stored bags" },
      { time: "13:30", title: "Lunch at HOKKLO 鲜承", note: "Reserved; use both FHR dining credits", important: true },
      { time: "15:00", title: "Check in, nap, or swim", note: "At least three full hours of rest" },
      { time: "19:00", title: "Snack walk on Zhongshan Road", note: "Noodles, oyster pancake, spring rolls, sticky rice, and peanut soup" },
      { time: "Around 21:00", title: "See Gulangyu lights across the river", note: "A flat 30-minute walk; taxi back if tired" },
    ],
    fallback: "If it rains, walk only under the covered arcades. If Grandma is tired, head straight back after dessert.",
  },
  {
    date: "Aug 1", weekday: "Sat", short: "Birthday!", place: "Waldorf Astoria → Lohkah → Wuyuan Bay", theme: "Sea breeze, sunset, and a toast to Grandma at 70", hotel: "Lohkah Hotel & Spa · 厦门七尚", strength: "Easy", transport: "Taxi to Lohkah · Boat only if weather is good", mustDo: "Photos by 18:50 · Dinner at 19:00", leaveBy: "Leave for Lohkah by 13:30", leaderTip: "Start getting ready at 18:00. Take room and family photos first; longevity noodles and cake come around 20:30.", color: "teal", image: "trip-images/day-4.jpg", imageAlt: "Grandma's birthday dinner by the bay", imageCaption: "Golden bay · Grandma's table glows", routeImage: "route-images/route-4.jpg", visualSteps: [{ icon:"🚙", time:"13:30", title:"Ride to Lohkah" },{ icon:"🏨", time:"Afternoon", title:"Check in and rest" },{ icon:"🛥️", time:"17:00", title:"Optional boat ride" },{ icon:"🎂", time:"19:00", title:"Birthday dinner" }],
    stops: [
      { time: "08:00", title: "Breakfast, pool, or quiet room time" },
      { time: "Morning", title: "No sightseeing; keep lunch simple" },
      { time: "13:30", title: "Check out and ride to Lohkah", note: "About 20–25 minutes" },
      { time: "14:30", title: "Check in, nap, and enjoy the garden" },
      { time: "17:00", title: "Optional one-hour boat ride", note: "Only if the weather, sea, and Grandma all feel good" },
      { time: "18:00", title: "Shower, dress up, and take birthday photos" },
      { time: "19:00", title: "Grandma's birthday dinner", note: "Flowers, a celebration sign, and longevity noodles", important: true },
      { time: "Around 20:30", title: "Longevity noodles, cake, and our big family photo" },
    ],
    fallback: "If the sea is rough, skip the boat and enjoy the pool, garden, or a short bay walk. Dinner stays at 19:00.",
  },
  {
    date: "Aug 2", weekday: "Sun", short: "Slow Day", place: "A full resort day · No rushing", theme: "Give the day to sunlight, water, trees, and naps", hotel: "A quiet Xiamen bay stay", strength: "Very Easy", transport: "Mostly walking and resting at the hotel", mustDo: "Keep the full nap · Sort our favorite photos", leaveBy: "No fixed start time", leaderTip: "Today is for getting our energy back. Follow the weather and our moods; do not add faraway sights.", color: "violet", image: "trip-images/day-5.jpg", imageAlt: "A quiet pool by Xiamen Bay", imageCaption: "Slow water · Nothing we have to do", routeImage: "trip-images/day-5.jpg", visualSteps: [{ icon:"☕", time:"Morning", title:"Breakfast and walk" },{ icon:"🏊", time:"Late morning", title:"Swim or rest" },{ icon:"😴", time:"Afternoon", title:"Lunch and nap" },{ icon:"🌅", time:"Sunset", title:"Bay walk" }],
    stops: [
      { time: "08:00–10:00", title: "Sleep in and have breakfast", note: "Maybe a short garden or bay walk" },
      { time: "10:00–12:00", title: "Pool for the kids, quiet rest for Grandma and Grandpa" },
      { time: "12:00–14:30", title: "Light lunch and a full family nap", important: true },
      { time: "15:00–17:00", title: "Pool, spa, quiet reading, or photo sorting" },
      { time: "17:00–18:30", title: "A short bay walk if the weather feels good" },
      { time: "After 18:30", title: "Easy dinner and pack a little" },
    ],
    fallback: "If it rains or gets too hot, stay inside, rest, drink tea, and look through our photos.",
  },
  {
    date: "Aug 3", weekday: "Mon", short: "Home", place: "Hotel → Xiamen North → Guangzhou", theme: "Take the train home with photos, stories, and smiles", hotel: "Home, together", strength: "Easy", transport: "Taxi to Xiamen North · High-speed train home", mustDo: "Check passports, medicine, and every bag", leaveBy: "Leave 75–90 minutes before the train", leaderTip: "Check both room bills before leaving. Let Grandma and Grandpa sit first at the station while the adults handle food and bags.", color: "rose", image: "trip-images/day-5.jpg", imageAlt: "A calm morning by Xiamen Bay", imageCaption: "One last sea breeze · Home we go", routeImage: "route-images/route-5.jpg", visualSteps: [{ icon:"☕", time:"08:00", title:"Breakfast and walk" },{ icon:"🧳", time:"09:30", title:"Check every bag" },{ icon:"🚙", time:"After checkout", title:"Ride to the station" },{ icon:"🚄", time:"Train time", title:"Back to Guangzhou" }],
    stops: [
      { time: "08:00–09:30", title: "Breakfast, one last walk, or poolside time" },
      { time: "09:30–11:00", title: "Pack and check everything", note: "Passports, chargers, medicine, and kid gear" },
      { time: "Based on train", title: "Check out or store bags", note: "If the train is late, have a simple lunch first" },
      { time: "Before departure", title: "Ride to Xiamen North", note: "Allow 75–90 minutes for the ride and station", important: true },
      { time: "Train time", title: "High-speed train to Guangzhou East", note: "Sit together and bring water and snacks" },
    ],
    fallback: "For an early train, skip the walk. For a late train, still keep the day simple and save energy for the ride home.",
  },
];

const checklist = [
  "Train tickets and all six IDs", "Rental car and return location", "Jul 30 ferry tickets and passport plan",
  "Hotel confirmation numbers and nearby rooms", "Jul 31 HOKKLO lunch", "Aug 1 Grandma's birthday dinner",
  "Cake, flowers, celebration sign, and longevity noodles", "Aug 2 pool and easy dinner", "Aug 3 train and station ride",
  "Medicine, motion-sickness pills, sunscreen, and electrolytes", "Small overnight island bag",
  "7-seat car, child seat, and luggage space", "Huangyan 36 luggage pickup and island guide",
  "Waldorf room charges and FHR credits", "Lohkah nearby rooms, decorations, and room charges",
  "Boat weather, sea conditions, and cancellation rules",
];

const checklistCategories = [
  { title: "Travel & IDs", icon: "🚄", items: [0, 1, 2, 8, 11, 15] },
  { title: "Hotels & Food", icon: "🏨", items: [3, 4, 5, 7, 12, 13, 14] },
  { title: "Birthday", icon: "🎂", items: [6] },
  { title: "Day Bag", icon: "🧳", items: [9, 10] },
];

const restaurantMeta = [
  { id: "幸福味道", label: "Anxi · 幸福味道", serviceRate: 0 },
  { id: "鲜承 (HOKKLO)", label: "Waldorf Astoria · 鲜承", serviceRate: 0.15 },
  { id: "七尚酒店 (LOHKAH)", label: "Lohkah · 七尚酒店", serviceRate: 0.15 },
];

const restaurantMenus = restaurantMenuData as CatalogDish[];

const menus: Menu[] = [
  { id: "anxi", name: "Anxi Welcome Dinner", serviceRate: 0, dishes: [
    { name: "Tea-Scented Egg · 茶香温泉土鸡蛋", price: 38, note: "One each; soft and easy to eat", tags: ["Grandma-friendly", "Kid-friendly"] },
    { name: "Hand-Peeled Bamboo Shoots · 古法手剥傍林笋", price: 38, note: "Light and refreshing", tags: ["Anxi specialty", "Mild"] },
    { name: "Tieguanyin Tea Shrimp · 铁观音茶香虾", price: 128, note: "A true taste of Anxi", tags: ["Local favorite", "Shell-on"] },
    { name: "Tea-Oil Ginger Chicken · 山茶油小黄姜煎土鸡", price: 158, note: "Ask for less oil", tags: ["Hotel pick", "Not spicy"] },
    { name: "Local Fish, Two Ways · 本地光鱼两吃", price: 228, note: "Good for sharing", tags: ["Local favorite", "Watch for bones"] },
    { name: "Pork & Bamboo Shoot Clay Pot · 土猪肉焖安溪麻笋煲", price: 88, note: "Tender and comforting", tags: ["Grandma-friendly"] },
    { name: "Bamboo Shoot & Greens Clay Pot · 原香小笋芥菜煲", price: 88, note: "A mild vegetable dish", tags: ["Mild", "Vegetable"] },
    { name: "Happiness Fried Rice · 幸福炒饭", price: 58, note: "A safe favorite for kids and grandparents", tags: ["Kid-friendly", "Rice"] },
    { name: "Hutou Savory Bamboo Buns (6) · 湖头咸笋包", price: 48, note: "One for each of us", tags: ["Anxi snack"] },
  ]},
  { id: "waldorf", name: "HOKKLO Lunch at the Waldorf", serviceRate: 0.15, dishes: [
    { name: "Hakka Beef Trio · 荞葱煎炒客家牛三宝", price: 298, tags: ["Signature", "Rich texture"] }, { name: "Hakka Rice-Wine Chicken · 客家盐酒煮河田鸡", price: 188, tags: ["Mild", "Rice-wine aroma"] },
    { name: "Chilled Hand-Line Squid · 白切东山深海手钓大红管", price: 298, tags: ["Seafood", "Mild"] }, { name: "Ginger Duck · 鲜承姜母鸭", price: 158, tags: ["Southern Fujian", "Grandma-friendly"] },
    { name: "Seafood Rice Soup · 鲜承海鲜泡饭", price: 138, tags: ["Kid-friendly", "Rice"] }, { name: "Quanzhou Braised Noodles · 泉州卤面", price: 98, tags: ["Southern Fujian", "Noodles"] },
    { name: "Seasonal Garden Greens · 时令田园蔬菜", price: 58, tags: ["Mild", "Vegetable"] }, { name: "Taro Peanut Soup (4) · 鹭岛香芋花生汤", price: 152, tags: ["Peanuts", "Dessert"] },
  ]},
  { id: "lohkah", name: "Grandma's Birthday Dinner", serviceRate: 0.15, dishes: [
    { name: "Local Clam Aspic · 贵妃蚌土笋冻", price: 87, tags: ["Southern Fujian", "Cold dish"] }, { name: "Baby Abalone with Crispy Shallots (4) · 红葱酥南日鲜鲍", price: 228, tags: ["Seafood", "4 pieces"] },
    { name: "Chilled Dongshan Squid · 白切海钓东山大管", price: 247, tags: ["Seafood", "Not spicy"] }, { name: "Crispy Cod Cup · 沙虫双脆鳕鱼盏", price: 87, tags: ["Seafood", "Not spicy"] },
    { name: "Crab & Rice Cakes · 永安黄椒烧角蟹佐年糕", price: 427, note: "Ask for mild spice", tags: ["Seafood", "Mild spice"] }, { name: "Baked Fish with Aged Radish · 陈年老萝卜焗竹午鱼", price: 257, tags: ["Watch for bones"] },
    { name: "Razor Clams with Young Ginger · 嫩姜芽炒蛏子皇", price: 257, tags: ["Seafood"] }, { name: "Chicken with Chives · 韭香浸长汀河田鸡", price: 127, tags: ["Mild", "Grandma-friendly"] },
    { name: "Fruitwood Roast Duck · 黑金果木片皮鸭", price: 397, tags: ["Signature", "Share"] }, { name: "Crispy Taro Duck · 芋泥香酥鸭", price: 77, tags: ["Kid-friendly", "Crispy"] },
    { name: "Bacon & Fresh Bamboo Shoots · 自制腊肉蒸时令鲜笋", price: 127, tags: ["Savory"] }, { name: "Red Mushroom Tofu · 红菇柴火豆腐", price: 117, note: "Ask the hotel to confirm", tags: ["Grandma-friendly", "To confirm"] },
    { name: "Green Beans with Olive Vegetables · 橄榄菜焗扁豆", price: 57, tags: ["Vegetable"] }, { name: "Mushrooms, Taro & Ham · 猎爪菇烧芋仔佐火腿", price: 157, tags: ["Mushroom", "Mild spice"] },
    { name: "Preserved Greens Rice · 梅干菜猪油粕捞饭", price: 197, tags: ["Rice", "For six"] }, { name: "Chilled Peanut Soup (2) · 冻花生汤", price: 94, note: "Ask the hotel to confirm", tags: ["Peanuts", "To confirm"] },
    { name: "Birthday Longevity Noodles · 生日长寿面", price: 0, tags: ["Birthday tradition", "Complimentary"] },
  ]},
];

const initialMenuSelections = Object.fromEntries(
  menus.map((menu) => [menu.id, menu.dishes.map((_, index) => index)])
) as Record<string, number[]>;

const hotelMessages = [
  {
    id: "huangyan",
    icon: "🏡",
    title: "Huangyan 36 · 鼓浪屿晃岩36",
    text: "您好，我们预订了7月30日入住晃岩36号，一行6人，包含两位老人和两个小孩。请问能否协助安排三丘田码头到酒店的行李接送？下午希望安排约2小时的轻松人文讲解，以老别墅和外围平路为主，不登日光岩顶。谢谢！",
  },
  {
    id: "waldorf",
    icon: "🏨",
    title: "Waldorf Astoria Xiamen · 厦门华尔道夫",
    text: "您好，我们预订了7月31日入住的两间房，此行是为母亲庆祝70岁生日。她刚刚康复，同行还有两个孩子，烦请关联两间订单，并尽量安排连通房或相邻房。我们已预约当日13:30鲜承午餐，结账时需要协助拆分挂账。感谢！",
  },
  {
    id: "lohkah",
    icon: "🎂",
    title: "Lohkah Birthday Dinner · 七尚生日晚宴",
    text: "您好，我们已预约8月1日19:00厦餐厅生日晚宴，共6位，为母亲庆祝70岁生日。她刚刚康复，烦请安排相对安静的位置，菜品少油、少盐、少辣，并确认长寿面、简单花瓣布置和“好事发生”立牌。结账时请协助将合规消费分别挂到两间客房。谢谢！",
  },
];

const pictureGuide = [
  { date: "Jul 29", title: "Tea Hills & Hot Springs", note: "Train · Car · Slow down in Anxi", image: "route-images/route-1.jpg", alt: "Train to Xiamen and drive into the Anxi tea hills" },
  { date: "Jul 30", title: "A Small Bag for Gulangyu", note: "Store bags · Ferry · Old villas", image: "route-images/route-2.jpg", alt: "Drive from Anxi and take the ferry to Gulangyu" },
  { date: "Jul 31", title: "Arcades & River Lights", note: "Ferry · HOKKLO · Zhongshan Road", image: "route-images/route-3.jpg", alt: "Leave Gulangyu for lunch and an evening city walk" },
  { date: "Aug 1", title: "Grandma's Bay-Side Birthday", note: "Nap · Optional boat · Birthday dinner", image: "route-images/route-4.jpg", alt: "Lohkah, an optional boat ride, and Grandma's dinner" },
  { date: "Aug 2", title: "The Slowest Day", note: "Breakfast · Pool · Nap · Walk", image: "trip-images/day-5.jpg", alt: "A relaxing pool day by the bay" },
  { date: "Aug 3", title: "Train Home Together", note: "Breakfast · Bags · Xiamen North · Guangzhou", image: "route-images/route-5.jpg", alt: "Pack up and take the train home" },
];

const hotelGallery = [
  { image: "gallery/huangyan-exterior.jpg", title: "Huangyan 36 · Heritage Villa", note: "A century-old home on Gulangyu", alt: "The heritage exterior of Huangyan 36", source: "https://slh.com/hotels/huang-yan-36-hotel" },
  { image: "gallery/huangyan-room.jpg", title: "Huangyan 36 · Our Room", note: "Old-world details and a quiet place to rest", alt: "A vintage guest room at Huangyan 36", source: "https://slh.com/hotels/huang-yan-36-hotel" },
  { image: "gallery/qishang-courtyard.webp", title: "Lohkah · Water Courtyard", note: "Water, stone, and green shade", alt: "The water courtyard at Lohkah", source: "https://www.klook.com/activity/70377-staycation-lohkah-hotel-spa-xia-men/" },
  { image: "gallery/qishang-restaurant.webp", title: "Lohkah · Restaurant", note: "Where Grandma's birthday table will glow", alt: "The restaurant at Lohkah", source: "https://www.klook.com/activity/70377-staycation-lohkah-hotel-spa-xia-men/" },
  { image: "gallery/qishang-pool.webp", title: "Lohkah · Pool", note: "Our wonderfully slow Aug 2", alt: "The outdoor pool at Lohkah", source: "https://www.klook.com/activity/70377-staycation-lohkah-hotel-spa-xia-men/" },
];

const journeyMoments = [
  { image: "trip-images/day-1.jpg", date: "Jul 29", title: "First Tea Mist · Warm Springs", alt: "Tea hills and hot springs in Anxi", day: 0, shape: "tall" },
  { image: "route-images/route-1.jpg", date: "Our first ride", title: "Through the hills, toward the sea", alt: "Train from Guangzhou toward Xiamen and Anxi", day: 0 },
  { image: "trip-images/day-2.jpg", date: "Jul 30", title: "Red Roofs · Green Shade · Island Time", alt: "Gulangyu villas and coast", day: 1, shape: "wide" },
  { image: "gallery/huangyan-exterior.jpg", date: "Gulangyu", title: "Sleeping in a century-old villa", alt: "Huangyan 36 heritage villa", day: 1 },
  { image: "gallery/huangyan-room.jpg", date: "Island night", title: "Open the door to another time", alt: "Huangyan 36 vintage room", day: 1 },
  { image: "trip-images/day-3.jpg", date: "Jul 31", title: "Arcade Lights · River Night", alt: "Blue hour along Lujiang Road", day: 2, shape: "wide" },
  { image: "trip-images/day-4.jpg", date: "Aug 1", title: "Golden Bay · Grandma at 70", alt: "Grandma's birthday dinner by the bay", day: 3, shape: "wide" },
  { image: "gallery/qishang-courtyard.webp", date: "Lohkah", title: "A breeze across the water courtyard", alt: "Lohkah water courtyard", day: 3 },
  { image: "gallery/qishang-restaurant.webp", date: "Birthday night", title: "The lights come on, and we gather", alt: "Lohkah restaurant", day: 3 },
  { image: "gallery/qishang-pool.webp", date: "Aug 2", title: "No sights to chase—just the bay", alt: "Lohkah outdoor pool", day: 4, shape: "tall" },
  { image: "route-images/route-5.jpg", date: "Aug 3", title: "Home with photos and full hearts", alt: "Train from Xiamen North to Guangzhou", day: 5 },
];

const mapStops = [
  { icon: "🚄", name: "Xiamen North · 厦门北站", note: "Car pickup and our train home", query: "厦门北站" },
  { icon: "♨️", name: "Yuequan Retreat · 安溪悦泉行馆", note: "Tea hills and hot springs", query: "安溪悦泉行馆" },
  { icon: "⛴️", name: "Xiamen–Gulangyu Ferry · 厦鼓码头", note: "Our Dongdu ferry terminal", query: "厦门邮轮中心厦鼓码头" },
  { icon: "🏡", name: "Huangyan 36 · 鼓浪屿晃岩36", note: "Our island villa", query: "鼓浪屿晃岩36酒店" },
  { icon: "🏨", name: "Waldorf Astoria · 厦门华尔道夫", note: "Bags, lunch, and a good nap", query: "厦门华尔道夫酒店" },
  { icon: "🌃", name: "Zhongshan Road · 中山路", note: "Snacks and glowing arcades", query: "厦门中山路步行街" },
  { icon: "🎂", name: "Lohkah · 厦门七尚酒店", note: "Grandma's dinner by the bay", query: "厦门七尚酒店" },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState<number[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState(menus[0].id);
  const [menuSelections, setMenuSelections] = useState<Record<string, number[]>>(initialMenuSelections);
  const [elderMode, setElderMode] = useState(false);
  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catalogRestaurant, setCatalogRestaurant] = useState(restaurantMeta[0].id);
  const [catalogSection, setCatalogSection] = useState("All sections");
  const [catalogQuery, setCatalogQuery] = useState("");
  const [catalogSelections, setCatalogSelections] = useState<number[]>([]);

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
    try {
      const savedCatalog = window.localStorage.getItem("xiamen-trip-full-menu-selections");
      if (savedCatalog) {
        const parsedCatalog = JSON.parse(savedCatalog);
        if (Array.isArray(parsedCatalog)) setCatalogSelections(parsedCatalog.filter((value) => Number.isInteger(value) && value >= 0 && value < restaurantMenus.length));
      }
    } catch {
      window.localStorage.removeItem("xiamen-trip-full-menu-selections");
    }
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

  const toggleCatalogDish = (dishId: number) => {
    setCatalogSelections((current) => {
      const next = current.includes(dishId) ? current.filter((id) => id !== dishId) : [...current, dishId].sort((a, b) => a - b);
      window.localStorage.setItem("xiamen-trip-full-menu-selections", JSON.stringify(next));
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
  const menuPerPerson = Math.round(menuTotal / 6 * 100) / 100;
  const dayExpanded = expandedDays.includes(active);
  const compactStops = day.stops.filter((stop, index) => index < 3 || stop.important);
  const visibleStops = dayExpanded ? day.stops : compactStops;
  const activeRestaurant = restaurantMeta.find((restaurant) => restaurant.id === catalogRestaurant) || restaurantMeta[0];
  const catalogSections = useMemo(() => ["All sections", ...Array.from(new Set(restaurantMenus.filter((dish) => dish.restaurant === catalogRestaurant).map((dish) => dish.section)))], [catalogRestaurant]);
  const filteredCatalog = useMemo(() => {
    const query = catalogQuery.trim().toLowerCase();
    return restaurantMenus.filter((dish) => dish.restaurant === catalogRestaurant && (catalogSection === "All sections" || dish.section === catalogSection) && (!query || `${dish.name}${dish.notes}${dish.section}`.toLowerCase().includes(query)));
  }, [catalogQuery, catalogRestaurant, catalogSection]);
  const activeCatalogSelections = restaurantMenus.filter((dish) => dish.restaurant === catalogRestaurant && catalogSelections.includes(dish.id));
  const catalogSubtotal = activeCatalogSelections.reduce((sum, dish) => sum + dish.price, 0);
  const catalogService = Math.round(catalogSubtotal * activeRestaurant.serviceRate * 100) / 100;
  const catalogTotal = catalogSubtotal + catalogService;
  const money = (value: number) => `¥${value.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 })}`;

  return (
    <main className={elderMode ? "elder-mode" : ""}>
      <header className="hero">
        <nav className="topbar">
          <a className="brand" href="#top" aria-label="Back to top"><span>屿</span> Grandma's Xiamen Adventure</a>
          <div className="nav-actions"><a className="pdf-link" href="xiamen-family-trip-picture.pdf" download>Chinese Trip PDF ↓</a><a className="map-link" href="trip-overview.png" target="_blank">Original Trip Poster ↗</a></div>
        </nav>
        <div className="hero-content" id="top">
          <p className="eyebrow">A LONG-AWAITED REUNION · SIX OF US · 2026</p>
          <h1>Between Mountains & Sea,<br /><em>Grandma Turns 70.</em></h1>
          <p className="hero-copy">Grandma is getting stronger after a serious illness, and Dudu, 12, and Chuchu, 9, have not seen her for a whole year. On July 27, our family of four flies home from America. Two days later, all six of us set off for Xiamen—to celebrate Grandma, hold her hand again, and turn a year of missing her into tea mist, island breezes, and laughter.</p>
          <div className="hero-tags"><span>✈️ Jul 27 · USA → Guangzhou</span><span>🧒 Dudu 12 · Chuchu 9</span><span>🌿 Six Slow Days</span><span>🎂 Aug 1 · Grandma's Dinner</span><button type="button" className={elderMode ? "active" : ""} onClick={toggleElderMode} aria-pressed={elderMode}>👓 {elderMode ? "Large Text On" : "Large Text"}</button></div>
        </div>
        <div className="sea" aria-hidden="true"><i></i><i></i><i></i></div>
      </header>

      <section className="quick-strip" aria-label="Key times">
        <div><b>Jul 29 · 12:00</b><span>Pick up our car</span></div>
        <div><b>Jul 30 · 14:30</b><span>Ferry to Gulangyu</span></div>
        <div><b>Jul 31 · 13:30</b><span>HOKKLO family lunch</span></div>
        <div><b>Aug 1 · 19:00</b><span>Grandma's birthday dinner</span></div>
        <div><b>Aug 2 · Slow Day</b><span>Pool · Nap · Bay walk</span></div>
        <div><b>Aug 3 · Train Time</b><span>Xiamen North → Guangzhou</span></div>
      </section>

      <section className="itinerary section" id="itinerary">
        <div className="section-heading">
          <div><p className="kicker">SIX DAYS, SLOWLY</p><h2>Six chapters between the hills and the sea</h2></div>
          <p>Tap a date to open the day. The red dots mark the times we cannot miss.</p>
        </div>
        <div className="day-tabs" role="tablist" aria-label="Choose a day">
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
          <section className="easy-route" aria-label={`${day.date} four-step visual route`}>
            <div className="easy-route-heading"><span>Today's Four Steps</span><b>Follow the arrows from start to finish</b></div>
            <img className="route-illustration" src={day.routeImage} alt={`${day.date} route: ${day.visualSteps.map(step => step.title).join(", ")}`} loading="lazy" decoding="async" />
            <div className="visual-steps">
              {day.visualSteps.map((step, index) => <div key={step.title}><span className="step-icon">{step.icon}</span><span className="step-copy"><small>{step.time}</small><b>{step.title}</b></span>{index < day.visualSteps.length - 1 && <i aria-hidden="true">→</i>}</div>)}
            </div>
          </section>
          <section className="day-facts" aria-label={`${day.date} key details`}>
            <div><span>🚙</span><small>How We Move</small><b>{day.transport}</b></div>
            <div className="must"><span>🎯</span><small>Do Not Miss</small><b>{day.mustDo}</b></div>
            <div><span>⏰</span><small>Leave By</small><b>{day.leaveBy}</b></div>
            <div><span>🔋</span><small>Energy Level</small><b>{day.strength}</b></div>
          </section>
          <div className="day-summary">
            <p className="day-number">DAY {active + 1}</p>
            <h3>{day.place}</h3>
            <p>{day.theme}</p>
            <div className="hotel-card"><span>Tonight's Stay</span><b>{day.hotel}</b></div>
            <span className="intensity">☀ {day.strength}</span>
          </div>
          <div className="timeline">
            <h4 className="detail-title">Today's Timeline</h4>
            {visibleStops.map((stop) => (
              <div className={`stop ${stop.important ? "important" : ""}`} key={`${stop.time}-${stop.title}`}>
                <time>{stop.time}</time>
                <div><b>{stop.title}</b>{stop.note && <p>{stop.note}</p>}</div>
              </div>
            ))}
            <button className="expand-schedule" onClick={() => setExpandedDays((current) => current.includes(active) ? current.filter((index) => index !== active) : [...current, active])} aria-expanded={dayExpanded}>
              {dayExpanded ? "Show Less ↑" : `See the Full Day (${day.stops.length} stops) ↓`}
            </button>
            <div className="fallback"><span>Weather / Energy Plan</span><p>{day.fallback}</p></div>
            <div className="leader-tip"><span>💡</span><div><b>Family Captain's Note</b><p>{day.leaderTip}</p></div></div>
          </div>
        </article>
      </section>

      <section className="section map-guide" id="maps">
        <div className="section-heading"><div><p className="kicker">THE WAY AHEAD</p><h2>One tap to our next adventure</h2></div><p>Every place is saved here. Tap to open it in Amap.</p></div>
        <div className="map-stop-grid">
          {mapStops.map((stop) => (
            <a key={stop.name} href={`https://uri.amap.com/search?keyword=${encodeURIComponent(stop.query)}&city=厦门&view=map&src=xiamen-family-trip`} target="_blank" rel="noreferrer">
              <span>{stop.icon}</span><div><b>{stop.name}</b><small>{stop.note}</small></div><i>Open Map ↗</i>
            </a>
          ))}
        </div>
      </section>

      <section className="section picture-guide" id="pictures">
        <div className="section-heading">
          <div><p className="kicker">SIX DAYS IN PICTURES</p><h2>See the adventure before we step into it</h2></div>
          <p>Each picture holds one day. Follow the dates to see our whole story.</p>
        </div>
        <div className="picture-grid">
          {pictureGuide.map((item) => (
            <figure key={item.date}>
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              <figcaption><span>{item.date}</span><b>{item.title}</b><small>{item.note}</small></figcaption>
            </figure>
          ))}
        </div>
        <a className="overview-poster" href="trip-overview.png" target="_blank" rel="noreferrer">
          <div><span>The Whole Trip in One Picture</span><b>Tap to open and zoom</b></div>
          <img src="trip-overview.webp" alt="One-page overview of Grandma's Xiamen birthday trip" loading="lazy" decoding="async" />
        </a>
      </section>

      <section className="visual-journey" aria-label="Our journey in pictures">
        <div className="visual-title"><p className="kicker">OUR STORYBOOK</p><h2>Tea mist rises, island breezes follow</h2><span>Six days of mountains, sea, and laughter</span></div>
        <div className="photo-mosaic">
          {journeyMoments.map((item) => (
            <button className={item.shape || ""} key={`${item.date}-${item.title}`} onClick={() => { setActive(item.day); document.getElementById("itinerary")?.scrollIntoView(); }} aria-label={`See the ${item.date} plan`}>
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              <span><small>{item.date}</small><b>{item.title}</b></span>
            </button>
          ))}
        </div>
      </section>

      <section className="section hotel-gallery" aria-label="Hotel photos">
        <div className="section-heading"><div><p className="kicker">SLEEP INSIDE THE SCENERY</p><h2>Our rooms are part of the adventure</h2></div><p>Old island walls, water courtyards, and a pool by the bay.</p></div>
        <div className="hotel-photo-grid">
          {hotelGallery.map((photo, index) => (
            <figure key={photo.image} className={index === 0 ? "featured" : ""}>
              <img src={photo.image} alt={photo.alt} loading="lazy" decoding="async" />
              <figcaption><div><b>{photo.title}</b><span>{photo.note}</span></div><a href={photo.source} target="_blank" rel="noreferrer">Photo Source ↗</a></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="principles section">
        <div className="section-heading light"><div><p className="kicker">OUR FAMILY RULES</p><h2>No rushing—being together is the point</h2></div></div>
        <div className="principle-grid">
          <article><span>01</span><h3>Protect the Nap</h3><p>When the sun is strongest, the kids can swim while Grandma and Grandpa rest.</p></article>
          <article><span>02</span><h3>Pack Light for the Island</h3><p>Store the big bags and carry only one little overnight bag to Gulangyu.</p></article>
          <article><span>03</span><h3>Follow the Weather</h3><p>If rain or heat arrives, tea and a nap are better than rushing.</p></article>
        </div>
      </section>

      <section className="section dining" id="dining">
        <div className="section-heading"><div><p className="kicker">THREE MEALS · ONE BIRTHDAY TABLE</p><h2>The best flavor is everyone together</h2></div><p>Check the dishes we like and watch the family total update.</p></div>
        <div className="menu-tabs" role="tablist" aria-label="Choose a meal">
          {menus.map((menu) => <button key={menu.id} className={activeMenu.id === menu.id ? "active" : ""} onClick={() => setActiveMenuId(menu.id)} role="tab" aria-selected={activeMenu.id === menu.id}>{menu.name}</button>)}
        </div>
        <article className="menu-calculator">
          <div className="menu-calculator-head"><div><span>CURRENT MENU</span><h3>{activeMenu.name}</h3></div><b>{activeMenuSelected.length} / {activeMenu.dishes.length} selected</b></div>
          <div className="menu-actions" aria-label="Menu shortcuts">
            <button onClick={() => setDishes(activeMenu.id, activeMenu.dishes.map((_, index) => index))}>Select All</button>
            <button onClick={() => setDishes(activeMenu.id, [])}>Clear All</button>
            <button className="recommended" onClick={() => setDishes(activeMenu.id, initialMenuSelections[activeMenu.id])}>Restore Our Picks</button>
          </div>
          <div className="dish-grid">
            {activeMenu.dishes.map((dish, index) => {
              const selected = activeMenuSelected.includes(index);
              return <label className={selected ? "selected" : ""} key={dish.name}>
                <input type="checkbox" checked={selected} onChange={() => toggleDish(activeMenu.id, index)} />
                <span className="dish-check">{selected ? "✓" : ""}</span>
                <span className="dish-name"><b>{dish.name}</b>{dish.note && <small>{dish.note}</small>}{dish.tags && <span className="dish-tags">{dish.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>}</span>
                <strong>{money(dish.price)}</strong>
              </label>;
            })}
          </div>
          <div className="menu-totals" aria-live="polite">
            <div><span>Food Subtotal</span><b>{money(menuSubtotal)}</b></div>
            <div className={activeMenu.serviceRate ? "" : "muted-total"}><span>Service {activeMenu.serviceRate ? "(15%)" : "(none)"}</span><b>{money(menuService)}</b></div>
            <div className="grand-total"><span>Estimated Total</span><b>{money(menuTotal)}</b></div>
            <div className="per-person"><span>Per Person (6)</span><b>{money(menuPerPerson)}</b></div>
          </div>
          <p className="menu-save-note">Your dish choices stay saved on this device.</p>
        </article>
        <section className="full-menu-catalog" aria-label="Complete original restaurant menus">
          <div className="catalog-intro">
            <div><span>3 RESTAURANTS · 219 ORIGINAL DISHES</span><h3>The Chinese menus for ordering</h3><p>Dish names stay in Chinese so the adults can match the restaurant menus exactly.</p></div>
            <button onClick={() => setCatalogOpen((current) => !current)} aria-expanded={catalogOpen}>{catalogOpen ? "Hide Full Menus ↑" : "Open Full Menus ↓"}</button>
          </div>
          {catalogOpen && <div className="catalog-body">
            <div className="catalog-restaurant-tabs" role="tablist" aria-label="Choose a restaurant menu">
              {restaurantMeta.map((restaurant) => {
                const count = restaurantMenus.filter((dish) => dish.restaurant === restaurant.id).length;
                return <button key={restaurant.id} role="tab" aria-selected={catalogRestaurant === restaurant.id} className={catalogRestaurant === restaurant.id ? "active" : ""} onClick={() => { setCatalogRestaurant(restaurant.id); setCatalogSection("All sections"); }}><b>{restaurant.label}</b><span>{count} dishes</span></button>;
              })}
            </div>
            <div className="catalog-tools">
              <label><span>Search Chinese Dish Names</span><input type="search" value={catalogQuery} onChange={(event) => setCatalogQuery(event.target.value)} placeholder="Try: 黄鱼、花生汤、少辣" /></label>
              <label><span>Menu Section</span><select value={catalogSection} onChange={(event) => setCatalogSection(event.target.value)}>{catalogSections.map((section) => <option value={section} key={section}>{section}</option>)}</select></label>
            </div>
            <div className="catalog-result-head"><span><b>{filteredCatalog.length}</b> dishes found</span><small>Tap a dish to try it in the budget</small></div>
            <div className="catalog-dish-grid">
              {filteredCatalog.map((dish) => {
                const selected = catalogSelections.includes(dish.id);
                return <label key={dish.id} className={selected ? "selected" : ""}>
                  <input type="checkbox" checked={selected} onChange={() => toggleCatalogDish(dish.id)} />
                  <span className="catalog-check">{selected ? "✓" : "+"}</span>
                  <span className="catalog-dish-copy"><small>{dish.section}</small><b>{dish.name}</b>{dish.notes && <em>{dish.notes}</em>}<span>{dish.spicy && <i>🌶️ Spicy</i>}{dish.preorder && <i>Preorder</i>}</span></span>
                  <strong>{money(dish.price)}<small>/{dish.unit}</small></strong>
                </label>;
              })}
            </div>
            <div className="catalog-selection-summary" aria-live="polite">
              <div><span>{activeRestaurant.label}</span><b>{activeCatalogSelections.length} dishes selected</b></div>
              <div><small>Food</small><b>{money(catalogSubtotal)}</b></div>
              <div><small>Service {activeRestaurant.serviceRate ? "15%" : "None"}</small><b>{money(catalogService)}</b></div>
              <div className="catalog-grand"><small>Estimated Total</small><b>{money(catalogTotal)}</b></div>
              <button onClick={() => setCatalogSelections((current) => { const currentRestaurantIds = new Set(restaurantMenus.filter((dish) => dish.restaurant === catalogRestaurant).map((dish) => dish.id)); const next = current.filter((id) => !currentRestaurantIds.has(id)); window.localStorage.setItem("xiamen-trip-full-menu-selections", JSON.stringify(next)); return next; })}>Clear This Restaurant</button>
            </div>
            <p className="catalog-footnote">Live seafood may be priced by weight. Final weight, market price, service charge, and availability come from the restaurant.</p>
          </div>}
        </section>
        <div className="birthday-callout"><div><span>AUG 1 · 19:00</span><h3>Grandma's 70th Birthday Dinner</h3><p>Photos by 18:50. Longevity noodles, cake, and our family picture around 20:30.</p></div><strong>GOOD<br />THINGS</strong></div>
      </section>

      <section className="section contact-helper" id="contact">
        <div className="section-heading"><div><p className="kicker">NOTES FOR THE HOTELS</p><h2>Three Chinese messages, ready to send</h2></div><p>These keep Grandma comfortable, the kids nearby, and the birthday details clear.</p></div>
        <div className="message-grid">
          {hotelMessages.map((message) => (
            <article key={message.id}>
              <div className="message-head"><span>{message.icon}</span><h3>{message.title}</h3></div>
              <p>{message.text}</p>
              <button onClick={() => copyMessage(message.id, message.text)} className={copied === message.id ? "copied" : ""}>
                {copied === message.id ? "✓ Copied" : "Copy Chinese Message"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section checklist" id="checklist">
        <div className="section-heading"><div><p className="kicker">READY TO GO</p><h2>Pack the little things, then enjoy the big adventure</h2><span className="check-count">{checked.length} / {checklist.length} ready</span></div><p>Every checkmark stays saved on this device.</p></div>
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
        <div className="tip-card"><span>👟</span><div><b>Gulangyu Means Walking</b><p>Expect stone paths and hills. Wear grippy shoes and skip the steep summit.</p></div></div>
        <div className="tip-card"><span>🌦️</span><div><b>Xiamen Is Hot and Humid</b><p>Go outside early or after 17:00. Bring sunscreen, rain gear, and electrolytes.</p></div></div>
        <div className="tip-card"><span>💊</span><div><b>Keep Medicine Close</b><p>Medicine, motion-sickness pills, passports, and kid gear stay in the small bag.</p></div></div>
      </section>

      <section className="birthday-wish" aria-label="A birthday wish for Grandma">
        <div><p>TEA MIST · ISLAND BREEZES · LAUGHTER TOGETHER</p><h2>Grandma, may every journey after 70<br />be filled with love.</h2><span>The most beautiful view on this trip is Grandma, safe and smiling in the middle of our family. After a whole year, Dudu and Chuchu can finally hold her hands again. May illness stay behind us, and may the years ahead bring tea, sea breezes, and the children's laughter close by.</span><a href="#top">Read Our Adventure Again ↑</a></div>
      </section>

      <footer><p>Grandma's 70th Birthday · Our Xiamen Adventure</p><span>Grandma & Grandpa · Mom & Dad · Dudu & Chuchu</span><a href="#top">Back to Top ↑</a></footer>
      <nav className="mobile-nav"><a href="#itinerary">Days</a><a href="#maps">Map</a><a href="#pictures">Photos</a><a href="#contact">Hotels</a><a href="#checklist">List</a></nav>
    </main>
  );
}
