using System;  

namespace EasyJoyResume.Utility
{
    /// <summary>
    /// 时间日期处理类
    /// </summary>
    public class DateTimeHelper
    {
        public static string CalculateCreateTime(DateTime dateTime) {
            return dateTime.ToString();
        }

        #region 返回本年有多少天
        /// <summary>返回本年有多少天</summary>
        /// <param name="iYear">年份</param>
        /// <returns>本年的天数</returns>
        public static int GetDaysOfYear(int iYear)
        {
            int cnt = 0;
            if (IsRuYear(iYear))
            {
                //闰年多 1 天 即：2 月为 29 天
                cnt = 366;

            }
            else
            {
                //--非闰年少1天 即：2 月为 28 天
                cnt = 365;
            }
            return cnt;
        }
        #endregion

        #region 返回本年有多少天
        /// <summary>本年有多少天</summary>
        /// <param name="dt">日期</param>
        /// <returns>本天在当年的天数</returns>
        public static int GetDaysOfYear(DateTime idt)
        {
            int n;

            //取得传入参数的年份部分，用来判断是否是闰年

            n = idt.Year;
            if (IsRuYear(n))
            {
                //闰年多 1 天 即：2 月为 29 天
                return 366;
            }
            else
            {
                //--非闰年少1天 即：2 月为 28 天
                return 365;
            }

        }
        #endregion

        #region 返回本月有多少天
        /// <summary>本月有多少天</summary>
        /// <param name="iYear">年</param>
        /// <param name="Month">月</param>
        /// <returns>天数</returns>
        public static int GetDaysOfMonth(int iYear, int Month)
        {
            int days = 0;
            switch (Month)
            {
                case 1:
                    days = 31;
                    break;
                case 2:
                    if (IsRuYear(iYear))
                    {
                        //闰年多 1 天 即：2 月为 29 天
                        days = 29;
                    }
                    else
                    {
                        //--非闰年少1天 即：2 月为 28 天
                        days = 28;
                    }

                    break;
                case 3:
                    days = 31;
                    break;
                case 4:
                    days = 30;
                    break;
                case 5:
                    days = 31;
                    break;
                case 6:
                    days = 30;
                    break;
                case 7:
                    days = 31;
                    break;
                case 8:
                    days = 31;
                    break;
                case 9:
                    days = 30;
                    break;
                case 10:
                    days = 31;
                    break;
                case 11:
                    days = 30;
                    break;
                case 12:
                    days = 31;
                    break;
            }

            return days;
        }
        #endregion

        #region 返回本月有多少天
        /// <summary>本月有多少天</summary>
        /// <param name="dt">日期</param>
        /// <returns>天数</returns>
        public static int GetDaysOfMonth(DateTime dt)
        {
            //--------------------------------//
            //--从dt中取得当前的年，月信息  --//
            //--------------------------------//
            int year, month, days = 0;
            year = dt.Year;
            month = dt.Month;

            //--利用年月信息，得到当前月的天数信息。
            switch (month)
            {
                case 1:
                    days = 31;
                    break;
                case 2:
                    if (IsRuYear(year))
                    {
                        //闰年多 1 天 即：2 月为 29 天
                        days = 29;
                    }
                    else
                    {
                        //--非闰年少1天 即：2 月为 28 天
                        days = 28;
                    }

                    break;
                case 3:
                    days = 31;
                    break;
                case 4:
                    days = 30;
                    break;
                case 5:
                    days = 31;
                    break;
                case 6:
                    days = 30;
                    break;
                case 7:
                    days = 31;
                    break;
                case 8:
                    days = 31;
                    break;
                case 9:
                    days = 30;
                    break;
                case 10:
                    days = 31;
                    break;
                case 11:
                    days = 30;
                    break;
                case 12:
                    days = 31;
                    break;
            }

            return days;

        }
        #endregion

        #region 返回当前日期的星期名称
        /// <summary>返回当前日期的星期名称</summary>
        /// <param name="dt">日期</param>
        /// <returns>星期名称</returns>
        public static string GetWeekNameOfDay(DateTime idt)
        {
            string dt, week = "";

            dt = idt.DayOfWeek.ToString();
            switch (dt)
            {
                case "Mondy":
                    week = "星期一";
                    break;
                case "Tuesday":
                    week = "星期二";
                    break;
                case "Wednesday":
                    week = "星期三";
                    break;
                case "Thursday":
                    week = "星期四";
                    break;
                case "Friday":
                    week = "星期五";
                    break;
                case "Saturday":
                    week = "星期六";
                    break;
                case "Sunday":
                    week = "星期日";
                    break;

            }
            return week;
        }
        #endregion

        #region 返回当前日期的星期编号
        /// <summary>返回当前日期的星期编号</summary>
        /// <param name="dt">日期</param>
        /// <returns>星期数字编号</returns>
        public static string GetWeekNumberOfDay(DateTime idt)
        {
            string dt, week = "";

            dt = idt.DayOfWeek.ToString();
            switch (dt)
            {
                case "Mondy":
                    week = "1";
                    break;
                case "Tuesday":
                    week = "2";
                    break;
                case "Wednesday":
                    week = "3";
                    break;
                case "Thursday":
                    week = "4";
                    break;
                case "Friday":
                    week = "5";
                    break;
                case "Saturday":
                    week = "6";
                    break;
                case "Sunday":
                    week = "7";
                    break;

            }

            return week;


        }
        #endregion

