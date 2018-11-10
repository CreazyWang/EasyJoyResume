using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyJoyResume.Models.Resume
{
    public class Base_Info_Item
    {
        public Base_Info_Item(string name, string values, string font)
        {
            this.name = name;
            this.values = values;
            this.font = font;
        }

        public Base_Info_Item()
        {
        }

        public string name { set; get; }
        public string values { set; get; }
        public string font { set; get; }
    }
}