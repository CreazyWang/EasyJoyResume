 
using Aliyun.Acs.Core;
using Aliyun.Acs.Core.Exceptions;
using Aliyun.Acs.Core.Profile;
using Aliyun.Acs.Dm.Model.V20151123;

namespace EasyJoyResume.Utility
{
    public class AliYunSendMail
    {
        public static bool SendMail()
        {
            IClientProfile profile = DefaultProfile.GetProfile("cn-hangzhou", "LTAIaf00roGRwfnJ", "GDPQuJT9jUAMieIBIT0U110GDLb5xg");
            IAcsClient client = new DefaultAcsClient(profile);
            SingleSendMailRequest request = new SingleSendMailRequest();
            try
            {
                request.AccountName = "jianyue@jy500.cn";
                request.FromAlias = "简悦简历";
                request.AddressType = 1;
                request.TagName = "jianyue";
                request.ReplyToAddress = true;
                request.ToAddress = "1160651865@qq.com";
                request.Subject = "简悦简历";
                request.HtmlBody = "这是一封简悦简历的测试邮件！";
                SingleSendMailResponse httpResponse = client.GetAcsResponse(request);
                return true;
            }
            catch (ServerException e)
            {
                //e.printStackTrace();
                return false;
            }
            catch (ClientException e)
            {
                //e.printStackTrace();
                return false;
            }
        }
    }
}