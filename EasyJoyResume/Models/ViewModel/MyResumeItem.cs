using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyJoyResume.Models.ViewModel
{
    /// <summary>
    /// 我的简历条目
    /// </summary>
    public class MyResumeItem
    {
        public MyResumeItem() { }
        public MyResumeItem(string date_time, string itemid, string resumeId, string resume_title, string download_href, string data_visi_id, string data_visitype, string data_visitpwd, string create_time)
        {
            this.date_time = date_time;
            this.itemid = itemid;
            this.resumeId = resumeId;
            this.resume_title = resume_title;
            this.download_href = download_href;
            this.data_visi_id = data_visi_id;
            this.data_visitype = data_visitype;
            this.data_visitpwd = data_visitpwd;
            this.create_time = create_time;
        }

        public string date_time { get; set; }
        public string itemid { get; set; }
        public string resumeId { get; set; }
        public string resume_title { get; set; }
        public string download_href { get; set; }
        public string data_visi_id { get; set; }
        public string data_visitype { get; set; }
        public string data_visitpwd { get; set; }
        public string create_time { get; set; }
    }
}