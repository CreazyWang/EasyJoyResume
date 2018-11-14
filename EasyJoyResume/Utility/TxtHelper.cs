using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace EasyJoyResume.Utility
{
    class TxtHelper
    {
        public TxtHelper()
        {
        }

        public void Write(string path, string content)
        {
            try
            {
                FileStream fs = new FileStream(path, FileMode.OpenOrCreate, FileAccess.Write, FileShare.ReadWrite);
                StreamWriter sr = new StreamWriter(fs);
                sr.WriteLine(content);
                sr.Close();
                fs.Close();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string ReadFirstLine(string path)
        {

            if (!File.Exists(path))
                return "";

            try
            {
                FileStream fs = new FileStream(path, FileMode.OpenOrCreate, FileAccess.Read, FileShare.ReadWrite);
                StreamReader sr = new StreamReader(fs, Encoding.Unicode);
                String line = sr.ReadLine();

                return line;
            }
            catch (Exception)
            {
                throw;
            }
        }
        /// <summary>
        /// 读取txt文件内容
        /// </summary>
        /// <param name="Path">文件地址</param>
        public string ReadTxtContent(string Path)
        {
            if (!File.Exists(Path))
                return "";
            try
            {
                StreamReader sr = new StreamReader(Path, Encoding.Default);
                StringBuilder content = new StringBuilder();
                string t = "";
                while ((t = sr.ReadLine()) != null)
                {
                    content.Append(t);
                }
                return content.ToString();
            }
            catch (Exception)
            {
                throw;
            }
          
        }
    } 
}