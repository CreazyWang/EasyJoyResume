using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace EasyJoyResume.Models.ViewModel
{
    /// <summary>
    /// 简历模板基本信息类
    /// </summary>
    public class resume_base
    {
        public resume_base()
        {
        }
        public resume_base(string resume_scale, string resume_language, resume_set resume_set, modul_show modul_show, iconFontMap iconFontMap, List<resume_cover_item> resume_cover, string resume_letter, string resume_head, string resume_headType, resume_base_info resume_base_info, resume_job_preference resume_job_preference, List<resume_skill> resume_skills, List<resume_hobby> resume_hobby, List<resume_experience> resume_edu, List<resume_experience> resume_work, List<resume_experience> resume_internship, List<resume_experience> resume_volunteer, List<resume_experience> resume_project, string resume_summary, string resume_honor, resume_portfolio resume_portfolio, List<custom> custom, sort sort, resume_contact resume_contact, resume_qrcode resume_qrcode)
        {
            this.resume_scale = resume_scale;
            this.resume_language = resume_language;
            this.resume_set = resume_set;
            this.modul_show = modul_show;
            this.iconFontMap = iconFontMap;
            this.resume_cover = resume_cover;
            this.resume_letter = resume_letter;
            this.resume_head = resume_head;
            this.resume_headType = resume_headType;
            this.resume_base_info = resume_base_info;
            this.resume_job_preference = resume_job_preference;
            this.resume_skills = resume_skills;
            this.resume_hobby = resume_hobby;
            this.resume_edu = resume_edu;
            this.resume_work = resume_work;
            this.resume_internship = resume_internship;
            this.resume_volunteer = resume_volunteer;
            this.resume_project = resume_project;
            this.resume_summary = resume_summary;
            this.resume_honor = resume_honor;
            this.resume_portfolio = resume_portfolio;
            this.custom = custom;
            this.sort = sort;
            this.resume_contact = resume_contact;
            this.resume_qrcode = resume_qrcode;
        }
        //简历进度
        public string resume_scale { set; get; }
        //简历语言
        public string resume_language { set; get; }
        //简历基础设置
        public resume_set resume_set { set; get; }
        public modul_show modul_show { set; get; }
        public iconFontMap iconFontMap { set; get; }
        public List<resume_cover_item> resume_cover { set; get; }
        public string resume_letter { set; get; }
        public string resume_head { set; get; }
        public string resume_headType { set; get; }
        public resume_base_info resume_base_info { set; get; }
        public resume_job_preference resume_job_preference { set; get; } 
        public List<resume_skill> resume_skills { set; get; }
        public List<resume_hobby> resume_hobby { set; get; }
        public List<resume_experience> resume_edu { set; get; }
        public List<resume_experience> resume_work { set; get; }
        public List<resume_experience> resume_internship { set; get; }
        public List<resume_experience> resume_volunteer { set; get; }
        public List<resume_experience> resume_project { set; get; }
        public string resume_summary { get; set; }
        public string resume_honor { get; set; }
        public resume_portfolio resume_portfolio { get; set; }
        public List<custom> custom { set; get; }
        public sort sort { set; get; }
        public resume_contact resume_contact { set; get; }
        public resume_qrcode resume_qrcode { set; get; }
    }
    /// <summary>
    /// 简历基础设置
    /// </summary>
    public class resume_set
    {
        public resume_set() {}
        public resume_set(string color, string font, string fontSize, string padding, string margin, string fontType)
        {
            this.color = color;
            this.font = font;
            this.fontSize = fontSize;
            this.padding = padding;
            this.margin = margin;
            this.fontType = fontType;
        }

        public string color { set; get; }
        public string font { set; get; }
        public string fontSize { set; get; }
        public string padding { set; get; }
        public string margin { set; get; }
        public string fontType { set; get; }
    }
    /// <summary>
    /// 模块条目设置
    /// </summary>
    public class modul_item_show
    {
        public modul_item_show()
        {
        }

        public modul_item_show(bool isShow, bool isTitleShow, bool isTimeShow, bool isContentShow, string title, string key)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
        }

        public bool isShow { set; get; }
        public bool isTitleShow { set; get; }
        public bool isTimeShow { set; get; }
        public bool isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
    }
    /// <summary>
    /// 模块显示信息
    /// </summary>
    public class modul_show
    {
        public modul_show()
        {
        }

        public modul_show(bool letterShow, bool coverShow, bool headShow, bool contactShow, modul_item_show resume_head, modul_item_show base_info, modul_item_show base_home, modul_item_show base_social, modul_item_show resume_skill, modul_item_show resume_hobby, modul_item_show resume_name, modul_item_show resume_job_preference, modul_item_show resume_edu, modul_item_show resume_work, modul_item_show resume_internship, modul_item_show resume_volunteer, modul_item_show resume_project, modul_item_show resume_honor, modul_item_show resume_summary, modul_item_show resume_portfolio, modul_item_show resume_qrcode)
        {
            this.letterShow = letterShow;
            this.coverShow = coverShow;
            this.headShow = headShow;
            this.contactShow = contactShow;
            this.resume_head = resume_head;
            this.base_info = base_info;
            this.base_home = base_home;
            this.base_social = base_social;
            this.resume_skill = resume_skill;
            this.resume_hobby = resume_hobby;
            this.resume_name = resume_name;
            this.resume_job_preference = resume_job_preference;
            this.resume_edu = resume_edu;
            this.resume_work = resume_work;
            this.resume_internship = resume_internship;
            this.resume_volunteer = resume_volunteer;
            this.resume_project = resume_project;
            this.resume_honor = resume_honor;
            this.resume_summary = resume_summary;
            this.resume_portfolio = resume_portfolio;
            this.resume_qrcode = resume_qrcode;
        }

        public bool letterShow { set; get; }
        public bool coverShow { set; get; }
        public bool headShow { set; get; }
        public bool contactShow { set; get; }
        public modul_item_show resume_head { set; get; }
        public modul_item_show base_info { set; get; }
        public modul_item_show base_home { set; get; }
        public modul_item_show base_social { set; get; }
        public modul_item_show resume_skill { set; get; }
        public modul_item_show resume_hobby { set; get; }
        public modul_item_show resume_name { set; get; }
        public modul_item_show resume_job_preference { set; get; }
        public modul_item_show resume_edu { set; get; }
        public modul_item_show resume_work { set; get; }
        public modul_item_show resume_internship { set; get; }
        public modul_item_show resume_volunteer { set; get; }
        public modul_item_show resume_project { set; get; }
        public modul_item_show resume_honor { set; get; }
        public modul_item_show resume_summary { set; get; }
        public modul_item_show resume_portfolio { set; get; }
        public modul_item_show resume_qrcode { set; get; }
     }
    /// <summary>
    /// 图标字体
    /// </summary>
    public class iconFontMap
    {
        public iconFontMap()
        {
        }

        public iconFontMap(string resume_head, string base_info, string sex, string birth, string nation, string education, string marriageStatus, string height, string politicalStatus, string city, string jobYear, string mobile, string email, string weight, string base_home, string base_social, string resume_skill, string resume_hobby, string resume_name, string resume_job_preference, string jobFunction, string jobType, string jobCity, string jobSalary, string jobTime, string resume_edu, string resume_work, string resume_internship, string resume_volunteer, string resume_project, string resume_honor, string resume_summary, string resume_portfolio, string resume_qrcode)
        {
            this.resume_head = resume_head;
            this.base_info = base_info;
            this.sex = sex;
            this.birth = birth;
            this.nation = nation;
            this.education = education;
            this.marriageStatus = marriageStatus;
            this.height = height;
            this.politicalStatus = politicalStatus;
            this.city = city;
            this.jobYear = jobYear;
            this.mobile = mobile;
            this.email = email;
            this.weight = weight;
            this.base_home = base_home;
            this.base_social = base_social;
            this.resume_skill = resume_skill;
            this.resume_hobby = resume_hobby;
            this.resume_name = resume_name;
            this.resume_job_preference = resume_job_preference;
            this.jobFunction = jobFunction;
            this.jobType = jobType;
            this.jobCity = jobCity;
            this.jobSalary = jobSalary;
            this.jobTime = jobTime;
            this.resume_edu = resume_edu;
            this.resume_work = resume_work;
            this.resume_internship = resume_internship;
            this.resume_volunteer = resume_volunteer;
            this.resume_project = resume_project;
            this.resume_honor = resume_honor;
            this.resume_summary = resume_summary;
            this.resume_portfolio = resume_portfolio;
            this.resume_qrcode = resume_qrcode;
        }

        public string resume_head { set; get; }
        public string base_info { set; get; }
        public string sex { set; get; }
        public string birth { set; get; }
        public string nation { set; get; }
        public string education { set; get; }
        public string marriageStatus { set; get; }
        public string height { set; get; }
        public string politicalStatus { set; get; }
        public string city { set; get; }
        public string jobYear { set; get; }
        public string mobile { set; get; }
        public string email { set; get; }
        public string weight { set; get; }
        public string base_home { set; get; }
        public string base_social { set; get; }
        public string resume_skill { set; get; }
        public string resume_hobby { set; get; }
        public string resume_name { set; get; }
        public string resume_job_preference { set; get; }
        public string jobFunction { set; get; }
        public string jobType { set; get; }
        public string jobCity { set; get; }
        public string jobSalary { set; get; }
        public string jobTime { set; get; }
        public string resume_edu { set; get; }
        public string resume_work { set; get; }
        public string resume_internship { set; get; }
        public string resume_volunteer { set; get; }
        public string resume_project { set; get; }
        public string resume_honor { set; get; }
        public string resume_summary { set; get; }
        public string resume_portfolio { set; get; }
        public string resume_qrcode { set; get; }
    }
    /// <summary>
    /// 封面信息条目
    /// </summary>
    public class resume_cover_item{
        public resume_cover_item()
        {
        }

        public resume_cover_item(string icon, string content)
        {
            this.icon = icon;
            this.content = content;
        }

        public string icon { set; get; }
        public string content { set; get; }
    }
    /// <summary>
    /// 自定义
    /// </summary>
    public class CustomMsg
    {
        public CustomMsg()
        {
        }

        public CustomMsg(string key, string name, string desc)
        {
            this.key = key;
            this.name = name;
            this.desc = desc;
        }

        public string key { get; set; }
      
        public string name { get; set; } 
        public string desc { get; set; }
    }
    /// <summary>
    /// 基本信息
    /// </summary>
    public class resume_base_info
    {
        public resume_base_info()
        {
        }

        public resume_base_info(string name, string minSummary, string birth, string jobYear, string mobile, string email, string sex, string education, string nation, string marriageStatus, string politicalStatus, string height, string weight, List<CustomMsg> customMsg, List<string> customWebsite)
        {
            this.name = name;
            this.minSummary = minSummary;
            this.birth = birth;
            this.jobYear = jobYear;
            this.mobile = mobile;
            this.email = email;
            this.sex = sex;
            this.education = education;
            this.nation = nation;
            this.marriageStatus = marriageStatus;
            this.politicalStatus = politicalStatus;
            this.height = height;
            this.weight = weight;
            this.customMsg = customMsg;
            this.customWebsite = customWebsite;
        }

        public string name { get; set; } 
        public string minSummary { get; set; } 
        public string birth { get; set; } 
        public string jobYear { get; set; } 
        public string mobile { get; set; } 
        public string email { get; set; } 
        public string sex { get; set; } 
        public string education { get; set; } 
        public string nation { get; set; }  
        public string marriageStatus { get; set; } 
        public string politicalStatus { get; set; } 
        public string height { get; set; } 
        public string weight { get; set; } 
        public List<CustomMsg> customMsg { get; set; } 
        public List<string> customWebsite { get; set; }
    }
    /// <summary>
    /// 求职意向
    /// </summary>
    public class resume_job_preference
    {
        public resume_job_preference()
        {
        }

        public resume_job_preference(string jobFunction, string jobTime, string jobCity, string jobCityName, string jobMinSalary, string jobMaxSalary)
        {
            this.jobFunction = jobFunction;
            this.jobTime = jobTime;
            this.jobCity = jobCity;
            this.jobCityName = jobCityName;
            this.jobMinSalary = jobMinSalary;
            this.jobMaxSalary = jobMaxSalary;
        }

        public string jobFunction { get; set; }
        public string jobTime { get; set; }
        public string jobCity { get; set; }
        public string jobCityName { get; set; }
        public string jobMinSalary { get; set; }
        public string jobMaxSalary { get; set; }
    }
    /// <summary>
    /// 技巧
    /// </summary>
    public class resume_skill
    {
        public resume_skill()
        {
        }

        public resume_skill(string name, string masterLevel, string masterLevelDesc)
        {
            this.name = name;
            this.masterLevel = masterLevel;
            this.masterLevelDesc = masterLevelDesc;
        }

        public string name { get; set; }
        public string masterLevel { get; set; }
        public string masterLevelDesc { get; set; }
    }

    public class resume_hobby
    {
        public resume_hobby()
        {
        }

        public resume_hobby(string key, string name)
        {
            this.key = key;
            this.name = name;
        }

        public string key { get; set; } 
        public string name { get; set; }
    }
    /// <summary>
    /// 经历
    /// </summary>
    public class resume_experience
    {
        public resume_experience()
        {
        }

        public resume_experience(string id, string beginTime, string endTime, string unit, string job, string content)
        {
            this.id = id;
            this.beginTime = beginTime;
            this.endTime = endTime;
            this.unit = unit;
            this.job = job;
            this.content = content;
        }

        public string id { get; set; } 
        public string beginTime { get; set; } 
        public string endTime { get; set; } 
        public string unit { get; set; } 
        public string job { get; set; } 
        public string content { get; set; }
    }

    /// <summary>
    /// 作品照片
    /// </summary>
    public class Img
    {
        public Img()
        {
        }

        public Img(string title, string desc, string img)
        {
            this.title = title;
            this.desc = desc;
            this.img = img;
        }

        public string title { get; set; } 
        public string desc { get; set; } 
        public string img { get; set; }
    }
    /// <summary>
    /// 作品链接
    /// </summary>
    public class Link
    {
        public Link()
        {
        }

        public Link(string title, string desc)
        {
            this.title = title;
            this.desc = desc;
        }

        public string title { get; set; } 
        public string desc { get; set; }
    }

    public class resume_portfolio
    {
        public resume_portfolio()
        {
        }

        public resume_portfolio(List<Img> img, List<Link> link)
        {
            this.img = img;
            this.link = link;
        }

        /// <summary>
        /// Img
        /// </summary>
        public List<Img> img { get; set; }
        /// <summary>
        /// Link
        /// </summary>
        public List<Link> link { get; set; }
    }

    /// <summary>
    /// 自定义模块
    /// </summary>
    public class custom
    {
        public custom()
        {
        }

        public custom(string key, bool isTitleShow, bool isTimeShow, bool isContentShow, string title, string content)
        {
            this.key = key;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.content = content;
        }

        public string key { get; set; } 
        public bool isTitleShow { get; set; } 
        public bool isTimeShow { get; set; } 
        public bool isContentShow { get; set; } 
        public string title { get; set; } 
        public string content { get; set; }
    }
    public class sort
    {
        public sort()
        {
        }

        public sort(List<string> left, List<string> top, List<string> right, List<string> bottom)
        {
            this.left = left;
            this.top = top;
            this.right = right;
            this.bottom = bottom;
        }

        /// <summary>
        /// Left
        /// </summary>
        public List<string> left { get; set; }
        /// <summary>
        /// Top
        /// </summary>
        public List<string> top { get; set; }
        /// <summary>
        /// Right
        /// </summary>
        public List<string> right { get; set; }
        /// <summary>
        /// Bottom
        /// </summary>
        public List<string> bottom { get; set; }

        public override string ToString()
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            string softJson = jss.Serialize(this);
            return softJson;
        }
    }

    public class resume_contact
    {
        public resume_contact()
        {
        }

        public resume_contact(string name, string desc, string contact, string content)
        {
            this.name = name;
            this.desc = desc;
            this.contact = contact;
            this.content = content;
        }

        public string name { get; set; } 
        public string desc { get; set; } 
        public string contact { get; set; } 
        public string content { get; set; }
    }
    public class resume_qrcode
    {
        public resume_qrcode()
        {
        } 
        public resume_qrcode(string qrcodeTips)
        {
            this.qrcodeTips = qrcodeTips;
        } 
        public string qrcodeTips { get; set; }
    }
}