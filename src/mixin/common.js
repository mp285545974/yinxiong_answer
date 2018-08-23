import XHR from '../api'
var wx = require('weixin-js-sdk');
export default {
    computed: {},
    methods: {
        jump(to) {
            if (this.$router) {
                this.$router.push(to)
            }
        },
        back() {
            if (this.$router) {
                this.$router.back()
            }
        },
        setCookie(name, value) {
            var curDate = new Date();
            //当前时间戳  
            var curTamp = curDate.getTime();
            //当前日期
            var curDay = curDate.toLocaleDateString();
            var curWeeHours = 0;
            curWeeHours = new Date(curDay).getTime() - 1;
            //当日已经过去的时间（毫秒）  
            var passedTamp = curTamp - curWeeHours;
            //当日剩余时间  
            var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
            var leftTime = new Date();
            leftTime.setTime(leftTamp + curTamp);
            //创建cookie  
            document.cookie = name + "=" + value + ";expires=" + leftTime.toGMTString() + ";path=/";
        },
        getCookie(name) {
            //name 为想要取到的键值的键名
            var reg = /\s/g;
            var result = document.cookie.replace(reg, "");
            var resultArr = result.split(";");
            for (var i = 0; i < resultArr.length; i++) {
                var nameArr = resultArr[i].split("=");
                if (nameArr[0] == name) {
                    return nameArr[1];
                }
            }
        },
        getQueryString(name) {
            /* eslint-disable */
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
                /* eslint-enable */
        },
        getWxconfig() {
            XHR.getWechat({
                url: `${window.location.href.split('#')[0]}`
            }).then((res) => {
                let { data, status } = res.data
                try {
                    wx.config({
                        debug: false,
                        appId: data.appId,
                        //appId:'wxef8c21497600d338',
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'menuItem:favorite', 'showAllNonBaseMenuItem', 'hideMenuItems']
                    })
                } catch (e) {}
            })
        },
        // 添加积分
        addIntegral(uid, integral) {
            let json = {
                batch: window.batch,
                uid,
                project: 'king_of_answer',
                integral
            }
            XHR.addIntegral(json).then((res) => {
                console.log(res.data)
            })
        },
        hideshare() {
            wx.ready(function() {
                wx.hideAllNonBaseMenuItem();
                wx.hideMenuItems({
                    menuList: ["menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:QZone", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:weiboApp"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                })
            })
        },
        share() {
            let user = localStorage.getItem('userInfo')
            user = JSON.parse(user)
            let time = new Date().toLocaleDateString()
            wx.ready(() => {
                wx.showAllNonBaseMenuItem();
                wx.hideMenuItems({
                        menuList: ["menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:share:qq", "menuItem:share:QZone", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:weiboApp"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                    })
                    // 分享到朋友圈
                wx.onMenuShareTimeline({
                        title: '呼朋唤友来答题，潍柴王者就是你…',
                        //link: `http://www.vr0101.com/qa/index.html?shareUid=${user.uid}&time=${time}`,
                        link: `http://www.vr0101.com/qa/index.html?shareUid=wxef8c21497600d338&time=${time}`,
                        imgUrl: 'http://www.vr0101.com/qa/static/img/share.jpg',
                        success: (res) => {
                            // let todydat = new Date().getDay()
                            // if (todydat != 0 && todydat != 6) {
                            //     let qaShare = this.getCookie('qaShare')
                            //     if (!qaShare) {
                            //         this.addIntegral(user.uid, 1)
                            //         this.setCookie('qaShare', 'isok')
                            //     }
                            // }
                        },
                        cancel: (res) => {
                            // 用户取消分享后执行的回调函数
                        }
                    })
                    //分享给朋友
                wx.onMenuShareAppMessage({
                    title: '呼朋唤友来答题，潍柴王者就是你…',
                    desc: '呼朋唤友来答题，潍柴王者就是你…',
                    //link: `http://www.vr0101.com/qa/index.html?shareUid=${user.uid}&time=${time}`,
                    link: `http://www.vr0101.com/qa/index.html?shareUid=wxef8c21497600d338&time=${time}`,
                    imgUrl: 'http://www.vr0101.com/qa/static/img/share.jpg',
                    success: (res) => {
                        // let todydat = new Date().getDay()
                        // if (todydat != 0 && todydat != 6) {
                        //     let qaShare = this.getCookie('qaShare')
                        //     if (!qaShare) {
                        //         this.addIntegral(user.uid, 1)
                        //         this.setCookie('qaShare', 'isok')
                        //     }
                        // }
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                })
            })
        }
    }
}
