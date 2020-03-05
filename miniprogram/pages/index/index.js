//index.js
//获取应用实例
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    week: ["日", '一', '二', '三', '四', '五', '六'],
    //当前显示的年
    showYear: null,
    showMonth: null,
    showDay: null,
    nowYear: null,
    nowMonth: null,
    nowDay: null,
    //选中的日
    clickDay: null,
    //当前周数据
    nowWeekData: null,
    //日历是否折叠
    calendarfold: true
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      let that = this;
      //获取当前年份和月份
      let nowTime = new Date();
      let nowYear = nowTime.getFullYear();
      let nowMonth = nowTime.getMonth();
      let nowDay = nowTime.getDate();
      that.getMonthData(nowYear, nowMonth + 1);
      that.setData({
        showYear: nowYear,
        showMonth: nowMonth + 1,
        showDay: nowDay,
        nowYear,
        nowMonth: nowMonth + 1,
        nowDay,
        clickYear: nowYear,
        clickMonth: nowMonth + 1,
        clickDay: nowDay,
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取当前月数据
    getMonthData(year, month) {
      let that = this;
      let dayData = [];
      let weekData = [];
      let sundayDays = [];
      let dateObj = null;
      //拿到当月有多少天
      let lastDay = new Date(year, month, 0).getDate();
      console.log(year + '年' + month + '月有' + lastDay + '天');
      //找到每个月的星期天,切割数组
      for (let i = 1; i <= lastDay; i++) {
        dayData.push(i);
        dateObj = new Date(`${year}/${month}/${i}`);
        if (dateObj.getDay() == 0) {
          sundayDays.unshift(i);
        }
      }
      for (let i = 0; i < sundayDays.length; i++) {
        weekData.unshift(dayData.splice(sundayDays[i] - 1, 7))
      }
      if (dayData.length !== 0) {
        weekData.unshift(dayData);
      }

      //检查首周是否有七天
      if (weekData[0].length < 7) {
        let i = 0;
        let firstWeek = weekData[0].reverse();
        let item = null;
        let newWeekData = [];
        for (i = 0; i < 7; i++) {
          item = firstWeek[i] || -1;
          newWeekData.unshift(item)
        }
        weekData[0] = newWeekData;
      }
      //检查最后一周是否有七天
      if (weekData[weekData.length - 1].length < 7) {
        let i = 0;
        let lastWeek = weekData[weekData.length - 1]
        let item = null;
        let newWeekData = [];
        for (i = 0; i < 7; i++) {
          item = lastWeek[i] || -1;
          newWeekData.push(item)
        }
        weekData[weekData.length - 1] = newWeekData;
      }
      //拿到当前日期的本周数据
      let nowWeekData = weekData.filter((weekItem) => {
        if (weekItem.indexOf(new Date().getDate()) !== -1) {
          return weekItem
        }
      })
      that.setData({
        weekData,
        nowWeekData: nowWeekData[0]
      })
    },

    //点击某一天
    clickDay(e) {
      if (e.currentTarget.dataset.day === -1) return;
      this.setData({
        showDay: e.currentTarget.dataset.day,
        clickDay: e.currentTarget.dataset.day,
      })
    },
    //更改显示的日期
    bindDateChange(e) {
      let date = e.detail.value.split('-');
      console.log(date)
      this.setData({
        showYear: date[0],
        showMonth: date[1],
        showDay: date[2],
        clickYear: date[0],
        clickMonth: date[1],
        clickDay: date[2],
        calendarfold: false,
      })
      this.getMonthData(date[0], date[1])
    },
    //折叠日历
    foldAndUnfold() {
      let that = this;
      that.setData({
        calendarfold: !that.data.calendarfold
      })
    },

  }
})

