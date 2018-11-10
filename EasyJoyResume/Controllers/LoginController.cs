using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasyJoyResume.Controllers
{
    public class LoginController : Controller
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}