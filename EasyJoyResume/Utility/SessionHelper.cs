using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EasyJoyResume.Models;

namespace EasyJoyResume.Utility
{
    public class SessionHelper
    {
        public const string memberEmail = "memberEmail";
        public const string memberHead = "memberHead";
        public const string memberId = "memberId";
        public const string memberIsBindWeixin = "memberIsBindWeixin";
        public const string memberIsVerifyEmail = "memberIsVerifyEmail";
        public const string memberIsVerifyMobile = "memberIsVerifyMobile";
        public const string memberMobile = "memberMobile";
        public const string memberName = "memberName";
        public const string memberSafeKey = "memberSafeKey";
        public const string memberVip = "memberVip";
        /// <summary>
        /// 获取Session值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="name"></param>
        /// <returns></returns>
        public static T Get<T>(string name)
        {
            var value = HttpContext.Current.Session[name];

            if (value == null)
            {
                return default(T);
            }
            else
            {
                return (T)value;
            }
        }

        /// <summary>
        /// 设置Session值
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        public static void Set(string name, object value)
        {
            var s = HttpContext.Current.Session[name];

            if (s != null)
            {
                HttpContext.Current.Session[name] = value;
            }
            else
            {
                HttpContext.Current.Session.Add(name, value);
            }
        }
        /// <summary>
        /// 删除Session值
        /// </summary>
        /// <param name="name"></param>
        public static void Delete(string name)
        {
            HttpContext.Current.Session.Remove(name);
        }
        /// <summary>
        /// 清空Session
        /// </summary>
        public static void Clear()
        {
            HttpContext.Current.Session.Clear();
        }
        /// <summary>
        /// 获取登陆信息
        /// </summary>
        /// <returns></returns>
        public static EJ_USER241856 GetLoginInfo()
        {
            if (HttpContext.Current.Session[memberId] != null)
            {
                EJ_USER241856 User = new EJ_USER241856()
                {
                    U_MAIL = HttpContext.Current.Session[memberEmail].ToString(),
                    U_IMG = HttpContext.Current.Session[memberHead].ToString(),
                    U_MEMBER_ID = (int)HttpContext.Current.Session[memberId] ,
                    U_EMAIL_CHECK = (bool)HttpContext.Current.Session[memberIsVerifyEmail],
                    U_MOBILE_CHECK = (bool)HttpContext.Current.Session[memberIsVerifyMobile],
                    U_MOBILE = HttpContext.Current.Session[memberMobile].ToString(),
                    U_NICK_NAME = HttpContext.Current.Session[memberName].ToString(),
                    U_SECRETKEY = HttpContext.Current.Session[memberSafeKey].ToString(),
                    U_TYPE = (int)HttpContext.Current.Session[memberVip] 
                };
                return User;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 设置的登陆信息
        /// </summary>
        /// <param name="value"></param>
        public static void SetLoginInfo(EJ_USER241856 User)
        {
            HttpContext.Current.Session.Add(memberEmail, User.U_MAIL);
            HttpContext.Current.Session.Add(memberHead, User.U_IMG);
            HttpContext.Current.Session.Add(memberId, User.U_MEMBER_ID);
            HttpContext.Current.Session.Add(memberIsBindWeixin, false);
            HttpContext.Current.Session.Add(memberIsVerifyEmail, User.U_EMAIL_CHECK);
            HttpContext.Current.Session.Add(memberIsVerifyMobile, User.U_MOBILE_CHECK);
            HttpContext.Current.Session.Add(memberMobile, User.U_MOBILE);
            HttpContext.Current.Session.Add(memberName, User.U_NICK_NAME);
            HttpContext.Current.Session.Add(memberSafeKey, User.U_SECRETKEY);
            HttpContext.Current.Session.Add(memberVip, User.U_TYPE);
        }
        /// <summary>
        /// 移除登陆信息
        /// </summary>
        public static void RemoveLoginInfo()
        {
            HttpContext.Current.Session.Remove(memberEmail);
            HttpContext.Current.Session.Remove(memberHead);
            HttpContext.Current.Session.Remove(memberId);
            HttpContext.Current.Session.Remove(memberIsBindWeixin);
            HttpContext.Current.Session.Remove(memberIsVerifyEmail);
            HttpContext.Current.Session.Remove(memberIsVerifyMobile);
            HttpContext.Current.Session.Remove(memberName);
            HttpContext.Current.Session.Remove(memberSafeKey);
            HttpContext.Current.Session.Remove(memberSafeKey);
        }
    }
}