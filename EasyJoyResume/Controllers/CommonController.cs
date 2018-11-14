using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasyJoyResume.Controllers
{
    public class CommonController : Controller
    {
        //GetValidateCode/?captchaId=4416bd8d-558a-477a-8d6a-f6d916d51c63
        public ActionResult GetValidateCode(string captchaId)
        {
            return View();
        }
        public string getCaptchaId(string v_time) {
            return "4416bd8d-558a-477a-8d6a-f6d916d51c63";
        }
    }
}