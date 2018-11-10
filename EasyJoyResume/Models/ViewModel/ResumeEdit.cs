using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyJoyResume.Models.ViewModel
{
    /// <summary>
    /// 简历在线编辑类
    /// </summary>
    public class ResumeEdit
    {
        public ResumeEdit()
        {
        }

        public ResumeEdit(string resume_language, string data_color, string data_font_name, string data_font_size, string data_line_height, string data_font_type, string resume_sort, string wap_resume_sort, string template_set, string data_itemid, string data_modal_margin, sort sort, CoverModel coverModel, LetterModel letterModel, ResumeHeadModel resumeHeadModel, BaseInfoModel baseInfoModel, Dictionary<string, ResumeExperience> resumeExperience, ResumeHonor resumeHonor, ResumeName resumeName, ResumeJobPreference resumeJobPreference, ResumeSummary resumeSummary, ResumePortfolio resumePortfolio, ResumeQrcode resumeQrcode)
        {
            this.resume_language = resume_language;
            this.data_color = data_color;
            this.data_font_name = data_font_name;
            this.data_font_size = data_font_size;
            this.data_line_height = data_line_height;
            this.data_font_type = data_font_type;
            this.resume_sort = resume_sort;
            this.wap_resume_sort = wap_resume_sort;
            this.template_set = template_set;
            this.data_itemid = data_itemid;
            this.data_modal_margin = data_modal_margin;
            this.sort = sort;
            this.coverModel = coverModel;
            this.letterModel = letterModel;
            this.resumeHeadModel = resumeHeadModel;
            this.baseInfoModel = baseInfoModel;
            this.resumeExperience = resumeExperience;
            ResumeHonor = resumeHonor;
            ResumeName = resumeName;
            ResumeJobPreference = resumeJobPreference;
            ResumeSummary = resumeSummary;
            ResumePortfolio = resumePortfolio;
            ResumeQrcode = resumeQrcode;
        }


        //基础属性
        public string resume_language { set; get; }
        public string data_color { set; get; }
        public string data_font_name { set; get; }
        public string data_font_size { set; get; }
        public string data_line_height { set; get; }
        public string data_font_type { set; get; }
        public string resume_sort { set; get; }
        public string wap_resume_sort { set; get; }
        public string template_set { set; get; }
        public string data_itemid { set; get; }
        public string data_modal_margin { set; get; }
        public sort sort { set; get; }
        //封面模块
        public CoverModel coverModel { set; get; }
        //自荐信
        public LetterModel letterModel { set; get; }
        //头像
        public ResumeHeadModel resumeHeadModel { set; get; }
        //基本信息
        public BaseInfoModel baseInfoModel { set; get; }
        //经历
        public Dictionary<string, ResumeExperience> resumeExperience { set; get; }
        //荣誉
        public ResumeHonor ResumeHonor { set; get; }
        //姓名
        public ResumeName ResumeName { set; get; }
        //求职意向
        public ResumeJobPreference ResumeJobPreference { set; get; }
        //简介
        public ResumeSummary ResumeSummary { set; get; }
        //个人作品
        public ResumePortfolio ResumePortfolio { set; get; }
        //二维码
        public ResumeQrcode ResumeQrcode { set; get; }
    }
    /// <summary>
    /// 封面模块
    /// </summary>
    public class CoverModel{
        public CoverModel()
        {
        }

        public CoverModel(string coverShow, List<resume_cover_item> resumeCover)
        {
            CoverShow = coverShow;
            ResumeCover = resumeCover;
        }

        public string CoverShow { set; get; }
        public List<resume_cover_item> ResumeCover { set; get; }
    }
    /// <summary>
    /// 自荐书模块
    /// </summary>
    public class LetterModel
    {
        public LetterModel()
        {
        }

        public LetterModel(string letterShow, string letterContent)
        {
            LetterShow = letterShow;
            LetterContent = letterContent;
        }

        public string LetterShow { set; get; }
        public string LetterContent { set; get; }
    }
    /// <summary>
    /// 简历头像模块
    /// </summary>
    public class ResumeHeadModel
    {
        public ResumeHeadModel()
        {
        }

        public ResumeHeadModel(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, string headLink)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            HeadLink = headLink;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; } 
        public string HeadLink { set; get; }
    }
    /// <summary>
    /// 基本信息
    /// </summary>
    public class BaseInfoModel
    {
        public BaseInfoModel()
        {
        }

        public BaseInfoModel(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, List<InfoItem> item)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            Item = item;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; }  
        public List< InfoItem> Item { set; get; }
    }
    public class InfoItem
    {
        public InfoItem()
        {
        }

        public InfoItem(string key, string show, string iFont, string content)
        {
            this.key = key;
            Show = show;
            this.iFont = iFont;
            Content = content;
        }

        public string key { set; get; }
        public string Show { set; get; }
        public string iFont { set; get; }
        public string Content { set; get; }
    }
    /// <summary>
    /// 
    /// </summary>
    public class BaseHomeModel
    {
        public BaseHomeModel()
        {
        }

        public BaseHomeModel(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, string content)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            Content = content;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; }
        public string Content { set; get; }
    }

    public class BaseSocial
    {
        public BaseSocial()
        {
        }

        public BaseSocial(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, string content)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            Content = content;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; }
        public string Content { set; get; }
    }

    public class ResumeSkill
    {
        public ResumeSkill()
        {
        }

        public ResumeSkill(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, Dictionary<string, string> content)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            Content = content;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; }
        public Dictionary<string,string> Content { set; get; }
    }
    
    public class ResumeHobby
    {
        public ResumeHobby()
        {
        }

        public ResumeHobby(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, Dictionary<string, string> content)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            Content = content;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; }
        public Dictionary<string, string> Content { set; get; }
    }
    public class ResumeName
    {
        public ResumeName()
        {
        }

        public ResumeName(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, string name, string word)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            this.name = name;
            this.word = word;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; }
        public string name { set; get; }
        public string word { set; get; }
    }

    public class ResumeJobPreference
    {
        public ResumeJobPreference()
        {
        }

        public ResumeJobPreference(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, Dictionary<string, InfoItem> item)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            Item = item;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; } 
        public Dictionary<string, InfoItem> Item { set; get; }
    }


    public class ResumeExperience
    {
        public ResumeExperience()
        {
        }

        public ResumeExperience(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, List<resume_experience> item)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            Item = item;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; } 
        public List<resume_experience> Item { set; get; }
    }

    public class ResumeHonor
    {
        public ResumeHonor()
        {
        }

        public ResumeHonor(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, string content)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            Content = content;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; }
        public string Content { set; get; }
    }

    public class ResumeSummary
    {
        public ResumeSummary()
        {
        }

        public ResumeSummary(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, string content)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            Content = content;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; }
        public string Content { set; get; }
    }

    public class ResumePortfolio
    {
        public ResumePortfolio()
        {
        }

        public ResumePortfolio(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, List<Img> imgs, List<Link> links)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            Imgs = imgs;
            Links = links;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; }
        public List<Img> Imgs { set; get; }
        public List<Link> Links { set; get; }
    }

    public class ResumeQrcode
    {
        public ResumeQrcode()
        {
        }

        public ResumeQrcode(string isShow, string isTitleShow, string isTimeShow, string isContentShow, string title, string key, string font, string qrcodeLink, string content)
        {
            this.isShow = isShow;
            this.isTitleShow = isTitleShow;
            this.isTimeShow = isTimeShow;
            this.isContentShow = isContentShow;
            this.title = title;
            this.key = key;
            Font = font;
            QrcodeLink = qrcodeLink;
            Content = content;
        }

        public string isShow { set; get; }
        public string isTitleShow { set; get; }
        public string isTimeShow { set; get; }
        public string isContentShow { set; get; }
        public string title { set; get; }
        public string key { set; get; }
        public string Font { set; get; }
        public string QrcodeLink { set; get; }
        public string Content { set; get; }
    }
}