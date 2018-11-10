using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasyJoyResume.Controllers
{
    /// <summary>
    /// 简历技巧
    /// </summary>
    public class ArticleController : Controller
    {
        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}