using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using EasyJoyResume.Models.Resume;
using EasyJoyResume.Models.ViewModel;

namespace EasyJoyResume.Controllers
{
    public class CvResumeController : Controller
    {
        /// <summary>
        /// 选择模板
        /// </summary>
        /// <returns></returns>
        public ActionResult CvTemplate()
        {
            return View();
        }
        /// <summary>
        /// 简历在线编辑
        /// </summary>
        /// <returns></returns>
        public ActionResult Edit(int itemid = 206, int resumeId = -1)
        {
            ViewBag.ItemId = itemid;
            ResumeEdit resumeEdit = new ResumeEdit();
            resume_base resume_Base = new resume_base();
            if (itemid == 206)
            {
                ViewBag.TemplateSet = "{\"left\":[{\"key\":\"resume_head\",\"isShow\":true},{\"key\":\"base_info\",\"isShow\":true},{\"key\":\"base_home\",\"isShow\":true},{\"key\":\"base_social\",\"isShow\":true},{\"key\":\"resume_skill\",\"isShow\":true},{\"key\":\"resume_hobby\",\"isShow\":true}],\"top\":[],\"right\":[{\"key\":\"resume_name\",\"isShow\":true},{\"key\":\"resume_job_preference\",\"isShow\":true},{\"key\":\"resume_edu\",\"isShow\":true},{\"key\":\"resume_work\",\"isShow\":true},{\"key\":\"resume_internship\",\"isShow\":false},{\"key\":\"resume_volunteer\",\"isShow\":false},{\"key\":\"resume_project\",\"isShow\":false},{\"key\":\"resume_honor\",\"isShow\":false},{\"key\":\"resume_summary\",\"isShow\":true},{\"key\":\"resume_portfolio\",\"isShow\":false},{\"key\":\"resume_recoment\",\"isShow\":false},{\"key\":\"resume_qrcode\",\"isShow\":false}],\"bottom\":[]}";
                ViewBag.ResumeCss = "jm0203.css";
                resume_Base = new resume_base
                {
                    resume_scale = "0",
                    resume_language = "zh",
                    resume_set = new resume_set("j2", "yahei", "14", "1.5", "1", "0"),
                    modul_show = new modul_show(false, false, true, false,
                    new modul_item_show() { isShow = true, isTitleShow = true, isContentShow = true, title = "头像", key = "resume_head" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isContentShow = true, title = "基本信息", key = "base_info" },
                    new modul_item_show() { isShow = false, isTitleShow = true, isContentShow = true, title = "个人主页", key = "base_home" },
                    new modul_item_show() { isShow = false, isTitleShow = true, isContentShow = true, title = "社交账号", key = "base_social" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isContentShow = true, title = "技能特长", key = "resume_skill" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isContentShow = true, title = "个人标签", key = "resume_hobby" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isContentShow = true, title = "姓名", key = "resume_name" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isContentShow = true, title = "求职意向", key = "resume_job_preference" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isContentShow = true, title = "教育背景", key = "resume_edu" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isContentShow = true, title = "工作经验", key = "resume_work" },
                    new modul_item_show() { isShow = false, isTitleShow = true, isContentShow = true, title = "实习经验", key = "resume_internship" },
                    new modul_item_show() { isShow = false, isTitleShow = true, isContentShow = true, title = "志愿者经历", key = "resume_volunteer" },
                    new modul_item_show() { isShow = false, isTitleShow = true, isContentShow = true, title = "项目经验", key = "resume_project" },
                    new modul_item_show() { isShow = false, isTitleShow = true, isContentShow = true, title = "荣誉奖项", key = "resume_honor" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isContentShow = true, title = "自我评价", key = "resume_summary" },
                    new modul_item_show() { isShow = false, isTitleShow = true, isContentShow = true, title = "作品展示", key = "resume_portfolio" },
                    new modul_item_show() { isShow = false, isTitleShow = true, isContentShow = true, title = "二维码", key = "resume_qrcode" }
                    ),
                    iconFontMap = new iconFontMap("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""),
                    resume_cover = new List<resume_cover_item>(),
                    resume_letter = "",
                    resume_head = "http://static.500d.me/resources/500d/cvresume/images/1.jpg",
                    resume_headType = "rectangle",
                    resume_base_info = new resume_base_info("", "", "", "", "", "", "", "", "", "", "", "", "", new List<CustomMsg>(), new List<string>()),
                    resume_job_preference = new resume_job_preference(),
                    resume_skills = new List<resume_skill>(),
                    resume_hobby = new List<resume_hobby>(),
                    resume_edu = new List<resume_experience>(),
                    resume_work = new List<resume_experience>(),
                    resume_internship = new List<resume_experience>(),
                    resume_volunteer = new List<resume_experience>(),
                    resume_project = new List<resume_experience>(),
                    resume_portfolio = new resume_portfolio(),
                    custom = new List<custom>(),
                    sort = new sort(new List<string>() { "resume_head", "base_info", "base_home", "base_social", "resume_skill", "resume_hobby" }, new List<string>() { }, new List<string>() { "resume_name", "resume_job_preference", "resume_edu", "resume_work", "resume_internship", "resume_volunteer", "resume_project", "resume_honor", "resume_summary", "resume_portfolio", "resume_qrcode" }, new List<string>() { }),
                    resume_contact = new resume_contact("", "在这里留言，我将尽快联系你。", "", "留言内容。"),
                    resume_qrcode = new resume_qrcode("感谢您的阅读，扫一扫查看手机简历")
                };
                resumeEdit = new ResumeEdit()
                {//"j2", "yahei", "14", "1.5", "1", "0"
                    resume_language = "zh",
                    data_color = "j2",
                    data_font_name = "yahei",
                    data_font_size = "14",
                    data_line_height = "1.5",
                    data_font_type = "0",
                    resume_sort = "",
                    wap_resume_sort = "",
                    template_set = "",
                    data_itemid = itemid.ToString(),
                    data_modal_margin = "1",
                    sort = resume_Base.sort,
                    coverModel = new CoverModel() {
                        CoverShow = "hidden",
                        ResumeCover = resume_Base.resume_cover
                    },
                    letterModel = new LetterModel() {
                        LetterShow = "hidden",
                        LetterContent = resume_Base.resume_letter
                    },
                    resumeHeadModel = new ResumeHeadModel() {
                        Font = resume_Base.iconFontMap.resume_head,
                        HeadLink = resume_Base.resume_head,
                        key = resume_Base.modul_show.resume_head.key,
                        title = resume_Base.modul_show.resume_head.title
                    },
                    baseInfoModel = new BaseInfoModel() {
                        Font = resume_Base.iconFontMap.base_info,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        Item = new Dictionary<string, InfoItem>(),
                        key = resume_Base.modul_show.base_info.key,
                        title = resume_Base.modul_show.base_info.title
                    },
                    resumeExperience = new Dictionary<string, ResumeExperience>(),
                    ResumeHonor = new ResumeHonor() {
                        Font = resume_Base.iconFontMap.resume_honor,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        Content = resume_Base.resume_honor,
                        key = resume_Base.modul_show.resume_honor.key,
                        title = resume_Base.modul_show.resume_honor.title
                    },
                    ResumeName = new ResumeName()
                    {
                        Font = resume_Base.iconFontMap.resume_name,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        name = "",
                        word = "",
                        key = resume_Base.modul_show.resume_name.key,
                        title = resume_Base.modul_show.resume_name.title
                    },
                    ResumeJobPreference = new ResumeJobPreference() {
                        Font = resume_Base.iconFontMap.resume_job_preference,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        Item = new Dictionary<string, InfoItem>(),
                        key = resume_Base.modul_show.resume_job_preference.key,
                        title = resume_Base.modul_show.resume_job_preference.title
                    },
                    ResumeSummary = new ResumeSummary()
                    {
                        Font = resume_Base.iconFontMap.resume_summary,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        Content = "",
                        key = resume_Base.modul_show.resume_summary.key,
                        title = resume_Base.modul_show.resume_summary.title
                    },
                    ResumePortfolio = new ResumePortfolio() {
                        Font = resume_Base.iconFontMap.resume_portfolio,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        Imgs = new List<Img>(),
                        Links=new List<Link>(),
                        key = resume_Base.modul_show.resume_portfolio.key,
                        title = resume_Base.modul_show.resume_portfolio.title
                    },
                    ResumeQrcode = new ResumeQrcode()
                    {
                        Font = resume_Base.iconFontMap.resume_qrcode,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        Content =resume_Base.resume_qrcode.qrcodeTips,
                        QrcodeLink = "http://static.500d.me/resources/500d/cvresume/images/1.jpg",
                        key = resume_Base.modul_show.resume_qrcode.key,
                        title = resume_Base.modul_show.resume_qrcode.title
                    }
                }; 
            }
            else if (itemid == 664)
            {
                ViewBag.TemplateSet = "{\"left\":[{\"key\":\"resume_head\",\"isShow\":true},{\"key\":\"resume_name\",\"isShow\":true},{\"key\":\"base_info\",\"isShow\":true},{\"key\":\"base_home\",\"isShow\":true},{\"key\":\"base_social\",\"isShow\":true}],\"top\":[],\"right\":[{\"key\":\"resume_job_preference\",\"isShow\":true},{\"key\":\"resume_edu\",\"isShow\":true},{\"key\":\"resume_work\",\"isShow\":true},{\"key\":\"resume_internship\",\"isShow\":false},{\"key\":\"resume_volunteer\",\"isShow\":false},{\"key\":\"resume_skill\",\"isShow\":true},{\"key\":\"resume_project\",\"isShow\":false},{\"key\":\"resume_honor\",\"isShow\":false},{\"key\":\"resume_summary\",\"isShow\":true},{\"key\":\"resume_portfolio\",\"isShow\":true},{\"key\":\"resume_hobby\",\"isShow\":true},{\"key\":\"resume_recoment\",\"isShow\":false},{\"key\":\"resume_qrcode\",\"isShow\":false}],\"bottom\":[]}";
                ViewBag.ResumeCss = "jm0369.css";
            }
            else if (itemid == 653)
            {
                ViewBag.ResumeCss = "jl0003.css";
            }
            ViewBag.ResumeEdit = resumeEdit;
            return View();
        }
        /// <summary>
        /// 简历模块渲染
        /// </summary>
        /// <param name="item">模块名称</param>
        /// <param name="resume_Base">简历基本类</param>
        /// <returns></returns>
        public PartialViewResult ResumeModule(string item, resume_base Resume)
        {
            ViewBag.item = item;
            ViewBag.ResumeBase = Resume;
            var propertyInfo = Resume.modul_show.GetType().GetProperty(item);
            modul_item_show modul_show = (modul_item_show)propertyInfo.GetValue(Resume.modul_show, null);
            //模块显示设置
            ViewBag.isShow = "hidden";
            ViewBag.isTitleShow = "hidden";
            ViewBag.isTimeShow = "hidden";
            ViewBag.isContentShow = "hidden";
            if (modul_show.isShow)
                ViewBag.isShow = "";
            if (modul_show.isTitleShow)
                ViewBag.isTitleShow = "";
            if (modul_show.isTimeShow)
                ViewBag.isTimeShow = "";
            if (modul_show.isContentShow)
                ViewBag.isContentShow = "";
            //基本信息显示隐藏
            if (item== "base_info")
            {
                ViewBag.sexShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.sex))
                {
                    ViewBag.sexShow = "";
                }
                ViewBag.birthShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.birth))
                {
                    ViewBag.birthShow = "";
                }
                ViewBag.nationShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.nation))
                {
                    ViewBag.nationShow = "";
                }
                ViewBag.educationShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.education))
                {
                    ViewBag.educationShow = "";
                }
                ViewBag.marriageStatusShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.marriageStatus))
                {
                    ViewBag.marriageStatusShow = "";
                }
                ViewBag.heightShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.height))
                {
                    ViewBag.heightShow = "";
                }
                ViewBag.politicalStatusShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.politicalStatus))
                {
                    ViewBag.politicalStatusShow = "";
                }
                ViewBag.cityShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_job_preference.jobCity))
                {
                    ViewBag.cityShow = "";
                }
                ViewBag.jobYearShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.jobYear))
                {
                    ViewBag.jobYearShow = "";
                }
                ViewBag.mobileShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.mobile))
                {
                    ViewBag.mobileShow = "";
                } 
                ViewBag.emailShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.email))
                {
                    ViewBag.emailShow = "";
                }
                ViewBag.weightShow = "hidden";
                if (!String.IsNullOrEmpty(Resume.resume_base_info.weight))
                {
                    ViewBag.weightShow = "";
                }
            }
         
            return PartialView();
        }
        /// <summary>
        /// 会员权限锁
        /// </summary>
        /// <returns></returns>
        public JsonResult GetMemberAuthoritys()
        {
            string[] content = new string[] { "word_download", "ppt_download", "change", "letter", "cover", "import_resume", "icon", "set_domain", "download", "create_resume", "resume_send" };
            return Json(new { type = "success", content }, JsonRequestBehavior.AllowGet);
        }
    }
}