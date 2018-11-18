var loginMain = loginMain || {};
loginMain.main = loginMain.main || {};
loginMain.countdown=60;
loginMain.weixinLogin={
		weixin_qrcode_expire:true,//是否已过期，默认已过期
		weixin_qrcode_expire_time:5*60,//5分钟过期
		weixin_qrcode_expire_timeer:"",//微信二维码过期定时器，时刻检测过期
		weixin_qrcode_timeer:""//微信二维码登录定时器，时刻检测登录
};
loginMain.email_hash={
		'qq.com': 'http://mail.qq.com',
		'gmail.com': 'http://mail.google.com',
		'sina.com': 'http://mail.sina.com.cn',
		'163.com': 'http://mail.163.com',
		'126.com': 'http://mail.126.com',
		'yeah.net': 'http://www.yeah.net/',
		'sohu.com': 'http://mail.sohu.com/',
		'tom.com': 'http://mail.tom.com/',
		'sogou.com': 'http://mail.sogou.com/',
		'139.com': 'http://mail.10086.cn/',
		'hotmail.com': 'http://www.hotmail.com',
		'live.com': 'http://login.live.com/',
		'live.cn': 'http://login.live.cn/',
		'live.com.cn': 'http://login.live.com.cn',
		'189.com': 'http://webmail16.189.cn/webmail/',
		'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
		'yahoo.cn': 'http://mail.cn.yahoo.com/',
		'eyou.com': 'http://www.eyou.com/',
		'21cn.com': 'http://mail.21cn.com/',
		'188.com': 'http://www.188.com/',
		'foxmail.coom': 'http://www.foxmail.com'
};
loginMain.main = {
    event_: function () {//事件 的绑定，常规的事件绑定，例如点击事件，改变事件，等都。。。。。
    	//微信登录点击事件
    	$("#login").click(function(){
    		show_login_modal();
    	});
    	//qq登录
    	$(".login_qq").click(function(){
    		var marginLeft = ($(document).width() - 640) / 2;
    		var data_href=$(this).attr("data_href");
    		location.href=data_href;
    	});
    	 //回车事件
	   	 $("input").keypress(function(event){
	   	 	if(event.keyCode == "13"){  
	   	 		$(this).closest("form").find("button").trigger("click");
	   	 	}
	   	 });
    	//账号登录
    	$("#loginForm input").change(function(){
    		$(this).closest("form").find(".valid-msg").hide();
    		
    	});
    	//手机邮箱登录
    	$("#loginForm button").click(function(){
    		loginMain.main.username_login($(this).closest("form"));
    	});
    	
    	//验证码切换------------
    	$(".captchaImage").click(function(){
    		loginMain.main.get_captcha_id($(this).closest("form"));
    	});
    	//手机注册框显示
    	$("#regModal").on("show.bs.modal",function(){
    		loginMain.main.get_captcha_id($(this).find("form"));
    	});
    	//邮箱注册框显示
    	$("#regemailModal").on("show.bs.modal",function(){
    		loginMain.main.get_captcha_id($(this).find("form"));
    	});
    	//找回密码
    	$("#zhpasswordModal").on("show.bs.modal",function(){
    		loginMain.main.get_captcha_id($(this).find("form"));
    	});
    	//验证码切换------------
    	
    	//手机注册------------
    	//注册表单验证提示
		$("#regMobileForm .field input").focusin(function(){
			if($(this).val()==""){
				$(this).siblings(".valid-tips").css('display','block');
			}else{
				$(this).siblings(".valid-tips").css('display','none');
			}
		});
		$("#regMobileForm .field input").focusout(function(){
			$(this).siblings(".valid-tips").css('display','none');
		});	
    	$("#regMobileForm .phone-field input").focusout(function(){
    		var _mobileValid = loginMain.main.validate_mobile($(this).closest("form"));
            if(_mobileValid && !common.main.check_mobile($(this).val())){
                $("#regMobileForm .phone-field").removeClass("succ").addClass("err");
                $("#regMobileForm .phone-field").find(".valid-error .error").text("该手机号码已被注册~");
            }
    	});	     
    	$("#regMobileForm .pwd-field input").focusout(function(){
    		loginMain.main.validate_password($(this).closest("form"));
    	});
    	$("#regMobileForm .code-field input").focusout(function(){
    		if(!loginMain.main.isNull($(this).val())){
    			$(this).siblings(".valid-error").find("p.error").css('display','none');
    		}
    	});
    	$("#regMobileForm .yzm-field input").focusout(function(){
    		if(!loginMain.main.isNull($(this).val())){
    			$(this).siblings(".valid-error").find("p.error").css('display','none');
    		}
    	});
    	//获取手机验证码
    	$(".mobileCodeBtn").click(function(){
    		loginMain.main.sendmsg($(this).closest("form"),true);
    	});
    	//手机注册
    	$("#regMobileForm button").click(function(){
    		loginMain.main.mobile_register($(this).closest("form"));
    	});
    	//手机注册------------
    	
    	//邮箱注册------------
		$("#regEmailForm .field input").focusout(function(){
			$(this).siblings(".valid-tips").css('display','none');
		});	
    	$("#regEmailForm .phone-field input").focusout(function(){
    		loginMain.main.validate_email($(this).closest("form"));
    	});	     
    	$("#regEmailForm .pwd-field input").focusout(function(){
    		loginMain.main.validate_password($(this).closest("form"));
    	});
    	$("#regEmailForm .code-field input").focusout(function(){
    		if(!loginMain.main.isNull($(this).val())){
    			$(this).siblings(".valid-error").find("p.error").css('display','none');
    		}
    	});
    	$("#regEmailForm button").click(function(){
    		loginMain.main.emali_register($(this).closest("form"));
		});
		// 验证邮箱关闭后，判断是否绑定微信
		$("#yzemailModal").on("hidden.bs.modal",function(){
			if(getCookie("memberIsBindWeixin")=="false"){
				location.href="/login/bind_weixin/";
				return;
			}
		})
    	//邮箱注册------------
    	
    	
    	//找回密码------
    	$("#zhpwdForm .code-field input").focusout(function(){
    		if(!loginMain.main.isNull($(this).val())){
    			$(this).siblings(".valid-error").find("p.error").css('display','none');
    		}
    	});
    	$("#forward_validate_email").click(function(){
    		var $this=$(this);
    		$this.find(".loading1").show();
    		setTimeout(function(){
    			$this.find(".loading1").hide();
    			$this.text("请注意查收邮件");
    		},2000)
    		loginMain.main.get_email_url($("#yzemailModal").find(".yz i").text());    		
    	});
    	$("#zhpwdForm button").click(function(){
    		loginMain.main.find_username($(this).closest("form"));
    	});
    	$("#zhpwdForm .username-field input").focusout(function(){
    		if(!loginMain.main.isNull($(this).val())){
    			$(this).siblings(".valid-error").find("p.error").css('display','none');
    			$(this).closest(".username-field").removeClass("err");
    		}
    	});
    	//手机找回密码提交-----
    	$("#yzphoneForm button").click(function(){
	    	loginMain.main.find_by_mobile_submit($(this).closest("form"));	
    	});
    	$("#yzphoneForm .yzm-field input").focusout(function(){
    		if(!loginMain.main.isNull($(this).val())){
    			$(this).siblings(".valid-error").find("p.error").css('display','none');
    			$(this).closest(".yzm-field").removeClass("err");
    		}
    	});
        //重新发送验证码
        $("#zhpwdbtn").click(function(){
            var $yzphoneForm = $("#yzphoneForm");
            var mid = $yzphoneForm.find("input[name='mid']").val();
            var mobile = $yzphoneForm.find("input[name='mobile']").val();
            loginMain.main.send_msg_code(mid, mobile, function(){
                loginMain.main.settime($yzphoneForm.find(".mobileCodeBtn"));
            });
        });
    	//找回密码------
    	
    	//-------绑定手机-----------
    	//提示
    	$("#glphoneform .field input").focusin(function(){
    		if($(this).val()==""){
    			$(this).siblings(".valid-tips").css('display','block');
    		}else{
    			$(this).siblings(".valid-tips").css('display','none');
    		}
    	});
    	$("#glphoneform .field input").focusout(function(){
    		$(this).siblings(".valid-tips").css('display','none');
    	});	
    	$("#glphoneform .phone-field input").focusout(function(){
    		loginMain.main.validate_mobile($(this).closest("form"));
    	});	     
    	$("#glphoneform .pwd-field input").focusout(function(){
    		loginMain.main.validate_password($(this).closest("form"));
    	});
    	//绑定
		$("#glphoneform button").click(function(){
			loginMain.main.bind_mobile_submit($(this).closest("form"));
		});
        $("#glphoneform .mobileCodeExtBtn").click(function(){//绑定手机获取验证码
            loginMain.main.sendmsgext($(this).closest("form"),true);
        });
		//-------绑定手机-----------
		
		
		//-------个人中心修改手机-----------
    	//提示
    	$("#xgphoneform .field input").focusin(function(){
    		if($(this).val()==""){
    			$(this).siblings(".valid-tips").css('display','block');
    		}else{
    			$(this).siblings(".valid-tips").css('display','none');
    		}
    	});
    	$("#xgphoneform .field input").focusout(function(){
    		$(this).siblings(".valid-tips").css('display','none');
    	});	
    	$("#xgphoneform .phone-field input").focusout(function(){
            var _mobileValid = loginMain.main.validate_mobile($(this).closest("form"));
            if(_mobileValid && !common.main.check_mobile($(this).val())){
                $("#xgphoneform .phone-field").removeClass("succ").addClass("err");
                $("#xgphoneform .phone-field").find(".valid-error .error").text("该手机号码已被注册~");
            }
    	});	     
    	//绑定
		$("#xgphoneform button").click(function(){
			loginMain.main.change_mobile_submit($(this).closest("form"));
		});
		//-------个人中心修改手机-----------
		
		
		//----------邮箱重置密码-----
		$("#resetForm button").click(function(){
			loginMain.main.reset_password_by_email($(this).closest("form"));
		});
		$("#resetForm .pwd-field input").focusout(function(){
    		loginMain.main.validate_password($(this).closest("form"));
    	});
		//---------邮箱重置密码-----
		
		//------------登录后修改密码----------
		$("#updatePasswordForm button").click(function(){
			loginMain.main.update_password_submit($(this).closest("form"));
		});
		$("#updatePasswordForm .pwd-field input").focusout(function(){
    		loginMain.main.validate_password($(this).closest("form"));
    	});
		//------------登录后修改密码----------
		//------------登录后修改邮箱---------
		$("#changeEmailForm button").click(function(){
			loginMain.main.change_email_submit($(this).closest("form"));
		});
		//-----------登录后修改邮箱---------
    },
    init_:function(){//内容初始化，页面加载就在初始化的内容
    	loginMain.main.event_();//初始化事件的绑定
    	//loginMain.main.init_weixin_login();//微信登录事件绑定
    	loginMain.main.input_tips();//输入框的提示
    },
    input_tips:function(){
    	$(".field input").focusin(function(){
			if($(this).val()==""){
				$(this).siblings(".valid-tips").css('display','block');
			}else{
				$(this).siblings(".valid-tips").css('display','none');
			}
			
		});
		$(".field input").focusout(function(){
			$(this).siblings(".valid-tips").css('display','none');
		});	
    },
    username_login: function (form) {

    	if(form==null||form==undefined){
    		layer.msg("获取不到登录参数，请刷新重试");
    		return;
    	}
    	var password=form.find("input[name='password']").val();
    	var username=form.find("input[name='username']").val();
    	var service=form.find("input[name='service']").val();
    	if(loginMain.main.isNull(password)||loginMain.main.isNull(username)){
    		form.find(".valid-msg").show();
    		form.find(".valid-msg").find(".incorrect_username").hide();
    		form.find(".valid-msg").find(".null_tips").show();
    		return;
    	}
    	$.ajax({
			url: "/Common/PublicKey/",
			type: "GET",
			dataType: "json",
			cache: false,
			beforeSend: function() {
				form.find("button").prop("disabled", true);
				form.find(".loading1").show();
			},
			success: function(data) {
				var rsaKey = new RSAKey();
				rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
				var enPassword = hex2b64(rsaKey.encrypt(form.find("input[name='password']").val()));
				$.ajax({
					url: form.attr("action"),
					type: "POST",
					data: {
						username: form.find("input[name='username']").val(),
						enPassword: enPassword,
						service:service,
						remember: true
					},
					dataType: "json",
					cache: false,
					success: function(message) {
						addCookie("rememberMobile", form.find("input[name='username']").val(), {expires: 365 * 24 * 60 * 60});
						if (message.type == "success") {
							layer.msg("登录成功");
							common.main.loginMsg();
							if(message.content==""){
								$("#zhloginModal").modal("hide");
								loginMain.main.get_login_status();
							}else{
								location.href = message.content;
							}
                        } else {
                            layer.msg(message.content, function () {
                                 
                            });
                            form.find(".valid-msg").show();
                            form.find(".valid-msg").find(".incorrect_username").show();
                            form.find(".valid-msg").find(".null_tips").hide();
                            if(message.content.indexOf("禁用") != -1 || message.content.indexOf("锁定") != -1){
                                common.main.resume_danger_alert();
                            }
						}
						form.find(".loading1").hide();
						form.find("button").prop("disabled", false);
					}
				});
			}
		});
    },
    get_login_status:function(){//获取登录或的状态
    	var redirectUrl =common.main.getUrlParamString("redirectUrl");
    	//1判断是否绑定了微信
    	if(getCookie("memberIsBindWeixin")=="false"){
    		if(!loginMain.main.isNull(redirectUrl)){
    			location.href="/login/bind_weixin/?redirectUrl="+decodeURI(redirectUrl);
    		}else{
    			location.href="/login/bind_weixin/";
    		}
    		//跳转到绑定微信页面
    		return;
    	}
    	//检查用户是否为团体会员
    	$.post("/bind/check_information/",function(data){
    		if(data.type == "success"){
    			var options = {
					title:'',
					content_html:'<div class="associate_success_contain"><h6>关联成功，已开通团体会员权限</h6><span>正在跳转个人中心.......</span><p>没有跳转？<a href="/member/">点此手动跳转</a></p></div>',
					modal_class:'associate_success_modal'
				}
				common.main.resume_confirm(options);
				setTimeout(function(){
					window.location.href = '/member/';
				},1000);
			}else{
				if(loginMain.main.isNull(redirectUrl)){
		    		location.reload();
		    	}else{
		    		location.href=decodeURI(redirectUrl);
		    	}
			}
    	});
    },
    get_captcha_id:function(form){
    	if(loginMain.main.isNull(form)){
    		return;
    	}
    	var captchaId=form.find('input[name="captchaId"]').val();
    	if(loginMain.main.isNull(captchaId)){
    		$.get("/common/getCaptchaId/?v_time="+new Date().getTime(),function(data){
    			form.find('input[name="captchaId"]').val(data);
    			captchaId=data;
    			form.find("img.captchaImage").attr("src","/common/captcha/?captchaId="+data);
    		});
    	}else{
    		form.find("img.captchaImage").attr("src","/common/captcha/?captchaId="+captchaId);
    	}
    },
    mobile_register:function(form){
    	if(loginMain.main.isNull(form)){
    		layer.msg("注册参数异常~，请刷新重试~");
    		return;
    	}
    	//校验表单
    	var mid=form.find('input[name="mid"]').val();
    	var captchaCode=form.find('input[name="captchaCode"]').val();
    	var captchaId=form.find('input[name="captchaId"]').val();
    	var code=form.find('input[name="code"]').val();
    	var mobile=form.find('input[name="mobile"]').val();
    	var password=form.find('input[name="password"]').val();
        form.find(".valid-tips").css('display','none');
    	//校验手机号码
        var _mobileValid = loginMain.main.validate_mobile(form);
    	if(!_mobileValid){
    		return;
    	}
        if(_mobileValid && !common.main.check_mobile(mobile)){
            form.find(".phone-field").removeClass("succ").addClass("err");
            form.find(".phone-field").find(".valid-error .error").text("该手机号码已被注册~");
            layer.msg("该手机号码已被绑定~",{time:2000});
            return;
        }
    	//校验手机号码
    	if(!loginMain.main.validate_password(form)){
    		return;
    	}
    	if(loginMain.main.isNull(captchaCode)){
    		form.find(".code-field").find("p.error").show();
    		return;
    	}
    	if(loginMain.main.isNull(code)){
    		form.find(".yzm-field").find("p.error").show();
    		return;
    	}
    	$.ajax({
			url: "/Common/PublicKey/",
			type: "GET",
			dataType: "json",
			cache: false,
			beforeSend: function() {
				form.find("button").prop("disabled", true);
				form.find(".loading1").show();
			},
			success: function(data) {
				var rsaKey = new RSAKey();
				rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
				var enPassword = hex2b64(rsaKey.encrypt(password));
				$.ajax({
					url: form.attr("action"),
					type: "POST",
					data: {
						mobile:mobile,
						mid: mid,
						code: code,
						enPassword: enPassword
					},
					dataType: "json",
					cache: false,
					success: function(message) {
						if (message.type == "success") {
							layer.msg("注册成功",{time:2000});
							form.find("button").prop("disabled", false);
							loginMain.main.get_login_status();
//							setTimeout(function(){
//								location.href="/register/register_success/"
//							},1500);
						} else {
							layer.msg(message.content,{time:2000});
							form.find("button").prop("disabled", false);
							var url="/common/captcha/?captchaId="+captchaId+"&?v_time="+new Date().getTime();
							form.find(".captchaImage").attr("src",url);
						}
						form.find(".loading1").hide();
					}
				});
			}
		});
    },
    emali_register:function(form){
    	if(loginMain.main.isNull(form)){
    		layer.msg("注册参数异常~，请刷新重试~");
    		return;
    	}
    	//校验表单
    	var captchaCode=form.find('input[name="captchaCode"]').val();
    	var captchaId=form.find('input[name="captchaId"]').val();
    	var email=form.find('input[name="email"]').val();
    	var password=form.find('input[name="password"]').val();
    	//校验邮箱
    	if(!loginMain.main.validate_email(form)){
    		return;
    	}
    	//校验手机号码
    	if(!loginMain.main.validate_password(form)){
    		return;
    	}
    	if(loginMain.main.isNull(captchaCode)){
    		form.find(".code-field").find("p.error").show();
    		return;
    	}
    	$.ajax({
			url: "/Common/PublicKey/",
			type: "GET",
			dataType: "json",
			cache: false,
			beforeSend: function() {
				form.find("button").prop("disabled", true);
				form.find(".loading1").show();
			},
			success: function(data) {
				var rsaKey = new RSAKey();
				rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
				var enPassword = hex2b64(rsaKey.encrypt(password));
				$.ajax({
					url: form.attr("action"),
					type: "POST",
					data: {
						email: email,
						captchaId:captchaId,
						captcha:captchaCode,
						enPassword: enPassword
					},
					dataType: "json",
					cache: false,
					success: function(message) {
						if (message.type == "success") {
							layer.msg("注册成功~",{time:2000});
							common.main.loginMsg();
							 //注册成功，跳转到邮箱验证窗口
							 //2发送邮件
							 var send_url="/login/login_bind_email_send/";
				 			 var send_flag=loginMain.main.sendEmail(email,send_url,"POST");
				 			 //3展示窗口
				 			 if(send_flag){
				 				 var data_type=form.find("button").attr("data_type");
				 				 if(loginMain.main.isNull(data_type)){
				 					 $("#yzemailModal").modal("show");
					 				 form.closest("div.lrModal").modal("hide");
				 				 }else{
				 					 $("#yzemailModal").show();
					 				 form.closest("div.lrModal").hide();
				 				 }
				 				 $("#yzemailModal").find(".yz i").text(email);
				 				 $("#yzemailModal").find(".yz a").hide();
				 			 }
						} else {
							layer.msg(message.content,{time:2000});
							var url="/common/captcha/?captchaId="+captchaId+"&?v_time="+new Date().getTime();
							form.find(".captchaImage").attr("src",url);
						}
						form.find(".loading1").hide();
						form.find("button").prop("disabled", false);
					}
				});
			}
		});
    },
    find_username:function(form){//找回账号
    	if(loginMain.main.isNull(form)){
    		layer.msg("提交参数错误~，请刷新重试~");
    		return;
    	}
    	//校验表单
    	var captchaCode=form.find('input[name="captchaCode"]').val();
    	var captchaId=form.find('input[name="captchaId"]').val();
    	var username=form.find('input[name="username"]').val();

    	//判断是手机还是邮箱
    	 var emailreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;    
    	 var mobilereg = /^1\d{10}$/;    
    	 var $errorTips = form.find(".username-field");
    	 var find_type="mobile";
    	 if(emailreg.test(username)){//是邮箱
    		 $errorTips.find(".valid-error .error").text("");
    		 find_type="email";
    	 }else if(mobilereg.test(username)){//是手机
    		 $errorTips.find(".valid-error .error").text("");
    		 find_type="mobile";
    	 }else{
    		 $errorTips.addClass("err").removeClass("succ");
    		 $errorTips.find(".valid-error .error").text("请输入正确的手机号或邮箱");
      	 	 find_type="";
      	 	 return;
    	 }
    	 if(loginMain.main.isNull(captchaCode)){
    		 form.find(".code-field").find("p.error").show();
    		 return;
    	 }
    	 //判断是什么类型
    	 form.find(".loading1").show();
    	 form.find("button").prop("disabled", true);
    	 var submit_type= form.find("button").attr("data_type");
    	 if(loginMain.main.isNull(submit_type)){
    		 submit_type="ajax";
    	 }
    	 if(find_type=="mobile"){//手机
    		 //1检测手机是已注册
    		 if(common.main.check_mobile(username)){
    			 layer.msg("该手机号码未注册账号~");
    			 form.find(".loading1").hide();
    			 form.find("button").prop("disabled", false);
    			 return;
    		 }
    		 //2发送验证码
    		 var flag=loginMain.main.sendmsg(form,false);
    		 if(flag){
    			 if(submit_type=="ajax"){
    				//3跳转到对应的窗口
            		 $("#tipsMobile").text(username);
            		 $("#zhpasswordModal").modal("hide");
            		 $("#yzphoneModal").modal("show");
            		 loginMain.main.settime($("#yzphoneForm").find(".mobileCodeBtn"));
            		 $("#yzphoneForm").find('input[name="mobile"]').val(username);
    			 }else{
    				setTimeout(function(){
    					 location.href="/password/findpswdphone/?mobile="+username;
    				},1500)
    			 }
    		 }
    		 form.find(".loading1").hide();
    		 form.find("button").prop("disabled", false);
    	 }else if(find_type=="email"){
    		 //1检测邮箱是否已注册
    		 if(common.main.check_email(username)){
    			 layer.msg("该邮箱未注册账号~");
    			 form.find(".loading1").hide();
    			 form.find("button").prop("disabled", false);
    			 return;
    		 }
    		 //2发送邮件
    		 var send_url="/password/findbyemail/";
 			 var send_flag=loginMain.main.sendEmail(username,send_url,"GET");
 			 //3展示窗口
 			 if(send_flag){
 				 if(submit_type=="ajax"){
 				 	 $("#zhpasswordModal").modal("hide");
	 				 $("#yzemailModal").modal("show");
	 				 $("#yzemailModal").find(".yz i").text(username);
	 				 $("#yzemailModal").find(".yz a").show();
 				 }else{
     				setTimeout(function(){
	   					 location.href="/password/findpswdemail/?email="+encodeURI(username);
	   				},1500)
	   			 }
 			 }
 			 form.find(".loading1").hide();
			 form.find("button").prop("disabled", false);
    	 }else{
    		 layer.msg("当前输入的账号不合法~，请输入注册的手机或邮箱");
    		 form.find(".loading1").hide();
    		 form.find("button").prop("disabled", false);
    		 return;
    	 }
    },
    find_by_mobile_submit:function(form){
    	if(loginMain.main.isNull(form)){
    		layer.msg("提交参数异常~，请刷新重试~");
    		return;
    	}
    	//校验表单
    	var mid=form.find('input[name="mid"]').val();
    	var mobile=form.find('input[name="mobile"]').val();
    	var code=form.find('input[name="code"]').val();
    	var password=form.find('input[name="password"]').val();
    	//校验密码
    	if(!loginMain.main.validate_password(form)){
    		return;
    	}
    	if(loginMain.main.isNull(code)){
    		form.find(".yzm-field").find("p.error").show();
    		return;
    	}
    	$.ajax({
			url: "/Common/PublicKey/",
			type: "GET",
			dataType: "json",
			cache: false,
			beforeSend: function() {
				form.find("button").prop("disabled", true);
				form.find(".loading1").show();
			},
			success: function(data) {
				var rsaKey = new RSAKey();
				rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
				var enPassword = hex2b64(rsaKey.encrypt(password));
				$.ajax({
					url: "/password/findByMobileSubmit/",
					type: "POST",
					data: {
						mobile:mobile,
						code:code,
						mid:mid,
						enPassword: enPassword
					},
					dataType: "json",
					cache: false,
					success: function(message) {
						layer.msg(message.content,{time:2000});
						if (message.type == "success") {
							setTimeout(function(){
								location.href="/password/find_success/";
							},1500)
						}
						form.find("button").prop("disabled", false);
						form.find(".loading1").hide();
					}
				});
			}
		});
    },
    bind_mobile_submit:function(form){
       var mid=form.find('input[name="mid"]').val();
	   var code=form.find('input[name="code"]').val();
	   var mobile=form.find('input[name="mobile"]').val();
	   var  password=form.find('input[name="password"]').val();
       form.find(".valid-tips").css('display','none');
	   //校验手机号码
       var _mobileValid = loginMain.main.validate_mobile(form);
	   if(!_mobileValid){
	   	return;
	   }
	   //校验密码
	   if(!loginMain.main.validate_password(form)){
	   	return;
	   }
	   if(loginMain.main.isNull(code)){
	   	form.find(".yzm-field").find("p.error").show();
	   	return;
	   }
	   $.ajax({
			url: "/Common/PublicKey/",
			type: "GET",
			dataType: "json",
			cache: false,
			beforeSend: function() {
				form.find("button").prop("disabled", true);
				form.find(".loading1").show();
			},
			success: function(data) {
				var rsaKey = new RSAKey();
				rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
				var enPassword = hex2b64(rsaKey.encrypt(password));
				$.ajax({
					url: form.attr("action"),
					type: "POST",
					data: {
						mobile:mobile,
						code:code,
						mid: mid,
						enPassword: enPassword
					},
					dataType: "json",
					cache: false,
					success: function(message) {
						if (message.type == "success") {
							layer.msg("绑定成功",{time:2000});
							form.find("button").prop("disabled", false);
							var redirectUrl =common.main.getUrlParamString("redirectUrl");
		    				if(!loginMain.main.isNull(redirectUrl)){
		    					setTimeout(function(){
		    						location.href=redirectUrl;
		        				},2000);
		    	    		}else{
		    	    			setTimeout(function(){
									location.href="/";
								},2000);
		    	    		}
						} else {
							layer.msg(message.content,{time:2000});
							form.find("button").prop("disabled", false);
							var url="/common/captcha/?captchaId="+captchaId+"&?v_time="+new Date().getTime();
							form.find(".captchaImage").attr("src",url);
						}
						form.find(".loading1").hide();
					}
				});
			}
		});
    },
    change_mobile_submit:function(form){
       var mid=form.find('input[name="mid"]').val();
 	   var captchaCode=form.find('input[name="captchaCode"]').val();
 	   var captchaId=form.find('input[name="captchaId"]').val();
 	   var code=form.find('input[name="code"]').val();
 	   var mobile=form.find('input[name="mobile"]').val();
       form.find(".valid-tips").css('display','none');
 	   //校验手机号码
       var _mobileValid = loginMain.main.validate_mobile(form);
 	   if(!_mobileValid){
 	   	return;
 	   }
       if(_mobileValid && !common.main.check_mobile(mobile)){
        form.find(".phone-field").removeClass("succ").addClass("err");
        form.find(".phone-field").find(".valid-error .error").text("该手机号码已被注册~");
        layer.msg("该手机号码已被绑定~",{time:2000});
        return;
       }
 	   if(loginMain.main.isNull(captchaCode)){
 	   	form.find(".code-field").find("p.error").show();
 	   	return;
 	   }
 	   if(loginMain.main.isNull(code)){
 	   	form.find(".yzm-field").find("p.error").show();
 	   	return;
 	   }
 	  $.ajax({
			url: form.attr("action"),
			type: "POST",
			data: {
				mobile:mobile,
				code:code,
				mid: mid
			},
			dataType: "json",
			cache: false,
			beforeSend: function() {
 				form.find("button").prop("disabled", true);
 				form.find(".loading1").show();
 			},
			success: function(message) {
				if (message.type == "success") {
					layer.msg("修改成功",{time:2000});
					form.find("button").prop("disabled", false);
					setTimeout(function(){
						location.href="/member/";
					},2000);
				} else {
					layer.msg(message.content,{time:2000});
					form.find("button").prop("disabled", false);
					var url="/common/captcha/?captchaId="+captchaId+"&?v_time="+new Date().getTime();
					form.find(".captchaImage").attr("src",url);
				}
				form.find(".loading1").hide();
			}
		});
     },
    reset_password_by_email:function(form){//邮箱重置密码
    	 var password=form.find('input[name="password"]').val();
    	 var repassword=form.find('input[name="repassword"]').val();
    	 var email=form.find('input[name="email"]').val();
    	 var key=form.find('input[name="key"]').val();
    	 //校验密码
  	    if(!loginMain.main.validate_password(form)){
  	    	return;
  	    }
  	    if(repassword!=password){
  	    	layer.msg("两次密码输入不一致");
  	    	return;
  	    }
    	$.ajax({
			url: "/Common/PublicKey/",
			type: "GET",
			dataType: "json",
			cache: false,
			beforeSend: function() {
				form.find("button").prop("disabled", true);
				form.find(".loading1").show();
			},
			success: function(data) {
				var rsaKey = new RSAKey();
				rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
				var enPassword = hex2b64(rsaKey.encrypt(password));
				$.ajax({
					url: "/password/update/",
					type: "GET",
					data: {
						email:email,
						key:key,
						enPassword: enPassword
					},
					dataType: "json",
					cache: false,
					success: function(message) {
						layer.msg(message.content,{time:2000});
						if (message.type == "success") {
							setTimeout(function(){
								location.href="/login/";
							},2000)
						}
						form.find("button").prop("disabled", false);
						form.find(".loading1").hide();
					}
				});
			}
		});
    },
    update_password_submit:function(form){//登录后修改密码
    	 var passwordold=form.find('input[name="passwordold"]').val();
    	 var password=form.find('input[name="password"]').val();
    	 var repassword=form.find('input[name="repassword"]').val();
    	//校验密码
   	    if(!loginMain.main.validate_password(form)){
   	    	return;
   	    }
   	    if(repassword!=password){
   	    	layer.msg("两次密码输入不一致");
   	    	return;
   	    }
   	    form.find("button").prop("disabled", true);
		form.find(".loading1").show();
    	$.ajax({
				url: "/member/newpassword/",
				type: "POST",
				data: {
					passwordold:passwordold, password:password
				},
				dataType: "json",
				cache: false,
				success: function(data) {
					if(data == 1){
						layer.msg("密码修改成功",{time:2000});
						setTimeout(function(){
							location.href="/member/";
						},2000)
					}else{
						layer.msg("原密码错误~",{time:2000});
					}
					form.find("button").prop("disabled", false);
					form.find(".loading1").hide();
				}
		});
    },
    change_email_submit:function(form){//修改邮箱
    	var email=form.find('input[name="email"]').val();
    	var confrEmail=form.find('input[name="confrEmail"]').val();
    	
		common.main.validate({
			rules: [{
				target: email,
				required: true,
				type: "email",
				equalTo:confrEmail
			}],
			onTips: function(tag, massage){
				layer.msg(massage);
			},
			onOk: function(value){
				if (!common.main.check_email(confrEmail)) {
					layer.msg("该邮箱已被绑定~");
					return;
				}
		  	    $.ajax({
					 url: "/member/set_email_confr/",
					 dataType: "json",
					 type: "post",
					 data: {"email":email,"confrEmail":confrEmail},
					 beforeSend: function() {
						 	form.find("button").prop("disabled", true);
							form.find(".loading1").show();
					 },
					 success: function(message){
					 	layer.msg(message.content);
			        	if(message.type=="success"){
			        		$("#yzemailModal").show();
			        		$("#changeEmailyzemailModal").hide();
			        		$("#yzemailModal").find(".yz i").text(confrEmail);
			        	}
			      	    form.find("button").prop("disabled", false);
			    		form.find(".loading1").hide();
			     	}
			    });
			},
		})
    },
    bind_weixin:function(){//微信登录的统一管理
    	//1微信绑定二位生成
    	//获取微信登录二维码
		loginMain.main.get_weixin_login_qrcod();
		//启动扫描登录检测定时器
		loginMain.weixinLogin.weixin_qrcode_expire_timeer=setInterval("loginMain.main.weixin_login_check()",1500);
		
    	//2二维过期定时器，二维码5分钟过期，
    	loginMain.weixinLogin.weixin_qrcode_expire_timeer=setInterval(function(){
    		loginMain.weixinLogin.weixin_qrcode_expire_time--;
    		if(loginMain.weixinLogin.weixin_qrcode_expire_time<=0){
    			clearInterval(loginMain.weixinLogin.weixin_qrcode_expire_timeer);
    			clearInterval(loginMain.weixinLogin.weixin_qrcode_timeer);
    			$("#reflesh_qrcode").closest("div").show();
    		}
    	},1000);
    	//3二维码刷新
    	$("#reflesh_qrcode").click(function(){
    		//清除定时器
    		clearInterval(loginMain.weixinLogin.weixin_qrcode_expire_timeer);
    		//重新获取
    		loginMain.weixinLogin.weixin_qrcode_expire_timeer=setInterval("loginMain.main.weixin_login_check()",1500);
			//获取微信登录二维码
			loginMain.main.get_weixin_login_qrcod();
    	});
    },
    weixin_login_check:function(){//微信登录检测
    	var redirectUrl =common.main.getUrlParamString("redirectUrl");
    	if(!loginMain.weixinLogin.weixin_qrcode_expire){
    		$.get("/login/weixinLoginCheck/",function(message){
    			if(message.type=="success"){
    				layer.msg("绑定成功~",{time:2000});
    				clearInterval(loginMain.weixinLogin.weixin_qrcode_expire_timeer);
        			clearInterval(loginMain.weixinLogin.weixin_qrcode_timeer);
    				loginMain.weixin_qrcode_expire=true;
    				if(!loginMain.main.isNull(redirectUrl)){
    					setTimeout(function(){
    						location.href=redirectUrl;
        				},2000);
    	    		}else{
    	    			setTimeout(function(){
        					location.href="/register/register_success/"
        				},2000);
    	    		}
    				//登录成功,判断是否绑定了手机号
    			}else if(message.type=="error"){//二维码失效
    				clearInterval(loginMain.weixinLogin.weixin_qrcode_expire_timeer);
        			clearInterval(loginMain.weixinLogin.weixin_qrcode_timeer);
        			loginMain.weixinLogin.weixin_qrcode_expire=true;
        			$("#reflesh_qrcode").closest("div").show();
        			alert(message.content);
    			}
    		});
    	}
    	
    },
    get_weixin_login_qrcod:function(){//获取微信登录二维码
    	$.post("/weixin/get_weixin_qrcode/",function(message){
			if(message.type=="success"){
				//获取图片
				$("#weixin_qrcode_image").attr("src","https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+encodeURI(message.content));
				loginMain.weixinLogin.weixin_qrcode_expire=false;
				loginMain.weixinLogin.weixin_qrcode_expire_time=5*60;
				$("#reflesh_qrcode").closest("div").hide();
			}else{
				layer.msg(message.content);
				$("#reflesh_qrcode").closest("div").show();
				clearInterval(loginMain.weixinLogin.weixin_qrcode_timeer);
			}
		});
    },
    validate_mobile:function(form){
    	if(form==null||form.length<=0){
    		layer.msg("参数错误，请刷新重试~");
    		return false;
    	}
    	var $mobiles=form.find('input[name="mobile"]');
    	if($mobiles.length<=0){
    		$mobiles=form.find('input[name="username"]');
    	}
    	 var phone = $mobiles.val();
    	 var myreg = /^1\d{10}$/;
    	 var $this = $mobiles.closest(".phone-field");
    	 if(phone == ''){
    	 	$this.removeClass("err").removeClass("succ");
    	 	return false;
    	 }else if(phone.length !=11){
    	 	$this.addClass("err").removeClass("succ");
    	 	$this.find(".valid-error .error").text("请输入有效的手机号码");
    	 	return false;
    	 }else if(!myreg.test(phone)){
    	 	$this.addClass("err").removeClass("succ");
    	 	$this.find(".valid-error .error").text("请输入有效的手机号码");
    	 	return false;
    	 }else{
    	    $this.removeClass("err").addClass("succ");
    	 	$this.find(".valid-error .error").text("");
    	 }
    	 return true;
    },
    validate_email:function(form){
    	if(form==null||form.length<=0){
    		layer.msg("参数错误，请刷新重试~");
    		return false;
    	}
    	 var email = form.find('input[name="email"]').val();
    	 var myreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;    
    	 var $this = form.find('input[name="email"]').closest(".phone-field");
    	 if(email == ''){
    	 	$this.removeClass("err").removeClass("succ");
    	 	return false;
    	 }else if(!myreg.test(email)){
    	 	$this.addClass("err").removeClass("succ");
    	 	$this.find(".valid-error .error").text("请输入正确的邮箱账号");
    	 	return false;
    	 }else if(!common.main.check_email(email)){
    	 	$this.addClass("err").removeClass("succ");
    	 	$this.find(".valid-error .error").text("该邮箱已被注册，请直接登录");
    	 	return false;
    	 }else{
    	    $this.removeClass("err").addClass("succ");
    	 	$this.find(".valid-error .error").text("");
    	 }     
    	 return true;
    },
    validate_password:function(form){
    	var pwd = form.find('input[name="password"]').val();;
    	var len =pwd.length;

    	var $this = form.find(".pwd-field");
    	var myreg = /^(\w){6,20}$/;
    	if(pwd == ''){
          	$this.removeClass("err").removeClass("succ");
          	return false;
    	}else if(len<6){
          	$this.addClass("err").removeClass("succ");
          	$this.find(".valid-error .error").text("请输入6-20个字符的密码");	
          	return false;
    	}else if(len>20){
          	$this.addClass("err").removeClass("succ");
          	$this.find(".valid-error .error").text("请输入6-20个字符的密码");
          	return false;
    	}else if(!myreg.test(pwd)){
          	$this.addClass("err").removeClass("succ");
          	$this.find(".valid-error .error").text("只能输入6-20个字母、数字、下划线");	
          	return false;
    	}else{
      	  $this.removeClass("err").addClass("succ");
      	  $this.find(".valid-error .error").text("");		
    	}
    	return true;
    },
    send_msg_code:function(mid,phone,callback){
    	//发送验证码
		$.ajax({
			type : "GET",
			url : "/Common/PublicKey/",
			async : false,
			success : function(data) {
                var _rsaKey = new RSAKey();
                _rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
                var _enPhone = hex2b64(_rsaKey.encrypt(phone));
                $.ajax({
                	timeout: 5000,
		            type : "post",
		            url : "/common/get_msg_code/",
		            data :{"mid":mid,"mobile":phone,"enMobile":_enPhone},
		            success : function(message){
		            	layer.msg(message.content,{time:2000});
		                if(message.type == "success"){
		                	callback();
		                }
		            }
		        });
            }
		});
    },
    sendmsg:function(form,is_async){
    	if(form==null||form.length<=0){
    		layer.msg("参数错误，请刷新重试~");
    		return false;
    	}
    	var mid=form.find('input[name="mid"]').val();
    	var captchaId=form.find('input[name="captchaId"]').val();
    	var captchaCode=form.find('input[name="captchaCode"]').val();
    	var $mobiles=form.find('input[name="mobile"]');
    	if($mobiles.length<=0){
    		$mobiles=form.find('input[name="username"]');
    	}
    	var mobile=$mobiles.val();
    	if(captchaCode==""||captchaCode==null||captchaCode==undefined){
    		form.find(".code-field").find(".valid-error").find("p.error").show();
    		return false;
    	}
    	//校验手机号码
    	if(loginMain.main.validate_mobile(form)){
    		//校验图形验证码
    		if(captchaCode==""||captchaCode==null||captchaCode==undefined){
    			var fielderr=form.find('input[name="captchaCode"]').closest(".phone-field");
    			fielderr.addClass("err").removeClass("succ");
    			fielderr.find(".valid-error .error").text("请输入图像验证码吗，");
    			return false;
    		}else{
    			if(is_async==null||is_async==undefined||is_async){
    				$.post("/common/msg/",{"mid":mid,"captchaId":captchaId,"captchaCode":captchaCode,"mobile":mobile},function(message){
        				layer.msg(message.content,{time:2000});
        				if(message.type=="success"){
        					loginMain.main.settime(form.find(".mobileCodeBtn"));
        					return true;
        				}else{
        					var url="/common/captcha/?captchaId="+captchaId+"&?v_time="+new Date().getTime();
        					form.find(".captchaImage").attr("src",url);
        					return false;
        				}
        			});
    			}else{
    				var flag=false;
    				$.ajax({  
       		          type : "post",  
       		          url : "/common/msg/",  
       		          data :{"mid":mid,"captchaId":captchaId,"captchaCode":captchaCode,"mobile":mobile},  
       		          async : false,  
       		          success : function(message){
        				layer.msg(message.content,{time:2000});
        				if(message.type=="success"){
        					loginMain.main.settime(form.find(".mobileCodeBtn"));
        					flag= true;
        				}else{
        					var url="/common/captcha/?captchaId="+captchaId+"&?v_time="+new Date().getTime();
        					form.find(".captchaImage").attr("src",url);
        					flag= false;
        				}
        			   }
    				}); 
    				return flag;
    			}
    		}
    	}
    },
    sendmsgext:function(form,is_async){//msg_ext
        if(form==null||form.length<=0){
            layer.msg("参数错误，请刷新重试~");
            return false;
        }
        var mid=form.find('input[name="mid"]').val();
        var $mobiles=form.find('input[name="mobile"]');
        if($mobiles.length<=0){
            $mobiles=form.find('input[name="username"]');
        }
        var mobile=$mobiles.val();
        //校验手机号码
        if(loginMain.main.validate_mobile(form)){
            if(is_async==null||is_async==undefined||is_async){
                $.post("/common/msg_ext/",{"mid":mid,"mobile":mobile},function(message){
                    layer.msg(message.content,{time:2000});
                    if(message.type=="success"){
                        loginMain.main.settime(form.find(".mobileCodeExtBtn"));
                        return true;
                    }else{
                        return false;
                    }
                });
            }else{
                var flag=false;
                $.ajax({  
                  type : "post",  
                  url : "/common/msg_ext/",  
                  data :{"mid":mid,"mobile":mobile},  
                  async : false,  
                  success : function(message){
                    layer.msg(message.content,{time:2000});
                    if(message.type=="success"){
                        loginMain.main.settime(form.find(".mobileCodeExtBtn"));
                        flag= true;
                    }else{
                        flag= false;
                    }
                   }
                }); 
                return flag;
            }
        }
    },
    sendEmail:function(email,send_url,send_method){//发送邮件
    	var flag=false;
    	//发送邮件
    	$.ajax({
    		url: send_url,
    		type: send_method,
    		data: {"email":email},
    		dataType: "json",
    		async:false,
    		cache: false,
    		success: function(message) {
    			if(message.type=="success"){
    				flag=true;
    			}else{
    				layer.msg(message.content);
    			}
    		}
    	});
    	return flag;
    },
    settime:function(obj) {//获取验证码倒计时
        if(!obj || obj.length == 0){
            return;
        }	  
        if (loginMain.countdown == 0) { 
        	obj.attr("disabled", false); 
            obj.val("获取验证码"); 
            loginMain.countdown = 60; 
            return;
        }else if(loginMain.countdown == 1){
        	$(".valid-yzm-tips").css('display','none');
        	obj.val("重新发送(1)"); 
        	loginMain.countdown = 0;
        }else {
            obj.attr("disabled", true); 
            obj.val("重新发送(" + loginMain.countdown + ")"); 
            $(".valid-yzm-tips i").text(loginMain.countdown);
            loginMain.countdown--; 
        } 
    	setTimeout(function(){loginMain.main.settime(obj)},1000) 
    },
	is_bind_mobile:function(){
		var memberIsVerifyMobile=getCookie("memberIsVerifyMobile");
		if(memberIsVerifyMobile!=undefined&&memberIsVerifyMobile=="true"){//已验证验证
			return true;
		}else{
			return false;
		}
	},
	isNull:function(val){
    	if(val==""||val==null||val==undefined){
    		return true;
    	}else{
    		return false;
    	}
    },
    get_email_url:function(email){
    	if(loginMain.main.isNull(email)){
    		layer.msg("您的邮箱无法从这里打开，请自行前往邮箱验证账号");
    		return;
    	}
    	var type = email.split('@')[1];
		var open_url="";
		for (var j in loginMain.email_hash){
			if(type == j) {
				open_url=loginMain.email_hash[type];
			}
		}
		if(open_url!=""){
			window.open(open_url);
		}else{
			layer.msg("您的邮箱无法从这里打开，请自行前往邮箱验证账号");
		}
	}
}
$(function () {
	//页面dom加载完后。，就初始化loginMain
	loginMain.main.init_();
});