using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasyJoyResume.Controllers
{
    public class PasswordController : Controller
    {
        ///password/findbyemail/?email=1160651865@qq.com&_=1542363369563
        public JsonResult findbyemail(string email)
        {
            return Json(new { type = "success", content = "邮件发送成功" }, JsonRequestBehavior.AllowGet);

        } 
    }
}