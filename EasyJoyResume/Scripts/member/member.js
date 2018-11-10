/**
 * 个人中心js文件
 * member.info:存放全局通用属性(常量等)
 *
 * 通用方法和事件结构为 member.main.xxx();
 * 页面事件结构为 member.job_manager()

 * 变量命名规范：
 * 1一律使用下横杆 _ 号来分隔英文单词，而不是采用驼峰式写法。
 2常量（声明后不会变化的变量）命名全部字母统一大写，用下横杆 _ 分隔英文
 3函数 / 方法 内 局部变量的命名，添加前缀 _ 号
 4声明变量赋值 jquery 对象或 js 对象时，添加变量名前缀 $ 符号

 * 方法命名规范：按功能命名，命名清晰易懂，规则按统一命名方式
 */

var member = member || {};

member.info = {};
member.main = {
    create_editor:function(create_editor){//创建工单富文本
        if(create_editor.length <= 0){
            return;
        }
        var editor = new wangEditor(create_editor);
        // 上传图片
        editor.config.uploadImgUrl = '/file/upload/';
        editor.config.uploadImgFileName = 'file';
        editor.config.uploadParams = {
            token: getCookie("token"),
            "fileType":"workOrderFile"
        };
        // 自定义上传事件
        editor.config.uploadImgFns.onload = function (resultText, xhr) {
            var originalName = editor.uploadImgOriginalName || '';
            var html='<img src=' + resultText + ' alt="' + originalName + '"  style="max-width:100%;"/>';
            editor.command(null, 'insertHtml', html);
        };
        editor.config.uploadHeaders = {}
        editor.config.menus = ['img',];
        editor.create();
    },
    // 个人中心左侧高度自适应
    left_adaption:function(){
        var _leftHeight = $(".jl-member-rd").height(),
        _rightHeight = $(".jl-member-ld").height();
        if(_leftHeight < _rightHeight){
            $(".jl-member-rd").height(_rightHeight);
        }
    }
};
member.event ={
    // 求职记录详情页
    hr_account_setting_event:function(){
        member.main.left_adaption();
        $(".purse_content .purse_tab .apply_Withdrawals").not(".empty").on("click",function(){
            var _text = $(".purse_content .purse_tab:nth-child(2) .purse_tab_body").text().substr(1);
            common.main.resume_confirm({
                title:"",
                content_html:"<span class='delete-title'>提现确认</span><span class='delete-tips'>本次提现金额为："+_text+"元，点击“确定”提交提现申请，提现金额将在下月月初到账。</span>",
                modal_class:"delete-content",
                ok:"确定",
                cancel:"取消",
                onOk:function(){
                    //  提现方法写在这里
                	$.post("/member/hr/apply_settlement/",{amount:_text},function(message){
                 	   if(message.type=="success"){
                 		   layer.msg("申请成功",{time:2000});
                 		  location.reload();
                 	   }else{
                 		   layer.msg(message.content);
                 	   }
                    })
                }
            });

        }); // 提现按钮点击事件绑定

        $(".hrDiv .fwzt_btn").click(function(){
            var id= $(".jl-member-ld .member-nav .hr").attr("id");
            $(this).toggleClass("jd");
            $.get("/member/hr/editStatus/",{"id":id},function(data){
                if(data.type!="success"){
                    layer.msg(data.content)
                }else{
                    $(this).toggleClass("jd");
                }
            });
        });     // 服务状态设置
        $(".hrDiv .xrw_btn").click(function(){
            var $this=$(this);
            $.post("/member/hr/demand_post_status/",function(data){
                if(data.type!="success"){
                    layer.msg(data.content)
                }else{
                    $this.toggleClass("tz");
                }
            });
        });     //  任务通知设置
    },  // 账户设置
    edit_push_job_event:function(){
        member.main.left_adaption();
	    function selector_lisener(e){
	        var $target = $(e.target);
	        if($target.parents(".list_content").length <= 0 && !$target.hasClass("list_content") && $target.parents(".city_selector").length <= 0){
                $(".selector_list .list_content").removeClass("open_selector");
                $(document).off("click",selector_lisener);
            }
        }   // 下拉框监听
        $(".selector_list .list_content").on("click",function(e){
            if($(this).hasClass("open_selector")){
                $(".selector_list .list_content").removeClass("open_selector");
                $(document).off("click",selector_lisener);
            }else{
                $(".selector_list .list_content").removeClass("open_selector");
                $(this).addClass("open_selector");
                $(document).on("click",selector_lisener);
            }
            e.stopPropagation();
        }); // 下拉框弹出事件绑定
        $(".selector_list .default_selector .option_list").on("click",function(e){
            var _text = $(this).text(), _id = $(this).attr("data-id"),_value = $(this).attr("data-value");
            $(this).parents(".list_content").find(".selected_text").text(_text);
            $(this).parents(".list_content").find("input").val(_id);
            $(this).parents(".list_content").find("input").val(_value);
            $(this).parents(".list_content").removeClass("open_selector");
            $(document).off("click",selector_lisener);
            e.stopPropagation()
        }); // 点击下拉选项事件绑定
        $(".city_selector .left_list li").on("click",function(e){
            var _index = $(this).index();
            $(this).addClass("checked").siblings().removeClass("checked");
            $(".city_selector .right_list li").eq(_index).show().siblings().hide();
            e.stopPropagation();
        }); // 城市选择器-省份点击事件绑定
        $(".city_selector .right_list a").on("click",function(){
            var _id = $(this).attr("data-value"), _text = $(this).text();
            if($(this).attr("id") === "defined_city"){
                $(".city_select_list .list_content").removeClass("open_selector");
                $("#input_city").show().focus()
            }else{
                $(this).parents(".city_select_list").find("input[type=hidden]").val(_text).attr("data-id",_id);
                $(this).parents(".city_select_list").find(".selected_text").text(_text);
                $(".city_select_list .list_content").removeClass("open_selector");
            }
        }); // 城市选择器-城市点击事件绑定
        $("#input_city").on("input",function(){
            var _text = $(this).val();
            $(this).parents(".city_select_list").find("input[type=hidden]").val(_text).attr("data-id","");
            $(this).parents(".city_select_list").find(".selected_text").text(_text);
        }).on("blur",function(){
            $(this).hide().val("");
        }).on("keydown",function(e){
            var key = window.event?e.keyCode:e.which;
            if(key== 13){
                $(this).hide().val("");
            }
        });  // 城市选择器-自定义城市输入框事件绑定
        $("#company_text").on("input",function(){
            var _count = $(this).val().length;
            $(".company_text .text_content .count").text(_count);
            if(_count >= 200){
                layer.msg("超出字数限制")
            }
        }); // 公司简介输入事件绑定
        $(".edit_push_job .button_bar .delete_job").on("click",function(){
        	var _id=$(this).attr("data-id");
        	common.main.resume_confirm({
                title:"",
                content_html:"<span class='delete-title'>操作提示</span><span class='delete-tips'>下架岗位后该岗位不会在您的主页和求职行家首页展示</span>",
                modal_class:"delete-content",
                ok:"确定",
                cancel:"取消",
                onOk:function(){
                   $.get("/member/hr/cancel_job/",{jobId:_id},function(message){
                	   if(message.type=="success"){
                		   layer.msg("下架成功",{time:2000})
                		   location.href="/member/hr/job_management/"
                	   }else{
                		   layer.msg(message.content);
                	   }
                   })
                	
                	
                }
            });
        	
        });   // 下架按钮点击事件绑定
        $(".edit_push_job .button_bar .release_job").on("click",function(){
            var _job_name = $("[name=job_name]").val(),  // 岗位名称
            	_job_id = $("[name=job_id]").val(),  // 岗位ID
                _company_name = $("[name=company_name]").val(),  // 公司名称
                _job_city = $("[name=job_city]").val(),  // 工作城市
                _job_city_id = $("[name=job_city]").attr("data-id"), 
                _company_trade = $("[name=company_trade]").val(),  // 所属行业
                _work_years = $("[name=work_years]").val(),  // 经验要求
                _company_link = $("[name=company_link]").val(),  // 公司官网
                _edu_ask = $("[name=edu_ask]").val(),  // 学历要求
                _company_scale = $("[name=company_scale]").val(),  // 公司规模
                _work_type = $("[name=work_type]").val(),  // 岗位类型
                _min_price = $("[name=min_price]").val(),  // 最低薪资
                _max_price = $("[name=max_price]").val(),  // 最高薪资
                _job_detail = $("[name=job_detail]").val(), //岗位详情
                _company_text = $("[name=company_text]").val(),   //公司介绍
                check_url = /^((https|http|ftp|rtsp|mms)?:\/\/)?([A-Za-z0-9]+\.)?[A-Za-z0-9]+\.+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;    //网址校验正则

            if(_job_name===""||_company_name===""||_job_city===""||_company_trade===""||_work_years===""||_company_link===""||_edu_ask===""||_company_scale===""||_work_type===""||_min_price===""||_max_price===""||_job_detail===""||_company_text===""){
                if(_job_name===""){
                    layer.msg("请填写岗位名称")
                }else if(_company_name===""){
                    layer.msg("请填写公司名称")
                }else if(_job_city===""){
                    layer.msg("请填写工作城市")
                }else if(_company_trade===""){
                    layer.msg("请填写所属行业")
                }else if(_work_years===""){
                    layer.msg("请填写经验要求")
                }else if(_company_link===""){
                    layer.msg("请填写公司官网")
                }else if(_edu_ask===""){
                    layer.msg("请填写学历要求")
                }else if(_company_scale===""){
                    layer.msg("请填写公司规模")
                }else if(_work_type===""){
                    layer.msg("请填写岗位类型")
                }else if(_min_price===""){
                    layer.msg("请填写最低薪资")
                }else if(_max_price===""){
                    layer.msg("请填写最高薪资")
                }else if(_job_detail===""){
                    layer.msg("请填写岗位详情")
                }else if(_company_text===""){
                    layer.msg("请填写公司介绍")
                }
            }else if(isNaN(_min_price) || isNaN(_max_price)){
                layer.msg("请输入正确的薪资范围")
            }else if(!check_url.test(_company_link)){
                layer.msg("请输入正确的公司官网")
            }else if(Number(_min_price) > Number(_max_price)){
                layer.msg("薪资范围填写错误");
                return false
            }else{
                // 发布事件写在这里
            	$.ajax({
    				url: "/member/hr/publish_job/",
    				type: "POST",
    				data: {"id":_job_id,"name":_job_name,"company":_company_name,"minSalary":_min_price,"maxSalary":_max_price,"companySize":_company_scale,"website":_company_link,"industry":_company_trade,"jobDescription":_job_detail,"companyIntro":_company_text,"areaId":_job_city_id,"areaName":_job_city,"experience":_work_years,"education":_edu_ask,"jobType":_work_type},
    				dataType: "json",
    				cache: false,
    				success: function(message) {
    					if(message.type=="success"){
    						 layer.msg("发布成功",{time:2000})
                             location.href="/member/hr/job_management/";
    					}else{
    						layer.msg(message.content);
    					}
    					$(this).attr("disabled","false");
    				}
    			});
            }
        });  // 发布按钮点击事件绑定
    },    // 编辑岗位
    hr_gain_recording_event:function(){
        member.main.left_adaption();
	    function type_filter_lisener(e){
	        var $target = $(e.target);
	        if($target.parents(".type_list").length <= 0){
                $(".filter_bar .type_filter_bar").removeClass("open_filter");
                $(document).off("click",type_filter_lisener);
            }
            e.stopPropagation();
        }
        $(".filter_bar .type_filter_bar").on("click",function(e){
            $(this).toggleClass("open_filter");
            if($(this).hasClass("open_filter")){$(document).on("click",type_filter_lisener);}
            e.stopPropagation()
        }); // 类型筛选按钮点击事件绑定
        $(".type_filter_bar .type_list span").on("click",function(e){
            $(".filter_bar .type_filter_bar").removeClass("open_filter");
            $("input[name='type']").val($(this).attr("data-type"));
            $("#filter").trigger("click");
            e.stopPropagation()
        }); // 类型选项点击事件
        $(".filter_bar .item input").on("change",function(){
            var _start_time = $("#startTime").val(), _end_time = $("#endTime").val();
            if(_start_time != "" && _end_time != ""){
                // 日期筛选事件绑定
            }
        }); // 日期筛选事件绑定
    },    // 收益列表
    application_list_event:function(){
        member.main.left_adaption();
        $(".application_list .dispose_bar:not(.gary_state) a").on("click",function(){
            var _type = $(this).attr("data-type"), _content,_url;
            var _id=$(this).attr("data_id");
            if(_type==="pass"){
                _content = "确认通过Ta的申请吗？确认后不可撤销";
                _url="/member/hr/pass_job_apply/";
            }else{
                _content = "确认拒绝Ta的申请吗？确认后不可撤销";
                _url="/member/hr/reject_job_apply/";
            }
            common.main.resume_confirm({
                title:"",
                content_html:"<span class='delete-title'>操作提示</span><span class='delete-tips'>"+_content+"</span>",
                modal_class:"delete-content",
                ok:"确定",
                cancel:"取消",
                onOk:function(){
                    //  确认按钮点击写在这里（需要区分类型）
            		$.get(_url,{id:_id},function(message){
            			if(message.type=="success"){
            				location.reload();
            			}else{
            				layer.msg(message.content);
            			}
            		})
                }
            });
        }); // 处理按钮点击事件
    },    // 申请处理页
    job_management_event:function(){
        member.main.left_adaption();
    	//岗位列表排序
    	var lis = [];
        lis = $(".push_job_list");
        var ux = [];
        for (var i=0; i<lis.length; i++){
            var tmp = {};
            tmp.dom = lis.eq(i);
    		var time=lis.eq(i).attr("data_sort");
            tmp.date = time;
            ux.push(tmp);
        }
        ux.sort(function(a,b){
           return a.date - b.date;
        });
        //移除原先顺序错乱的div内容
        $(".push_job_list").remove();
        //重新填写排序好的内容
        for (var i=0; i<ux.length; i++){
           $(".push_job_title").after(ux[i].dom)
        }
    },

    bargain_order_show_event:function(){
        member.main.left_adaption();
    	$.ajax({
			 url: "/member/bargain/find_member_bargains/",
			 type: "get",
		     async: false,
			 success: function(message){
	        	if(message.type=="success"){
	        		var _json_array = eval(message.content);
	        		if(_json_array.length == 0){
	        			return;
	        		}
	        		$.each(_json_array, function(i,val){     
	        			var _order_id = val.orderId;
	        			$(".order_vip").each(function(){
							if($(this).attr("data_oid") == _order_id){
								var _parent_li = $(this).parent();
								_parent_li.addClass('activity-kanjia');
								_parent_li.find("span.currentPrice").text(currency(val.currentPrice,true));
								
								var _text = $(this).find(".text");
								_text.empty();
								_text.append("<p class='activity-name'>"+val.bargainName+"</p>");
								_text.append("<p class='activity-info'>低至7折 <small>原价"+val.originalPrice+"</small></p>");
								var _status = val.status;
								if('running' == _status && val.paymentStatus != "paid"){
									_parent_li.find("span.status").text("正在砍价");
									_parent_li.find("span.do.dropdown").empty();
									_parent_li.find("span.do.dropdown").append("<a class='downBtn  activity-kanjia-Btngreen Btn-s invite-friend' data_track='PC-个人中心-我的订单页-订单展示-订单展示-邀请' href='javascript: void(0);'>继续邀请</a>");
									_parent_li.find("span.do.dropdown").append("<a class='downBtn  activity-kanjia-Btnorange Btn-s' data_track='PC-个人中心-我的订单页-订单展示-订单展示-购买' href='/payment/"+val.sn+"/'>当前价购买</a>");
									_text.append("<p class='activity-msg'>已有"+val.bargainHelp+"位好友帮您砍价，再邀请"+(15-val.bargainHelp)+"人砍到底价"+currency(val.floorPrice,true)+"元</p>");
									_text.append("<p class='activity-time'>倒计时： <span>00:00:00</span></p>");
									if(val.endDate - new Date().getTime() > 0){
										common.main.countDown({
											s: parseInt((val.endDate - new Date().getTime()) / 1000),
											run: function(h, m, s) { // 正在计时时回调
												h = (h < 10) ? '0' + h : h;
												m = (m < 10) ? '0' + m : m;
												s = (s < 10) ? '0' + s : s;
												$(".activity-time span").html(h + ":" + m + ":" + s);
											},
											end: function() { // 结束后回调
											}
										});
									}
								}else if('completed' == _status || val.paymentStatus == "paid"){
									_parent_li.find("span.status").text("砍价成功");
									if(val.paymentStatus != "paid"){
										_text.append("<p class='activity-msg'>恭喜您砍价成功，现在您可以去支付了</p>");
									}
								}else if('finished' == _status){
									_parent_li.find("span.status").text("砍价失败");
									_parent_li.find("a.downBtn").addClass('activity-kanjia-Btngray');
									_text.append("<p class='activity-msg'>很抱歉，砍价时间已超过有效期了，砍价失败~</p>");
								}
							}	        			
	        			});
					}); 
	        	}else{
	        		layer.msg(message.content);
	        	}
	     	}
    	});
		// 调用二维码弹窗
		$(".invite-friend").click(function(){
			$.get("/member/bargain/get_bargain_status/", function(data) {
				if(data.type === "success"){
					var _data = JSON.parse(data.content);
					if(_data.status === "running" || typeof _data.status == "undefined") {
					 	common.main.activity_down_price(_data.url);
					}
				}else {
					layer.msg(data.content);
				}
			});
		});
    },
    // 投递记录列表页
    send_record_event:function(){
        member.main.left_adaption();

        // 招聘网站绑定弹框
        $(document).on("click",".manager_recruit_web li",function(){
            var $modal = $("#bind-modal").find(".logo"),
                $class = $(this).attr("data-web"),
                $input = $("#bind-modal").find("input.admin"),
                $title = $("#bind-modal").find(".modal-body .web_title"),
                $href  = $("#bind-modal").find("a"),
                $button = $("#bind-modal").find("button.bind"),
                _placeholder;
            if( $class == 'jy' || $(this).hasClass('bind')){ return; } 
            $modal.addClass($class);
            if($class == 'qiancheng'){
                _placeholder = '前程无忧';
                $href.attr("href","https://login.51job.com/forgetpwd.php");
                $button.attr("data-channel","job51");
            }else if($class == 'zhilian'){  
                _placeholder = '智联招聘';
                $href.attr("href","https://passport.zhaopin.com/findPassword/email/step1");
            }else{
                 _placeholder = '拉勾网';
                 $href.attr("href","https://passport.lagou.com/accountPwd/toReset.html");
                 $button.attr("data-channel","lagou");
            }
            $input.attr("placeholder",'请输入'+ _placeholder +'账号');
            $title.html(_placeholder);
            $("#bind-modal").modal("show");
        });

        // 关闭弹框事件
        $(document).on("click",".send_modal .close,.cancel",function(){
            var $this = $(this).parents(".send_modal"),
                _id = $this.attr("id");
            $this.modal("hide");
            if( _id == 'bind-modal'){
                $("#bind-modal").find(".logo").removeClass("qiancheng zhilian lagou");
            }
            if( _id == 'modify-modal'){
                $("#modify-modal .record_status .offer").css({"cursor":"pointer","pointer-events":"auto"})
            }
            $(".card").removeClass("checked");
        });

        // 导航tab切换
        $(document).on("click",".send_record_tab .tab_list li",function(){
            $(this).addClass("current").siblings("li").removeClass("current");
        });

        // 下拉框打开关闭事件
        $(document).on("click",".adaptable>span",function(){
            $(this).parents(".adaptable").toggleClass("show");
        });

        $(document).on("mouseleave",".adaptable",function(){
            $(this).removeClass("show");

        })

        // 下拉框选择事件
        $(document).on("click",".select_box p",function(){
            var $this = $(this);
            var _id = $this.parents(".adaptable").attr("data-id");
            var _recordsStatus = $this.attr("data-recordsStatus");
            $this.parents(".adaptable").children("span").eq(0).html($this.html());
            $this.parents(".adaptable").children("span").eq(0).attr("data-channel",$this.attr("data-channel"));
            $this.parents(".nav").siblings(".card_content").find('i').html($this.html());
            $this.parents(".adaptable").removeClass("show");
            if($this.parents(".adaptable").hasClass("status")){
                $.ajax({
                    type:"GET",
                    url:"/member/resume_send_records/change_stauts/",
                    data:{
                    	id:_id,
                    	recordsStatus:_recordsStatus
                    },
                    success:function(data){
                        if(data.type != "success"){
                            layer.msg("修改失败")
                        }else{
                            layer.msg("修改成功");
                            location.reload();
                        }
                    }
                });
            }
        });

        // 鼠标经过显示修改按钮事件
        $(".card_content:not(.release)").hover(function(){
            $(this).children(".modify_masking").addClass("show");
        },function(){
            $(this).children(".modify_masking").removeClass("show");
        });

        // 旧记录修改功能
        function modify_old_record($this){
            if(!$this.val() == ''){
              var _id = $this.parents(".card").attr("data-id");
              var _name = $this.attr("name");
              var _val = $this.val();
              //ajax请求
              $.ajax({
                  type:"POST",
                  url:"/member/resume_send_records/supp_data/",
                  data:{
                	  id:_id,
                	  type:_name,
                	  value:_val
                  },
                  success:function(data){
                      if(data.type != "success"){
                          layer.msg(data.content)
                      }else{
                    	  $this.removeClass("focus");
                      }
                  }
              });
            }else{
                $this.addClass("focus");
            }
        };

        // 输入框失焦
        $(document).on("blur",".card.old .nav input",function(){
            modify_old_record($(this));
        });

        // 输入框enter确认
        $('.card.old .nav input').keydown(function(e){
            if(e.keyCode==13){
                $(this).blur();
            }
        });

        // 删除记录
        function delete_record() { 
            var _id = $("li.checked").attr("data-id");
            $.ajax({
                type:"GET",
                url:"/member/resume_send_records/delete/",
                data:{
                	id:_id
                },
                success:function(data){
                    if(data.type != "success"){
                        layer.msg("删除失败")
                    }else{
                        $(".card").each(function(){
                            if($(this).hasClass("checked")){
                                $(this).remove();
                                layer.msg("删除成功");
                                $('#delete-modal').modal("hide");
                                // 少于等于20条时 取消分页
                                if($(".list_contain").length <= 20){
                                    $("#pages").remove();
                                }
                            }
                        })
                    }
                }
            });
        }

        // 删除弹框
        $(document).on("click",".operate .delete",function(){
            $(this).parents(".card").addClass("checked");
            if(getCookie("record_delete") == undefined || getCookie("record_delete") == null){
                $("#delete-modal").modal("show");
             }else{
                delete_record();
             }
        });
        
        // 删除确认
        $(document).on("click","#delete-modal .submit",function(){
            delete_record();
            var $checked =  $("#delete-modal #checkedNotfy:checked").val();
            addCookie("record_delete",$checked);
        });

        // 解档弹框
        $(document).on("click",".operate .release",function(){
            $("#release-modal").modal("show");
            $(this).parents(".card").addClass("checked");
        });

        // 解档确认
        $(document).on("click","#release-modal .submit",function(){
        	var _id = $("li.checked").attr("data-id");
            $.ajax({
                type:"GET",
                url:"/member/resume_send_records/change_stauts/",
                data:{
                	id:_id,
                	recordsStatus:"getOffer"
                },
                success:function(data){
                    if(data.type != "success"){
                        layer.msg("解档失败")
                    }else{
                        $(".card").each(function(){
                            if($(this).hasClass("checked")){
                                $(this).removeClass('release').addClass("offer");
                                layer.msg("解档成功");
                                $('#release-modal').modal("hide");
                                location.reload();
                            }
                        })
                    }
                }
            });
        });

        // 新建记录弹框
        $(document).on("click",".new_record",function(){
            $("#new-record-modal").modal("show");
        });

        // 新建记录确认
        $(document).on("click","#new-record-modal .submit",function(){
            var $list = $(this).parents(".modal-footer").siblings(".modal-body"),
                company,post,time,channel;
            company=$list.find('input[name="company"]').val();
            post=$list.find('input[name="post"]').val();
            time=$list.find('input[name="time"]').val();
            channel=$list.find('.channel').children("span").attr("data-channel");
            
            // 表单校验
            if(time=='') return layer.msg("请填写投递时间");
            if(company=='') return layer.msg("请填写公司名称");
            if(post=='') return layer.msg("请填写岗位名称");

            //发起ajax请求
            $.ajax({
                type:"POST",
                url:"/member/resume_send_records/save/",
                data : {
                	sendTime:time,
                    companyName:company,
                    positionName:post,
                    channel:channel
                },
                success:function(data){
                    if(data.type != "success"){
                        layer.msg("新建失败")
                    }else{
                        layer.msg("新建成功");
                        location.reload();
                    }
                }
            });
        });

        // 投递记录修改编辑弹框
        $(document).on("click",".operate .modify",function(){
            var $card = $(this).parents(".card");
            record_edit($card);
        });

        // 记录内容蒙层修改编辑
        $(document).on("click",".modify_masking .modify",function(){
        	$(this).parents(".card").addClass("checked");
            var $card = $(this).parents(".card_content");
            record_edit($card);
        });

        // 编辑弹框展示
        function record_edit($card){
            var $interview = $("#modify-modal .record_status .interview"),
                $offer = $("#modify-modal .record_status .offer");
            if(($card).hasClass("interview")){
                $interview.addClass("checked").siblings().removeClass("checked");
                var $ul_interview = $("#modify-modal ul.interview");
                $ul_interview.show().siblings('ul').hide();
                var _interviewJson = $.parseJSON($card.find("#interviewMsg").text());
                $ul_interview.find("input[name='interviewTime']").val(_interviewJson.interviewTime);
                $ul_interview.find("input[name='contactsName']").val(_interviewJson.contactsName);
                $ul_interview.find("input[name='contacts']").val(_interviewJson.contacts);
                $ul_interview.find("input[name='interviewAddress']").val(_interviewJson.interviewAddress);
                $ul_interview.find("input[name='remark']").val(_interviewJson.remark);
            } else if (($card).hasClass("offer")){
                $offer.addClass("checked").siblings().removeClass("checked");
                var $ul_offer = $("#modify-modal ul.offer");
                $ul_offer.show().siblings('ul').hide();
                var _offerJson = $.parseJSON($card.find("#offerMsg").text());
                $ul_offer.find("input[name='workDate']").val(_offerJson.workDate);
                $ul_offer.find("input[name='probation']").val(_offerJson.probation);
                $ul_offer.find("input[name='positionName']").val(_offerJson.positionName);
                $ul_offer.find("input[name='salary']").val(_offerJson.salary);
                $ul_offer.find("input[name='remark']").val(_offerJson.remark);
            } else if (($card).hasClass("success")){
                $interview.addClass("checked").siblings().removeClass("checked");
                $("#modify-modal ul.interview").show().siblings('ul').hide();
                $("#modify-modal ul.interview").find("input").val("");
            }
            $("#modify-modal").modal("show");
            $card.addClass("checked");
        };

        // 记录修改弹框事件
        $(document).on("click","#modify-modal .record_status>div",function(){
            var $type = $(this).attr("class");
            $(this).addClass("checked").siblings().removeClass("checked");
            var $ul = $("#modify-modal ul."+ $type);
            $ul.show().siblings('ul').hide();
            $ul.find("input").val("");
            
            if($(this).hasClass("offer")){
            	var _offerJson = $.parseJSON($("li.checked").find("#offerMsg").text());
            	if(_offerJson != null){
                	$ul.find("input[name='workDate']").val(_offerJson.workDate);
                    $ul.find("input[name='probation']").val(_offerJson.probation);
                    $ul.find("input[name='positionName']").val(_offerJson.positionName);
                    $ul.find("input[name='salary']").val(_offerJson.salary);
                    $ul.find("input[name='remark']").val(_offerJson.remark);
                }
                $ul.find("input[name='positionName']").on("input",function(){
                    var $input = $ul.find("input[name='positionName']");
                    if($input.val().length >= 20){
                        layer.msg("不能超过20字哦~");
                        var _value = $input.val().substr(0,20);
                        $input.val(_value);
                    }
                })
            }else if($(this).hasClass("interview")){
            	var _interviewJson = $.parseJSON($("li.checked").find("#interviewMsg").text());
            	if(_interviewJson != null){
                	$ul.find("input[name='interviewTime']").val(_interviewJson.interviewTime);
                	$ul.find("input[name='contactsName']").val(_interviewJson.contactsName);
                    $ul.find("input[name='contacts']").val(_interviewJson.contacts);
                    $ul.find("input[name='interviewAddress']").val(_interviewJson.interviewAddress);
                    $ul.find("input[name='remark']").val(_interviewJson.remark);
            	}
            }
        });
        
        
        //记录修改确认
        $(document).on("click","#modify-modal .submit",function(){
        	var $msg = $("#modify-modal .record_status .checked"),
        	    _id = $("li.checked").attr("data-id"),
        	    _json = {},
                _type = null,
                _status = null;
        	
        	if($msg.hasClass("offer")){
        		_type = "offerMsg";
        		var $ul_offer = $("#modify-modal ul.offer"),
        		    _salary = $ul_offer.find("input[name='salary']").val(),
        		    _remark = $ul_offer.find("input[name='remark']").val(),
        		    _workDate = $ul_offer.find("input[name='workDate']").val(),
        		    _probation = $ul_offer.find("input[name='probation']").val(),
                    _positionName = $ul_offer.find("input[name='positionName']").val(),
                    _status = $("offerMsg").attr("data-status");

                // 表单校验
                if(_workDate=='') return layer.msg("请填写到岗日期");
                if(_probation=='') return layer.msg("请填写使用期");
                if(_positionName=='') return layer.msg("请填写部门职位");
                if(_salary=='') return layer.msg("请填写正式工资");

        		_json["workDate"] = _workDate;
        		_json["probation"] = _probation;
        		_json["positionName"] = _positionName;
        		_json["salary"] = _salary;
        		_json["remark"] = _remark;
        	}else if($msg.hasClass("interview")){
        		_type = "interviewMsg";
        		var $ul_interview = $("#modify-modal ul.interview"),
        		    _remark = $ul_interview.find("input[name='remark']").val(),
        		    _contacts = $ul_interview.find("input[name='contacts']").val(),
        		    _contactsName = $ul_interview.find("input[name='contactsName']").val(),
        		    _interviewTime = $ul_interview.find("input[name='interviewTime']").val(),
                    _interviewAddress = $ul_interview.find("input[name='interviewAddress']").val(),
                    _status = $("interviewMsg").attr("data-status");
                
                // 表单校验
                if(_interviewTime=='') return layer.msg("请填写面试时间");
                if(_contactsName=='') return layer.msg("请填写联系人");
                if(_contacts=='') return layer.msg("请填写联系电话");
                if(_interviewAddress=='') return layer.msg("请填写面试地点");

        		_json["interviewTime"] = _interviewTime;
        		_json["contactsName"] = _contactsName;
        		_json["contacts"] = _contacts;
        		_json["interviewAddress"] = _interviewAddress;
        		_json["remark"] = _remark;
            }
        	
        	
        	
        	//发起ajax请求
            $.ajax({
                type:"POST",
                url:"/member/resume_send_records/edit/",
                data : {"id" : _id,"content" :JSON.stringify(_json),"type" :_type},
                success:function(data){
                    if(data.type != "success"){
                        layer.msg("修改失败")
                    }else{
                    	layer.msg("修改成功");
                    	location.reload();
                    }
                }
            });
        });
    },
    // 投递编辑页
    send_edit_event:function(){
        member.main.left_adaption();

        // 输入框限制字数及换行
        var chang = false;
        $('.letter_header li div div').on('input',function(e) {
            if(chang == false){
                var _html = $(this).text();
                if(_html.length >= 15) {
                    this.innerHTML = _html.substr(0,15);
                }
            }
        }).on('compositionstart', function () {
            chang = true;
        }).on('compositionend', function () {
            chang = false;
            var _html = $(this).text();
            if(_html.length >= 15) {
                this.innerHTML = _html.substr(0,15);
            }
        }).on('keypress',function(e) {
            if(e.charCode === 13) {
               $(this).blur();
               e.preventDefault();
            }
        });

        // 下拉框打开关闭事件
        $(document).on("click",".resume_select>span",function(){
            $(this).parents(".resume_select").toggleClass("show");
            e.stopPropagation();
        });
        $(document).on("click",function(){
            $(".resume_select").removeClass("show");
        })
        
        //监听标题栏的输入变化
        $(".resume_title>div").bind('input propertychange', function() {
        	var _data_name = $(this).attr("data-name"),
        	    _data_text = $(this).text();
        	if(_data_name == 'post'){
        		if(/^\s*$/.test(_data_text)){
        			$(".content_textarea").find("span#postName").text("[岗位名称]").css("font-weight","bold");
        		}else{
        			$(".content_textarea").find("span#postName").text(_data_text).css("font-weight","500");
        		} 
        	}else if(_data_name == 'name'){
        		var $span = $("#foot_name").show().children("span").eq(0), _span_text = $span.attr('data-name');
        		if(/^\s*$/.test($(this).text())){
        			if(/^\s*$/.test(_span_text)){
        				$("#foot_name").hide();
        			}else{
        				$span.text(_span_text);
        			}
        		}else{
        			$span.text($(this).text());
        		}
        		
        		if(/^\s*$/.test(_data_text)){
        			$(".content_textarea").find("span#memberName").text('[姓名]').css("font-weight","bold");
        		}else{
        			$(".content_textarea").find("span#memberName").text(_data_text).css("font-weight","500");
        		}
        	}else if(_data_name == 'phone'){
        		var $span = $("#foot_mobile").show().children("span").eq(1), _span_text = $span.attr('data-mobile');
        		if(/^\s*$/.test(_data_text)){
        			if(/^\s*$/.test(_span_text)){
        				$("#foot_mobile").hide();
        			}else{
        				$span.text(_span_text);
        			}
        			return;
        		}
        		$span.text(_data_text);
        	}
        });
        
        //监听公司名称
        $("input[name='location']").bind('input propertychange', function() {
        	if(/^\s*$/.test($(this).val())) return $("i#companyName").css("font-weight","bold").text('[单位名称]');
            $("i#companyName").text($(this).val()).css("font-weight","500");
        });
        
        //监听发件人邮箱
        $("input[name='addresser']").bind('input propertychange', function() {
        	var $span = $("#foot_email").show().children("span").eq(1), 
        	    _span_text = $span.attr('data-email'),
        	    _data_text = $(this).val();
        	
    		if(/^\s*$/.test(_data_text)){
    			if(/^\s*$/.test(_span_text)){
    				$("#foot_email").hide();
    			}else{
    				$span.text(_span_text);
    			}
    			return;
    		}
    		$span.text(_data_text);
        	
        	
        });
        
        

        // 下拉框选择事件
        $(document).on("click", ".select_box li",function(){
            var $this = $(this);
            var _resume_id = $this.attr("data-resume");
            $this.parents(".resume_select").children("span").eq(0).html($this.html());
            $this.parents(".resume_select").removeClass("show");
            
        	//发起ajax请求
            $.ajax({
                type:"GET",
                url:"/member/resume_send_records/select_resume_content/",
                data : {id:_resume_id},
                success:function(data){
                    if(data.type != "success"){
                        layer.msg(data.content);
                    }else{
                    	var _data = JSON.parse(data.content);
                    	//发件人相关信息
                    	$("input[name='addresser']").attr('value',_data.sendMail);
                    	$("div[data-name='post']").html(_data.job);
                    	$("div[data-name='name']").html(_data.name);
                    	$("div[data-name='experience']").html(_data.edu);
                    	$("div[data-name='phone']").html(_data.mobile);
                        $("#resumeId").attr("value",_resume_id);
                        
                        $("#companyName").text('[单位名称]').css("font-weight","bold");
                    	
                    	//内容
                    	if(null!=_data.name){
                            $(".content_textarea").find("span#memberName").text(_data.name).css("font-weight","500");
                    	}else{
                    		$(".content_textarea").find("span#memberName").text('[姓名]').css("font-weight","bold");
                    		
                    	}
                    	if(null!=_data.job){
                    		$(".content_textarea").find("span#postName").text(_data.job).css("font-weight","500");
                    	}else{
                    		$(".content_textarea").find("span#postName").text('[岗位名称]').css("font-weight","bold");
                    	}
                        
                    	//底部个人信息
                    	var host = location.origin;
                    	$("#foot_msg").children("li").removeClass("hidden");
                    	$("#foot_name").show().children("span").eq(0).text(_data.name == null ? $("#foot_name").hide():_data.name);
                    	$("#foot_name").children("span").eq(0).attr('data-name',_data.name == null ? '': _data.name);
                    	$("#foot_mobile").show().children("span").eq(1).text((_data.mobile == null) ? $("#foot_mobile").hide() : _data.mobile);
                    	$("#foot_mobile").children("span").eq(1).attr('data-mobile',_data.mobile == null ? '': _data.mobile);
                    	$("#foot_email").show().children("span").eq(1).text((_data.sendMail == null) ? $("#foot_email").hide() : _data.sendMail);
                    	$("#foot_email").children("span").eq(1).attr('data-email',_data.sendMail == null ? '': _data.sendMail);
                    	$("#foot_city").show().children("span").eq(1).text((_data.city == null) ? $("#foot_city").hide() : _data.city);
                    	$("#foot_url").show().find("a").eq(0).attr("href",host+_data.visitPath).text((_data.visitPath == null) ? $("#foot_url").hide() : host+_data.visitPath);
                    	$("#foot_download").show().find("a").eq(0).attr("href",_data.downUrl).text($this.text()+".pdf");
                    }
                }
            });
            
            
        });

        // 投递弹框
        $(document).on("click",".edit_header .send",function(){
            var _resume = $(".resume_select>span").html(),
	            _recipients =$(".letter_header input[name='recipients']").val(),
	            _addresser =$(".letter_header input[name='addresser']").val(),
	            _post =$(".letter_header div[data-name='post']").html(),
	            _name =$(".letter_header div[data-name='name']").html(),
	            _experience =$(".letter_header div[data-name='experience']").html(),
                _phone =$(".letter_header div[data-name='phone']").html(),
	            _location =$(".letter_header input[name='location']").val();
            
            if($(".resume_select  .select_box li").length <= 0) return $("#noresume-modal").modal("show");
            if(_resume == '选择投递的简历') return layer.msg("请选择要投递的简历");
            if(/^\s*$/.test(_recipients)) return layer.msg("请填写收件人");
            if(/^\s*$/.test(_addresser)) return layer.msg("请填写发件人");
            if(/^\s*$/.test(_post) && /^\s*$/.test(_name) && /^\s*$/.test(_experience) && /^\s*$/.test(_phone)) return layer.msg("请至少填写标题中的一项");
            if(/^\s*$/.test(_location)) return layer.msg("请填写公司名称");
            
            var emailreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if(!emailreg.test(_recipients)||_recipients.length>100) return layer.msg("请填写正确的收件人邮箱");
            if(!emailreg.test(_addresser)||_addresser.length>100) return layer.msg("请填写正确的发件人邮箱");
	        $("#send-modal").modal("show");
        });

        // 关闭创建简历弹框
        $(document).on("click","#noresume-modal .close",function(){
            $('#noresume-modal').modal("hide");
        });

        // 创建简历确认
        $(document).on("click","#noresume-modal .submit",function(){
            location.href="/cvresume/edit/?itemid=206&language=zh"
        });

        // 关闭投递弹框
        $(document).on("click","#send-modal .close",function(){
            $('#send-modal').modal("hide");
        });

        // 监听正文内容编辑事件
		$(".content_textarea").on('click', function() {
            var $this = $(this);
            if (window.getSelection) {
				var sel = window.getSelection();
				if (sel.getRangeAt && sel.rangeCount) {
                    if(sel.getRangeAt(0).commonAncestorContainer.parentElement.className.indexOf('placeholder') >= 0){
                        $this.keydown(function(){
                            $this.find("p.placeholder").html("").removeClass("placeholder"); //开始输入时，‘水印 ’消失
                        });
                    }else if(sel.getRangeAt(0).commonAncestorContainer.parentElement.className.indexOf('int') >= 0){
                        var _id = sel.getRangeAt(0).commonAncestorContainer.parentElement.id;
                        $this.keydown(function(){
                            $('#'+ _id).css("font-weight","500");
                        });
                    }else{
                        $this.unbind("keydown");
                    }
				}
			} else if (document.selection && document.selection.createRange) {
                return document.selection.createRange();
			}
        });

        // 投递确认
        $(document).on("click","#send-modal .submit",function(){
            var _resumeId=$("#resumeId").val(),
                _recipients =$(".letter_header input[name='recipients']").val(),
                _addresser =$(".letter_header input[name='addresser']").val(),
                _post =$(".letter_header div[data-name='post']").html(),
                _name =$(".letter_header div[data-name='name']").html(),
                _experience =$(".letter_header div[data-name='experience']").html(),
                _phone =$(".letter_header div[data-name='phone']").html(),
                _location =$(".letter_header input[name='location']").val(),
            	_real_post = _post;

            if($('.content_textarea').find(".placeholder").length>0){
                $('.content_textarea').find(".placeholder").remove()
            }
            //ajax请求
        	$(".content_textarea").attr("contenteditable","false");
            var _content = $('.content_textarea').html();
            $('#send-modal').modal("hide");
            $(".unify_masking").show();
            $(".unify_loading").show();
            
            setTimeout(function(){
                $.ajax({
                    type:"POST",
                    url:"/member/resume_cover_letter/send/",
                    data:{
                        replyMail: _addresser,
                        title: _post+'_'+_name+'_'+_experience+'_'+_phone,
                        emailContent: _content,
                        resume: _resumeId,
                        sendeeEmail: _recipients,
                        positionName:_real_post,
                        companyName: _location
                    },
                    success:function(data){
                        $(".unify_masking").hide();
                        $(".unify_loading").hide();
                        if(data.type != "success"){
                            layer.msg(data.content);
                        }else{
                            $(".resume_send_edit").hide();
                            $(".success_contain").show();
                            $(".success_contain").find("a").attr("href","/member/resume_send_records/delivery_detail/?id="+data.content);
                        }
                    },
                    fail:function(){
                        $(".unify_masking").hide();
                        $(".unify_loading").hide();
                    }
                })
            }, 500);
			
        });
    },
    // 优惠券页面
    discount_ticket: function(){
        member.main.left_adaption();
    	$(".jl-member-rd").css("min-height", $(".jl-member-ld").height() + "px");
    }
};