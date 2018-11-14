using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EasyJoyResume.Controllers
{
    public class ResumeSendRecordsController : Controller
    {
        /// <summary>
        /// 查询简历内容
        /// </summary>
        /// <returns></returns>
        public JsonResult SelectResumeContent(string id)
        {
            return Json(new {type="success",content= "{\"downUrl\":\"http://download.500d.me/cvresume/pdf_download/500d_6701148_206_1097704_20181111193236.pdf?downmsg=27e74485e84110465588db6d9471cf33\",\"city\":null,\"edu\":null,\"visitPath\":\"/cvresume/9436965415/\",\"sendMail\":null,\"name\":null,\"mobile\":null,\"job\":null}" },JsonRequestBehavior.AllowGet);
        }
    }
}