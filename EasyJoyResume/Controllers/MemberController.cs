using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EasyJoyResume.Models;
using EasyJoyResume.Models.ViewModel;

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
            List<MyResumeItem> myResumes = new List<MyResumeItem>();
            EJ_USER241856 User = Utility.SessionHelper.GetLoginInfo();
            if (User.U_MEMBER_ID>0)
            {
                DAL.DalBase<EJ_MY_RESUME652145> dalBase = new DAL.DalBase<EJ_MY_RESUME652145>();
                var data = dalBase.LoadEntities(a => a.MR_MEMBER_ID == User.U_MEMBER_ID && a.MR_DEL==false).OrderByDescending(a => a.MR_CREAT_TIME);
                
                MyResumeItem myResume;
                foreach (var item in data)
                {
                    myResume = new MyResumeItem() {
                        create_time = Utility.DateTimeHelper.CalculateCreateTime(item.MR_CREAT_TIME),
                        data_visitpwd ="",
                        data_visitype="",
                        data_visi_id="",
                        date_time= item.MR_CREAT_TIME.ToString(),
                        download_href="",
                        itemid=item.MR_ITEMID.ToString(),
                        resumeId = item.MR_RESUMEID.ToString(),
                        resume_title=item.MR_TITLE
                    };
                    myResumes.Add(myResume);
                }
            }
            else
            {
                return RedirectToAction("Index","Home",new { });
            }
         
            return View(myResumes);
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
        /// <summary>
        /// 验证邮箱
        /// </summary>
        /// <returns></returns>
        public ActionResult CheckEmail()
        {

            return View();
        }
        /// <summary>
        /// 验证手机
        /// </summary>
        /// <returns></returns>
        public ActionResult CheckMobile()
        {

            return View();
        }
    }
}