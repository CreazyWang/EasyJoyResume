using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasyJoyResume.Controllers
{
    public class CommonController : Controller
    {  /// <summary>
       /// 生成验证码（计算+ - X 的100以内验证码）
       /// </summary>
       /// <returns></returns>
        public FileResult Captcha()
        {
            string[] validateNum = Utility.ValidateCode.CreateRandomNum();
            byte[] data = Utility.ValidateCode.CreateImage(validateNum[0]);
            System.Web.HttpContext.Current.Session["VerificationCode"] = validateNum[1];
            return File(data, "image/jpeg");
        } 
        public string getCaptchaId(string v_time) {
            return "4416bd8d-558a-477a-8d6a-f6d916d51c63";
        } 
        /// <summary>
        /// 获取RSA公共加密密匙
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult PublicKey()
        {
            string[] PublicKey =Utility.PwdRSAEncrypt.GetPulicKey();
            return Json(new { modulus = PublicKey[0], exponent = PublicKey[1] }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 退出登录
        /// </summary>
        /// <returns></returns>
        public JsonResult LogOut()
        {
            System.Web.HttpContext.Current.Session.RemoveAll();
            System.Web.HttpContext.Current.Session.Clear();
            Utility.BaseCookies.DelCookeis();
            return Json(new { type = "success", content = "" }, JsonRequestBehavior.AllowGet);
        }
    }
}