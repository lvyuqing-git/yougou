module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1583154503216, function(require, module, exports) {
module.exports = {
  name: 'vant-icon',
  basic: [
    'success',
    'plus',
    'cross',
    'fail',
    'arrow',
    'arrow-left',
    'arrow-up',
    'arrow-down',
  ],
  outline: [
    // has corresponding filled icon
    'location-o',
    'like-o',
    'star-o',
    'phone-o',
    'setting-o',
    'fire-o',
    'coupon-o',
    'cart-o',
    'shopping-cart-o',
    'cart-circle-o',
    'friends-o',
    'comment-o',
    'gem-o',
    'gift-o',
    'point-gift-o',
    'send-gift-o',
    'service-o',
    'bag-o',
    'todo-list-o',
    'balance-list-o',
    'close',
    'clock-o',
    'question-o',
    'passed',
    'add-o',
    'gold-coin-o',
    'info-o',
    'play-circle-o',
    'pause-circle-o',
    'stop-circle-o',
    'warning-o',
    'phone-circle-o',
    'music-o',
    'smile-o',
    'thumb-circle-o',
    'comment-circle-o',
    'browsing-history-o',
    'underway-o',
    'more-o',
    'video-o',
    'shop-o',
    'shop-collect-o',
    'chat-o',
    'smile-comment-o',
    'vip-card-o',
    'award-o',
    'diamond-o',
    'volume-o',
    'cluster-o',
    'wap-home-o',
    'photo-o',
    'gift-card-o',
    'expand-o',
    'medal-o',
    'good-job-o',
    'manager-o',
    'label-o',
    'bookmark-o',
    'bill-o',
    'hot-o',
    'hot-sale-o',
    'new-o',
    'new-arrival-o',
    'goods-collect-o',
    'eye-o',
    // without corresponding filled icon
    'balance-o',
    'refund-o',
    'birthday-cake-o',
    'user-o',
    'orders-o',
    'tv-o',
    'envelop-o',
    'flag-o',
    'flower-o',
    'filter-o',
    'bar-chart-o',
    'chart-trending-o',
    'brush-o',
    'bullhorn-o',
    'hotel-o',
    'cashier-o',
    'newspaper-o',
    'warn-o',
    'notes-o',
    'calender-o',
    'bulb-o',
    'user-circle-o',
    'desktop-o',
    'apps-o',
    'home-o',
    'search',
    'points',
    'edit',
    'delete',
    'qr',
    'qr-invalid',
    'closed-eye',
    'down',
    'scan',
    'free-postage',
    'certificate',
    'logistics',
    'contact',
    'cash-back-record',
    'after-sale',
    'exchange',
    'upgrade',
    'ellipsis',
    'circle',
    'description',
    'records',
    'sign',
    'completed',
    'failure',
    'ecard-pay',
    'peer-pay',
    'balance-pay',
    'credit-pay',
    'debit-pay',
    'cash-on-deliver',
    'other-pay',
    'tosend',
    'pending-payment',
    'paid',
    'aim',
    'discount',
    'idcard',
    'replay',
    'shrink',
  ],
  filled: [
    // has corresponding outline icon
    'location',
    'like',
    'star',
    'phone',
    'setting',
    'fire',
    'coupon',
    'cart',
    'shopping-cart',
    'cart-circle',
    'friends',
    'comment',
    'gem',
    'gift',
    'point-gift',
    'send-gift',
    'service',
    'bag',
    'todo-list',
    'balance-list',
    'clear',
    'clock',
    'question',
    'checked',
    'add',
    'gold-coin',
    'info',
    'play-circle',
    'pause-circle',
    'stop-circle',
    'warning',
    'phone-circle',
    'music',
    'smile',
    'thumb-circle',
    'comment-circle',
    'browsing-history',
    'underway',
    'more',
    'video',
    'shop',
    'shop-collect',
    'chat',
    'smile-comment',
    'vip-card',
    'award',
    'diamond',
    'volume',
    'cluster',
    'wap-home',
    'photo',
    'gift-card',
    'expand',
    'medal',
    'good-job',
    'manager',
    'label',
    'bookmark',
    'bill',
    'hot',
    'hot-sale',
    'new',
    'new-arrival',
    'goods-collect',
    'eye',
    // without corresponding outline icon
    'share',
    'alipay',
    'wechat',
    'photograph',
    'youzan-shield',
    'umbrella-circle',
    'bell',
    'printer',
    'map-marked',
    'card',
    'add-square',
    'live',
    'lock',
    'audio',
    'graphic',
    'column',
    'invition',
    'play',
    'pause',
    'stop',
    'weapp-nav',
    'ascending',
    'descending',
    'bars',
    'wap-nav',
  ],
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1583154503216);
})()
//# sourceMappingURL=index.js.map