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
        /// 简历预览页面 
        /// </summary>
        /// <param name="id">简历id</param>
        /// <returns></returns>
        public ActionResult Index(int id) {
            //id最大值 2147483647
            ViewBag.id = id;
            ViewBag.ResumeCss = "jm0203.css";
            ViewBag.Title = "预览";
            return View();
        }
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
            ViewBag.Type = true;
            //resumeId = 0;
            ViewBag.EditType = true;//默认为加载模板 true ：加载模板； false : 加载用户编辑大的简历
            if (resumeId == -1)//加载模板
            {
                
                //判断加载的简历模板CSS
                ViewBag.ResumeCss = "jm0203.css";
                Utility.TxtHelper txtHelper = new Utility.TxtHelper();

                ViewBag.Html = txtHelper.ReadTxtContent(Server.MapPath("~/Html/jm0203.html"));
                ViewBag.resume_language = "zh";
                ViewBag.TemplateSet = "";
                //查询加载的模板 
                return View();
            }
            else//加载用户简历
            {
                ViewBag.Type = false;
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
                        modul_show = new modul_show(true, true, true, true,
                        new modul_item_show() { isShow = true, isTitleShow = true,isTimeShow=true, isContentShow = true, title = "头像", key = "resume_head" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "基本信息", key = "base_info" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "个人主页", key = "base_home" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "社交账号", key = "base_social" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "技能特长", key = "resume_skill" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "个人标签", key = "resume_hobby" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "姓名", key = "resume_name" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "求职意向", key = "resume_job_preference" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "教育背景", key = "resume_edu" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "工作经验", key = "resume_work" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "实习经验", key = "resume_internship" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "志愿者经历", key = "resume_volunteer" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "项目经验", key = "resume_project" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "荣誉奖项", key = "resume_honor" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "自我评价", key = "resume_summary" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "作品展示", key = "resume_portfolio" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "二维码", key = "resume_qrcode" }
                        ),
                        iconFontMap = new iconFontMap("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""),
                        resume_cover = new List<resume_cover_item>() { },
                        resume_letter = "这是自荐信",
                        resume_head = "http://static.500d.me/resources/500d/cvresume/images/1.jpg",
                        resume_headType = "rectangle",
                        resume_base_info = new resume_base_info("王朝阳", "路漫漫其修远兮", "25", "", "1770545529", "1160651865@qq.com", "男", "", "", "", "", "", "", new List<CustomMsg>(), new List<string>()),
                        resume_job_preference = new resume_job_preference(),
                        resume_skills = new List<resume_skill>(),
                        resume_hobby = new List<resume_hobby>(),
                        resume_edu = new List<resume_experience>(),
                        resume_work = new List<resume_experience>(),
                        resume_internship = new List<resume_experience>(),
                        resume_volunteer = new List<resume_experience>(),
                        resume_project = new List<resume_experience>(),
                        resume_portfolio = new resume_portfolio(new List<Img>(), new List<Link>()),
                        custom = new List<custom>(),
                        sort = new sort(new List<string>() { "resume_head", "base_info", "base_home", "base_social", "resume_skill", "resume_hobby" }, new List<string>() { }, new List<string>() { "resume_name", "resume_job_preference", "resume_edu", "resume_work", "resume_internship", "resume_volunteer", "resume_project", "resume_honor", "resume_summary", "resume_portfolio", "resume_qrcode" }, new List<string>() { }),
                        resume_contact = new resume_contact("", "在这里留言，我将尽快联系你。", "", "留言内容。"),
                        resume_qrcode = new resume_qrcode("感谢您的阅读，扫一扫查看手机简历")
                    };
                    ViewBag.letterShow = "hidden";
                    if (resume_Base.modul_show.letterShow)
                    {
                        ViewBag.letterShow = "";
                    }
                    ViewBag.coverShow = "hidden";
                    if (resume_Base.modul_show.coverShow)
                    {
                        ViewBag.coverShow = "";
                    }
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
                        coverModel = new CoverModel()
                        {
                            CoverShow = "hidden",
                            ResumeCover = resume_Base.resume_cover
                        },
                        letterModel = new LetterModel()
                        {
                            LetterShow = "hidden",
                            LetterContent = resume_Base.resume_letter
                        },
                        resumeHeadModel = new ResumeHeadModel()
                        {
                            Font = resume_Base.iconFontMap.resume_head,
                            HeadLink = resume_Base.resume_head,
                            key = resume_Base.modul_show.resume_head.key,
                            title = resume_Base.modul_show.resume_head.title
                        },
                        baseInfoModel = new BaseInfoModel()
                        {
                            Font = resume_Base.iconFontMap.base_info,
                            isContentShow = "hidden",
                            isShow = "hidden",
                            isTimeShow = "hidden",
                            isTitleShow = "hidden",
                            Item = new List<InfoItem>(),
                            key = resume_Base.modul_show.base_info.key,
                            title = resume_Base.modul_show.base_info.title
                        },
                        resumeExperience = new Dictionary<string, ResumeExperience>(),
                        ResumeHonor = new ResumeHonor()
                        {
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
                        ResumeJobPreference = new ResumeJobPreference()
                        {
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
                        ResumePortfolio = new ResumePortfolio()
                        {
                            Font = resume_Base.iconFontMap.resume_portfolio,
                            isContentShow = "hidden",
                            isShow = "hidden",
                            isTimeShow = "hidden",
                            isTitleShow = "hidden",
                            Imgs = new List<Img>(),
                            Links = new List<Link>(),
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
                            Content = resume_Base.resume_qrcode.qrcodeTips,
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
                else

                {
                    ViewBag.TemplateSet = "{\"left\":[{\"key\":\"resume_head\",\"isShow\":true},{\"key\":\"base_info\",\"isShow\":true},{\"key\":\"base_home\",\"isShow\":true},{\"key\":\"base_social\",\"isShow\":true},{\"key\":\"resume_skill\",\"isShow\":true},{\"key\":\"resume_hobby\",\"isShow\":true}],\"top\":[],\"right\":[{\"key\":\"resume_name\",\"isShow\":true},{\"key\":\"resume_job_preference\",\"isShow\":true},{\"key\":\"resume_edu\",\"isShow\":true},{\"key\":\"resume_work\",\"isShow\":true},{\"key\":\"resume_internship\",\"isShow\":false},{\"key\":\"resume_volunteer\",\"isShow\":false},{\"key\":\"resume_project\",\"isShow\":false},{\"key\":\"resume_honor\",\"isShow\":false},{\"key\":\"resume_summary\",\"isShow\":true},{\"key\":\"resume_portfolio\",\"isShow\":false},{\"key\":\"resume_recoment\",\"isShow\":false},{\"key\":\"resume_qrcode\",\"isShow\":false}],\"bottom\":[]}";
                    ViewBag.ResumeCss = "jm0203.css";
                    resume_Base = new resume_base
                    {
                        resume_scale = "0",
                        resume_language = "zh",
                        resume_set = new resume_set("j2", "yahei", "14", "1.5", "1", "0"),
                        modul_show = new modul_show(true, true, true, true,
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "头像", key = "resume_head" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "基本信息", key = "base_info" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "个人主页", key = "base_home" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "社交账号", key = "base_social" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "技能特长", key = "resume_skill" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "个人标签", key = "resume_hobby" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "姓名", key = "resume_name" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "求职意向", key = "resume_job_preference" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "教育背景", key = "resume_edu" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "工作经验", key = "resume_work" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "实习经验", key = "resume_internship" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "志愿者经历", key = "resume_volunteer" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "项目经验", key = "resume_project" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "荣誉奖项", key = "resume_honor" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "自我评价", key = "resume_summary" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "作品展示", key = "resume_portfolio" },
                        new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "二维码", key = "resume_qrcode" }
                        ),
                        iconFontMap = new iconFontMap("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""),
                        resume_cover = new List<resume_cover_item>() { },
                        resume_letter = "这是自荐信",
                        resume_head = "http://static.500d.me/resources/500d/cvresume/images/1.jpg",
                        resume_headType = "rectangle",
                        resume_base_info = new resume_base_info("王朝阳", "路漫漫其修远兮", "25", "", "1770545529", "1160651865@qq.com", "男", "", "", "", "", "", "", new List<CustomMsg>(), new List<string>()),
                        resume_job_preference = new resume_job_preference(),
                        resume_skills = new List<resume_skill>(),
                        resume_hobby = new List<resume_hobby>(),
                        resume_edu = new List<resume_experience>(),
                        resume_work = new List<resume_experience>(),
                        resume_internship = new List<resume_experience>(),
                        resume_volunteer = new List<resume_experience>(),
                        resume_project = new List<resume_experience>(),
                        resume_portfolio = new resume_portfolio(new List<Img>(), new List<Link>()),
                        custom = new List<custom>(),
                        sort = new sort(new List<string>() { "resume_head", "base_info", "base_home", "base_social", "resume_skill", "resume_hobby" }, new List<string>() { }, new List<string>() { "resume_name", "resume_job_preference", "resume_edu", "resume_work", "resume_internship", "resume_volunteer", "resume_project", "resume_honor", "resume_summary", "resume_portfolio", "resume_qrcode" }, new List<string>() { }),
                        resume_contact = new resume_contact("", "在这里留言，我将尽快联系你。", "", "留言内容。"),
                        resume_qrcode = new resume_qrcode("感谢您的阅读，扫一扫查看手机简历")
                    };
                    ViewBag.letterShow = "hidden";
                    if (resume_Base.modul_show.letterShow)
                    {
                        ViewBag.letterShow = "";
                    }
                    ViewBag.coverShow = "hidden";
                    if (resume_Base.modul_show.coverShow)
                    {
                        ViewBag.coverShow = "";
                    }
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
                        coverModel = new CoverModel()
                        {
                            CoverShow = "hidden",
                            ResumeCover = resume_Base.resume_cover
                        },
                        letterModel = new LetterModel()
                        {
                            LetterShow = "hidden",
                            LetterContent = resume_Base.resume_letter
                        },
                        resumeHeadModel = new ResumeHeadModel()
                        {
                            Font = resume_Base.iconFontMap.resume_head,
                            HeadLink = resume_Base.resume_head,
                            key = resume_Base.modul_show.resume_head.key,
                            title = resume_Base.modul_show.resume_head.title
                        },
                        baseInfoModel = new BaseInfoModel()
                        {
                            Font = resume_Base.iconFontMap.base_info,
                            isContentShow = "hidden",
                            isShow = "hidden",
                            isTimeShow = "hidden",
                            isTitleShow = "hidden",
                            Item = new List<InfoItem>(),
                            key = resume_Base.modul_show.base_info.key,
                            title = resume_Base.modul_show.base_info.title
                        },
                        resumeExperience = new Dictionary<string, ResumeExperience>(),
                        ResumeHonor = new ResumeHonor()
                        {
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
                        ResumeJobPreference = new ResumeJobPreference()
                        {
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
                        ResumePortfolio = new ResumePortfolio()
                        {
                            Font = resume_Base.iconFontMap.resume_portfolio,
                            isContentShow = "hidden",
                            isShow = "hidden",
                            isTimeShow = "hidden",
                            isTitleShow = "hidden",
                            Imgs = new List<Img>(),
                            Links = new List<Link>(),
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
                            Content = resume_Base.resume_qrcode.qrcodeTips,
                            QrcodeLink = "http://static.500d.me/resources/500d/cvresume/images/1.jpg",
                            key = resume_Base.modul_show.resume_qrcode.key,
                            title = resume_Base.modul_show.resume_qrcode.title
                        }
                    };
                }
                ViewBag.ResumeBase = resume_Base;
            }
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
            if (item == "base_info")
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

        public PartialViewResult ResumePreView(int resumeId = -1) {
            int itemid = 206;
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
                    modul_show = new modul_show(true, true, true, true,
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "头像", key = "resume_head" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "基本信息", key = "base_info" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "个人主页", key = "base_home" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "社交账号", key = "base_social" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "技能特长", key = "resume_skill" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "个人标签", key = "resume_hobby" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "姓名", key = "resume_name" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "求职意向", key = "resume_job_preference" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "教育背景", key = "resume_edu" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "工作经验", key = "resume_work" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "实习经验", key = "resume_internship" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "志愿者经历", key = "resume_volunteer" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "项目经验", key = "resume_project" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "荣誉奖项", key = "resume_honor" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "自我评价", key = "resume_summary" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "作品展示", key = "resume_portfolio" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "二维码", key = "resume_qrcode" }
                    ),
                    iconFontMap = new iconFontMap("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""),
                    resume_cover = new List<resume_cover_item>() { },
                    resume_letter = "这是自荐信",
                    resume_head = "http://static.500d.me/resources/500d/cvresume/images/1.jpg",
                    resume_headType = "rectangle",
                    resume_base_info = new resume_base_info("王朝阳", "路漫漫其修远兮", "25", "", "1770545529", "1160651865@qq.com", "男", "", "", "", "", "", "", new List<CustomMsg>(), new List<string>()),
                    resume_job_preference = new resume_job_preference(),
                    resume_skills = new List<resume_skill>(),
                    resume_hobby = new List<resume_hobby>(),
                    resume_edu = new List<resume_experience>(),
                    resume_work = new List<resume_experience>(),
                    resume_internship = new List<resume_experience>(),
                    resume_volunteer = new List<resume_experience>(),
                    resume_project = new List<resume_experience>(),
                    resume_portfolio = new resume_portfolio(new List<Img>(), new List<Link>()),
                    custom = new List<custom>(),
                    sort = new sort(new List<string>() { "resume_head", "base_info", "base_home", "base_social", "resume_skill", "resume_hobby" }, new List<string>() { }, new List<string>() { "resume_name", "resume_job_preference", "resume_edu", "resume_work", "resume_internship", "resume_volunteer", "resume_project", "resume_honor", "resume_summary", "resume_portfolio", "resume_qrcode" }, new List<string>() { }),
                    resume_contact = new resume_contact("", "在这里留言，我将尽快联系你。", "", "留言内容。"),
                    resume_qrcode = new resume_qrcode("感谢您的阅读，扫一扫查看手机简历")
                };
                ViewBag.letterShow = "hidden";
                if (resume_Base.modul_show.letterShow)
                {
                    ViewBag.letterShow = "";
                }
                ViewBag.coverShow = "hidden";
                if (resume_Base.modul_show.coverShow)
                {
                    ViewBag.coverShow = "";
                }
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
                    coverModel = new CoverModel()
                    {
                        CoverShow = "hidden",
                        ResumeCover = resume_Base.resume_cover
                    },
                    letterModel = new LetterModel()
                    {
                        LetterShow = "hidden",
                        LetterContent = resume_Base.resume_letter
                    },
                    resumeHeadModel = new ResumeHeadModel()
                    {
                        Font = resume_Base.iconFontMap.resume_head,
                        HeadLink = resume_Base.resume_head,
                        key = resume_Base.modul_show.resume_head.key,
                        title = resume_Base.modul_show.resume_head.title
                    },
                    baseInfoModel = new BaseInfoModel()
                    {
                        Font = resume_Base.iconFontMap.base_info,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        Item = new List<InfoItem>(),
                        key = resume_Base.modul_show.base_info.key,
                        title = resume_Base.modul_show.base_info.title
                    },
                    resumeExperience = new Dictionary<string, ResumeExperience>(),
                    ResumeHonor = new ResumeHonor()
                    {
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
                    ResumeJobPreference = new ResumeJobPreference()
                    {
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
                    ResumePortfolio = new ResumePortfolio()
                    {
                        Font = resume_Base.iconFontMap.resume_portfolio,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        Imgs = new List<Img>(),
                        Links = new List<Link>(),
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
                        Content = resume_Base.resume_qrcode.qrcodeTips,
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
            else

            {
                ViewBag.TemplateSet = "{\"left\":[{\"key\":\"resume_head\",\"isShow\":true},{\"key\":\"base_info\",\"isShow\":true},{\"key\":\"base_home\",\"isShow\":true},{\"key\":\"base_social\",\"isShow\":true},{\"key\":\"resume_skill\",\"isShow\":true},{\"key\":\"resume_hobby\",\"isShow\":true}],\"top\":[],\"right\":[{\"key\":\"resume_name\",\"isShow\":true},{\"key\":\"resume_job_preference\",\"isShow\":true},{\"key\":\"resume_edu\",\"isShow\":true},{\"key\":\"resume_work\",\"isShow\":true},{\"key\":\"resume_internship\",\"isShow\":false},{\"key\":\"resume_volunteer\",\"isShow\":false},{\"key\":\"resume_project\",\"isShow\":false},{\"key\":\"resume_honor\",\"isShow\":false},{\"key\":\"resume_summary\",\"isShow\":true},{\"key\":\"resume_portfolio\",\"isShow\":false},{\"key\":\"resume_recoment\",\"isShow\":false},{\"key\":\"resume_qrcode\",\"isShow\":false}],\"bottom\":[]}";
                ViewBag.ResumeCss = "jm0203.css";
                resume_Base = new resume_base
                {
                    resume_scale = "0",
                    resume_language = "zh",
                    resume_set = new resume_set("j2", "yahei", "14", "1.5", "1", "0"),
                    modul_show = new modul_show(true, true, true, true,
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "头像", key = "resume_head" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "基本信息", key = "base_info" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "个人主页", key = "base_home" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "社交账号", key = "base_social" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "技能特长", key = "resume_skill" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "个人标签", key = "resume_hobby" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "姓名", key = "resume_name" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "求职意向", key = "resume_job_preference" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "教育背景", key = "resume_edu" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "工作经验", key = "resume_work" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "实习经验", key = "resume_internship" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "志愿者经历", key = "resume_volunteer" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "项目经验", key = "resume_project" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "荣誉奖项", key = "resume_honor" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "自我评价", key = "resume_summary" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "作品展示", key = "resume_portfolio" },
                    new modul_item_show() { isShow = true, isTitleShow = true, isTimeShow = true, isContentShow = true, title = "二维码", key = "resume_qrcode" }
                    ),
                    iconFontMap = new iconFontMap("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""),
                    resume_cover = new List<resume_cover_item>() { },
                    resume_letter = "这是自荐信",
                    resume_head = "http://static.500d.me/resources/500d/cvresume/images/1.jpg",
                    resume_headType = "rectangle",
                    resume_base_info = new resume_base_info("王朝阳", "路漫漫其修远兮", "25", "", "1770545529", "1160651865@qq.com", "男", "", "", "", "", "", "", new List<CustomMsg>(), new List<string>()),
                    resume_job_preference = new resume_job_preference(),
                    resume_skills = new List<resume_skill>(),
                    resume_hobby = new List<resume_hobby>(),
                    resume_edu = new List<resume_experience>(),
                    resume_work = new List<resume_experience>(),
                    resume_internship = new List<resume_experience>(),
                    resume_volunteer = new List<resume_experience>(),
                    resume_project = new List<resume_experience>(),
                    resume_portfolio = new resume_portfolio(new List<Img>(), new List<Link>()),
                    custom = new List<custom>(),
                    sort = new sort(new List<string>() { "resume_head", "base_info", "base_home", "base_social", "resume_skill", "resume_hobby" }, new List<string>() { }, new List<string>() { "resume_name", "resume_job_preference", "resume_edu", "resume_work", "resume_internship", "resume_volunteer", "resume_project", "resume_honor", "resume_summary", "resume_portfolio", "resume_qrcode" }, new List<string>() { }),
                    resume_contact = new resume_contact("", "在这里留言，我将尽快联系你。", "", "留言内容。"),
                    resume_qrcode = new resume_qrcode("感谢您的阅读，扫一扫查看手机简历")
                };
                ViewBag.letterShow = "hidden";
                if (resume_Base.modul_show.letterShow)
                {
                    ViewBag.letterShow = "";
                }
                ViewBag.coverShow = "hidden";
                if (resume_Base.modul_show.coverShow)
                {
                    ViewBag.coverShow = "";
                }
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
                    coverModel = new CoverModel()
                    {
                        CoverShow = "hidden",
                        ResumeCover = resume_Base.resume_cover
                    },
                    letterModel = new LetterModel()
                    {
                        LetterShow = "hidden",
                        LetterContent = resume_Base.resume_letter
                    },
                    resumeHeadModel = new ResumeHeadModel()
                    {
                        Font = resume_Base.iconFontMap.resume_head,
                        HeadLink = resume_Base.resume_head,
                        key = resume_Base.modul_show.resume_head.key,
                        title = resume_Base.modul_show.resume_head.title
                    },
                    baseInfoModel = new BaseInfoModel()
                    {
                        Font = resume_Base.iconFontMap.base_info,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        Item = new List<InfoItem>(),
                        key = resume_Base.modul_show.base_info.key,
                        title = resume_Base.modul_show.base_info.title
                    },
                    resumeExperience = new Dictionary<string, ResumeExperience>(),
                    ResumeHonor = new ResumeHonor()
                    {
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
                    ResumeJobPreference = new ResumeJobPreference()
                    {
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
                    ResumePortfolio = new ResumePortfolio()
                    {
                        Font = resume_Base.iconFontMap.resume_portfolio,
                        isContentShow = "hidden",
                        isShow = "hidden",
                        isTimeShow = "hidden",
                        isTitleShow = "hidden",
                        Imgs = new List<Img>(),
                        Links = new List<Link>(),
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
                        Content = resume_Base.resume_qrcode.qrcodeTips,
                        QrcodeLink = "http://static.500d.me/resources/500d/cvresume/images/1.jpg",
                        key = resume_Base.modul_show.resume_qrcode.key,
                        title = resume_Base.modul_show.resume_qrcode.title
                    }
                };
            }
            ViewBag.ResumeBase = resume_Base;
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
        /// <summary>
        /// 简历实时保存
        /// </summary>
        /// <param name="itemid">模板ID</param>
        /// <param name="json">简历数据</param>
        /// <param name="memberid">用户ID</param>
        /// <param name="resumeid">简历ID</param>
        /// <returns></returns>
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult Save(int itemid, string json, string memberid, string resumeid)
        {
            return Json(new { type = "success", content = "保存成功！" }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取简历下载地址
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetDownloadUrl(int id )
        {
            return Json(new { type = "success", content = "http://download.500d.me/cvresume/pdf_download/500d_4452106_667_1097704_20181114110922.pdf?downmsg=27e74485e84110465588db6d9471cf33" }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 选择模板
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="resumeBankType"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public HtmlString SelectTemplate(int pageNumber, string resumeBankType, string type)
        {
            string html = "<div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0369.jpg\"alt=\"jm0369\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"664\">选择</a><p class=\"template_msg\"><span>jm0369</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/34a66513-66fd-462a-971c-c883dcfafe7d.png\"alt=\"JM0203\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"206\">选择</a><p class=\"template_msg\"><span>JM0203</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jl0003.jpg\"alt=\"jl0003\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"653\">选择</a><p class=\"template_msg\"><span>jl0003</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/444c2024-b321-46c4-b3f5-1e86449f0d5a.png\"alt=\"JM0256\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"73\">选择</a><p class=\"template_msg\"><span>JM0256</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/sjs0140.jpg\"alt=\"sjs0140\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"660\">选择</a><p class=\"template_msg\"><span>sjs0140</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/6843ed25-f159-4d49-b1ef-1a8266b6c8f1.png\"alt=\"JM0217\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"240\">选择</a><p class=\"template_msg\"><span>JM0217</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/16787090-ed1b-4c4a-922f-1fa7dc949b3e.png\"alt=\"JM0288\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"244\">选择</a><p class=\"template_msg\"><span>JM0288</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0292.jpg\"alt=\"JM0292\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"249\">选择</a><p class=\"template_msg\"><span>JM0292</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/um0016.jpg\"alt=\"UM0016\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"394\">选择</a><p class=\"template_msg\"><span>UM0016</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0296.jpg\"alt=\"JM0296\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"251\">选择</a><p class=\"template_msg\"><span>JM0296</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/890be099-b1d6-47d3-b6e6-6304582e1d20.png\"alt=\"JM0084\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"128\">选择</a><p class=\"template_msg\"><span>JM0084</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/c15fdc90-b4e9-4b9b-bbde-ee6de99d729e.png\"alt=\"JM0206\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"76\">选择</a><p class=\"template_msg\"><span>JM0206</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/73c481b2-1d6d-4003-b278-64b03639ce7d.png\"alt=\"JM0193\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"81\">选择</a><p class=\"template_msg\"><span>JM0193</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/sjs0056.jpg\"alt=\"SJS0056\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"512\">选择</a><p class=\"template_msg\"><span>SJS0056</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0001y.jpg\"alt=\"JM0001Y\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"1\">选择</a><p class=\"template_msg\"><span>JM0001Y</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0001.jpg\"alt=\"JM0001\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"3\">选择</a><p class=\"template_msg\"><span>JM0001</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jl0002.jpg\"alt=\"jl0002\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"652\">选择</a><p class=\"template_msg\"><span>jl0002</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0225.jpg\"alt=\"JM0225\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"10\">选择</a><p class=\"template_msg\"><span>JM0225</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jl0006.jpg\"alt=\"jl0006\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"654\">选择</a><p class=\"template_msg\"><span>jl0006</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0106.jpg\"alt=\"JM0106\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"223\">选择</a><p class=\"template_msg\"><span>JM0106</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/a51aaacb-6677-49fd-8f52-a02fd37ca4a6.png\"alt=\"JM0306\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"257\">选择</a><p class=\"template_msg\"><span>JM0306</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/2bd0b0d1-807e-46a9-90f0-0acdad01e28d.png\"alt=\"JM0080\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"129\">选择</a><p class=\"template_msg\"><span>JM0080</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jl0001.jpg\"alt=\"jl0001\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"656\">选择</a><p class=\"template_msg\"><span>jl0001</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/6d64fdd8-2cf7-4bd7-b647-d3108d884aed.png\"alt=\"JM0087\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"113\">选择</a><p class=\"template_msg\"><span>JM0087</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/42d09001-22af-493e-9818-26dacdd34ed5.png\"alt=\"JM0086\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"110\">选择</a><p class=\"template_msg\"><span>JM0086</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/sjs0081.jpg\"alt=\"sjs0081\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"659\">选择</a><p class=\"template_msg\"><span>sjs0081</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/6422d0ef-1c96-4d9b-ab0e-fd4151d820f3.png\"alt=\"JM0290\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"245\">选择</a><p class=\"template_msg\"><span>JM0290</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0226.jpg\"alt=\"JM0226\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"17\">选择</a><p class=\"template_msg\"><span>JM0226</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/f7772a33-fea2-4baa-a7ac-a3946f854b73.png\"alt=\"JM0073\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"125\">选择</a><p class=\"template_msg\"><span>JM0073</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/yw0005.jpg\"alt=\"YW0005\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"232\">选择</a><p class=\"template_msg\"><span>YW0005</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/73fc6dbe-7dab-4b23-8972-82771ce85274.png\"alt=\"um0084\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"665\">选择</a><p class=\"template_msg\"><span>um0084</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/sjs0095.jpg\"alt=\"sjs0095\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"666\">选择</a><p class=\"template_msg\"><span>sjs0095</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/9f049740-6341-4873-808b-26b2ee32b0af.png\"alt=\"sjs0102\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"663\">选择</a><p class=\"template_msg\"><span>sjs0102</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/sjs0141.jpg\"alt=\"sjs0141\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"662\">选择</a><p class=\"template_msg\"><span>sjs0141</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/sjs0139.jpg\"alt=\"sjs0139\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"658\">选择</a><p class=\"template_msg\"><span>sjs0139</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jl0005.jpg\"alt=\"jl0005\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"657\">选择</a><p class=\"template_msg\"><span>jl0005</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jl0004.jpg\"alt=\"jl0004\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"655\">选择</a><p class=\"template_msg\"><span>jl0004</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/sjs0061.jpg\"alt=\"sjs0061\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"591\">选择</a><p class=\"template_msg\"><span>sjs0061</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/yw0080.jpg\"alt=\"yw0080\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"590\">选择</a><p class=\"template_msg\"><span>yw0080</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/353a9e76-c073-4d00-993e-4ccb089b379f.png\"alt=\"sjs0003\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"589\">选择</a><p class=\"template_msg\"><span>sjs0003</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0347.jpg\"alt=\"jm0347\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"561\">选择</a><p class=\"template_msg\"><span>jm0347</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/sjs0087.jpg\"alt=\"sjs0087\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"553\">选择</a><p class=\"template_msg\"><span>sjs0087</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/sjs0086.jpg\"alt=\"sjs0086\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"552\">选择</a><p class=\"template_msg\"><span>sjs0086</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0350.jpg\"alt=\"jm0350\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"543\">选择</a><p class=\"template_msg\"><span>jm0350</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/bg0019.jpg\"alt=\"BG0019\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"542\">选择</a><p class=\"template_msg\"><span>BG0019</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/wm0008.jpg\"alt=\"WM0008\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"507\">选择</a><p class=\"template_msg\"><span>WM0008</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/um0072.jpg\"alt=\"UM0072\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"467\">选择</a><p class=\"template_msg\"><span>UM0072</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://file.500d.me/upload/image/201811/01/9c836498-74d4-4187-8a9c-64453f3bbd66.png\"alt=\"JM0208\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"453\">选择</a><p class=\"template_msg\"><span>JM0208</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/um0061.jpg\"alt=\"UM0061\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"449\">选择</a><p class=\"template_msg\"><span>UM0061</span><span>支持<i>PDF</i>下载</span></p></div></div><div class=\"template_list\"><img src=\"http://static.500d.me/upload/resume_bank_item/jm0211.jpg\"alt=\"JM0211\"><div class=\"template_masking\"><a href=\"javascript:;\"class=\"SelectTemplate\"data-itemid=\"440\">选择</a><p class=\"template_msg\"><span>JM0211</span><span>支持<i>PDF</i>下载</span></p></div></div>";
            return new HtmlString(html);
        }
        /// <summary>
        /// 我的简历
        /// </summary>
        /// <returns></returns>
        public HtmlString SelectResume()
        {
            string html = "<div class=\"px\"><li class=\"doc_resume sort\"date_time=\"20180610122708\"><b></b><div class=\"img\"><s></s><img src=\"http://static.500d.me\"><div class=\"hover-div\"><a class=\"edit btn choose_edit_other_resume 500dtongji\"data_track=\"PC-在线制作-我的简历功能（{0}编辑）-简历展示-简历展示-选择某简历\"href=\"/cvresume/edit/?itemid=10&resumeId=3081926\"data_path=\"/cvresume/edit/?itemid=10&resumeId=3081926\">编辑</a></div></div><div class=\"text\"><p>叶，勿删谢谢-20171025</p><i>5个月前</i></div></li><li class=\"doc_resume sort\"date_time=\"20180610122424\"><b></b><div class=\"img\"><s></s><img src=\"http://static.500d.me\"><div class=\"hover-div\"><a class=\"edit btn choose_edit_other_resume 500dtongji\"data_track=\"PC-在线制作-我的简历功能（{0}编辑）-简历展示-简历展示-选择某简历\"href=\"/cvresume/edit/?itemid=206&resumeId=3261457\"data_path=\"/cvresume/edit/?itemid=206&resumeId=3261457\">编辑</a></div></div><div class=\"text\"><p>张</p><i>5个月前</i></div></li><li class=\"doc_resume sort\"date_time=\"20180403132206\"><b></b><div class=\"img\"><s></s><img src=\"http://static.500d.me\"><div class=\"hover-div\"><a class=\"edit btn choose_edit_other_resume 500dtongji\"data_track=\"PC-在线制作-我的简历功能（{0}编辑）-简历展示-简历展示-选择某简历\"href=\"/cvresume/edit/?itemid=10&resumeId=3262107\"data_path=\"/cvresume/edit/?itemid=10&resumeId=3262107\">编辑</a></div></div><div class=\"text\"><p>杨丽</p><i>7个月前</i></div></li></div><script>$(function(){var div=$(\".sort\").toArray().sort(function(a,b){return parseInt($(b).attr(\"date_time\"))-parseInt($(a).attr(\"date_time\"))});$(div).appendTo('.px')});</script>";
            return new HtmlString(html);
        }
        /// <summary>
        /// 简历访问权限设置
        /// </summary>
        /// <param name="visitType"></param>
        /// <param name="resumeid"></param>
        /// <returns></returns>
        public JsonResult SetVisitType(string visitType,string resumeid)
        {
            switch (visitType)
            {
                case "open":
                    //所有人
                    break;
                case "privary":
                    //仅自己
                    break; 
                default:
                    return Json(new { type = "error", content = "设置失败，请输入访问权限！" }, JsonRequestBehavior.AllowGet); 
            }
            return Json(new { type = "success", content = "设置成功！" }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 设置简历访问密码
        /// </summary>
        /// <param name="password"></param>
        /// <param name="resumeid"></param>
        /// <returns></returns>
        public JsonResult SetVisitPassword(string password ,string resumeid )
        {
            return Json(new { type = "success", content = "设置成功！" }, JsonRequestBehavior.AllowGet);

        }
    }
}