        #region 判断当前日期所属的年份是否是闰年，私有函数
        /// <summary>判断当前日期所属的年份是否是闰年，私有函数</summary>
        /// <param name="dt">日期</param>
        /// <returns>是闰年：True ，不是闰年：False</returns>
        private static bool IsRuYear(DateTime idt)
        {
            //形式参数为日期类型 
            //例如：2003-12-12
            int n;
            n = idt.Year;

            if ((n % 400 == 0) || (n % 4 == 0 && n % 100 != 0))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

        #region 判断当前年份是否是闰年，私有函数
        /// <summary>判断当前年份是否是闰年，私有函数</summary>
        /// <param name="dt">年份</param>
        /// <returns>是闰年：True ，不是闰年：False</returns>
        private static bool IsRuYear(int iYear)
        {
            //形式参数为年份
            //例如：2003
            int n;
            n = iYear;

            if ((n % 400 == 0) || (n % 4 == 0 && n % 100 != 0))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

        #region 将输入的字符串转化为日期。如果字符串的格式非法，则返回当前日期
        /// <summary>
        /// 将输入的字符串转化为日期。如果字符串的格式非法，则返回当前日期。
        /// </summary>
        /// <param name="strInput">输入字符串</param>
        /// <returns>日期对象</returns>
        public static DateTime ConvertStringToDate(string strInput)
        {
            DateTime oDateTime;

            try
            {
                oDateTime = DateTime.Parse(strInput);
            }
            catch (Exception)
            {
                oDateTime = DateTime.Today;
            }

            return oDateTime;
        }
        #endregion

        #region 将日期对象转化为格式字符串
        /// <summary>
        /// 将日期对象转化为格式字符串
        /// </summary>
        /// <param name="oDateTime">日期对象</param>
        /// <param name="strFormat">
        /// 格式：
        ///        "SHORTDATE"===短日期
        ///        "LONGDATE"==长日期
        ///        其它====自定义格式
        /// </param>
        /// <returns>日期字符串</returns>
        public static string ConvertDateToString(DateTime oDateTime, string strFormat)
        {
            string strDate = "";

            try
            {
                switch (strFormat.ToUpper())
                {
                    case "SHORTDATE":
                        strDate = oDateTime.ToShortDateString();
                        break;
                    case "LONGDATE":
                        strDate = oDateTime.ToLongDateString();
                        break;
                    default:
                        strDate = oDateTime.ToString(strFormat);
                        break;
                }
            }
            catch (Exception)
            {
                strDate = oDateTime.ToShortDateString();
            }

            return strDate;
        }
        #endregion

        #region 判断是否为合法日期，必须大于1800年1月1日
        /// <summary>
        /// 判断是否为合法日期，必须大于1800年1月1日
        /// </summary>
        /// <param name="strDate">输入日期字符串</param>
        /// <returns>True/False</returns>
        public static bool IsDateTime(string strDate)
        {
            try
            {
                DateTime oDate = DateTime.Parse(strDate);
                if (oDate.CompareTo(DateTime.Parse("1800-1-1")) > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        #endregion

        #region 获取两个日期之间的差值 可返回年 月 日 小时 分钟 秒
        /// <summary>
        /// 获取两个日期之间的差值
        /// </summary>
        /// <param name="howtocompare">比较的方式可为：year month day hour minute second</param>
        /// <param name="startDate">开始日期</param>
        /// <param name="endDate">结束日期</param>
        /// <returns>时间差</returns>
        public static double DateDiff(string howtocompare, DateTime startDate, DateTime endDate)
        {
            double diff = 0;
            try
            {
                TimeSpan TS = new TimeSpan(endDate.Ticks - startDate.Ticks);

                switch (howtocompare.ToLower())
                {
                    case "year":
                        diff = Convert.ToDouble(TS.TotalDays / 365);
                        break;
                    case "month":
                        diff = Convert.ToDouble((TS.TotalDays / 365) * 12);
                        break;
                    case "day":
                        diff = Convert.ToDouble(TS.TotalDays);
                        break;
                    case "hour":
                        diff = Convert.ToDouble(TS.TotalHours);
                        break;
                    case "minute":
                        diff = Convert.ToDouble(TS.TotalMinutes);
                        break;
                    case "second":
                        diff = Convert.ToDouble(TS.TotalSeconds);
                        break;
                }
            }
            catch (Exception)
            {
                diff = 0;
            }
            return diff;
        }
        #endregion

        #region 计算两个日期之间相差的工作日天数
        ///  <summary>
        ///  计算两个日期之间相差的工作日天数
        ///  </summary>
        ///  <param  name="dtStart">开始日期</param>
        ///  <param  name="dtEnd">结束日期</param>
        ///  <param  name="Flag">是否除去周六，周日</param>
        ///  <returns>Int</returns>
        public static int CalculateWorkingDays(DateTime dtStart, DateTime dtEnd, bool Flag)
        {
            int count = 0;
            for (DateTime dtTemp = dtStart; dtTemp < dtEnd; dtTemp = dtTemp.AddDays(1))
            {
                if (Flag)
                {
                    if (dtTemp.DayOfWeek != DayOfWeek.Saturday && dtTemp.DayOfWeek != DayOfWeek.Sunday)
                    {
                        count++;
                    }
                }
                else
                {
                    count++;
                }
            }
            return count;
        }
        #endregion
    }
}