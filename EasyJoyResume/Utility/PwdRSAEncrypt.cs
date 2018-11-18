using System;
using System.Text;
using System.IO;
using System.Security.Cryptography;

namespace EasyJoyResume.Utility
{

    public class PwdRSAEncrypt
    {
        /// <summary>
        /// 创建RSA公钥私钥
        /// </summary>
        public static void CreateRSAKey()
        {
            string strAppPath = AppDomain.CurrentDomain.BaseDirectory; //获得可执行文件的路径。
            //设置[公钥私钥]文件路径
            string privateKeyPath = strAppPath + "App_Data//RSA_KEY//PrivateKey.xml";
            string publicKeyPath = strAppPath + "App_Data//RSA_KEY//PublicKey.xml"; 

            //创建RSA对象
            RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();
            //生成RSA[公钥私钥]
            string privateKey = rsa.ToXmlString(true);
            string publicKey = rsa.ToXmlString(false);
            //将密钥写入指定路径
            File.WriteAllText(privateKeyPath, privateKey);//文件内包含公钥和私钥
            File.WriteAllText(publicKeyPath, publicKey);//文件内只包含公钥
        }
        /// <summary>
        /// 获取RSA公钥
        /// </summary> 
        /// <returns></returns>
        public static string[] GetPulicKey()
        {
            //设置[公钥私钥]文件路径 
            string publicKeyPath = AppDomain.CurrentDomain.BaseDirectory + "App_Data//RSA_KEY//PublicKey.xml"; 
            return new string[] { XmlHelper.Read(publicKeyPath, "RSAKeyValue/Modulus", "") , XmlHelper.Read(publicKeyPath, "RSAKeyValue/Exponent", "") };
        }
        /// <summary>
        /// 使用RSA实现加密
        /// </summary>
        /// <param name="data">加密数据</param>
        /// <returns></returns>
        public static string RSAEncrypt(string data)
        {
            //C#默认只能使用[公钥]进行加密(想使用[公钥解密]可使用第三方组件BouncyCastle来实现)
            string strAppPath = AppDomain.CurrentDomain.BaseDirectory; //获得可执行文件的路径。
                                                                       //设置[公钥私钥]文件路径
            string publicKeyPath = strAppPath + "App_Data//RSA_KEY//PublicKey.xml";

            string publicKey = File.ReadAllText(publicKeyPath);
            //创建RSA对象并载入[公钥]
            RSACryptoServiceProvider rsaPublic = new RSACryptoServiceProvider();
            rsaPublic.FromXmlString(publicKey);
            //对数据进行加密
            byte[] publicValue = rsaPublic.Encrypt(Encoding.UTF8.GetBytes(data), false);
            string publicStr = Convert.ToBase64String(publicValue);//使用Base64将byte转换为string
            return publicStr;
        }
        /// <summary>
        /// 使用RSA实现解密
        /// </summary>
        /// <param name="data">解密数据</param>
        /// <returns></returns>
        public static string RSADecrypt(string data)
        {
            //C#默认只能使用[私钥]进行解密(想使用[私钥加密]可使用第三方组件BouncyCastle来实现)
            string strAppPath = AppDomain.CurrentDomain.BaseDirectory; //获得可执行文件的路径。
            //设置[公钥私钥]文件路径
            string privateKeyPath = strAppPath + "App_Data//RSA_KEY//PrivateKey.xml";

            string privateKey = File.ReadAllText(privateKeyPath);
            //创建RSA对象并载入[私钥]
            RSACryptoServiceProvider rsaPrivate = new RSACryptoServiceProvider();
            rsaPrivate.FromXmlString(privateKey);
            //对数据进行解密
            byte[] privateValue = rsaPrivate.Decrypt(  Convert.FromBase64String(data) , false);//使用Base64将string转换为byte
            string privateStr = Encoding.UTF8.GetString(privateValue);
            return privateStr;
        }
        public static string Decrypt2(string ciphertext)
        { 
            //C#默认只能使用[私钥]进行解密(想使用[私钥加密]可使用第三方组件BouncyCastle来实现)
            string strAppPath = AppDomain.CurrentDomain.BaseDirectory; //获得可执行文件的路径。
            //设置[公钥私钥]文件路径
            string privateKeyPath = strAppPath + "App_Data//RSA_KEY//PrivateKey.xml";

            string privateKey = File.ReadAllText(privateKeyPath);
            //创建RSA对象并载入[私钥]
            RSACryptoServiceProvider rsaPrivate = new RSACryptoServiceProvider();
            rsaPrivate.FromXmlString(privateKey);
            //对数据进行解密
            Byte[] CiphertextData = Convert.FromBase64String(ciphertext);
            int MaxBlockSize = rsaPrivate.KeySize / 8;    //解密块最大长度限制

            if (CiphertextData.Length <= MaxBlockSize)
                return System.Text.Encoding.UTF8.GetString(rsaPrivate.Decrypt(CiphertextData, false));

            using (MemoryStream CrypStream = new MemoryStream(CiphertextData))
            using (MemoryStream PlaiStream = new MemoryStream())
            {
                Byte[] Buffer = new Byte[MaxBlockSize];
                int BlockSize = CrypStream.Read(Buffer, 0, MaxBlockSize);

                while (BlockSize > 0)
                {
                    Byte[] ToDecrypt = new Byte[BlockSize];
                    Array.Copy(Buffer, 0, ToDecrypt, 0, BlockSize);

                    Byte[] Plaintext = rsaPrivate.Decrypt(ToDecrypt, false);
                    PlaiStream.Write(Plaintext, 0, Plaintext.Length);

                    BlockSize = CrypStream.Read(Buffer, 0, MaxBlockSize);
                }

                return System.Text.Encoding.UTF8.GetString(PlaiStream.ToArray());
            }
        }
        private static byte[] HexStringToBytes(string hex)
        {
            if (hex.Length == 0)
            {
                return new byte[] { 0 };
            }

            if (hex.Length % 2 == 1)
            {
                hex = "0" + hex;
            }

            byte[] result = new byte[hex.Length / 2];

            for (int i = 0; i < hex.Length / 2; i++)
            {
                result[i] = byte.Parse(hex.Substring(2 * i, 2), System.Globalization.NumberStyles.AllowHexSpecifier);
            }

            return result;
        }
    }
}