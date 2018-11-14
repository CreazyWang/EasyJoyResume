using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace EasyJoyResume
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        { 
            //简历预览
            routes.MapRoute(
              name: "ResumePreView",
              url: "CvResume/{id}",
              defaults: new { controller = "CvResume", action = "Index", id = UrlParameter.Optional },
              constraints: new { id = @"\d+"  }
            );
          
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );


        }
    }
}
