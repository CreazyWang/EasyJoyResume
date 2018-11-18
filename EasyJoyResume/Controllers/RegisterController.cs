using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EasyJoyResume.Models;

namespace EasyJoyResume.Controllers
{
    public class RegisterController : Controller
    {
        // GET: Register
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 检测邮箱名，是否注册
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public string check_email(string email)
        {
            DAL.DalBase<EJ_USER241856> dalBase = new DAL.DalBase<EJ_USER241856>();
            EJ_USER241856 User = dalBase.LoadEntities(a => a.U_MAIL == email).FirstOrDefault();
            if (User == null)
            {
                return "true";
            }
            else
            {
                return "false";
            }
        }
        /// <summary>
        /// 邮箱注册用户
        /// </summary>
        /// <param name="captcha"></param>
        /// <param name="captchaId"></param>
        /// <param name="email"></param>
        /// <param name="enPassword"></param>
        /// <returns></returns>
        public JsonResult Submit(string captcha, string captchaId, string email, string enPassword)
        { 
            if (captcha.Trim() == System.Web.HttpContext.Current.Session["VerificationCode"].ToString())
            {
                System.Web.HttpContext.Current.Session["VerificationCode"] = "";
                DAL.DalBase<EJ_USER241856> dalBase = new DAL.DalBase<EJ_USER241856>();
                EJ_USER241856 User = dalBase.LoadEntities(a => a.U_MAIL == email).FirstOrDefault();
                if (User != null)//判断邮箱号是否存在
                {
                    return Json(new { type = "error", content = "您的邮箱已经被注册了~" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    enPassword = Utility.PwdRSAEncrypt.RSADecrypt(enPassword);//解密密码
                    Random r = new Random();
                    User = new EJ_USER241856()
                    {
                        U_CREAT_TIME = DateTime.Now,
                        U_DEL = false,
                        U_EMAIL_CHECK = false,
                        U_IMG = "https://www.baidu.com/img/bd_logo1.png",
                        U_LOGIN_ERROR = 0,
                        U_LOGIN_IP = Utility.IPHelper.GetWebClientIp(),
                        U_LOGIN_TIME = DateTime.Now,
                        U_MAIL = email,
                        U_MEMBER_ID =( 1 +  dalBase.LoadEntities(a => a.U_MEMBER_ID>0).OrderByDescending(a => a.U_MEMBER_ID).FirstOrDefault().U_MEMBER_ID) ,
                        U_MOBILE = "",
                        U_MOBILE_CHECK = false,
                        U_NICK_NAME = "",
                        U_PWD = Utility.PwdRSAEncrypt.RSAEncrypt(enPassword),
                        U_SECRETKEY = Utility.Rand.Str(32),
                        U_TYPE = 0
                    };
                    User = dalBase.AddEntity(User);
                    if (User.U_ID > 0)
                    {
                        return Json(new { type = "success", content = "注册成功,请用重新登录！" }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { type = "error", content = "注册失败,请刷新重新输入！" }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return Json(new { type = "error", content = "验证码错误，请重新输入！" }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 激活邮箱
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public ActionResult bindEmail(string code) {
            return View();
        }
    }
}