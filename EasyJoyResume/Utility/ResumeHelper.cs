using EasyJoyResume.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace EasyJoyResume.Utility
{
    /// <summary>
    /// 简历帮助类
    /// </summary>
    public class ResumeHelper
    {
        /// <summary>
        /// 简历基础信息转编辑信息
        /// </summary>
        /// <param name="resume_Base">简历基础信息类</param>
        /// <param name="itemid">简历ID</param>
        /// <returns>简历编辑信息类</returns>
        public static ResumeEdit BaseToEdit(resume_base resume_Base,int itemid)
        {
            ResumeEdit resumeEdit = new ResumeEdit()
            { 
                resume_language = resume_Base.resume_language,
                data_color = resume_Base.resume_set.color,
                data_font_name = resume_Base.resume_set.font,
                data_font_size = resume_Base.resume_set.fontSize,
                data_line_height =resume_Base.resume_set.padding,
                data_font_type = resume_Base.resume_set.fontType,
                resume_sort = "",
                wap_resume_sort = "",
                template_set = "",
                data_itemid = itemid.ToString(),
                data_modal_margin = resume_Base.resume_set.margin,
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
            //设置模块显示隐藏
            //封面
            if (resume_Base.modul_show.coverShow)
            {
                resumeEdit.coverModel.CoverShow = "";
            }
            //自荐信
            if (resume_Base.modul_show.letterShow)
            {
                resumeEdit.letterModel.LetterContent = "";
            }
            //-----------基础信息-----------
            //显示设置

            if (resume_Base.modul_show.base_info.isContentShow)
            {
                resumeEdit.baseInfoModel.isContentShow = "";
            }
            if (resume_Base.modul_show.base_info.isShow)
            {
                resumeEdit.baseInfoModel.isShow = "";
            }
            if (resume_Base.modul_show.base_info.isTimeShow)
            {
                resumeEdit.baseInfoModel.isTimeShow = "";
            }
            if (resume_Base.modul_show.base_info.isTitleShow)
            {
                resumeEdit.baseInfoModel.isTitleShow = "";
            }
            //信息内容
            InfoItem sexItem = new InfoItem()
            {
                key = "sex",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.sex,
                Content = resume_Base.resume_base_info.sex
            }; 
            resumeEdit.baseInfoModel.Item.Add(sexItem);

            InfoItem birthItem = new InfoItem()
            {
                key = "birth",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.birth,
                Content = resume_Base.resume_base_info.birth
            };
            resumeEdit.baseInfoModel.Item.Add(birthItem);

            InfoItem nationItem = new InfoItem()
            {
                key = "nation",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.nation,
                Content = resume_Base.resume_base_info.nation
            };
            resumeEdit.baseInfoModel.Item.Add(birthItem);
            InfoItem educationItem = new InfoItem()
            {
                key = "education",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.education,
                Content = resume_Base.resume_base_info.education
            };
            resumeEdit.baseInfoModel.Item.Add(birthItem);
            InfoItem marriageStatusItem = new InfoItem()
            {
                key = "marriageStatus",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.marriageStatus,
                Content = resume_Base.resume_base_info.marriageStatus
            };
            resumeEdit.baseInfoModel.Item.Add(birthItem);
            InfoItem heightItem = new InfoItem()
            {
                key = "height",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.height,
                Content = resume_Base.resume_base_info.height
            };
            resumeEdit.baseInfoModel.Item.Add(heightItem);
            InfoItem politicalStatusItem = new InfoItem()
            {
                key = "politicalStatus",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.politicalStatus,
                Content = resume_Base.resume_base_info.politicalStatus
            };
            resumeEdit.baseInfoModel.Item.Add(politicalStatusItem);
            InfoItem cityItem = new InfoItem()
            {
                key = "city",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.city,
                Content = resume_Base.resume_job_preference.jobCity
            };
            resumeEdit.baseInfoModel.Item.Add(cityItem);
            InfoItem jobYearItem = new InfoItem()
            {
                key = "jobYear",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.jobYear,
                Content = resume_Base.resume_base_info.jobYear
            };
            resumeEdit.baseInfoModel.Item.Add(jobYearItem);
            InfoItem mobileItem = new InfoItem()
            {
                key = "mobile",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.mobile,
                Content = resume_Base.resume_base_info.mobile
            };
            resumeEdit.baseInfoModel.Item.Add(mobileItem);
            InfoItem emailItem = new InfoItem()
            {
                key = "email",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.email,
                Content = resume_Base.resume_base_info.email
            };
            resumeEdit.baseInfoModel.Item.Add(birthItem); 
            InfoItem weightItem = new InfoItem()
            {
                key = "weight",
                Show = "hidden",
                iFont = resume_Base.iconFontMap.weight,
                Content = resume_Base.resume_base_info.weight
            };
            resumeEdit.baseInfoModel.Item.Add(weightItem);
            //


        
            return resumeEdit;
        }


     
    }
}