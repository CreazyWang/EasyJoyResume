using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyJoyResume.Utility
{
    public class BaseCookies
    {
        #region Cookies
        /// <summary>
        /// /设置Cookie
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public static void SetCookieValue(string key, string value)
        {
            HttpCookie cookie = new HttpCookie(key, value);
            cookie.Expires = DateTime.Now.AddDays(30);
            //cookie.HttpOnly = true;
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
        /// <summary>
        /// 获取Cookie值
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string GetCookieValue(string key)
        {
            if (HttpContext.Current.Request.Cookies[key] == null)
            {
                return string.Empty;
            }
            else
            {
                return HttpContext.Current.Request.Cookies[key].Value;
            }
        }
        ///<summary>
        /// 删除cookies
        ///</summary>
        public static void DelCookeis()
        {
            HttpCookie aCookie;
            string cookieName;
            int limit = HttpContext.Current.Request.Cookies.Count;
            for (int i = 0; i < limit; i++)
            {
                cookieName = HttpContext.Current.Request.Cookies[i].Name;
                aCookie = new HttpCookie(cookieName);
                aCookie.Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Response.Cookies.Add(aCookie);
            }

        }
        #endregion
    }
}