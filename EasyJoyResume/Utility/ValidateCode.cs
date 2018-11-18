using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyJoyResume.Utility
{
    public static class ValidateCode
    {
        /// <summary>
        /// 生成验证码随机的算式及结果
        /// </summary>
        /// <returns>【1】：算式 【2】：结果</returns>
        public static string[] CreateRandomNum()
        {
            int t1, t2, sum = 0;
            Random rd = new Random();
            char[] ch = { '+', '-', 'X' };
            for (; true;)
            {
                t1 = rd.Next(1, 11);
                t2 = rd.Next(1, 11);
                if (t1 > t2)
                {
                    break;
                }
            }
            char tempChar = ch[rd.Next(ch.Length)];
            switch (tempChar)
            {
                case '+':
                    sum = t1 + t2;
                    break;
                case '-':
                    sum = t1 - t2;
                    break;
                case 'X':
                    sum = t1 * t2;
                    break;
                default:
                    break;
            }
            string[] strCode = new string[2];
            strCode[0] = t1 + tempChar.ToString() + t2;
            strCode[1] = sum.ToString();
            return strCode;
        }
        //生产图片
        public static byte[] CreateImage(string validateNum)
        {
            byte[] data = null;
            if (validateNum == null || validateNum.Trim() == string.Empty)
                return data;
            //拆分字符，随机字体颜色

            Color[] color = { Color.Black, Color.Blue, Color.Orange, Color.SkyBlue, Color.DarkOrange, Color.DarkRed, Color.DodgerBlue, Color.SaddleBrown, Color.SlateGray };
            string[] strFont = { "Arial", "宋体", "华文彩云", "Harrington", "Century", "Century", "Calibri", "Bell MT" };
            char[] ch = validateNum.ToCharArray();
            //生成BitMap图像
            //Bitmap image = new Bitmap(validateNum.Length * 12 + 12, 22);
            Bitmap image = new Bitmap(130, 55);
            Graphics g = Graphics.FromImage(image);
            try
            {
                //生成随机生成器
                Random random = new Random();
                //清空图片背景
                g.Clear(Color.White);
                //画图片的背景噪音线
                for (int i = 0; i < 25; i++)
                {
                    int x1 = random.Next(image.Width);
                    int x2 = random.Next(image.Width);
                    int y1 = random.Next(image.Height);
                    int y2 = random.Next(image.Height);
                    g.DrawLine(new Pen(Color.Silver), x1, x2, y1, y2);
                }

                for (int i = 0; i < ch.Length; i++)
                {
                    Font font = new Font(strFont[random.Next(strFont.Length)], random.Next(35, 40), (FontStyle.Bold | FontStyle.Italic));
                    System.Drawing.Drawing2D.LinearGradientBrush brush = new System.Drawing.Drawing2D.LinearGradientBrush(new Rectangle(0, 0, image.Width, image.Height), color[random.Next(color.Length)], color[random.Next(color.Length)], 1.2f, true);
                    g.DrawString(ch[i].ToString(), font, brush, i * 27 + random.Next(2, 3), random.Next(2, 5));
                }


                //画图片的前景噪音点
                for (int i = 0; i < 100; i++)
                {
                    int x = random.Next(image.Width);
                    int y = random.Next(image.Height);
                    image.SetPixel(x, y, Color.FromArgb(random.Next()));

                }
                //画图片的边框线
                g.DrawRectangle(new Pen(Color.Silver), 0, 0, image.Width - 1, image.Height - 1);
                System.IO.MemoryStream ms = new System.IO.MemoryStream();
                //将图像保存到指定流
                image.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
                 data   = ms.GetBuffer();
                //return File(data, "image/jpeg");
                return data;
            }
            finally
            {
                g.Dispose();
                image.Dispose();
            }
        }
    }
}
