using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EasyJoyResume.Models;

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

        /// <summary>
        /// 手机号、邮箱号登录
        /// </summary>
        /// <param name="username"></param>
        /// <param name="enPassword"></param>
        /// <param name="service"></param>
        /// <param name="remember"></param>
        /// <returns></returns>
        public JsonResult Submit(string username, string enPassword, string service, bool remember)
        { 
            //查询用户是否存在
            DAL.DalBase<EJ_USER241856> dalBase = new DAL.DalBase<EJ_USER241856>();
            EJ_USER241856 User = dalBase.LoadEntities(a=>a.U_MAIL==username||a.U_MOBILE==username).FirstOrDefault();
            if (User==null)
            {
                return Json(new { type = "error", content = "您输入的用户不存在，请重新输入！" }, JsonRequestBehavior.AllowGet);
            }
            else
            { 
                //判断用户是否被冻结（拉入黑名单，无法登录） 
                if (User.U_LOGIN_ERROR == 5) //判断是否达到最大登录错误次数
                {
                    //上次登录时间
                    DateTime lastLoginDate = Convert.ToDateTime(User.U_LOGIN_TIME);
                    DateTime nowTime = DateTime.Now;
                    TimeSpan time = nowTime - lastLoginDate;
                    if ((time.TotalMinutes) < 15)   //判断登录时间间隔是否大于15分钟 
                        return Json(new { type = "error", content = "您已连续登陆失败5次,请" + Convert.ToInt32(15 - time.TotalMinutes) + "分钟后再登录！" }, JsonRequestBehavior.AllowGet);
                    else   //大于时间间隔,登陆失败次数=0
                    { 
                        string[] Result = CheckPwd(User, username ,- 1, enPassword);  //判断用户密码是否正确 
                        return Json(new { type = Result[0], content = Result[1] }, JsonRequestBehavior.AllowGet);
                    }
                }
                else   //登陆没有达到最大次数
                {
                    string[] Result = CheckPwd(User, username, User.U_LOGIN_ERROR, enPassword);//验证密码 
                    return Json(new { type = Result[0], content = Result[1] }, JsonRequestBehavior.AllowGet);
                }  
            } 
        }
        /// <summary>
        /// 更新验证密码错误登录次数
        /// </summary>
        /// <param name="User"></param>
        /// <param name="logerError"></param>
        /// <returns></returns>
        public static bool MondifyTimeAndCount(EJ_USER241856 User, int logerError)
        {
            int Count = logerError + 1;
            User.U_LOGIN_ERROR = Count;
            User.U_LOGIN_TIME = DateTime.Now;
            User.U_LOGIN_IP = Utility.IPHelper.GetWebClientIp();
            User.U_SECRETKEY = Utility.Rand.Str(32);
            DAL.DalBase<EJ_USER241856> dalBase = new DAL.DalBase<EJ_USER241856>();
            return dalBase.UpdateEntity(User);
        }
        /// <summary>
        /// 登录绑定邮箱邮件发送
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public JsonResult login_bind_email_send(string email) {
            return Json(new {type="success",content="操作成功" },JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 验证密码是否正确
        /// </summary>
        /// <param name="User">用户对象</param>
        /// <param name="ErrorCount">登录错误次数</param>
        /// <param name="InputPasswd">用户输入的密码，已经解密（非对称RSA）</param>
        /// <returns></returns>
        public static string[] CheckPwd(EJ_USER241856 User,string username,int errorCount, string enPassword)
        {
            //解密用户密码
            enPassword = Utility.PwdRSAEncrypt.RSADecrypt(enPassword); 
            string[] result = new string[2];
            if (enPassword == Utility.PwdRSAEncrypt.RSADecrypt(User.U_PWD))//登录成功！
            {
                //更新错误次数，并绑定用户信息
                MondifyTimeAndCount(User,-1);
                //绑定cookie
                Utility.BaseCookies.SetCookieValue("memberEmail", User.U_MAIL);//用户邮箱
                Utility.BaseCookies.SetCookieValue("memberHead", User.U_IMG);//用户头像 
                Utility.BaseCookies.SetCookieValue("memberId", User.U_MEMBER_ID.ToString());//用户ID
                Utility.BaseCookies.SetCookieValue("memberIsBindWeixin", "false");//是否绑定微信
                Utility.BaseCookies.SetCookieValue("memberIsVerifyEmail", User.U_EMAIL_CHECK.ToString());//用户邮箱是否已验证
                Utility.BaseCookies.SetCookieValue("memberIsVerifyMobile",User.U_MOBILE_CHECK.ToString());//用户手机是否已验证
                Utility.BaseCookies.SetCookieValue("memberMobile", User.U_MOBILE);//用户手机
                Utility.BaseCookies.SetCookieValue("memberName", User.U_NICK_NAME);//用户名
                //Utility.BaseCookies.SetCookieValue("memberRegisterDate", User.USER_PHOTO);//用户注册时间
                Utility.BaseCookies.SetCookieValue("memberSafeKey", User.U_SECRETKEY);//用户安全密匙
                // Utility.BaseCookies.SetCookieValue("memberSign", User.USER_PHOTO);
                Utility.BaseCookies.SetCookieValue("memberVip", User.U_TYPE.ToString());//会员类型

                Utility.SessionHelper.SetLoginInfo(User); 
                result[0] = "success";
                result[1] = "/";
                if (Utility.PageValidate.IsEmail(username))//判断手机或邮箱 
                {
                    //邮箱
                    if (!User.U_EMAIL_CHECK)//判断邮箱是否验证
                    {
                        result[1] = "/Member/CheckEmail";
                    } 

                }
                else
                {
                    //手机
                    if (!User.U_MOBILE_CHECK)//判断手机是否验证
                    {
                        result[1] = "/Member/CheckMobile";
                    } 
                }
            }
            else//密码输入错误！
            {
                if ((5 - (errorCount + 1)) == 0)  //登陆失败最大次数
                {
                    MondifyTimeAndCount(User, 4);
                    DateTime lastLoginDate = Convert.ToDateTime(User.U_LOGIN_TIME);
                    DateTime nowTime = DateTime.Now;
                    TimeSpan Time = nowTime - lastLoginDate;
                    result[0] = "error";
                    result[1] = "您已连续登录失败5次,请" + Convert.ToInt32(15 - Time.TotalMinutes) + "分钟后重试！";
                }
                else
                {
                    MondifyTimeAndCount( User, errorCount);
                    result[0] = "error";
                    result[1] = "密码错误,登陆失败,您还有" + Convert.ToString(5 - (errorCount + 1)) + "次机会！";
                }
            }
            return result;
        } 
    }
}