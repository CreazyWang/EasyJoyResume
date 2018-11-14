using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasyJoyResume.Controllers
{
    /// <summary>
    /// 个人中心
    /// </summary>
    public class MemberController : Controller
    {
        /// <summary>
        /// 我的简历
        /// </summary>
        /// <returns></returns>
        public ActionResult MyResume()
        {
            return View();
        }

        /// <summary>
        /// 投递简历
        /// </summary>
        /// <returns></returns>
        public ActionResult ResumeSendEdit() {
            return View();
        }
        /// <summary>
        /// 订单管理
        /// </summary>
        /// <returns></returns>
        public ActionResult Order()
        {
            return View();
        }
        /// <summary>
        /// 账号设置
        /// </summary>
        /// <returns></returns>
        public ActionResult Set()
        {
            return View();
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <returns></returns>
        public ActionResult Password() {
            return View();
        }
    }
}