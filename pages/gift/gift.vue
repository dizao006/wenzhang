<template>
  <view class="container">
    <view class="banner">
      <img
        src="https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/img/banner.d73d31c.png"
        alt=""
        class="banner-image"
      />
    </view>
    <view class="announcement">
      <uni-icons
        class="icons"
        type="notification"
        size="26"
        color="#666"
      ></uni-icons>
      <text class="announcement-title">公告栏</text>
      <view class="announcement-content">
        <ol class="announcement-list">
          <li
            v-for="(item, index) in announcements"
            :key="index"
            class="announcement-item"
          >
            {{ item }}
          </li>
        </ol>
      </view>
    </view>
    <view class="gift-list">
      <text class="gift-title">惊喜好物</text>
      <view class="gift-row">
        <view class="gift-item" v-for="(gift, index) in gifts" :key="index">
          <image :src="gift.image" class="gift-image" />
          <text class="gift-name">{{ gift.name }}</text>
          <div style="display: flex; justify-content: space-evenly">
            <text class="gift-points">积分:{{ gift.price }}</text>
            <text class="gift-exchanged">已兑换：{{ gift.exchanged }}人</text>
          </div>
          <button class="exchange-button">暂未开放兑换</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
export default {
  components: {
    uniIcons,
  },
  data() {
    return {
      announcements: [
        "小铺专属问题反馈和建议，请拍「小铺反馈通道」商品。",
        "所有中奖/兑换商品30个自然日内未提交收件信息视为自动放弃，适期不补。",
        "抽奖/兑换商品将于15个工作日内发货，商品物流信息查询：小程序。",
        "矿石回收请使用提回收，备注意回收统计不到数据，无法进行回收操作。",
        "收件地址请填写详细，地址不详导致无法发货后果自负。",
        "多次发货、拒收的用户，我们将建立黑名单单子，后续任何物品不再发货。",
        "本次公益协议审批的流程较长，目前刚刚走完双方协议签署流程。后续财务会进行捐赠打款动作，壹基金收到款项后会进行捐赠。捐赠的凭证和反馈都会在站内文章发布，流程较长，但不会缺席，敬请谅解，",
      ],
      gifts: [
        {
          name: "礼品杯",
          image:
            "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d44a9bd12cd4aea899cc4559854e7d4~tplv-k3u1fbpfcp-jj:188:188:188:188:q75.avis#?w=608&h=601&s=616438&e=png&b=3e3e40",
          price: 100,
          exchanged: 10,
        },
        {
          name: "煮蛋器",
          image:
            "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec7f5a91eddb4202a4780b595ca390cb~tplv-k3u1fbpfcp-jj:188:188:188:188:q75.avis#?w=692&h=694&s=185108&e=jpg&b=cec0b1",
          price: 150,
          exchanged: 5,
        },
        {
          name: "大水壶",
          image:
            "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/754a81a917ee42e884a45b1ebca684d7~tplv-k3u1fbpfcp-jj:188:188:188:188:q75.avis#?w=1000&h=1072&s=905834&e=png&b=b8b9c8",
          price: 200,
          exchanged: 8,
        },
        {
          name: "电煮锅",
          image:
            "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a95689c173f9470d8151563e11b3bbbd~tplv-k3u1fbpfcp-jj:188:188:188:188:q75.avis#?w=1112&h=1118&s=1148532&e=png&b=c5c0ad",
          price: 250,
          exchanged: 3,
        },
        {
          name: "筋膜枪",
          image:
            "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94a9a73f0eca427391d2efb5c8eb5bff~tplv-k3u1fbpfcp-jj:188:188:188:188:q75.avis#?w=800&h=800&s=95940&e=jpg&b=343437",
          price: 300,
          exchanged: 12,
        },
        {
          name: "空调毯",
          image:
            "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfa057afd70b495199fc8a6c3ab1de37~tplv-k3u1fbpfcp-jj:188:188:188:188:q75.avis",
          price: 180,
          exchanged: 7,
        },
        {
          name: "早餐机",
          image:
            "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a31c534f11d24435815be8438a240ca8~tplv-k3u1fbpfcp-jj:188:188:188:188:q75.avis#?w=698&h=608&s=90244&e=jpg&b=f9f6f6",
          price: 220,
          exchanged: 4,
        },
        {
          name: "电动牙刷",
          image:
            "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6edae804377644209cdadadaf1b5c7ee~tplv-k3u1fbpfcp-jj:188:188:188:188:q75.avis#?w=928&h=970&s=86746&e=jpg&b=dcdcdc",
          price: 160,
          exchanged: 6,
        },
        {
          name: "果冻封皮笔",
          image:
            "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a250fca2067b46389f343dc59f7fd6d4~tplv-k3u1fbpfcp-jj:188:188:188:188:q75.avis#?w=838&h=846&s=239208&e=jpg&b=303030",
          price: 50,
          exchanged: 20,
        },
        {
          name: "T恤",
          image:
            "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ede5e9e5547c4befa447a7dcb22156dc~tplv-k3u1fbpfcp-jj:188:188:188:188:q75.avis#?w=520&h=520&s=11093&e=jpg&b=ffffff",
          price: 80,
          exchanged: 15,
        },
        // 更多礼品
      ],
    };
  },
};
</script>

<style scoped>
.container {
  padding: 16px;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.banner {
  background-color: #f0f8ff;
  text-align: center;
}

.banner-image {
  width: 100%;
  max-width: 600px;
  height: 200rpx;
}

.announcement {
  margin-top: 20px;
}

.announcement-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  margin-left: 20rpx;
}

.announcement-content {
  margin-top: 10px;
}

.announcement-list {
  list-style-type: decimal;
  padding-left: 20px;
}

.announcement-item {
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
}

.gift-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.gift-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.gift-item {
  flex: 0 0 49%;
  /* 调整为占据49%的宽度 */
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
}

.gift-image {
  width: 100%;
  height: 150rpx;
  border-radius: 4px;
}

.gift-name {
  display: flex;
  justify-content: center;
  letter-spacing: 2.5px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
  color: #333;
}

.gift-points {
  font-size: 14px;
  color: #ff4500;
  margin-top: 4px;
  /* margin-right: 35rpx; */
}

.gift-exchanged {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  margin-left: 5px;
}

.exchange-button {
  font-size: 14px;
  width: 80%;
  height: 40px;
  background-color: #007bff;
  color: #d3dad9;
  border: none;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  margin-top: 20rpx;
}

.gift-separator {
  width: 100%;
  height: 20px;
}

.gift-title {
  padding: 5px;
  font-size: 20px;
}
</style>
