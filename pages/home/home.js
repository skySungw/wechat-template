import list from './data/index';
import Toast from 'tdesign-miniprogram/toast/index';
Page({
    data: {
      key: 'TOyIdlQB4pkYiFwJFEx6X8hCSY',
      user: '',
      password: '',
      steps: '10000',
      list,
    },
    onLoad(options) {
        const { path, q } = options;
        console.log(path);
        if (q) {
            const str = this.getQueryByUrl(decodeURIComponent(q));
            console.log(str, str.page);
            wx.navigateTo({
                url: `/pages/${str.page}/${str.page}`,
            });
        }
    },
    onChangeUser(e) {
      const value = e.detail.value;
      console.log(value);
      this.setData({
        user: value
      });
    },
    onChangePassword(e) {
      const value = e.detail.value;
      console.log(value);
      this.setData({
        password: value
      });
    },
    onChangeSteps(e) {
      const value = e.detail.value;
      console.log(value);
      this.setData({
        steps: value
      });
    },
    onHandleSubmit() {
      const that = this;
      console.log('提交');
      console.log('this', this.data);
      wx.request({
        url: 'https://api.xwteam.cn/api/wechat/step',
        method: 'GET',
        data: {
          key: this.data.key,
          user: this.data.user,
          password: this.data.password,
          steps: this.data.steps
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data);
          // if (res.data.code == 200) {
          //   Toast({
          //     context: that,
          //     selector: '#t-toast',
          //     message: res.data.steps,
          //   });
          // }
          Toast({
            context: that,
            selector: '#t-toast',
            message: res.data.msg,
          });
        }
      })
    },
    clickHandle(e) {
        let { name, path = '' } = e.detail.item;
        if (!path) {
            name = name.replace(/^[A-Z]/, (match) => `${match}`.toLocaleLowerCase());
            name = name.replace(/[A-Z]/g, (match) => {
                return `-${match.toLowerCase()}`;
            });
            path = `/pages/${name}/${name}`;
        }
        wx.navigateTo({
            url: path,
            fail: () => {
                wx.navigateTo({
                    url: '/pages/home/navigateFail/navigateFail',
                });
            },
        });
    },
    onShareAppMessage() {
        return {
            title: 'TDesign UI',
            path: '/pages/home/home',
        };
    },
    getQueryByUrl(url) {
        const data = {};
        const queryArr = `${url}`.match(/([^=&#?]+)=[^&#]+/g) || [];
        if (queryArr.length) {
            queryArr.forEach((para) => {
                const d = para.split('=');
                const val = decodeURIComponent(d[1]);
                if (data[d[0]] !== undefined) {
                    data[d[0]] += `,${val}`;
                }
                else {
                    data[d[0]] = val;
                }
            });
        }
        return data;
    },
});
