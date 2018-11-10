/**
 * 全局通用js文件
 * common.info:存放全局通用属性
 * 目录的对应js交互， 请写在对应的cvresume.main.xxx_event方法里去，如要新增,命名规则：cvresume.main.目录名_event
 */
var common = common || {};
common.main = common.main || {};
//全局参数绑定
common.info={
	//异步加载
	isReload:true,//是有已加载，默认是已加载
	isMaxPage:false,//是否是最大页码
	reloadWallfulPage:2//页码	
};
//PC/WAP链接映射
//注意：匹配规则顺序问题
 
common.main = {
		init_:function(){//事件初始化
			common.main.event_();//全局事件初始化
			common.main.dropresume_event();//自由编辑事件
			common.main.cvresume_event();//在线简历事件
			common.main.editresume_event();//在线简历事件
			common.main.hr_event();//定制商城事件
			common.main.print_event();//打印商城事件
			common.main.member_event();//个人中心事件
			common.main.team_vip_event();//集体会员子会员管理事件  
			// 优惠券活动  在线编辑  和 登陆页 不出现
			if(
				!(window.location.href.indexOf("cvresume/") >= 0 ||
				window.location.href.indexOf("/order/vip_member/") >= 0 ||
				window.location.href.indexOf("/login/") >= 0 ||
				window.location.href.indexOf("/register/") >= 0)
			) {
				common.main.get_discount_ticket();
				common.main.top_discount_ticket();
			}
		},
	    event_: function () {//全局事件绑定
	    	//如果是ie9添加class
			if(common.main.isIE9()){
				$("html").addClass("ie9");
			}	    	
	    	//导航选中
	    	var pathName = location.pathname;
	    	if(pathName.indexOf("cvresume") > 0 || pathName.indexOf("editresume") > 0){
	    		$(".nav-li").removeClass("current").eq(0).addClass("current");
	    	}else if(pathName.indexOf("template") > 0 || pathName.indexOf("ppt") > 0) {
	    		$(".nav-li").removeClass("current").eq(1).addClass("current");
	    	}else if(pathName.indexOf("hr") > 0 || pathName.indexOf("customize") > 0 ) {
	    		$(".nav-li").removeClass("current").eq(2).addClass("current");
	    	}else {
	    		$(".nav-li").removeClass("current").eq(5).addClass("current");
	    	}
	    	//鼠标覆盖和离开头像事件
	    	$('.jl-touxiang').hover(function(){
	    		$('.jl-user-info').stop().show();					
	    	},function(){
	    		$('.jl-user-info').stop().hide();					
	    	});	
	    	//图片延迟加载
	    	try{
	    		$("img.lazy").lazyload({
	    		    threshold : 200
	    		});
	    	}catch(e){
	    		console.log("图片延迟加载错误~");
	    	}
	    	//全局复制事件
	    	$(".copy_url_btn").click(function(){
	    		var str = $(".ym-input").val();
	    		common.main.copyToClipBoard(str);
	    	})
	    	//全局登录信息绑定
	    	common.main.loginMsg(); 
			// 富文本框黏贴事件去除格式
            $.fn.extend({
                insertAtCaret: function (myValue) {
                    var $t = $(this)[0];
                    if (document.selection && document.selection.createRange) {
                        document.selection.createRange().pasteHTML(text);
                    }else if (window.getSelection && window.getSelection().getRangeAt(0)){
                        var j = window.getSelection();
                        var range = j.getRangeAt(0);
                        range.collapse(false);
                        var node = range.createContextualFragment(myValue);
                        var c = node.lastChild;
                        range.insertNode(node);
                        if(c){
                            range.setEndAfter(c);
                            range.setStartAfter(c)
                        }
                        j.deleteFromDocument();
                        j.removeAllRanges();
                        j.addRange(range);
                    }
                }
            });
            document.addEventListener("paste", function(e) { 
                if(window.getSelection){
                    window.getSelection().getRangeAt(0).deleteContents();
                } else if(document.selection && document.selection.createRange){
                    document.selection.getRange(0).deleteContents();
                }
                var _text = (!!window.ActiveXObject || "ActiveXObject" in window) ? window.clipboardData.getData("text") : e.clipboardData.getData("text");
                if($(":focus").is("div[contenteditable=true]")) {
                    $(":focus").insertAtCaret(_text);
                    // 标题栏限制输入字数30
                    if($(":focus").hasClass("module_item_title") || $(":focus").parents(".dd-title").length > 0){
                        $(":focus").text($(":focus").text().replace(/[\r\n]/g,""));
                        var _length = $(":focus").text().length, size;
						if(cvresume.info.language == "en"){
							size=100;
						}else{
							size=30;
						}                        
                        if(_length > size){
                            $(":focus").text($(":focus").text().substring(0,size));
                            layer.msg("你输入的字数不能超过"+size);
                        }
                    }
                    if($(":focus").parents(".cover-con").length > 0){
                        var $this = $(":focus"), _content = '';
                        $(".jyCv-cover .coverItem div[contenteditable]").each(function(){
                            _content += $(this).text()
                        });
                        if(_content.length > 499){
                            var _text = $this.text(), _length = _text.length-(_content.length-499);
                            layer.msg("你输入的字数不能超过500");
                            $this.text(_text.substring(0,_length));
                        }
					}   // 封面粘贴字数限制
					if($(":focus").parents(".letter_header").length > 0){
                        var $this = $(":focus"), _content = '';
                        $(".letter_header li div div[contenteditable]").each(function(){
                            _content += $(this).text()
                        });
                        if(_content.length > 15){
                            var _text = $this.text(), _length = _text.length-(_content.length-15);
                            $this.text(_text.substring(0,_length));
                        }
                    }   // 封面粘贴字数限制
                    e.preventDefault();
                }
            });
	    },
	    index_event:function(){},
		hr_page_init_event:function(){
		},
	    dropresume_event:function(){
	    	$(document).on("click","#dropdownloadPdfBtn:not(.jy-vip-lock)",function(){
	       		var id=$("#hidden_data_resume_id").val();
	       		if(common.main.is_empty(id)){
	       			layer.msg("请先保存简历~");
	       			return false;
	       		}
	       		var downloadUrl="";
		    	$.ajax({type : "get",
				   	cache: false,
				   	async : false,
				   	url : "/cvresume/get_download_url/"+id+"/",
				   	success : function(message) {
				   		if(message.type=="success"){
				   			downloadUrl=message.content;
						}else{
							layer.msg(message.content);
						}
				   	}
				});
	    		if(!common.main.is_empty(downloadUrl)){
	    			var timestr=new Date().getTime();
	    			var reg=/_\d*\.pdf/;
	    			downloadUrl=downloadUrl.replace(reg,"_"+timestr+".pdf");
	    			window.open(downloadUrl);
	    		}
	    	});
	    },
	    template_down_event:function(){	
	    	$(document).on("click","#template_download_btn:not(.jy-vip-lock)",function(){
	    		var _id=$(this).attr("data-id");
	    		//检查是否超过限制
	    		var result="0";
	    		$.ajax({
	    			url: jycnf.base + "/order/check_product_downtimes/",
	    			type: "GET",
	    			dataType: "json",
	    			data:{"pid":_id},
	    			cache: false,
	    			async: false,
	    			success: function(data) {
	    				result = data;
	    			}
	    		});
	    		if(result.type=="error"&&result.content=="0"){
	    	     		//未登录
	    	         	show_login_modal();
	    	    }else if(result.type=="error"&&result.content=="1"){
	    	        	//没有权限
	    	        	 common.main.vip_opt_tips("template");
	    	    }else if(result.type=="error"&&result.content=="-1"){
	    	        	//商品不存在
	    				layer.msg("商品不能存在，请刷新重试");
	    	    }else if(result.type=="error"&&result.content=="3"){
	    	        	//提示超过每天限制
	    				common.main.temp_download_modal();
	    	     }else if(result.type=="success"){
	    	        	//可以下载
	    				window.open(result.content);
	    	     }
	    	});
	    },
	    cvresume_event:function(){	    	
	    	//发布页面的下载按钮
	        $(document).on("click","#releaseDownloadPDFBtn:not(.jy-vip-lock)",function(){
	       		var visitid=$(this).attr("data_visitid");
	       		var id=$(this).attr("data_id");
	       		var downloadFlag=false;
	       		var downloadUrl="";
	    		if(!downloadFlag){
	    			$.ajax({type : "get",
			    		cache: false,
			    		async : false,
			    		url : "/cvresume/get_download_url/"+id+"/",
			    		success : function(message) {
			    			if(message.type=="success"){
								downloadUrl=message.content;
								downloadFlag=true
							}else{
								layer.msg(message.content);
							}
			    		}
			    	});
	    		}
	    		if(downloadFlag){
	    			var timestr=new Date().getTime();
	    			var reg=/_\d*\.pdf/;
	    			downloadUrl=downloadUrl.replace(reg,"_"+timestr+".pdf");
	    			window.open(downloadUrl);
	    			//下载提示
	    			var param=location.search;
	    			if(param!=""&&visitid!=""&&visitid!=undefined){
		    			var rclid=common.main.getUrlParamString("rclid");
	    				$.post("/cvresume/resume_email_track/",{"rclid":rclid,"replyType":"hrDownload"},function(data){
	    			   		
	    				})
	    			}
	    		}
	    	});
	    },
	    editresume_event:function(){
			//简历同步导入
	    	common.main.resume_import();
	    	//简历导入
	    	$(document).on("click",".import_resume_btn:not(.jy-vip-lock),.show_import_btn:not(.jy-vip-lock)",function(){
	    		if($.checkLogin()){
	    			$("#importRModal").modal("show");
	    		}else{
	    			show_login_modal();
	    			return;
	    		}
	    	});
	    	//登录
	    	$(".unlogin a").click(function(){
	    		show_login_modal();
	    	});
	    },
        resume_cases_event:function(){
        	var _isPreview = false;//是否预览案例
        	common.info.isReload = true;
        	common.info.isMaxPage=false;
            var nav=$(".zx-mblist-nav"); //得到导航对象
            var win=$(".zx-con-box"); //得到窗口对象
	    	win.scroll(function(){
	         	if(_isPreview){
	         		return;
	         	}
	           	win_scroll();
			}); 
				
			// 滚动条兼容性处理（除了Webkit内核，其他隐藏滚动条）
			if (!(navigator.userAgent.indexOf('Chrome') >= 0 || navigator.userAgent.indexOf('Safari') >= 0)){
				$(".zx-con-box").css({"width":"102%","padding-right":"10px"})
			}

            //左侧导航二级显示隐藏事件
            $(document).on("mouseover",".zx-mblist-nav .nav-box",function(){
                $(this).addClass("current");
            });
            $(document).on("mouseleave",".zx-mblist-nav .nav-box",function(){
                $(this).removeClass("current");
            });
            //加载案例
			function get_cases(href,keyword){
				common.info.isReload = true;
				common.info.isMaxPage = false;
            	common.info.reloadWallfulPage=1;
            	$(".list").remove();
				$.get(href,{"keyword":keyword,"itemid":cvresume.info.itemid},function(result){
					$(".zx_caselist .zx_case_box").append(result);
					$('.zx_case_box').attr("data-url",href);
				});
			};
            //左侧导航点击事件
            $(".zx-mblist-nav .nav-box a").click(function(){
            	
            	$(this).addClass("checked").siblings().removeClass("checked");
				$(this).parents("dl").siblings().find("a.checked").removeClass('checked')
            	$(this).parents(".nav-box").siblings().find("a.checked").removeClass('checked')
            	var url_tag = $(this).attr("data_url");;
            	var href="/cvresume/cases/"+url_tag+"/";
            	get_cases(href,null);
			});
			//右侧搜索按钮点击事件
			$("#seachBtn").click(function(){
				
				var _keyword = $("#keyword").val();
				var href="/cvresume/cases/";
				get_cases(href,_keyword);
			});
			//右侧搜索输入框回车事件
			$("#keyword").keypress(function(){
				
				if(event.keyCode == 13){
					var _keyword = $("#keyword").val();
					var href="/cvresume/cases/"
					get_cases(href,_keyword);
				}
			});
			// 中英文选择事件
			$(".case_modal .language button").on("click",function(){
				$(this).addClass("checked").siblings().removeClass("checked");
				var href=$(this).attr("data_href");
				$("#keyword").val("");
				get_cases(href,null);
				if($(this).text()=="中文"){
					
				}else{
					
				}
				
			})
			// 行业展开事件
			$(".case_modal .modal-body .doc_category i").on("click",function(){
		    	$(".doc_category>i").toggleClass("checked")
		    	$(".zx-mblist-nav").toggleClass("checked")
		    })
			//滚动加载
			function win_scroll(){
				//计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，
				var _itemNum=$('.zx_caselist').find('.zx_case_box .list').length;
				if(_itemNum>=15&&common.info.isReload&&!common.info.isMaxPage){
					var _itemArr=[];
					_itemArr[0]=$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-1).offset().top+$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-1)[0].offsetHeight;
					_itemArr[1]=$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-2).offset().top+$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-1)[0].offsetHeight;
					_itemArr[2]=$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-3).offset().top+$('.zx_caselist').find('.zx_case_box .list').eq(_itemNum-1)[0].offsetHeight;
					if  ($('.zx-con-box').scrollTop() > $('.zx_case_box').height() - $('.zx-con-box').height()-50){
						common.info.isReload=false;
			        	reload()
			        }
				}
			};
			//加载数据
		   	function reload(){
		   		var _dataUrl = $('.zx_case_box').attr("data-url");
		   		var _itemid  = $('.zx_case_box').find('.list').eq(0).attr("data_itemid");
		   		var _resumeid  = $('.zx_case_box').find('.list').eq(0).attr("data_resumeid");
		   		var _requetUrl;
		   		if(_dataUrl.indexOf("?")!=-1){
			   		_requetUrl = _dataUrl + "&pageNumber=" + common.info.reloadWallfulPage;
		   		}else{
			   		_requetUrl = _dataUrl + "?keyword=" + $("#keyword").val() + "&pageNumber=" + common.info.reloadWallfulPage;
		   		}
		   		$.get(_requetUrl, function(result){
		   			if(result.indexOf("jl_search_null")!=-1){
		   				common.info.isMaxPage = true;
		   			}else{
		   				$('.zx_case_box').append(result);
		   				common.info.isReload = true;
		   				common.info.reloadWallfulPage=common.info.reloadWallfulPage+1;
		   				$('.list').attr("data_itemid",_itemid);
		   				$('.list').attr("data_resumeid",_resumeid);
		   			}
		   		});
			}
            //案例详情显示隐藏
            $(document).on("click", ".zx_case_detail .return", function(){
				var scrollTo =  $(".zx_case_box .list.checked");
				$(".zx_case_detail").removeClass("show");
				// $(".zx_caselist").css("display","block");
				$(".zx_caselist").css({"opacity":"1"},{"z-index":"120"},{"transition":"all 0.3s"});
                $(".case_modal .modal-header").css("display","block");
            	$(".case_modal .modal-body").css("display","block");
                _isPreview = false;
            });
            $(document).on("click", ".list .preview", function(){
				var $list = $(this).closest(".list");
                var _dataUrl = $list.attr("data-url");
                var _dataStyle=$list.attr("data-style");
                var _contentId= $list.attr("data_resume_contentid");
                var _itemid=$list.attr("data_itemid");
                var _href;
                if(_itemid!=null&&_itemid==535){
                	_href="/dropcvresume/edit/?resumeContentId="+_contentId+"&resumeId="+cvresume.info.resumeid+"&itemid="+_itemid;
                }else{
                	_href="/cvresume/edit/?resumeContentId="+_contentId+"&resumeId="+cvresume.info.resumeid+"&itemid="+_itemid;
                }
                $list.addClass("checked").siblings().removeClass("checked");
                $("#dongtaicss").attr("href", _dataStyle);
                 $.get("/cvresume/resume_case_detail/",{"resumeContentId":_contentId}, function(dataHtml){
                	$(".zx_case_detail").empty();
					$(".zx_case_detail").append(dataHtml);
					$(".zx_case_detail").addClass("show");
                	$(".select_case").attr("data_href",_href);
                	preview_resume_module_sort();
                	$(".zx_caselist").css({"opacity":"0"},{"z-index":"-1"},{"transition":"all 0.3s"});
                	$(".case_modal .modal-header").css("display","none");
                	$(".case_modal .modal-body").css("display","none");
					_isPreview = true;
					common.main.listen_unlogin_copy();
                });
                $(".zx-mblist-nav").removeClass("fixednav");
            });
            // 应用案例详情
			$(document).on("click",".zx_case_detail .select_case",function(){
				var _href=$(this).attr("data_href");
				$(".modal-backdrop").remove();
				$("#case-modal").css("display","none")
                common.main.resume_confirm({
                    title:"",
                    content_html:"<span class='tips_title'>确定应用此内容范文？</span><span class='tips-content'>应用后已编辑的简历内容将被覆盖。</span><label class='neverNotfy'><input type='checkbox' id='checkedNotfy' class='checkedNotfy'><span>不再提醒</span></label>",
                    tips_modal_class:"confirm_modal",
                    modal_class:"tips-modal-content change_content_confirm case_confirm_modal",
                    onOk:function(){
                    	
						location.href=_href;
                    },
                    onCancel:function(){
                    	$("#case-modal").css("display","block")
						$("#case-modal").css({"background":"rgba(0,0,0,0.85)"})
						$("#case-modal").css("animation","none")
                    }
                });
                $(".case_confirm_modal .close").on("click",function(){
                	$("#case-modal").css("display","block")
					$(".case_confirm_modal").modal("hide");
					$(".case_confirm_modal").remove();
					$("#tips-common-modal").remove()
					$("body").removeClass("suggestModal");
					$("body").removeClass("modal-open");
	                	return false
                });
			});

            function preview_resume_module_sort(){
			    var _sortPosition = new Array("Left","Top","Right","Bottom")
			    var _resume_sort=$("#resume_base").attr("resume_sort");
			    var _template_set=$("#resume_base").attr("template_set");
			    if(!common.main.is_empty(_resume_sort)){
			        var _sort = JSON.parse(_resume_sort);
			        if(_sort){
			            var _classStr="#resume_base .jyCv-base";
			            $(_sortPosition).each(function(i,item){//遍历方位
			                var _pos = _sort[item.toLocaleLowerCase()];
			                var $preModuleId;
			                $(_pos).each(function(j,jtem){//遍历各方位的id
			                    if(common.main.is_empty($preModuleId)){
			                        $(_classStr+item).prepend($("#"+jtem));//在所在方位的div开头添加节点
			                    }else{
			                        $($preModuleId).after($("#"+jtem));//在前一个节点后添加节点
			                    }
			                    $preModuleId=$("#"+jtem);//把当前节点作为下次循环的子节点
			                });
			            });
			        }
			    }else if(!common.main.is_empty(_template_set)){
			        var _settings = JSON.parse(_template_set);
			        if(_settings){
			            var _classStr="#resume_base .jyCv-base";
			            $(_sortPosition).each(function(i,item){//遍历方位
			                var _pos_set = _settings[item.toLocaleLowerCase()];
			                var $preModuleId;
			                $(_pos_set).each(function(j,jtem){
			                    //隐藏
			                    if(!jtem.isShow){
			                        $("#"+jtem.key).addClass("hidden");
			                    }
			                    //移位
			                    if(common.main.is_empty($preModuleId)){
			                        $(_classStr+item).prepend($("#"+jtem.key));
			                    }else{
			                        $($preModuleId).after($("#"+jtem.key));
			                    }
			                    $preModuleId=$("#"+jtem.key);
			                });
			            });
			        }
			    }
			}
            // 点击遮罩关闭弹窗
            $("#case-modal .modal-dialog").on("click", function(e){
            	if($(e.target).hasClass("modal-dialog")) {
            		$(this).parent().modal("hide");
            	}
            });
		},
		// 范文详情- 通过鼠标按下前后坐标位置判断是否进行复制操作
		listen_unlogin_copy:function () {
			try{
				if(!getCookie("memberId")){
					if($(".case_detail").length>0){
						var _modal = ".case_detail";
					}else if($(".zx-preview-ld").length>0){
						var _modal = ".zx-preview-ld"
					}else{ return }
					var x ,y;
					$(document).on("mousedown", _modal ,function(event){ //获取鼠标按下的位置
						x = event.pageX;
						y = event.pageY;
						$(this).addClass("noselect"); //禁止选中文字
					});
					$(document).on("mouseup", _modal ,function(event){ //鼠标释放
						var newX = event.pageX;
						var newY = event.pageY;
						if(x != newX && y != newY){
							//鼠标前后位置不同 用户欲进行复制操作
							layer.msg("登录后才可以复制哦~");
						}
					})
				}
			}catch(e){
				console.log("限制复制异常:"+e)
			}
		},
        agreement_event:function(){
            //设置标杆
			var _line=parseInt($(window).height()/3);
			$(window).scroll(function(){
				$('.agreement_nav li').eq(0).addClass('active');
				//滚动到标杆位置,左侧导航加active
				$('.agreement_content li').each(function(){
					var _target=parseInt($(this).offset().top-$(window).scrollTop()-_line);
					var _i=$(this).index();
					if (_target<=0) {
						$('.agreement_nav li').removeClass('active');
						$('.agreement_nav li').eq(_i).addClass('active');
					}
					//如果到达页面底部，给左侧导航最后一个加active
					else if($(document).height()==$(window).scrollTop()+$(window).height()){
						$('.agreement_nav li').removeClass('active');
						$('.agreement_nav li').eq($('.agreement_content li').length-1).addClass('active');
					}
				});
			});
			$('.agreement_nav li').click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				var _i=$(this).index();
				 $('body, html').animate({scrollTop:$('.agreement_content li').eq(_i).offset().top-_line},500);
			});
        },
        resume_import:function(){//简历导入
	    	//导入简历tab切换
			$(".importRnav ul li").find("input").click(function(){
				$(this).parent().siblings("li").find("input").attr("checked");
				$(this).parent().find("input").attr("checked","checked");
				var num = $(this).parent().index();
				var $this = $(".importRcon ul li").eq(num)
				$this.addClass("current");
				$this.siblings("li").removeClass("current");
				$(this).parent().addClass("chose").siblings().removeClass("chose");
				if($(this).attr("id")=="fz"){
					$("#copy_resume_id option").remove();
					$.get("/cvresume/resume_list/",{},function(result){
						if(result!=null){
							$("#copy_resume_id").append(result);
						}
					})
					
				}
			});			
			//点击"选择HTML文件按钮"进行导入本地已经下载了的html格式简历文件
			$(".importRcon .a-input").click(function(){
				$(this).siblings("input").trigger("click");
			});
			//导入简历提示,显示文件名
			$("input[name='filename']").on('change', function(){
				var name = $(this).val();
				$(this).siblings("span.addr").text(name);
			});
			//51导入
			$("#51job_import").click(function(){
				var $this=$(this);
				var name = $this.closest("li").find("input").val();
				if(name==""||name==null){
					layer.msg("请选择文件上传");
					return;
				}
				if(typeof cvresume != "undefined"&&cvresume.main.is_empty(cvresume.info.memberid)){
	        		layer.msg("亲，登录后才可以导入简历哦~");
	        		return false;
	        	}
				var fileName = name.substring(name.lastIndexOf("\\") + 1);
				var fileType = name.substring(name.lastIndexOf(".") + 1);
				//校验文件格式是否正确
				if(fileType.toLocaleLowerCase() != "html" && fileType.toLocaleLowerCase() != "htm") {
					$("#importResetModal").modal("show");
					$("#importResetModal").find(".tips_show").text("只支持HTML，HTM格式，请重新选择导入");
					$("#importRModal").modal("hide");
					return;
				}
				$this.prop("disabled",true);
    			show_pro($this.closest("li").find("div.progressbar"),1);
    			read_local_file($this.closest("li").find("input")[0],"206","");
    			setTimeout(function(){
    				$this.prop("disabled",false);
    			},2000);
			});
			
			//智联简历导入
			$("#zhilian_import").click(function(){
				var $this=$(this);
				var name = $this.closest("li").find("input").val();
				if(name==""||name==null){
					layer.msg("请选择文件上传");
					return;
				}
				if(typeof cvresume != "undefined"&&cvresume.main.is_empty(cvresume.info.memberid)){
	        		layer.msg("亲，登录后才可以导入简历哦~");
	        		return false;
	        	}
				var fileName = name.substring(name.lastIndexOf("\\") + 1);
				var fileType = name.substring(name.lastIndexOf(".") + 1);
				//校验文件格式是否正确
				if(fileType.toLocaleLowerCase() != "html" && fileType.toLocaleLowerCase() != "htm") {
					$("#importResetModal").modal("show");
					$("#importResetModal").find(".tips_show").text("只支持HTML，HTM格式，请重新选择导入");
					$("#importRModal").modal("hide");
					return;
				}
				//判断用户权限
				$this.prop("disabled",true);
				show_pro($this.closest("li").find("div.progressbar"),1);
				read_local_file($this.closest("li").find("input")[0],"206",""); 
				setTimeout(function(){
					$this.prop("disabled",false);
				},2000);
			});
			//拉勾简历导入
			$("#laggou_import").click(function(){
				var $this=$(this);
				var name = $this.closest("li").find("input").val();
				if(name==""||name==null){
					layer.msg("请选择文件上传");
					return;
				}
				if(typeof cvresume != "undefined"&&cvresume.main.is_empty(cvresume.info.memberid)){
	        		layer.msg("亲，登录后才可以导入简历哦~");
	        		return false;
	        	}
				var fileName = name.substring(name.lastIndexOf("\\") + 1);
				var fileType = name.substring(name.lastIndexOf(".") + 1);
				//校验文件格式是否正确
				if(fileType.toLocaleLowerCase() != "html" && fileType.toLocaleLowerCase() != "htm") {
					$("#importResetModal").modal("show");
					$("#importResetModal").find(".tips_show").text("只支持HTML，HTM格式，请重新选择导入");
					$("#importRModal").modal("hide");
					return;
				}
				$this.prop("disabled",true);
				show_pro($this.closest("li").find("div.progressbar"),1);
				read_local_file($this.closest("li").find("input")[0],"206","");
				setTimeout(function(){
					$this.prop("disabled",false);
				},2000);
			});
			//本地简历复制
			$("#copyt_import").click(function(){
				var $this=$(this);
				var resumeid=$("#copy_resume_id").val();
				if(resumeid==null||resumeid==undefined||resumeid==""){
					layer.msg("请选择你需要复制的简历");
					return;
				}
				show_pro($this.closest("li").find("div.progressbar"),1);
				if(typeof cvresume != "undefined"){
					common.main.resumeOperationLogUpload(resumeid,"copyresume","","复制至简历（ID："+cvresume.info.resumeid+"）");
					if(window.sessionStorage) {
                        window.sessionStorage.removeItem("history");
						cvresume.main.resume_save_history();
	                }
					location.href="/cvresume/clone/"+resumeid+"/?clone2ResumeId="+cvresume.info.resumeid;
				}else{
					common.main.resumeOperationLogUpload(resumeid,"copyresume","","创建简历");
					location.href="/cvresume/clone/"+resumeid+"/";
				}
			});
			//简历导入的进度条显示
			function show_pro(tag,time){
				if(time==null||time==undefined){
					time=1;
				}
				tag.show();
				var ss_pro=100/(time*10);
				var sum_width=0;
				intervalid=setInterval(function(){
					sum_width=sum_width+ss_pro;
					console.log(Math.round(sum_width));
					update_pro(Math.round(sum_width)+"%",tag);
					if(sum_width>=95){
						sum_width=0;
						clearInterval(intervalid);
						//hide_pro();
					}
				},100);
				
			}	
			function update_pro(width,tag){
				tag.find("i").css("width",width);
				tag.find("span").text(width);
			}
			function hide_pro(){
				update_pro("100%",$("div.progressbar").find("div.progressbar"));
				clearInterval(intervalid);
				setTimeout(function(){
					$("div.progressbar").fadeOut("slow");
				},1000);
				setTimeout(function(){
					$("div.progressbar").find("i").css("width","0%");
					$("div.progressbar").find("span").text("0%");
				},2000);
			}
			$(".zx-dr-tips .span-close").click(function(){			
	    		$(".zx-dr-tips").css('display','none');
	    		return false;
	    	});
		},
	    hr_event:function(){
	    	//离线提示框
	    	$('.hr-detail-fwnr .hr-lx a').click(function(){
	    		var $this=$(this);
				var caseid=$(this).attr("data_casesid");
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>提示</span><span class='delete-tips'>这位HR老师好像暂时没有时间接单，你可以先去了解一下其他HR老师哟~</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
					$.get("/member/hr/deleteCases/?caseid="+caseid,function(message){
							if(message.type=="success"){
								window.location.reload();
							}else{
								$.message("warn",message.content);
							}
						});
					
					}
			    });	    		
	    	});	
	    	$('.hr-detail-fwnr .hr-ml #pay_btn').click(function(){
	    		var $this=$(this);
				var caseid=$(this).attr("data_casesid");
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>提示</span><span class='delete-tips'>这位HR老师手上正在处理的订单太多啦，暂时不接受下单，亲可以去看看其他HR老师哦~</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
					$.get("/member/hr/deleteCases/?caseid="+caseid,function(message){
							if(message.type=="success"){
								window.location.reload();
							}else{
								$.message("warn",message.content);
							}
						});
					
					}
			    });	    		
	    	});		    	
	    },
	    print_event:function(){
	    	
	    },
	    member_event:function(){
	    	//我的简历下载
	    	var _href,_html;
	    	$(document).on("click",".member-resume-con .zxjl-ul .text .down_btn",function(){
	    		var $this = $(this);
				$.get("/member/down_ad_data/",function(message){
					
					if(message.type=="success"){					
						var _content = JSON.parse(message.content);
						if(_content.can_down){
							_href = $this.attr("data-href");
							window.location.href = _href;
						}else{
							_href = "http://www.500d.me/order/vip_member/";
							window.location.href = _href;	
						}
					}
				}); 
	    	});		    	
			$(document).on("click",".jy_resume_download_modal .a_download_reusme,.jy_resume_download_modal .a_img",function(){
				$(".jy_resume_download_modal").modal("hide");
			});
	    	//个人在线会员升级操作
	    	$(".member-hy .huiyuan-upload").click(function(){
				common.main.vip_opt_tips();
	    	});
	    	//个人中心设置弹框隐藏
	    	$("#setResumeModal .jy-vip-lock").click(function(){
	    		// 获取权限接口删除 jy-vip-lock 这个class后  页面加载完查找到的dom节点仍然被绑定着这个class
	    		if($(this).hasClass("jy-vip-lock")) {
	    			$("#setResumeModal").modal("hide");
	    		}
	    	});
	    	//我的主页select	    	
			$(".myhome-select-cv .select-btn").on('click',function(event){
			    event.stopPropagation();
			    event.preventDefault();
			    if($(this).siblings(".select-box").hasClass('hidden')){
			         $(this).siblings(".select-box").removeClass("show");
			    }else{
			        $(this).siblings(".select-box").addClass("show");
			    }
			});
			$(".myhome-select-cv .select-box li").on('click',function(){
				//设置主页
				var _dataId = $(this).attr("data-id");
				$.ajax({
		    		type: "POST",
		            url: "/member/set_home_page_resume/",
		            data:{
		            	resumeId:_dataId
		            },
		           	success:function(message){
		           		if(message.type != "success"){
		           			layer.msg(message.content);
		           		}else{
		           			window.location.reload();
		           		}
		           	}
		    	});
			});
	    	//我的简历
	    	$(document).on("click",".zxjl-ul .set-btn",function(event){
	    		event.stopPropagation();
				event.preventDefault();
			    $(this).parents(".item").siblings().find(".set-box").removeClass("show");
			    $(this).find(".set-box").toggleClass("show");
			});
			$(".zxjl-ul .item").each(function(){
	    		if ($(this).hasClass("doc_resume")) {
	    			$(this).find(".set-btn .set-box-list.qh b").text("切换手机简历");
	    			$(this).find(".set-btn .set-box-list.qh s").removeClass("web").addClass("wap");			
	    		}else if($(this).hasClass("wap_resume")) {
	    			$(this).find(".set-btn .set-box-list.qh b").text("切换文档简历");
	    			$(this).find(".set-btn .set-box-list.qh s").removeClass("wap").addClass("web");	
	    		}
			});
	    	$(document).on("click",".set-box-list.qh s",function(event){
	    		if ($(this).hasClass("wap")) {
	    			$(this).removeClass("wap").addClass("web");
	    			$(this).siblings("a").find("b").text("切换文档简历");
	    			
	    		}else{
	    			$(this).addClass("wap").removeClass("web");
	    			$(this).siblings("a").find("b").text("切换手机简历");
	    		}
			});					
	    	//旧版删除简历提示（winna）
			$('.del_resume').click(function() {
				var $this=$(this);
				var data_id=$(this).attr("data_id");				
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>确定删除当前简历吗？</span><span class='delete-tips'>简历删除后将无法恢复。</span>",
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
						var url="/editresume/delete/?resumeId="+data_id;
						$.get(url, function(message) {
							if(message.type == "success"){
								$this.closest("div.item").remove();
								$("#web_size").html($('#web_size').eq(0).text()-1);
							}else{
								layer.msg(message.content);
							}
						});
					}
				});
			});	 
			$('.del_cvresume').click(function() {
				var $this=$(this);
				var data_id=$(this).attr("data_id");	
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>确定删除当前简历吗？</span><span class='delete-tips'>简历删除后将无法恢复。</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
						common.main.resumeOperationLogUpload(data_id,"delete","","");//日志上报      
			            var url="/cvresume/delete/"+data_id + "/";
			            $.get(url, function(message) {
			                if(message.type == "success"){
			                    $this.closest("div.item").remove();
			                    $("#web_size").html($('#web_size').eq(0).text()-1);			
			                }else{
			                    layer.msg(message.content);
			                }
			            });
					}
				});
			});				
	    	//我是hr回复评论
	    	$('.hr_eval .eval_list .eval_btn').click(function(){
	    		var $this=$(this);
				var data_id=$(this).attr("data_id");
				var reply=$(this).attr("data");
				common.main.resume_confirm({
					title:"回复评论",
					content_html:"<div contenteditable='true'></div>",					
					modal_class:"hr_eval_content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
						var content = $(".hr_eval_content div[contenteditable]").text();
						if(content.length==0){
							layer.msg("字数不能为空");
							return ;
						}
						if(content.length>200){
							layer.msg("字数不能超过200字");
							return ;
						}
						$.post("/member/hr/reply/",{"id":data_id,"content":content},function(message){
							if(message.type=="success"){
								layer.msg("回复成功");
								window.location.reload();
							}else{
								$.message("warn",message.content);
							}
						});
						
					}
				});	 
				$(".hr_eval_content div[contenteditable]").text(reply)
	    	});
	    	//删除案例提示框
	    	$('.hr_case_content .span_btn .del').click(function(){
	    		var $this=$(this);
				var caseid=$(this).attr("data_casesid");
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>确定删除当前案例吗？</span><span class='delete-tips'>案例删除后将无法恢复。</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:function(){
					$.get("/member/hr/deleteCases/?caseid="+caseid,function(message){
							if(message.type=="success"){
								window.location.reload();
							}else{
								$.message("warn",message.content);
							}
						});
					
					}
			    });	    		
	    	});	
	    	//警告弹框
	    	$(document).on("click",".ts",function(){
	    	  common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>提醒</span><span class='delete-tips'>您选择的HR尚未上传已完成简历，无法确认订单。</span>",					
					modal_class:"delete-content",
					ok:"确定",
					cancel:"取消",
					onOk:null
			    });	    		
	    	});
	    	//专家服务完成案例提示框
	    	$(document).on("click",".hr_li .complete:not(.yituikuan),.task_hr_li .complete:not(.yituikuan)",function(){
	    		var $this=$(this);
	    		var sn=$(this).attr("data_sn");
				common.main.resume_confirm({
					title:"",
					content_html:"<span class='delete-title'>确认完成订单？</span><span class='delete-tips'>认可服务结果并确认，确认后无法撤销。</span>",					
					modal_class:"delete-content hr_detail_tipModal",
					ok:"确定",
					cancel:"取消",
					onOk:function(){					
						$.post("/member/order/confrim_receive_order/",{"token":getCookie("token"),"sn":sn},function(message){
							layer.msg(message.content);
							if(message.type=="success"){
							   	   var id=$this.attr("date_id");
							   	   var orderName=$this.parents("li").find(".orderName").text();
							   	   if(!common.main.is_empty(orderName)){
								   	    var reg=new RegExp("/$");    
								   	    if(reg.test(orderName)){
								   	     	orderName=orderName.substring(0,orderName.length-1)
								   	    } 
							   	   }
							  	   $.get("/member/review/hrReview/",{"id":id,"orderName":orderName},function(result){
									     $("#hr-eval-modal div").remove();
								         if(result.div!=-1){
								            $("#hr-eval-modal").append(result);
								         }
						  		   });
							   	  $("#hr-eval-modal").modal("show")
							}
						});					
					}
				});	    		
	        });
	        //订单下拉框
            $(".wdddDiv .orderHead .info").click(function()  
		    {  
		        $(this).css({backgroundImage:"url(down.png)"}).next("ul.select-box").slideToggle(300).siblings("ul.select-box").slideUp("slow");  
		        $(this).siblings().css({backgroundImage:"url(left.png)"});  
		    });

	    	//工单列表状态
	    	$(document).on("click",".workorder_head .span_select s",function(){
	    		if($(this).find(".select_box").css("display") == "none"){
	    			$(this).find(".select_box").css("display","block");
	    			$(this).find("i").css({
	    				"transform":"rotate(180deg)",
	    				"top":"-1px"
	    			});
	    		}else{
	    			$(this).find(".select_box").css("display","none");
	    			$(this).find("i").css({
	    				"transform":"rotate(0deg)",
	    				"top":"5px"
	    			});
	    		}
	    		return false
	    	});	   

	    	$(document).on("click",".workorder_head .select_box s",function(){
	    		var s_text = $(this).text();
	    		$(this).addClass("current").siblings().removeClass("current");
	    		$(this).parent("s").find("b").text(s_text);
	    		$(".workorder_head .span_select i").css({
	    			"transform":"rotate(0deg)",
	    			"top":"5px"
	    		});	    		
	    		$(this).parents(".select_box").css("display","none");
	    	});    	
	    	//工单创建
	    	$(document).on("click",".create_step .create_item a",function(){
	    		var data_create = $(this).attr("data_create");
	    		$(".member_workorder_create .create_tab span").eq(1).addClass("current").siblings().removeClass("current");
	    		$(".create_content .create_step").eq(1).addClass("current").siblings().removeClass("current");
			});
			$(document).on('click',function(){
				$(".myhome-select-cv .select-box").removeClass("show");
				$(".zxjl-ul .set-box").removeClass("show");
			    $(".workorder_head .select_box").css("display","none");
	    		$(".workorder_head .span_select i").css({
	    			"transform":"rotate(0deg)",
	    			"top":"5px"
	    		});	
			});
			
	    	$(document).on("click",".reply_form_div",function(){
	    		$(this).hide();
	    		$(".reply_form .textarea_editor").css("display","block");
	    	});	
	    	//工单类型选择点击事件
	    	$(document).on("click", ".create_item a", function(){
	    		$(this).closest("div.create_item").addClass("type_selected");
	    	});
	    	//创建工单操作
	    	var _workOrderIsSubmit = true;
	    	$(document).on('click', '.create_btn button', function(){
	    		var $this = $(this);
	    		if(!_workOrderIsSubmit){
	            	return;
	          	}
	    		//获取工单类型
	    		var type = $(".type_selected a").attr("data_create");
	    		//获取工单标题
	    		var title = $(".create_form [name=title]").val();
	    		//获取工单描述
	    		var description = $(".create_form [name=description]").val();
	    		//获取微信号
	    		var weixin = $(".create_form [name=weixin]").val();
	    		//获取工单附件
	    		var attachment = $(".create_form [name=attachment]").val();
	    		if(title == "" || description == "" || weixin == ""){
	    			layer.msg("标题   | 问题描述 | 微信号都不能为空喔！");
	    			return;
	    		}
                $this.text('正在提交...');
                _workOrderIsSubmit = false;
	    		$.ajax({
	    			type:"post",
	    			dataType:"json",
	    			url:"/member/workOrder/create_submit/",
	    			data:{
	    				type:type,
	    				title:title,
	    				description:description,
	    				weixin:weixin,
	    				attachment:attachment
	    			},
	    			success:function(data){
	    				if(data.type == "success"){
	    					location.href = "/member/workOrder/";
	    				}else{
	    					layer.msg(data.content);
	    					$this.text('提交');
                			_workOrderIsSubmit = true;
	    				}
	    			},
	    			error:function(jqXHR,textStatus,errorThrown){
		              $this.text('提交');
		              _workOrderIsSubmit = true;
		            }
	    		})
	    	});
	    	//工单回复操作
	    	$(document).on('click', '#work_order_reply_btn', function(){
	    		//获取SN号
	    		var sn = $(this).closest("div.reply_btn").attr("data-value");
	    		//获取回复的内容
	    		var content = $("textarea[name=content]").val();
	    		$.ajax({
	    			type:"post",
	    			url:"/member/workOrder/"+sn+"/reply/",
	    			data:{
	    				content: content
	    			},
	    			dataType:"json",
	    			success:function(data){
	    				if(data.type == "success"){
	    					location.reload();  //回复成功刷新页面
	    				}else{
	    					layer.msg(data.content);
	    				}
	    			}
	    		});
	    		
	    	});
	    	//工单状态更新操作
	    	$(document).on('click', '#work_order_solved_btn', function(){
	    		//获取SN号
	    		var sn = $(this).closest("div.reply_btn").attr("data-value");
	    		$.ajax({
	    			type:"post",
	    			url:"/member/workOrder/"+sn+"/solved/",
	    			data:{},
	    			dataType:"json",
	    			success:function(data){
	    				if(data.type == "success"){
	    					location.href = "/member/workOrder/"; //状态更新成功后跳转到工单首页
	    				}else{
	    					layer.msg(data.content);
	    				}
	    			}
	    		});
	    	});
            //我的订单顶部提示关闭
            $(".jl-member-order .timeout_tips a").on("click",function(){
                $(this).parents(".timeout_tips").remove();
            });
	    },
	    create_editor:function(){//创建工单富文本
	    	// http://www.wangeditor.com/
			var editor = new wangEditor('create_editor');
	        // 上传图片
	        editor.config.uploadImgUrl = '/file/upload/';
	        editor.config.uploadImgFileName = 'file';
	        editor.config.uploadParams = {
                token: getCookie("token"),
                "fileType":"workOrderFile"
            };
	        // 自定义上传事件
	        editor.config.uploadImgFns.onload = function (resultText, xhr) {
	            // resultText 服务器端返回的text
	            // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
	            // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
	            var originalName = editor.uploadImgOriginalName || '';  
	            // 如果 resultText 是图片的url地址，可以这样插入图片：
				var html='<img src=' + resultText + ' alt="' + originalName + '"  style="max-width:100%;"/>';
	            editor.command(null, 'insertHtml', html);
	            // 如果不想要 img 的 max-width 样式，也可以这样插入：
	            // editor.command(null, 'InsertImage', resultText);
	        };
	        editor.config.uploadHeaders = {
	            // 'Accept' : 'text/x-json'
	        }
	        editor.config.menus = [
		        'img',
	     	];
	        editor.create();
	        var textArea = $(".wangEditor-txt");
	        var numItem = $(".textarea_counter .word");
	        common.main.words_deal_textarea(textArea,numItem);    	
	    },
		team_vip_event:function(){
            // 引导弹框
	    	var inner, inner_top, inner_left;
            try{
            	if(window.localStorage && localStorage.getItem("has_guide") === null && $('.team_main').length> 0){
    				inner_top = $('.tt_detail + .huiyuan-upload').offset().top +40;
    				inner_left = $('.tt_detail + .huiyuan-upload').offset().left -7;
                    inner = '<div class="team_guide_masking"><div class="team_guide_modal" style="top:'+
    					inner_top+ 'px; left:'+
    					inner_left+'px'+
    					';"><span>点击这里可以查看会员权限哦~</span><a href="javascript:;" class="team_guide_close">我知道了</a></div></div>';
    				$(inner).appendTo($('body'));
                }else if(window.localStorage && localStorage.getItem("has_guide") === null && $('.team_child').length> 0){
                    inner_top = $('.tt_detail').offset().top +30;
                    inner_left = $('.tt_detail').offset().left;
                    inner = '<div class="team_guide_masking"><div class="team_guide_modal" style="top:'+
                        inner_top+ 'px; left:'+
                        inner_left+'px'+
                        ';"><span>点击这里可以查看会员权限哦~</span><a href="javascript:;" class="team_guide_close">我知道了</a></div></div>';
                    $(inner).appendTo($('body'));
                }
                $('.team_guide_masking .team_guide_close,.team_guide_masking').on('click',function(){
                	localStorage.setItem('has_guide','true');
                	$('.team_guide_masking').fadeOut().remove();
    			});
            }catch(e){
        		console.log("显示团体会员蒙层错误~");
        	}
            //	复制邀请链接
            $("#add_team_child #copyUrl").on("click",function(){
                var str = $(".shareContent span").html();
                common.main.set_copyToClipBoard(str);
                $("#copyUrl").html("复制成功");
                setTimeout(function(){
                    $("#copyUrl").html("复制链接")
                },2000);
                layer.msg("复制成功~");
                $("#add_team_child").modal("hide");
            });
            //	放大流程图片
			$('.team_tutorial_list .team_tutorial_amplify').on('click',function(){
				var src = $(this).parent('.team_tutorial_list').find('img').attr('src');
				$('.team_tutorial_amplify_masking img').attr('src',src);
				$('.team_tutorial_amplify_masking').fadeIn();
				$('body').css('overflow-y','hidden')
			});
            $('.team_tutorial_amplify_masking').on('click',function(){
            	$(this).fadeOut();
                $('body').css('overflow-y','auto');
                $(this).find('img').attr('src','');
			});
            //生成团体会员邀请链接的点击事件
        	$("#genInviLinks").click(function(){
        		$.ajax({
        	        type: "post",
        	        dataType: "json",
        	        url: '/member/team/gengerat_code/',
        	        data: {},
        	        success: function (data) {
        	        	if(data.type == "success"){
        	        		$(".shareContent span").text("http://"+window.location.hostname+"/bind/team_vip/?code="+data.content);
        		        	$("#add_team_child").modal("show");
        	        	}else{
        	        		layer.msg(data.content);
        	        	}
        	        }
        	    });
        	});
		},
		page_form_event:function(){
			var $listForm = $("#pf_listForm");
			var $pageNumber = $("#pf_pageNumber");
			var $selectOption = $listForm.find(".pf_selectOption");

			//自定义下拉按钮
			$selectOption.click(function(){
				var $this = $(this);
				var $name = $("[name="+$this.attr("pf-data-name")+"]");
				$name.val($this.attr("pf-data-value"));
				$listForm.submit();
				return false;
			});

			//页码跳转
			$.page_form_pageSkip = function(pageNumber){
				$pageNumber.val(pageNumber);
				$listForm.submit();
				return false;
			}
		},
		//分享简历
	    resume_share:function(resume_id, visit_id, visit_type, password, callback){
	    	var password = password || "";
	    	var $html = '<p class="share_header">分享链接已生成，复制或扫码分享给相关的人即可查看简历</p>'+
		                '<div class="share_body">'+
		                    '<input type="text" class="share_url" readonly="readonly" value="" />'+
		                    '<button type="button" class="share_button copyUrl">复制链接</button>'+
		                '</div>'+
			            '<div class="share_footer">'+
			            	'<p class="share_footer_title">简历访问权限：</p>'+
			            	'<ul class="share_select">'+
			            		'<li data-status="open"><i class="share_chebox"></i><span class="share_select_name">所有人都可访问</span></li>'+
			            		'<li data-status="password"><i class="share_chebox check_password"></i><span class="share_select_name">需要密码访问</span>'+
			            			'<div class="password_box"><input type="text" class="password" value="' + password + '" maxlength="6" placeholder="密码格式仅限6位纯数字" /><button type="button" class="confirm_btn">确定</button></div>'+
			            		'</li>'+
			            		'<li data-status="privary"><i class="share_chebox"></i><span class="share_select_name">仅自己可访问</span></li>'+
			            	'</ul>'+
			            	'<div class="share_qrcode"><div id="share_resume_modal_qrcode"></div><p class="share_qrcode_massage">- 扫码分享 -</p></div>'+
			            '</div>';
	    	common.main.resume_confirm({
	    		title: "分享简历",
	    		tips_modal_class:"share_resume_modal",
				modal_class:"share_content",
				content_html: $html
	    	});
	    	// 分享链接
	    	var share_url = location.origin + "/cvresume/" + visit_id + "/";
	    	$(".share_resume_modal .share_body .share_url").val(share_url);
	    	// 选项初始化
	    	init_select($(".share_resume_modal .share_select li[data-status='" + visit_type + "']").children(".share_chebox"));
	    	function init_select($this) {
	    		$(".share_resume_modal .share_select .share_chebox").removeClass("checked");
	    		$this.addClass("checked");
	    		if($this.hasClass("check_password")) {
	    			$(".share_resume_modal .share_select .password_box").slideDown(200);
	    		}
	    	}
	    	// 二维码渲染
	    	$.getScript("/resources/500d/js/jquery.qrcode.min.js", function(){
	    		$("#share_resume_modal_qrcode").qrcode({
	    			width: 95,
                    height:95,
                    text: share_url
	    		});
	    	});
	    	// 选择权限
	    	$(".share_resume_modal .share_select .share_chebox, .share_resume_modal .share_select .share_select_name").on("click", function(){
	    		var $this = $(this);
	    		if($this.hasClass("share_select_name")) {
	    			$this = $this.siblings(".share_chebox");
	    		}
	    		if($this.hasClass("checked")) {
	    			return;
	    		}
	    		$(".share_resume_modal .share_select .share_chebox").removeClass("checked");
	    		$this.addClass("checked");
	    		if($this.hasClass("check_password")) {
	    			$(".share_resume_modal .share_select .password_box").slideDown(200);
	    			$(".share_resume_modal .share_select .password_box .password").removeAttr("style");
	    		} else {
	    			$(".share_resume_modal .share_select .password_box").slideUp(200);
	    			// 设置公开状态
	    			var status = $this.parent("li").attr("data-status");
	    			$.post("/cvresume/set_visit_type/",{
	    				visitType: status,
	    				resumeid: resume_id
	    			},function(data){
		    			if(data.type == "success") {
		    				layer.msg("设置成功！");
		    				if(callback && typeof callback == "function") {
		    					callback(status, "");
		    				}
		    			}
		    		});
	    		}
	    	});
	    	// 长度限制
	    	var maxlength = $(".share_resume_modal .password_box .password").attr("maxlength");
	    	$(".share_resume_modal .password_box .password").on("input", function(){
	    		var $this = $(this),
	    			val = $this.val();
	    		if(val.length > maxlength) {
	    			$this.val(val.substring(0, maxlength));
	    		}
	    	});
	    	// 确认设置密码
	    	$(".share_resume_modal .password_box .confirm_btn").on("click", function(){
	    		var $this = $(this),
	    			pwd = $this.siblings(".password");
	    		common.main.validate({
	    			rules: [{
	    				target: pwd,
	    				required: true,
	    				type: "int",
	    				rangelength: [6,6],
	    				massage: "请输入6位纯数字密码",
	    			}],
	    			onTips: function(tag, massage){
	    				layer.msg(massage);
	    				tag.css("border", "1px solid red");
	    			},
	    			onOk: function(value){
	    				pwd.removeAttr("style");
	    				$.post("/cvresume/set_visit_password/", {
	    					password: pwd.val(),
	    					resumeid: resume_id
	    				},function(message){
	    					if(message.type=="success"){
	    						layer.msg("保存成功！");
		    					if(callback && typeof callback == "function") {
			    					callback("password", pwd.val());
			    				}
	    					}
	    				});
	    			},
	    		});
	    	})
	    	// 复制链接
	    	$(".share_resume_modal .copyUrl").on("click", function(){
	        	var str = $(".share_resume_modal .share_url").val();
	        	common.main.set_copyToClipBoard(str);
	        	layer.msg("复制成功！");
	        });
	    },
	    set_copyToClipBoard:function (str) {
	        //复制到剪贴板
	    	 var copyInput = $("<input type='text' value='"+ str +"' style='opacity:1;position:absolute;top:20px;z-index:999;' id='copyText' />");
	         $(".in").length > 0 ? dom = $(".in")[0] : dom = "body";
	         copyInput.appendTo(dom);
	         document.getElementById("copyText").select();
	         document.execCommand("copy",false,null);
	         $("#copyText").remove();
	    },
	    is_empty:function(str){
	    	if(str==null||str==""||str==undefined){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    resume_confirm:function(options){//系统确认性弹框
			var settings = {
					title:"操作提示标题",
					content:"操作提示内容",
					content_html:"",
                    tips_modal_class:"confirm_modal",
					modal_class:"tips-modal-content",
					ok: "确定",
					cancel: "取消",
					onOk: null,
					onCancel: null,
					onLayer: null
			};
			$.extend(settings, options);
			var html='<div class="modal smallmodal fade" id="tips-common-modal">'+
			'	<div class="modal-dialog">'+
			'		<div class="modal-content show-swal2">'+
			'			<div class="modal-header">'+
			'				<span class="tips-title"></span>'+
			'				<button type="button" class="close " data-dismiss="modal" aria-hidden="true"></button>'+
			'			</div>'+
			'			<div class="modal-body">'+
			'				<span class="tips-content"></span>'+
			'			</div>'+
			'			<div class="modal-footer">'+
			'				<button type="button"  class="button submit">确定</button><button type="button"  data-dismiss="modal" aria-hidden="true" class="button cancel">取消</button>'+
			'			</div>'+
			'		</div>'+
			'	</div>'+
			'</div>'
			var $modal=$(html);
			//组装弹框内容
			$modal.find(".tips-title").text(settings.title);
            $modal.addClass(settings.tips_modal_class);
			$modal.find(".modal-content").addClass(settings.modal_class);
			$("#tips-common-modal").remove();
			if(settings.content_html==""){
				$modal.find(".tips-content").text(settings.content);
			}else{
				$modal.find(".tips-content").remove();
				$modal.find(".modal-body").html(settings.content_html);
			}
			$modal.find("button.submit").text(settings.ok);
			$modal.find("button.cancel").text(settings.cancel);
			$modal.appendTo("body");
			var $confirm_btn=$("#tips-common-modal").find("button.submit");
			var $cancel_btn=$("#tips-common-modal").find("button.cancel");
			var $layer_cancel=$("#tips-common-modal").find(".modal-dialog");
			if ($confirm_btn != null) {
				$confirm_btn.click(function() {
					if (settings.onOk && typeof settings.onOk == "function") {
						if (settings.onOk() != false) {
							tips_modal_close();
						}
					} else {
						tips_modal_close();
					}
					return false;
				});
			}
			if ($cancel_btn != null) {
				$cancel_btn.click(function() {
					if (settings.onCancel && typeof settings.onCancel == "function") {
						if (settings.onCancel() != false) {
							tips_modal_close();
						}
					} else {
						tips_modal_close();
					}
					return false;
				});
			}
			if ($layer_cancel != null) {
				$layer_cancel.click(function(e) {
					if($(e.target).hasClass("modal-dialog")) {
						if (settings.onLayer && typeof settings.onLayer == "function") {
							settings.onLayer();
							tips_modal_close();
						}
						return false;
					}
				});
			}
			$modal.modal("show");
			if($(".modal-backdrop").length >= 2) {
				$(".modal-backdrop").eq(0).remove();
			}
			//弹框关闭通用方法
			function tips_modal_close(){
				$modal.modal("hide");
				$modal.remove();
				$(".modal-backdrop").remove();
				$("body").removeClass("suggestModal");
				$("body").removeClass("modal-open");
			}
		},
		resume_danger_alert: function(callback){ // 警告性弹窗
			$("#wxloginModal").modal("hide");
			$("#zhloginModal").modal("hide");
			var $html = '<div class="danger_alert_title">您的账户已被封号</div><div class="danger_alert_msg">系统检测到当前账号违反<a href="http://static.500d.me/resources/html/member6.0.1/agreement.html">《简悦用户协议》</a>，涉及利用简悦资源非法牟利及违规分享等行为，已进行封号处理。</div>';
			common.main.resume_confirm({
				content_html: $html,
				modal_class:"danger_alert_content",
				onOk: function(){
					if(window.location.href.indexOf("/login/") < 0) {
						window.location.href = "/login/";
					}
				}
			});
		},
		getUrlParamsValue:function(name){//获取url中指定参数的值
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
			var r = window.location.search.substr(1).match(reg);
			if (r!=null) return (r[2]); return null;
		},
		repairResumeLeftHeight:function(){//修复简历左侧高度
			var resumeHeight = $(".jyCv-resume").height();
			$(".jyCv-resume").css({"height" : resumeHeight + "px"});
		},
		date_format:function(date,format){
			var month=date.getMonth() + 1;
			if(month<10){
				month="0"+month;
			}
			var o = {
				"M+" :month, // month
	
				"d+" : date.getDate(), // day
	
				"H+" : date.getHours(), // hour
	
				"m+" : date.getMinutes(), // minute
	
				"s+" : date.getSeconds(), // second
	
				"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
	
				"S" : date.getMilliseconds()
			}

			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for ( var k in o) {
				if (new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]: ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return format; 
		},
		isEffect:function(sourcetStr,targetStr){//内容是否有效
			try{
				if(common.main.is_empty(sourcetStr)||$.isEmptyObject(sourcetStr)){
					return false;
				}
				if(common.main.is_empty(targetStr)){
					return true;
				}
				sourcetStr=JSON.stringify(sourcetStr).replace(/\s/g, "");
				targetStr=JSON.stringify(targetStr).replace(/\s/g, "");
				if(sourcetStr==targetStr){
					return false;
				}else{
					return true;
				}
			}catch(e){
				console.log("内容判断异常。。。。"+e);
				return false;
			}
		},
		init_authority_lock:function(){//初始化会员权限锁
            $.get("/CvResume/GetMemberAuthoritys/",function(message){
				if(message.type=="success"){ 
                    $.each(message.content, function (index, val) { 
						$('[data_auth="'+val+'"]').removeClass("jy-vip-lock");
					});
				}
			});
			$(document).on("click",".jy-vip-lock",function(){
				var data_show_vip_type = $(this).attr("data-show-vip-type");
				var $this=$(this);
				if(common.main.is_empty(data_show_vip_type)){
					data_show_vip_type=="super";
				}
				var opt=$this.attr("data_auth");
				//获取权限消息
				$.ajax({
					async:false,
					cache:false,
					type:"GET",
					data:{"opt":opt},
					url:"/cvresume/validate_opt_auth/",
					success:function(message){
						if(message.type=="warn"){
							common.main.vip_opt_tips();
							layer.msg(message.content);
							return;
						}else if(message.type=="error"){
							layer.msg(message.content);
							return false;
						}else if(message.type=="success"){
							$this.removeClass("jy-vip-lock");
							$this.attr("readonly","");
							$this.trigger("click");
							return false;
						}
					}
				});
            }); 
		},
		//会员登录状态检查
		check_login_by_cookie:function(){
    		//检测是否登录
    		if(!getCookie("memberId")) {   
    			return false;
    		}	
    		return true;
		},
		//会员类型判断（判断显示是普通弹框还是差价弹框）
    vip_opt_tips: function () {
        common.main.vip_upgrade_modal();
			//检测是否登录
    		if(!common.main.check_login_by_cookie()){
    			if(typeof show_login_modal != "undefined" && typeof(show_login_modal)=="function"){
    				show_login_modal();
    			}else{
    				window.open('/login/');
    			}
    			return ;
			}
			$.ajax({
				type:"GET",
				url:"/order/up_vip/",
				success:function(data){
					if(data.type == "success") {
						var _data = JSON.parse(data.content);
						common.main.vip_upgrade_modal(_data);
					} else {
						layer.msg("获取会员信息失败");
					}
				}
			});									
		},
		//会员升级弹层
		vip_upgrade_modal:function(data){
			var $upgrade = '<div class="upgrade_vip_panel" id="upgrade_vip_panel">'+
				'<div class="upgrade_panel_head">'+
					'<ul class="upgrade_head_content">'+
						'<li><p class="content_number">15,000+</p><p class="content_text">每日更新简历</p></li>'+
						'<li><p class="content_number">60,000+</p><p class="content_text">每周新增会员</p></li>'+
						'<li><p class="content_number">2,000+</p><p class="content_text">每月新增素材</p></li>'+
					'</ul>'+
					'<div class="upgrade_panel_close"></div>'+
				'</div>'+
				'<div class="upgrade_panel_body">'+
					'<h1 class="upgrade_body_title">会员权限</h1>'+
					'<div class="upgrade_table">'+
						'<div class="upgrade_table_tr upgrade_tr_head" border-bottom-none>'+
							'<div class="upgrade_table_td upgrade_type">'+
								'<p class="grade">会员等级</p>'+
								'<p class="price">价格</p>'+
							'</div>'+
							'<div class="upgrade_table_td upgrade_v0">'+
								'<p class="grade">免费会员</p>'+
								'<p class="price">￥<span>0</span></p>'+
								'<p class="difference"></p>'+
								'<div class="upgrade_vip_btn disable">已注册</div>'+
							'</div>'+
							'<div class="upgrade_table_td upgrade_v1 commonVip">'+
								'<p class="grade">普通会员</p>'+
								'<p class="price">￥<span>21.9</span></p>'+
								'<p class="difference"></p>'+
								'<div class="upgrade_vip_btn green">立即升级</div>'+
							'</div>'+
							'<div class="upgrade_table_td upgrade_v2 advancedVip">'+
								'<p class="grade">进阶会员</p>'+
								'<p class="price">￥<span>29.9</span></p>'+
								'<p class="difference"></p>'+
								'<div class="upgrade_vip_btn green">立即升级</div>'+
							'</div>'+
							'<div class="upgrade_table_td upgrade_v3 foreverVip common_bg">'+
								//'<div class="turn_btn"></div>'+
								//'<div class="turn_text">原价升级</div>'+
								//'<div class="turn turn_activity_bg"><div class="turn_child"></div></div>'+
								//'<div class="activity" style="display: none;">'+
								//	'<p class="grade">终身会员</p>'+
								//	'<p class="price" data-activityPrice="49.9">最低<small>￥</small><span>49.9</span><del style="text-decoration:line-through;">￥99.9</del></p>'+
								//	'<p class="difference"></p>'+
								//	'<div class="upgrade_vip_btn orange">立即砍价</div>'+
								//'</div>'+
								'<div class="common" style="display: block;">'+
									'<p class="grade">终身会员</p>'+
									'<p class="price">￥<span>39.9</span></p>'+
									'<p class="difference"></p>'+
									'<div class="upgrade_vip_btn green">立即升级</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="upgrade_tr_title">在线编辑特权  ——  一键排版，手机操作更方便</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">有效期</div>'+
							'<div class="upgrade_table_td upgrade_v0">永久</div>'+
							'<div class="upgrade_table_td upgrade_v1">1月</div>'+
							'<div class="upgrade_table_td upgrade_v2">1年</div>'+
							'<div class="upgrade_table_td upgrade_v3">永久</div>'+
						'</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">简历创建份数</div>'+
							'<div class="upgrade_table_td upgrade_v0">3份</div>'+
							'<div class="upgrade_table_td upgrade_v1">5份</div>'+
							'<div class="upgrade_table_td upgrade_v2">20份</div>'+
							'<div class="upgrade_table_td upgrade_v3">100份</div>'+
						'</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">在线投递上限</div>'+
							'<div class="upgrade_table_td upgrade_v0">10份</div>'+
							'<div class="upgrade_table_td upgrade_v1">30份</div>'+
							'<div class="upgrade_table_td upgrade_v2">50份</div>'+
							'<div class="upgrade_table_td upgrade_v3">无上限</div>'+
						'</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">在线简历导出</div>'+
							'<div class="upgrade_table_td upgrade_v0"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v1"><i class="vip_item_on"></i></div>'+
							'<div class="upgrade_table_td upgrade_v2"><i class="vip_item_on"></i></div>'+
							'<div class="upgrade_table_td upgrade_v3"><i class="vip_item_on"></i></div>'+
						'</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">导入站外简历</div>'+
							'<div class="upgrade_table_td upgrade_v0"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v1"><i class="vip_item_on"></i></div>'+
							'<div class="upgrade_table_td upgrade_v2"><i class="vip_item_on"></i></div>'+
							'<div class="upgrade_table_td upgrade_v3"><i class="vip_item_on"></i></div>'+
						'</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">一键更换模板</div>'+
							'<div class="upgrade_table_td upgrade_v0"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v1"><i class="vip_item_on"></i></div>'+
							'<div class="upgrade_table_td upgrade_v2"><i class="vip_item_on"></i></div>'+
							'<div class="upgrade_table_td upgrade_v3"><i class="vip_item_on"></i></div>'+
						'</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">自定义图标</div>'+
							'<div class="upgrade_table_td upgrade_v0"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v1"><i class="vip_item_on"></i></div>'+
							'<div class="upgrade_table_td upgrade_v2"><i class="vip_item_on"></i></div>'+
							'<div class="upgrade_table_td upgrade_v3"><i class="vip_item_on"></i></div>'+
						'</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">设置个性封面</div>'+
							'<div class="upgrade_table_td upgrade_v0"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v1"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v2"><i class="vip_item_on"></i></div>'+
							'<div class="upgrade_table_td upgrade_v3"><i class="vip_item_on"></i></div>'+
						'</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">设置简历自荐信</div>'+
							'<div class="upgrade_table_td upgrade_v0"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v1"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v2"><i class="vip_item_on"></i></div>'+
							'<div class="upgrade_table_td upgrade_v3"><i class="vip_item_on"></i></div>'+
						'</div>'+
						'<div class="upgrade_table_tr" border-bottom-none>'+
							'<div class="upgrade_table_td upgrade_type">个性简历域名</div>'+
							'<div class="upgrade_table_td upgrade_v0"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v1"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v2"><i class="vip_item_off"></i></div>'+
							'<div class="upgrade_table_td upgrade_v3"><i class="vip_item_on"></i></div>'+
						'</div>'+
						'<div class="upgrade_tr_title">模板商城特权 —— 海量模板，定时更新</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">有效期</div>'+
							'<div class="upgrade_table_td upgrade_v0">永久</div>'+
							'<div class="upgrade_table_td upgrade_v1">1月</div>'+
							'<div class="upgrade_table_td upgrade_v2">1年</div>'+
							'<div class="upgrade_table_td upgrade_v3">永久</div>'+
						'</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">word模板下载</div>'+
							'<div class="upgrade_table_td upgrade_v0">可单独购买</div>'+
							'<div class="upgrade_table_td upgrade_v1">1套/天</div>'+
							'<div class="upgrade_table_td upgrade_v2">3套/天</div>'+
							'<div class="upgrade_table_td upgrade_v3">30套/天</div>'+
						'</div>'+
						'<div class="upgrade_table_tr" border-bottom-none>'+
							'<div class="upgrade_table_td upgrade_type">ppt模板下载</div>'+
							'<div class="upgrade_table_td upgrade_v0">可单独购买</div>'+
							'<div class="upgrade_table_td upgrade_v1">1套/天</div>'+
							'<div class="upgrade_table_td upgrade_v2">3套/天</div>'+
							'<div class="upgrade_table_td upgrade_v3">30套/天</div>'+
						'</div>'+
						'<div class="upgrade_tr_title">其他特权 —— 一切为了更好的用户体验</div>'+
						'<div class="upgrade_table_tr">'+
							'<div class="upgrade_table_td upgrade_type">在线客服</div>'+
							'<div class="upgrade_table_td upgrade_v0">排队处理</div>'+
							'<div class="upgrade_table_td upgrade_v1">优先处理</div>'+
							'<div class="upgrade_table_td upgrade_v2">优先处理</div>'+
							'<div class="upgrade_table_td upgrade_v3">专属客服</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="upgrade_panel_foot">'+
					'<div class="upgrade_foot_content">'+
						'<p class="question_title">常见问题</p>'+
						'<div class="question_list">'+
							'<p>• 时间如何计算？</p>'+
							'<p>会员有效期自付费成功之日起的自然时间段来计算，如购买超级会员，即付费日期后的365天内均可享受会员服务。</p>'+
						'</div>'+
						'<div class="question_list">'+
							'<p>• 会员到期后有什么影响？</p>'+
							'<p>会员到期前3天会通过微信服务号收到相关提示（需绑定微信），若不续费或升级，会员到期后，将恢复普通用户身份，相关权益也将随之变更，已创建的简历数据不会受到影响。</p>'+
						'</div>'+
						'<div class="question_list">'+
							'<p>• 已开通会员了怎么还显示是免费会员？</p>'+
							'<p>由于网络情况导致数据更新不及时，请刷新页面或重新登录。</p>'+
						'</div>'+
						'<div class="question_list">'+
							'<p>* 如仍有疑问，请直接<a target="_blank" href="/member/workOrder/create/">联系客服</a>。</p>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
			// 插入节点
			$("body").addClass("open");
			if($("#upgrade_vip_panel").length > 0) {
				$("#upgrade_vip_panel").fadeIn(500);
			} else {
				$($upgrade).appendTo($("body"));
				var $upgrade_panel = $("#upgrade_vip_panel");
				$upgrade_panel.fadeIn(500);
				// 数据渲染
				// vip名称
				$upgrade_panel.find(".commonVip .grade").text(data.commonVip.name);
				$upgrade_panel.find(".advancedVip .grade").text(data.advancedVip.name);
				$upgrade_panel.find(".foreverVip .grade").text(data.foreverVip.name);
				// vip价格
				$upgrade_panel.find(".commonVip .price span").text(data.commonVip.price);
				$upgrade_panel.find(".advancedVip .price span").text(data.advancedVip.price);
				$upgrade_panel.find(".foreverVip .common .price span").text(data.foreverVip.price);
				$upgrade_panel.find(".foreverVip .activity .price del").text("￥"+data.foreverVip.price);
				// 绑定数据 id price sn name
				$upgrade_panel.find(".commonVip .upgrade_vip_btn").attr("data-id", data.commonVip.id).attr("data-sn", data.commonVip.sn).attr("data-name", data.commonVip.name);
				$upgrade_panel.find(".advancedVip .upgrade_vip_btn").attr("data-id", data.advancedVip.id).attr("data-sn", data.advancedVip.sn).attr("data-name", data.advancedVip.name);
				$upgrade_panel.find(".foreverVip .upgrade_vip_btn").attr("data-id", data.foreverVip.id).attr("data-sn", data.foreverVip.sn).attr("data-name", data.foreverVip.name);
				// 判断是否差价
				if(data.type == "common") {
					// 原价购买价格
					$upgrade_panel.find(".commonVip .upgrade_vip_btn").attr("data-price", data.commonVip.price);
					$upgrade_panel.find(".advancedVip .upgrade_vip_btn").attr("data-price", data.advancedVip.price);
					$upgrade_panel.find(".foreverVip .upgrade_vip_btn").attr("data-price", data.foreverVip.price);
				} else if(data.type == "up") {
					// 差价升级
					// 差价购买价格
					$upgrade_panel.find(".commonVip .upgrade_vip_btn").attr("data-price", data.commonVip.diffPrice);
					$upgrade_panel.find(".advancedVip .upgrade_vip_btn").attr("data-price", data.advancedVip.diffPrice);
					$upgrade_panel.find(".foreverVip .upgrade_vip_btn").attr("data-price", data.foreverVip.diffPrice);
					// 显示相差价格
					$upgrade_panel.find(".upgrade_tr_head .upgrade_table_td .difference").show();
					$upgrade_panel.find(".upgrade_tr_head").addClass("difference_head");
					// 修改按钮状态 
					$upgrade_panel.find(".commonVip .upgrade_vip_btn").removeClass("green").addClass("disable");
					if(data.canUpAdvancedVip) {	// 进阶会员
						$upgrade_panel.find(".advancedVip .difference").text("当前为补差价升级，仅需：￥"+data.advancedVip.diffPrice);
					} else {
						$upgrade_panel.find(".advancedVip .difference").text("");
						$upgrade_panel.find(".advancedVip .upgrade_vip_btn").removeClass("green").addClass("disable");
					}
					// 终身会员
					var diff = data.foreverVip.diffPrice * 0.5;
					$upgrade_panel.find(".foreverVip .common .difference").text("当前为补差价升级，仅需：￥"+data.foreverVip.diffPrice);
					$upgrade_panel.find(".foreverVip .activity .difference").text("当前为补差价升级，最低可砍至￥"+diff.toFixed(1));
				} else if(data.type == "foreverVip") {
					$upgrade_panel.find(".commonVip .upgrade_vip_btn").removeClass("green").addClass("disable");
					$upgrade_panel.find(".advancedVip .upgrade_vip_btn").removeClass("green").addClass("disable");
					$upgrade_panel.find(".foreverVip .common .upgrade_vip_btn").removeClass("green").addClass("disable");
					$upgrade_panel.find(".foreverVip .activity .upgrade_vip_btn").removeClass("orange").addClass("disable");
				}
				// 砍价活动 按钮状态获取
			    $.get("/member/bargain/get_bargain_status/", function(data) {
			    	var activity_btn = $upgrade_panel.find(".foreverVip .activity .upgrade_vip_btn");
			    	if(data.type !== "success") {
			    		activity_btn.click(function(){
					    	layer.msg("不能发起砍价");
					    });
			    		return;
			    	}
					var _data = JSON.parse(data.content);
					if(_data.status === "running" ||  _data.status === "startUp") {
						activity_btn.click(function(){
							//点击砍价按钮，判断用户是否已经绑定微信
							if(getCookie("memberIsBindWeixin")=="false"){
								var _redirectUrl = decodeURI(location.pathname+location.search);
								location.href="/login/bind_weixin/?redirectUrl="+_redirectUrl;
								return;
							}
							//弹框  切换
							common.main.activity_down_price(_data.url);
					    });
					} else if(_data.status === "completed"){
						activity_btn.text("砍价完成");
						activity_btn.click(function(){
							location.href = location.origin + "/member/order/";
						});
					}
				});
				// 升级按钮点击
				$upgrade_panel.find(".upgrade_vip_btn.green").click(function(){
					var $this = $(this);
					// 支付提交
					common.main.orders_confirm_form({
						type: "memberVip",
						action: "/member/order/create_vip_order/",
						data: {
							"productid": $this.attr("data-id"),
							"price": $this.attr("data-price"),
							"mcid": ""
						},
						product: [{
							name: $this.attr("data-name"),
							price: $this.attr("data-price"),
							pid: $this.attr("data-id"),
							sn: $this.attr("data-sn")
						}],
						total_price: $this.attr("data-price"),
						onSubmit_after: function(){
							common.main.pay_tips_modal();
							$(".payType_modal").stop().show();
							$(".payTips_modal").stop().show();
						}
					});
				});
				// 翻页切换
				//turn(40);
//				function turn(num, time, callback){
//					var num = num || 0,
//						time = time || 0;
//					var $turn = $("#upgrade_vip_panel .turn"),
//						$child = $turn.find(".turn_child"),
//						$parent = $turn.parent(),
//						$turn_size = Math.sqrt($parent.width() * $parent.width() + $parent.height() * $parent.height());
//					$turn.css({
//						"top": -(($turn_size - $parent.height()) / 2) + "px",
//						"left": -(($turn_size - $parent.width()) / 2) + "px",
//						"width": $turn_size + "px",
//						"height": $turn_size + "px",
//						"transform": "rotate(45deg) translateY(" + num + "px)",
//						"transition": "all " + time + "s ease-in"
//					});
//					var $child_x = ($turn_size - ($turn_size - $parent.width()) / 2).toFixed(1),
//						$child_y = -($turn_size - ($turn_size - $parent.height()) / 2).toFixed(1);
//					$child.css({
//						"background-image": "linear-gradient(to top right, rgba(253, 248, 242, 1) 1%, rgba(239, 216, 185, 1) " + num * 0.16 + "%, rgba(251, 242, 230, 1) " + num * 0.24 + "%, rgba(255,255,255,0) 0%)",
//						"transform": "rotate(-45deg) translate(" + ($child_x - num * .7) + "px, " + ($child_y + num * .7) + "px)",
//						"transition": "all " + time + "s ease-in"
//					});
//					if(callback && typeof callback == "function") {
//						setTimeout(function(){
//							callback();
//						}, time * 1000);
//					}
//				}
//				var turn_state = true,
//					turn_click = false;
//				$("#upgrade_vip_panel .turn_btn").click(function(){
//					if(turn_click) {		// 阻止多次点击
//						return;
//					}
//					turn_click = true;
//					var $common = $upgrade_panel.find(".foreverVip .common"),
//						$activity = $upgrade_panel.find(".foreverVip .activity"),
//						$turn = $upgrade_panel.find(".foreverVip .turn"),
//						$turn_child = $upgrade_panel.find(".foreverVip .turn_child"),
//						$text = $upgrade_panel.find(".foreverVip .turn_text");
//					if(turn_state) {
//						$activity.css("z-index", "5").hide();
//						$common.css("z-index", "5").show();
//						$text.fadeOut(300);
//						turn(400, 0.45, function(){
//							$turn.removeClass("turn_activity_bg").addClass("turn_common_bg").hide();
//							turn(0);
//							$common.css("z-index", "9");
//							$turn.show();
//							$upgrade_panel.find(".foreverVip").removeClass("common_bg").addClass("activity_bg");
//						});
//						setTimeout(function(){
//							turn(40, 0.3);
//							$text.text("砍价升级").show();
//							turn_click = false;
//						}, 500);
//					} else {
//						$common.css("z-index", "5").hide();
//						$activity.css("z-index", "5").show();
//						$text.fadeOut(300);
//						turn(400, 0.45, function(){
//							$turn.removeClass("turn_common_bg").addClass("turn_activity_bg").hide();
//							turn(0);
//							$activity.css("z-index", "9");
//							$turn.show();
//							$upgrade_panel.find(".foreverVip").removeClass("activity_bg").addClass("common_bg");
//						});
//						setTimeout(function(){
//							turn(40, 0.3);
//							$text.text("原价升级").show();
//							turn_click = false;
//						}, 500);
//					}
//					turn_state = !turn_state;
//				});
				// 关闭按钮触发
				var close = $upgrade_panel.find(".upgrade_panel_close");
				close.click(function(){
					close_panel();
				});
				// 关闭弹窗方法
				function close_panel(){
					$upgrade_panel.fadeOut(500, function(){
						$("body").removeClass("open");
						$upgrade_panel.remove();
					});
				}
			}
		},
		// 会员升级 确认支付 弹窗
		orders_confirm_form: function(obj){
			var form_data = {
				type: "",					// 调用支付弹窗的类型 vip  hr  template
				action: "",					// form表单属性
				method: "post",				// form表单属性
				target: "_blank",			// form表单属性  _blank：form表单提交     ajax：ajax提交
				data: {},					// form表单数据
				product: [{
					name: "",
					price: "",				// 如果没有价格  就传 number
					pid: "",
					sn: ""
				}],							// 商品数据
				total_price: 0,				// 商品价钱总数
				onOpen: null,				// 打开弹窗回调
				onCancel: null,				// 关闭弹窗回调
				onSubmit_before: null,		// 表单提交前执行回调
				onSubmit_after: null,		// 表单提交后执行回调
			};
			$.extend(form_data, obj);
			if(!form_data.action) {
				console.error("form链接为空");
				return;
			}
			// 生成弹窗
			var html =	'<div class="modal smallmodal fade orders_confirmorder_modal" id="orders_confirmorder_modal">'+
							'<div class="modal-dialog">'+
								'<div class="modal-content show-swal2 orders_confirmorder">'+
									'<div class="modal-header">'+
										'<span class="tips-title">订单确认</span>'+
										'<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
									'</div>'+
									'<div class="modal-body">'+
										'<form id="order_form" action="" method="" target="" novalidate="novalidate"></form>'+
										'<div id="product_table" class="item"><h2>服务清单</h2></div>'+
										'<div class="item">'+
											'<h2>使用优惠券 '+
												'<div class="discount_list_toggle"><i></i><span>可用优惠券</span>'+
													'<div class="discount_rule_details">'+
														'<p><b>1. </b>一次下单只能只用一张优惠券；</p>'+
														'<p><b>2. </b>凭优惠券在简悦付款时可抵现金使用， 不可兑换现金、不设找零；</p>'+
														'<p><b>3. </b>各优惠券仅可使用一次，使用后不退还；</p>'+
														'<p><b>4. </b>优惠券的最终解释权归简悦所有。</p>'+
													'</div>'+
												'</div>'+
											'</h2>'+
											'<div class="discount_ticket_checked">'+
												'<ul>'+
													'<li class="ticket_checked_title">'+
														'<div class="left">优惠券名称</div>'+
														'<div class="right">优惠</div></li><li>'+
														'<div class="left ticket_checked_name">不使用</div>'+
														'<div class="right">- &yen;<span class="ticket_checked_money">0</span></div>'+
													'</li>'+
												'</ul>'+
											'</div>'+
											'<div class="discount_ticket_show">'+
												'<ul id="ticket_list_container"></ul>'+
											'</div>'+
										'</div>'+
										'<div class="item">'+
											'<h2>选择支付方式</h2>'+
											'<div class="con_pay">'+
												'<div class="con">'+
													'<label class="wx"><input name="pay_type" pay_id="weixin" type="radio" checked="checked"/>微信</label>'+
													'<label class="zfb"><input name="pay_type" pay_id="alipay" type="radio"/>支付宝</label>'+
													'<label class="db"><input name="pay_type" pay_id="dbpay" type="radio"/>丁币</label>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="modal-footer">'+
										'<p class="orders_confirm_total">合计：<span>￥</span><span id="orders_total_price">'+form_data.total_price+'</span></p>'+
										'<button type="button" class="button submit">立即支付</button>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>';
			var $modal = $(html);
			// 丁币显示
			if(form_data.type != "common") {
				$modal.find(".con_pay .db").hide();
			}
			// 服务清单商品列表展示
			var product_tr = [];
			product_tr.push('<div class="product_table title"><p class="left">商品名称</p><p class="right">'+ (form_data.product[0].number ? '数量' : '价格') +'</p></div>');
			$.each(form_data.product, function(i, e) {
				product_tr.push('<div class="product_table"><p class="left">'+e.name+'</p><p class="right">'+ (form_data.product[0].number ? e.number : '&yen;'+e.price) +'</p></div>');
			});
			$modal.find("#product_table").append($(product_tr.join("")));
			// 渲染支付弹窗
			$("#orders_confirmorder_modal").remove();
			$modal.appendTo("body");
			// form表单数据处理
			if(form_data.target != "ajax") {
				$modal.find("form#order_form").attr("action", form_data.action).attr("method", form_data.method).attr("target", form_data.target);
				$modal.find("form#order_form").append('<input type="hidden" name="paytype" value="" />');
				$modal.find("form#order_form").append('<input type="hidden" name="token" value="'+getCookie("token")+'" />');
				$.each(form_data.data, function(i, e) {
					var form_input = '<input type="hidden" name="'+i+'" value="'+e+'" />';
					$modal.find("form#order_form").append(form_input);
				});
				// 支付弹窗操作
				$modal.find("form#order_form input[name='paytype']").val($modal.find("input[name='pay_type']:checked").attr("pay_id"));
				$modal.find("input[name='pay_type']").change(function(){
					$modal.find("form#order_form input[name='paytype']").val($modal.find("input[name='pay_type']:checked").attr("pay_id"));
				});
			}
			// 打开弹窗回调
			if(form_data.onOpen && typeof form_data.onOpen == "function") {
				form_data.onOpen();
			}
			// 优惠券列表方法调用-----------------------------------------------------
			var _sn = [];
			$.each(form_data.product, function(i, e){
				_sn.push(e.sn);
			});
			common.main.pay_modal_coupon_list({
				type: form_data.type,
				price: form_data.total_price,
				sn: _sn.join(",")
			}, function(price, mcid){
				$modal.find("#orders_total_price").text(price);
				if(form_data.target == "ajax") {
					form_data.data.mcid = mcid;
				} else {
					$modal.find("form#order_form input[name='mcid']").val(mcid);
				}
			});
			// 优惠券列表方法调用----------------------------------------------------
			// 弹窗操作
			var $submit_btn = $("#orders_confirmorder_modal").find("button.submit"),
				$cancel_btn = $("#orders_confirmorder_modal").find("button.close");
			$submit_btn.click(function() {
				var ajax_massage = {};
				// 表单提交前回调
				if(form_data.onSubmit_before && typeof form_data.onSubmit_before == "function") {
					var _data = form_data.onSubmit_before();
					if("hr" == form_data.type){
						form_data.data = _data;
					}
				}
				// 判断提交方式
				if(form_data.target == "ajax"){
					form_data.data.paytype = $modal.find("input[name='pay_type']:checked").attr("pay_id");
					form_data.data.token = getCookie("token");
					$.ajax({
						type: form_data.method,
						url: form_data.action,
						async: false,
						data: form_data.data,
						success: function(data){
							ajax_massage = data;
						}
					});
				} else {
					$("form#order_form").submit();
				}
				// 表单提交后回调
				if(form_data.onSubmit_after && typeof form_data.onSubmit_after == "function") {
					form_data.onSubmit_after(ajax_massage);
				}
				tips_modal_close();
			});
			$cancel_btn.click(function() {
				if(form_data.onCancel && typeof form_data.onCancel == "function") {
					form_data.onCancel();
				}
				tips_modal_close();
			});
			setTimeout(function(){
				$modal.modal("show");
				var confirm_content = $modal.find(".orders_confirmorder");
				if(confirm_content.height() != 0) {
					confirm_content.css({
						"top": "50%",
						"margin-top": - (confirm_content.height() / 2) + "px"
					});
				}
			}, 50);
			//弹框关闭通用方法
			function tips_modal_close(){
				$modal.modal("hide");
				$modal.remove();
				$(".modal-backdrop").remove();
				$("body").removeClass("suggestModal");
				$("body").removeClass("modal-open");
			}
		},
		// 优惠券获取可用优惠券列表
		pay_modal_coupon_list: function(obj, callback){
			var _obj = {
				type: "",
				price: "",
				sn: "",
			},
			discount_price = _obj.price;
			$.extend(_obj, obj);
			// 优惠券列表 渲染
			var ticket_list = [];
			ticket_list.push('<li><div class="left"><p class="ticket_name" data-money="0">不使用</p></div><div class="right"><i class="checkbox"></i></div></li>');
			$.get("/coupon/available/", {
				type: _obj.type,
				sn: _obj.sn
			}, function(data){
				if(data.type === "success") {
					var _data = JSON.parse(data.content);
					$.each(_data.couponList, function(i, e) {
						if(e.pName.length == 0) {
							e.pName.push("指定商品");
						}
						var list_html = '<li class="'+ (e.can_use && (_obj.price >= e.minPrice) ? "ticket_list_allow" : "ticket_list_disable") +'" data-type="'+e.type+'" data-mcid="'+e.mcid+'">'+
											'<div class="left">'+ 
												((!e.can_use ? "<i></i>" : '') || (_obj.price < e.minPrice ? "<i></i>" : '')) +
												'<p class="ticket_name" data-money="'+e.discount+'">'+ 
												(e.type == "减免券" ? e.discount+"元-"+e.name : e.discount+"折-"+e.name) +
												'</p>'+
												'<p>有效期：'+ e.effectBeginDate.replace(/\-/g, ".")+'-'+e.effectEndDate.replace(/\-/g, ".") +'</p>'+
												((!e.can_use ? '<p class="info_hide">使用范围：'+e.pName.join("，")+'</p><p class="info_hide">最低消费：'+e.minPrice+'元</p><p class="info_hide">'+e.result+'</p>' : '') ||
												(_obj.price < e.minPrice ? '<p class="info_hide">使用范围：'+e.pName.join("，")+'</p><p class="info_hide">最低消费：'+e.minPrice+'元</p><p class="info_hide">实付金额未达优惠门槛</p>' : '')) +
											'</div>'+
											'<div class="right">'+
												'<i class="checkbox"></i>'+
											'</div>'+
										'</li>';
						// 可用 放前面  不可用 放后面
						e.can_use && (_obj.price >= e.minPrice) ? ticket_list.unshift(list_html) : ticket_list.push(list_html);
					});
					// 插入dom
					$("#ticket_list_container").html(ticket_list.join(""));
					// 默认使用第一张
					$(".discount_ticket_show li:not(.ticket_list_disable)").eq(0).find("i.checkbox").addClass("checked");
					checked_ticket();
					// 选中按钮点击
					$(".discount_ticket_show li:not(.ticket_list_disable) i.checkbox").on('click', function(){
						$(".discount_list_toggle span").removeClass("open");
						$(this).addClass("checked").parents("li").siblings("li").find("i.checkbox").removeClass("checked");
						$(".discount_ticket_show").slideUp(200);
						checked_ticket();
					});
					// 不可用优惠券信息展开
					$(".ticket_list_disable .left").on('click', function(){
						$(this).parents("li.ticket_list_disable").toggleClass("open_info");
					});
				} else {
					$(".discount_ticket_checked").parent().remove();
				}
			});
			// 优惠券选择
			$(".discount_list_toggle span").on('click', function(){
				$(this).toggleClass("open");
				$(".discount_ticket_show").slideToggle(200);
			});
			// 切换优惠券计算金额
			function checked_ticket(){
				var $checked = $("i.checkbox.checked"),
					data_money = $checked.parent(".right").siblings(".left").find(".ticket_name").attr("data-money"),
					ticket_type = $checked.parents("li.ticket_list_allow").attr("data-type"),
					swich_reduce_money = data_money;
				$(".ticket_checked_name").text($checked.parent(".right").siblings(".left").find(".ticket_name").text());
				$(".ticket_checked_money").text(data_money);
				if(ticket_type == "减免券") {
					discount_price = (_obj.price - data_money) < 0 ? 0 : _obj.price - data_money;
				} else if(ticket_type == "折扣券") {
					discount_price = (_obj.price * (data_money / 10)).toFixed(1) < 0 ? 0 : (_obj.price * (data_money / 10)).toFixed(1);
					swich_reduce_money = (_obj.price - (_obj.price * (data_money / 10))).toFixed(1);
				} else {
					discount_price = _obj.price;
				}
				$(".ticket_checked_money").text(swich_reduce_money);
				if(callback && typeof callback == "function") callback(Number(discount_price).toFixed(1), $checked.parents("li.ticket_list_allow").attr("data-mcid") || "");
			}
		},
		// 砍价活动  二维码弹窗
		activity_down_price: function(qrcode_url){
			// 显示砍价活动 二维码
	    	var qrcode_modal = '<div class="qrcode_modal_body">'+
	    							'<p class="qrcode_modal_tit">邀请好友砍价</p>'+
	    							'<p class="qrcode_modal_msg">使用微信扫一扫，邀请好友来砍价，最高可享5折会员优惠</p>'+
	    							'<div class="qrcode_modal_img"></div>'+
		    						'<p class="qrcode_modal_footer">砍价成功并确认支付后，重新登录账号继续其它操作</p>'+
	    						'</div>';
			common.main.resume_confirm({
				tips_modal_class: "member_qrcodeModal preserve-3d",
				modal_class: "member_qrcodeModal_content preserve-rotateY",
				content_html: qrcode_modal
			});
			$(".member_qrcodeModal_content").removeClass("show-swal2");
			// 引入js文件
			$.getScript("/resources/plugin/jq-styleqrcode/jquery.qrcode.js", function(){
				// 生成二维码
				$(".member_qrcodeModal .qrcode_modal_img").qrcode({
		            render: "canvas",			//设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
		            text: location.origin + "/" + qrcode_url,		//扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
		            width: "140",				//二维码的宽度
		        	height: "140",				//二维码的高度
		           	background: "#ffffff",		//二维码的后景色
		           	foreground: "#008a66",		//二维码的前景色
		           	src: "/resources/500d/common/images/qrcodeIcon_logo.png"	//二维码中间的图片
		       	});
		       	var timer,
					time = 2000;
				timer = setTimeout(intervalreq, time);
				function intervalreq(){
					time += 200;
					// 定时器递增请求 是否已访问手机端网页
					$.get("/member/bargain/find_member_scan_code/", function(data){
						if(data.type === "success") {
							var _data = JSON.parse(data.content);
							if(_data) {
								// 判断 返回的数据  是否true  然后关闭setTimeout
								clearTimeout(timer);
								// 重新渲染弹窗内容
								$(".qrcode_modal_body").find(".qrcode_modal_tit").remove();
								$(".qrcode_modal_body").find(".qrcode_modal_msg").remove();
								$(".qrcode_modal_body").find(".qrcode_modal_img").remove();
								var downtime = 5,
									scanhtml = '<i class="icon"></i><p class="scan_msg">扫码完成，请在手机端上操作</p><p class="scan_time">（<span>'+downtime+'</span>s后自动关闭）</p>';
								$(".member_qrcodeModal_content .qrcode_modal_body").append($(scanhtml));
								// 定时器关闭弹窗
								var interval = setInterval(function(){
									downtime--;
									$(".member_qrcodeModal_content .qrcode_modal_body").find(".scan_time span").html(downtime);
									if(downtime <= 0) {
										//弹框关闭通用方法
										$("#tips-common-modal").modal("hide");
										$("#tips-common-modal").remove();
										$(".modal-backdrop").remove();
										$("body").removeClass("suggestModal");
										$("body").removeClass("modal-open");
										clearInterval(interval);
									}
								}, 1000);
							}
						}
					});
					// 重新设置定时器调用当前函数 请求 接口
					timer = setTimeout(intervalreq, time);
				}
				// 主动关闭弹窗清除定时器
				$(".member_qrcodeModal_content").find("button.close").click(function(){
					clearTimeout(timer);
				});
			});
		},
	    //支付返回提示弹框
		pay_tips_modal:function(){			
			common.main.resume_confirm({
				title:"支付提示",
				tips_modal_class:"payTips_modal",
				content:"请在你新打开的页面上完成付款，支付完成后，请根据您支付的情况点击下面按钮。",
				ok:"支付完成",
				cancel:"支付遇到问题",
				onOk:function(){									
		    		var pathName = location.pathname;
		    		if(!common.main.is_empty(common.main.getUrlParamString("redirectUrl"))){
		    			location.href=common.main.getUrlParamString("redirectUrl");
		    		}else if(pathName.indexOf("order/vip_member/") > 0 || pathName.indexOf("member/") > 0){
		    			location.href="/member/order/"; 
		    		}else{
		    			location.reload();
		    		}	    	
				},
				onCancel:function(){
					window.open("http://help.500d.me");
				}
			});		
			$(".modal-backdrop").remove();
			
		},
		//模板下载超出数量提示框
		temp_download_modal:function(){
			common.main.resume_confirm({
				title:"下载提示",
				content:"根据您的会员权限，您当日的可下载额度已用完，请明天再来或升级会员后继续。",
                tips_modal_class:"template_download_modal",
				ok:"确定",
				cancel:"",
				onOk:function(){
				
				}
		    });
		},
		resumeOperationLogUpload:function(resumeId,opt,headerDesc,optExtDesc){//操作日志上报
			if(common.main.is_empty(resumeId)){
				return;
			}
	    	$.post('/cvresume/operationLog/upload/',{"resumeId" : resumeId,"opt":opt,"headerDesc": headerDesc, "optExtDesc":optExtDesc},function(result){
	    		if(result.type != "success"){
	    			console.log(result.content);
	    		}
			});
	    },
	    //计算天数
        DateDiff:function(sDate1,  sDate2){//sDate1和sDate2是2006-12-18格式
	        var  aDate,  oDate1,  oDate2,  iDays
	        aDate  =  sDate1.split("-")
	        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
	        aDate  =  sDate2.split("-")
	        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
	        iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
	        return  iDays
    	},
    	GetDateStr:function(AddDayCount) { 
			var dd = new Date(); 
			dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
			var y = dd.getFullYear(); 
			var m = dd.getMonth()+1;//获取当前月份的日期 
			var d = dd.getDate(); 
			return y+"-"+m+"-"+d; 
		},
		moveBackground:function(classname){
			var lFollowX = 0,
			      lFollowY = 0,
			      x = 0,
			      y = 0,
			      friction = 1 / 30;
			
			function moveBackground() {
			x += (lFollowX - x) * friction;
			y += (lFollowY - y) * friction;
			
			translate = 'translate(' + x + 'px) scale(1.1)';
			
			$(classname).css({
			  '-webit-transform': translate,
			  '-moz-transform': translate,
			  'transform': translate
			});
			
			window.requestAnimationFrame(moveBackground);
			}
			
			$(window).on('mousemove click', function(e) {
			
			var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
			var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
			lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
			lFollowY = (10 * lMouseY) / 100;
			
			});
			
			moveBackground(); 			
		},
	 
		//获取设备信息
		get_device_info:function(){
			var _defaultDeviceInfo = {
		        pc:true,
		        ios:false,
		        android:false,
		        winPhone:false,
		        wechat:false
		    };

		    var _deviceInfo;
			try{
				var _ua = navigator.userAgent;
				var _pf = navigator.platform.toLocaleLowerCase();
			    var _isAndroid = (/android/i).test(_ua)||((/iPhone|iPod|iPad/i).test(_ua) && (/linux/i).test(_pf))
			        || (/ucweb.*linux/i.test(_ua));
			    var _isIOS =(/iPhone|iPod|iPad/i).test(_ua) && !_isAndroid;
			    var _isWinPhone = (/Windows Phone|ZuneWP7/i).test(_ua);
			    var _isWechat = (/micromessenger/gi).test(_ua);

			    _deviceInfo = {
			        pc:!_isAndroid && !_isIOS && !_isWinPhone,
			        ios:_isIOS,
			        android:_isAndroid,
			        winPhone:_isWinPhone,
			        wechat:_isWechat
			    };
			}catch(e){
				console.log("获取设备信息失败",e);
			}
			_deviceInfo = $.extend({}, _defaultDeviceInfo, _deviceInfo);
		    return _deviceInfo;
		},
		zx_mblist_event:function(){
			//列表鼠标经过效果
			$(".zx-mblist-box .list-con").each(function(){
				   $(this).on('mouseenter',function(e){
					   var e=e||window.event;
					   var angle=direct(e,this)
					   mouseEvent(angle,this,'in')
				   })
				   $(this).on('mouseleave',function(e){
					   var e=e||window.event;
					   var angle=direct(e,this)
					   mouseEvent(angle,this,'off')
				   })
			});
			function direct(e,o){
				 var w=o.offsetWidth;
				 var h=o.offsetHeight;
				 var top= o.offsetTop;                    //包含滚动条滚动的部分
				 var left= o.offsetLeft;
				 var scrollTOP=document.body.scrollTop||document.documentElement.scrollTop;
				 var scrollLeft=document.body.scrollLeft||document.documentElement.scrollLeft;
				 var offTop=top-  scrollTOP;
				 var offLeft= left- scrollLeft;
				 var ex= (e.pageX-scrollLeft)|| e.clientX;
				 var ey=(e.pageY-scrollTOP)|| e.clientY;
				 var x=(ex-offLeft-w/2)*(w>h?(h/w):1);
				 var y=(ey-offTop-h/2)*(h>w?(w/h):1);
			
				 var angle=(Math.round((Math.atan2(y,x)*(180/Math.PI)+180)/90)+3)%4 //atan2返回的是弧度 atan2(y,x)
				 var directName=["上","右","下","左"];
				 return directName[angle];  //返回方向  0 1 2 3对应 上 右 下 左
			}
			function mouseEvent(angle,o,d){ //方向  元素  鼠标进入/离开
				   var w=o.offsetWidth;
				   var h=o.offsetHeight;
			
				   if(d=='in'){
					   switch(angle){
						   case '上':
							   $(o).find(".hover-btn").css({left:0,top:-h+"px"}).stop(true).animate({left:0,top:0},300)
							   break;
						   case '右':
							   $(o).find(".hover-btn").css({left:w+"px",top:0}).stop(true).animate({left:0,top:0},300)
							   break;
						   case '下':
							   $(o).find(".hover-btn").css({left:0,top:h+"px"}).stop(true).animate({left:0,top:0},300)
							   break;
						   case '左':
							   $(o).find(".hover-btn").css({left:-w+"px",top:0}).stop(true).animate({left:0,top:0},300)
							   break;
					   }
				   }else if(d=='off'){
					   switch(angle){
						   case '上':
							   setTimeout(function(){
								   $(o).find(".hover-btn").stop(true).animate({left:0,top:-h+"px"},300)
							   },200)
							   break;
						   case '右':
							   setTimeout(function(){
								   $(o).find(".hover-btn").stop(true).animate({left:w+"px",top:0},300)
							   },200)
							   break;
						   case '下':
							   setTimeout(function(){
								   $(o).find(".hover-btn").stop(true).animate({left:0,top:h+"px"},300)
							   },200)
							   break;
						   case '左':
							   setTimeout(function(){
								   $(o).find(".hover-btn").stop(true).animate({left:-w+"px",top:0},300)
							   },200)
							   break;
					   }
				   }
			}
			
		},
		ppt_imgmove_event:function(){
	        // PPT缩略图 上 & 下 移动

	        //已修改
	        var ImgDown , ImgUp;
	        $("body").on('mouseenter','.imgUp',function(){
	            var $this = $(this).parent().find("img"), ImgTop = $this.css("top").substring(0,$this.css("top").indexOf("px"));
	            clearInterval(ImgUp);
	            ImgUp = setInterval(function(){
	                if(ImgTop < 0){
	                    ImgTop++;
	                    $this.css("top",ImgTop+"px");
	                }else{
	                    clearInterval(ImgUp);
	                }
	            },5)
	        });
	        $("body").on("mouseleave ",".imgUp",function(){
	            clearInterval(ImgUp)
	        });
	        $("body").on('mouseenter','.imgDown',function(){
	            var $this = $(this).parent().find("img"), ImgTop = $this.css("top").substring(0,$this.css("top").indexOf("px")), ImgH = $this.height();
	            clearInterval(ImgDown);
	            ImgDown = setInterval(function(){
	                if($this.height() > $this.parent().height()){
	                    if(-ImgTop == (ImgH - $this.parent().height())){
	                        clearInterval(ImgDown);
	                    }else{
	                        ImgTop--;
	                        $this.css("top",ImgTop+"px");
	                    }
	                }
	            },5)
	        });
	        $("body").on("mouseleave ",".imgDown",function(){
	            clearInterval(ImgDown)
	        });
	        // end			
		},
		getCheck:function(){
			var documentH = document.documentElement.clientHeight;
			var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
			return documentH+scrollH>=common.main.getLastH() ?true:false;

		},
		getLastH:function(){//ppt-listItem为ul的id，listItem为li的class
			var wrap = document.getElementById('ul_listItem');
			var boxs = common.main.getClass(wrap,'li_item');
			return boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
		},
		getClass:function(wrap,className){
			var obj = wrap.getElementsByTagName('*');
			var arr = [];
			for(var i=0;i<obj.length;i++){
				if(obj[i].className == className){
					arr.push(obj[i]);
				}
			}
			return arr;
		},		
		lazyLoadData:function(url){
			if(!common.main.is_empty(url)){
				var keyword = $("#search_btn").val();
				var type = $("#search_btn").attr('data_type');
				var sortType = $("#search_btn").attr('sort_type');
				$.get(
					url,
					{
						keyword:keyword,
						type:type,
						sortType:sortType,
						pageNumber:common.info.reloadWallfulPage
					},
					function(data){
		            	common.info.isReload=true;
			            if(data == ""){
			            	common.info.isMaxPage=true;
			            }else{
			            	$("#ul_listItem .li_item:last").before(data);
			            }
			            common.info.reloadWallfulPage++;
		 			}
		 		);
			}
		},
		lazyLoadInit:function(url){//异步加载列表动作初始化
			window.onscroll = function(){
				if(common.main.getCheck()&&common.info.isReload&&!common.info.isMaxPage){
					common.info.isReload=false;
					common.main.lazyLoadData(url);
				}
			}
		},	
        text_maxlength:function(className,maxwidth){
            function Trim(str){return str.replace(/(^\s*)|(\s*$)/g, "");}            
            className.each(function(){
            var max_width=maxwidth;
                if($(this).text().length>maxwidth){ 
                    $text = Trim($(this).text().substring(0,max_width))
                    $(this).text($text); 
                    $(this).html($(this).html()+'…');
                }
            });            
        },
        search_event:function(){
			//限制字符个数
//            common.main.text_maxlength($("#search_btn"),200); 
			//搜索框回车按钮事件
			$("#search_btn").keydown(function(event){
				if(event.keyCode ==13){
					var keyword = $(this).val();
					if(keyword == ""){
						layer.msg("搜索内容不能为空喔~");
						return;
					}
					var type = $(this).attr('data_type');
					var sortType = $(this).attr('sort_type');
				    location.href = "/search/?type=" + type + "&keyword=" + keyword + "&sortType=" + sortType;
				 }
			});
			$("#search_mg_btn").on("click", function(){
				var keyword = $("#search_btn").val();
				if(keyword == ""){
					layer.msg("搜索内容不能为空喔~");
					return;
				}
				var type = $("#search_btn").attr('data_type');
				var sortType = $("#search_btn").attr('sort_type');
				location.href = "/search/?type=" + type + "&keyword=" + keyword + "&sortType=" + sortType;
			});
			//加载更多
			common.main.lazyLoadInit('/search/');
		},
		//判断是否开启团体会员管理的入口
		is_open_team_vip_manager_enter: function(){
			$.ajax({
				type:"get",
				url:"/member/team/get_rest_size/",
				success:function(data){
					if(data > 0){  //显示团体会员子账号管理入口
						$('#team_vip_manager_identifer').removeClass("team_child");
						$('#team_vip_manager_identifer').addClass("team_main");
						$('#team_vip_manager_enter').css("display","block");
					}
				}
			});
		},
		//获取社区消息或系统消息或求职消息的未读消息数量
		set_message_notification_count: function(type,id){
			$.get("/member/message_notification/count/",{"type":type},function(data){
				if(data>0){
					$("#"+id).text(data);
					$("#"+id).closest(".mess-num").show();
				}else{
					$("#"+id).closest(".mess-num").hide();
				}
			})
		},
		//设置右侧导航栏我的工单显示的未读消息的总数量
		set_work_order_total_not_read_count:function(){
			//获取我的工单的未读信息数量（包括我的工单、社区消息、系统消息和求职消息）
			$.get("/common/get_message_notification_count/",function(data){
				if(data>0){
					$('div.member-nav li.xx').find('s').text(data);
					$('div.member-nav li.xx').find('s').css('display','block');
				}else{
					$('div.member-nav li.xx').find('s').remove();
				}
			});
		},
		words_deal_textarea:function(textArea,numItem){
			var max = numItem.siblings("span").text(),curLength;
	        curLength = textArea.text().length;
	        numItem.text(curLength);
	        textArea.on('keyup', function () {
		        var _value = $(this).text().replace(/\n/gi,"");
		        if(_value.length>max){
		        	numItem.addClass("over");
		        }else{
		        	numItem.removeClass("over");
		        }
		        numItem.text( _value.length);
	        });
		},
		// 在线编辑6.2.0 发布页新增 - 分页和图片放大镜
		pagination_and_magnifier:function(){
	        if($(".jyCv-container").length > 0 && $(".jyCv-container").hasClass("resume") && !$(".jyCv-container").hasClass("mobile")){
	            // 分页
//	            var nowPageSize = 0; // 当前页数
//	            var resumePageHeight = 1160;// 每页高度
//	            var resumePageHtml = '<div class="resumePageBreak"><span>内容超过一页请用回车键避开空白处</span></div>';
//	            var resumeHeight = $(".jyCv-resume").css({"height" : "auto","min-height":1160*2/3}).outerHeight();
//	            var pageSize = Math.ceil(resumeHeight / resumePageHeight);
//	            if(pageSize != nowPageSize) {
//	                var nowResumeHeight = pageSize * resumePageHeight;
//	                $(".jyCv-resume").css({"height" : nowResumeHeight + "px"});
//	                nowPageSize = pageSize;
//	                // 清楚resumePageBreak
//	                $("div.resumePageBreak").remove();
//	                for(var index = 1; index < pageSize; index++) {
//	                    if(index!=pageSize){
//	                        var pageBreakObj = $(resumePageHtml);
//	                        pageBreakObj.css({"top" : ((index * resumePageHeight)-20) + "px"});
//	                        $(".jyCv-resume").append(pageBreakObj);
//	                    }
//	                }
//	            }

	            //	图片作品放大镜
	            if($(".cv-preview .work-img").length > 0){
	                $(".cv-preview .work-img").each(function(){
	                    var $open_magnifier = $('<div class="open_magnifier"></div>').html('<span>查看大图</span>');
	                    $open_magnifier.appendTo($(this))
	                });
	            }
	            $(".work-list .work-img .open_magnifier span").on('click',function(){
	            	var src = $(this).parents(".work-img").find(".work-img-inner").find("img").attr("src"),
						$magnifier_masker = $('<div class="magnifier_masker"></div>').html('<div></div><span class="magnifier" style="background:url('+src+') center no-repeat; background-size:100%;"></span>');
					$magnifier_masker.appendTo($('body'));
	            	$('body').css('overflow','hidden');
				});
	            $(document).on('click','.magnifier_masker>div',function(){
					$(".magnifier_masker").remove();
					$('body').removeAttr('style')
				})
	        }
		},
		/**购物车数量*/
		cartSize:function() {
			var size = getCookie("cartSize");
			if(!size)
				$.ajax({async : false, url : jycnf.base + "/cart/size/", cache : false, type : "GET", success : function(data) {
					size = data;
				}});
			if(size && size > 0){
				$("#cart").addClass("cur");
			}else{
				$("#cart").removeClass("cur");
			}
		},
		/** 回到顶部 **/
		gotop:function(){
		    var gotop = '<div class="gotop " data_track="PC-通用-通用-全屏右侧-帮助浮标-返回顶部"></div>';
		    $("body").append(gotop);
		    $(".gotop").click(function(){$('html, body').animate({scrollTop:0}, 700);});
		    var min_height = 200;
		    $(window).scroll(function(){
		        var s = $(window).scrollTop();
		        if(s > min_height){
		            $(".gotop").fadeIn(100);
		        }else{
		            $(".gotop").fadeOut(100);
		        };
		    });
		},
		/**
		 * 登录信息
		 */
		loginMsg:function() {
            userHead = "http://wx.qlogo.cn/mmopen/HxUXztbCLA4Oeecic8vKS0UISPibEBSOmZ1icRnvIUUrLcGjZ7ZWGd91CCtySjcC1LrlqaMqMTriaauHtcxZh6oqNI6O8676XSO0/0"/*getCookie("memberHead")*/;
            userId = "1097785"/*getCookie("memberId")*/;
            userEmail = "1160651865@jy500.com" /*getCookie("memberEmail")*/;
            userIsVerifyEmail = true/*getCookie("memberIsVerifyEmail")*/;
            memberIsVerifyMobile = true /*getCookie("memberIsVerifyMobile")*/;
			if (userId != null || userEmail != null) {
				$("#login").hide(); // 登录|注册按钮
				$("#userHead").show().find("img").attr("src", userHead); // 显示头像
				$("#user_logout").show().click(function(){ // 登出按钮事件
					common.main.loginOut();
				});
				//是否验证
				if(!common.main.is_empty(userEmail)&&userEmail.indexOf("@")!=-1&&userIsVerifyEmail=="false"){//邮箱注册
					$(".tips_div").find(".email_tips").show();
					$(".tips_div").find(".mobile_tips").hide();
				}else{
					if(memberIsVerifyMobile=="false"){
						$(".tips_div").find(".email_tips").hide();
						$(".tips_div").find(".mobile_tips").show();
					}
				}
				if(userIsVerifyEmail=="false"&&memberIsVerifyMobile=="false"){
					$(".tips_div").show();
					$(".message_notification").show();
				}else{
					$(".tips_div").hide();
				}
			} else {
				$("#login").show(); // 登录按钮显示
				$("#userHead").hide();	//隐藏头像
			}
		},
		/**
		 * 注销登录
		 */
		loginOut:function() {
			if(window.localStorage) {
				// 退出登陆清除
				window.localStorage.removeItem("discount_ticket");
				window.localStorage.removeItem("ticket_name");
			}
			$.get(jycnf.base + "/logout/", function(data){
				if(data.type == "success") {
					$("#userHead").hide(); // 头像隐藏
					$(".ul_top_user").hide(); // 用户操作菜单隐藏
					$(".m-top_user").hide(); // 用户操作菜单隐藏
					
					$("#login").show(); // 显示登录|注册按钮
					var synarr = $(data.content); // 同步登出论坛
					synarr.each(function(index, ele) {
					    $.getScript(ele.src, function(){});
					});
					location.reload();
				} else {
					var loaded = 0;
					var synarr = $(data.content);
					if(data.content != "" && synarr.length > 0) {
						synarr.each(function(index, ele) {
							$.getScript(ele.src, function(){
								if (++loaded == synarr.length) {
									location.href = jycnf.base + "/";
								}
							}).fail(function() {
								location.href = jycnf.base + "/";
						    });
						});
					} else {
						location.href = jycnf.base + "/";
					}
				}
			});
		},
		//发送邮件
		sendEmail:function(email,send_url,send_method){
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
		checkSize:function(file, showAlert, max_size) {
			if(!max_size)
				max_size = 3;
			var max_file_size = max_size * 1024 * 1024;
			if(file && file.files && file.files[0] && file.files[0].size) {
				var size = file.files[0].size;
				if(size > max_file_size) {
					if(showAlert)
						alert("上传图片文件过大，请上传小于" + max_size + "M的文件！");
					return false;
				}
			}
			return true;
		},
		/**百度连接主动推送*/
		baiduPoster:function() {
		    var bp = document.createElement('script');
		    bp.src = '//push.zhanzhang.baidu.com/push.js';
		    var s = document.getElementsByTagName("script")[0];
		    s.parentNode.insertBefore(bp, s);
		},
		/** xss 过滤*/
		xssFilter:function(str){
			//1校验JavaScript运行环境
			if(str==null||str==""){
				return;
			}
			str=str.trim();//去空格
			str=str.toLowerCase();
			str=str.replace(new RegExp("javascript:;","gm"),"");//移除全局的javascript:;标记
			str=str.replace(new RegExp("javascript：;","gm"),"");
			if(str.indexOf("<script")!=-1){
				return "<script>";
			}
			if(str.indexOf("javascript:")!=-1){
				return "javascript:";
			}
			if(str.indexOf("javascript：")!=-1){
				return "javascript：";
			}
			if(str.indexOf("vbscript:")!=-1){
				return "vbscript:";
			}
			if(str.indexOf("vbscript：")!=-1){
				return "vbscript：";
			}
			if(str.indexOf("eval(")!=-1){
				return "eval(";
			}
			if(str.indexOf("<body")!=-1){
				return "<body>";
			}
			if(str.indexOf("document.write(")!=-1){
				return "document.write";
			}
			if(str.indexOf("innerhtml(")!=-1){
				return "innerHTML()";
			}
			if(str.indexOf("document.cookie")!=-1){
				return "document.cookie";
			}
			if(str.indexOf("<iframe")!=-1){
				return "<iframe>";
			}
			if(str.indexOf("<link")!=-1){
				return "<link>";
			}
			if(str.indexOf("document.location")!=-1){
				return "document.location";
			}
			if(str.indexOf("location.href")!=-1){
				return "location.href";
			}
		},
		/** 浏览器版本支持检查*/
		brower_check:function(){
			 try{
			  // 用于帮助 GA 检测各种奇奇怪怪的浏览器
			  // 参考：http://jeffshow.com/get-more-precise-browser-info-in-google-analytics.html
			  var browserName = "Other";
			  var ua = window.navigator.userAgent;
			  browserRegExp = {
			    Sogou : /SE\s2\.X|SogouMobileBrowser/,
			    Explorer2345 : /2345Explorer|2345chrome|Mb2345Browser/,
			    Liebao : /LBBROWSER/,
			    QQBrowser : /QQBrowser/,
			    Baidu : /BIDUBrowser|baidubrowser|BaiduHD/,
			    UC : /UBrowser|UCBrowser|UCWEB/,
			    MiuiBrowser : /MiuiBrowser/,
			    Wechat : /MicroMessenger/,
			    MobileQQ : /Mobile\/\w{5,}\sQQ\/(\d+[\.\d]+)/,
			    Shoujibaidu : /baiduboxapp/,
			    Firefox : /Firefox/,
			    Maxthon : /Maxthon/,
			    Se360 : /360SE/,
			    Ee360 : /360EE/,
			    TheWorld : /TheWorld/,
			    Weibo : /__weibo__/,
			    NokiaBrowser : /NokiaBrowser/,
			    Opera : /Opera|OPR\/(\d+[\.\d]+)/,
			    Edge : /Edge/,
			    AndroidBrowser : /Android.*Mobile\sSafari|Android\/(\d[\.\d]+)\sRelease\/(\d[\.\d]+)\sBrowser\/AppleWebKit(\d[\.\d]+)/i,
			    IE : /Trident|MSIE/,
			    Chrome : /Chrome|CriOS/,
			    Safari : /Version[|\/]([\w.]+)(\s\w.+)?\s?Safari|like\sGecko\)\sMobile\/\w{3,}$/,
			  };
			  for (var i in browserRegExp) {
			    if (browserRegExp[i].exec(ua)) {
			      browserName = i;
			      break;
			    }
			  }
			  //判断是否是国产双核浏览器，是的话，则判断是否是兼容模式
			  var browserAgent   = (navigator.userAgent).toLocaleLowerCase();
			    var two_kit=false;//是否是国产双核浏览器
			    if(browserName.indexOf("Se360") != -1 || browserName.indexOf("Ee360") != -1 || browserName.indexOf("QQBrowser") != -1|| browserName.indexOf("Explorer2345") != -1|| browserName.indexOf("Sogou") != -1|| browserName.indexOf("Liebao") != -1) {
			    	two_kit = true; //国产双核浏览器
			    }
			  	user_agent = navigator.userAgent.toLowerCase();
			  	//当前是支持IE10以上的
			  	var title="你的浏览器版本过低不支持在线制作。";
			  	var content="本网站不支持您当前的浏览器版本，如果继续使用会影响编辑效果<br/>请将浏览器升级至最新版本<br/>或使用以下浏览器，以获得最佳使用体验。";
			  	var is_show=false;
			    if (user_agent.indexOf("msie 7.0")>-1&&user_agent.indexOf("trident/5.0")>-1){
			    	is_show=true;
			    }else if (user_agent.indexOf("msie 8.0")>-1&&user_agent.indexOf("trident/5.0")>-1){
			    	is_show=true;
			    }else if(user_agent.indexOf("msie 8.0")>-1) {
			    	is_show=true;
			    }else if(user_agent.indexOf("msie 7.0")>-1&&user_agent.indexOf("trident/4.0")>-1){
			    	is_show=true;
			    }else if(user_agent.indexOf("msie 7.0")>-1){
			    	is_show=true;
			    }else if(user_agent.indexOf("msie 6.0")>-1){
			    	is_show=true;
			    }
			    if(is_show){
			    	if(two_kit){
			    		title="你当前浏览器使用的是兼容模式";
			    	  	content="本网站不支持您当前的浏览器的兼容模式，如果继续使用会影响编辑效果<br/>请你将浏览器模式调为极速模式<br/>或使用以下浏览器，以获得最佳使用体验。";
			    	}
			    	$("#brower_title_tips").html(title);
			    	$("#brower_content_tips").html(content);
			    	$("#browserModal").modal("show");
			    }
			 }catch(e){
			  console.log("浏览器版本检测失败");
			 }
		},
		check_mobile:function(mobile){
			var flag=false;
			//发送邮件
			$.ajax({
				url: '/register/check_mobile/',
				type: "GET",
				data: {"mobile":mobile},
				dataType: "json",
				async:false,
				cache: false,
				success: function(bindFlag) {
					if(bindFlag){
						flag=true;
					}
				}
			});
			return flag;
		},
		check_email:function(email){
			var flag=false;
			//发送邮件
			$.ajax({
				url: '/register/check_email/',
				type: "GET",
				data: {"email":email},
				dataType: "json",
				async:false,
				cache: false,
				success: function(bindFlag) {
					if(bindFlag){
						flag=true;
					}
				}
			});
			return flag;
		},
		getUrlParamString:function(name) { 
			try{
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
				var r = window.location.search.substr(1).match(reg); 
				if (r != null) {
					return unescape(r[2]);
				}
				return "";
			}catch(e){
				
			}
			return "";
		},
		copyToClipBoard:function(str){
			var copyInput = $("<input type='text' value='http://www.500d.me/resume/"+ str +"/' style='opacity:0' id='copyText'>");
			copyInput.appendTo("body");
			document.getElementById("copyText").select();
			document.execCommand("copy",false,null)
			$("#copyText").remove();
		},
		form_to_json:function(form){    
		   var o = {};    
		   var a = form.serializeArray();    
		   $.each(a, function() {    
		       if (o[this.name]) {    
		           if (!o[this.name].push) {    
		               o[this.name] = [o[this.name]];    
		           }    
		           o[this.name].push(this.value || '');    
		       } else {    
		           o[this.name] = this.value || '';    
		       }    
		   });    
		   return o;    
		},
		ajax_sync_send:function(url,data,method){
			var _rsp="";
			$.ajax({
				type : method,
			   	cache: false,
			   	async : false,
			   	url : url,
			    data:data,
			   	success : function(rsp) {
			   		_rsp= rsp;
			   	}
			});
			return _rsp;
		},
		trim:function(str){ 
		  return str.replace(/\s+/g, "");
		},
		// 新建简历弹框
        create_resume:function(){
            //  打开弹框
            $(".open_create_resume_panel").on("click", function(){
            	common.main.open_create_resume_panel();
            });
        },
        // 打开创建简历弹窗
        open_create_resume_panel: function(options){
        	var opt = {
        		type: "template",		// 样式模板template  内容模板 content
        		itemid: "",				// 模板id
        		identity: "graduate",	// 身份
        		lang: "zh",				// 语言
        		job: "",				// 岗位
        	};
        	$.extend(opt, options);
        	// 打开弹窗
        	$('body').addClass('open');
            $("#create_resume_panel").addClass("show");
            //意向岗位列表
            var job_function_list = common.main.get_job_function_list();
            job_function_list.one +='<div class="more_first_filter"></div>';
            $("#create_resume_panel").find(".first_filter_list").html(job_function_list.one);
            $("#create_resume_panel").find(".second_filter_list").html(job_function_list.two);
            //模板列表渲染
            $.get("/cvresume/createcv_select_template/",{"resumeBankType":"doc"},function(result){
                if(result!==""){
                    $(".template_content_list").html(result);
                    $(".template_content_list .template_card").each(function(index){
                        var _time = 0.1 * index;
                        $(this).css("animation-delay", _time+'s');
                    });
                    // 参数设置
            		// id设置
                    if(opt.type == "template" && !common.main.is_empty(opt.itemid)) {
		            	$("#create_resume_panel .template_card[data_itemid='" + opt.itemid + "']").addClass("checkmark");
		            } else {
		            	$("#create_resume_panel .template_card").eq(0).addClass("checkmark");
		            }
                    // 语言设置
                    $("#create_resume_panel .select_resume_lang .selected_name").attr("data-value", opt.lang);
                    var set_lang = $("#create_resume_panel .select_resume_lang .select_option li[data-value='" + opt.lang + "']").text();
                    $("#create_resume_panel .select_resume_lang .selected_name span").text(set_lang);
                    // 身份设置
                    $("#create_resume_panel .select_identity_type .selected_name").attr("data-value", opt.identity);
                    var set_identity = $("#create_resume_panel .select_identity_type .select_option li[data-value='" + opt.identity + "']").text();
                    $("#create_resume_panel .select_identity_type .selected_name span").text(set_identity);
                    // 岗位设置
                    if(!common.main.is_empty(opt.job)) {
		            	$("#create_resume_panel input[name='job_name']").val(opt.job);
		            }
                }
            });
        	// 关闭新建简历弹框按钮
            $("#create_resume_panel .close_panel").on("click",function(){
                
                $('body').removeClass('open');
                close_panel();
            });
			//  关闭弹框方法
            function close_panel(){
				$("#create_resume_panel").removeClass("show");    // 隐藏弹框
                $('input[name=resume_lang]').eq(0).attr('checked','checked').siblings().removeAttrs('checked');   // 初始化语言
                $('input[name=identity_type]').eq(0).attr('checked','checked').siblings().removeAttrs('checked'); // 初始化身份
                close_select_listner();
				initial_job_select();   // 初始化选择器
			}
            // 选择语言 身份下拉框
            // 打开下拉框
            $(document).off("mouseenter", ".create_resume_select");	// 再次打开弹窗先移除事件
	        $(document).on("mouseenter", ".create_resume_select", function(e){
	        	var $this = $(this);
        		$(".create_resume_select").removeClass("open_select");
	        	$this.toggleClass("open_select");
	        });
	        // 点击其他地方 关闭下拉框
	        $(document).off("mouseleave", ".create_resume_select");
	        $(document).on("mouseleave", ".create_resume_select", function(e){
	        	var $this = $(this);
        		$this.removeClass("open_select");
	        });
	        // 点击选项事件
	        $(document).off("click", ".create_resume_select.open_select .select_option li");	// 再次打开弹窗先移除事件
	        $(document).on("click", ".create_resume_select.open_select .select_option li", function(){
	        	var $this = $(this).parents(".create_resume_select");
	        	$this.removeClass("open_select");
	        	$this.find(".selected_name span").text($(this).text());
	        	$this.find(".selected_name").attr("data-value", $(this).attr("data-value"));
	        });
            // 初始化岗位下拉框方法
            function initial_job_select(){
                var $first_filter = $('.first_filter'),
                    $second_filter_bar = $('.second_filter_bar'),
                    $second_filter_row = $('.second_filter_row'),
                    $second_filter = $('.second_filter'),
                    $$third_filter_list = $('.third_filter_list');
                $first_filter.eq(0).addClass('checked').siblings().removeClass('checked');
                $second_filter_bar.eq(0).show().siblings().hide();
                $second_filter_row.removeAttr('style');
                $second_filter.removeClass('checked');
                $$third_filter_list.hide();
                open_secondFilter_first($second_filter.eq(0));
            }
            // 岗位下拉框监听
            function job_select_listner(e){
                var $target = $(e.target),
                    $selector = $('.job_name_select');
                if($target.parents('.job_name_bar').length <= 0){
                    close_select_listner();
                    initial_job_select();
                }
            }
            // 展开下拉岗位
            function open_select_listner(){
            	$('.job_name_select').show();
            	$('.open_jobselector_pointer').addClass('open_select');
            	$('.job_name_bar input[name=job_name]').css('border-radius', '6px 6px 0 0');
            }
            // 关闭下拉岗位
            function close_select_listner(){
            	$('.job_name_select').hide();
                $('.open_jobselector_pointer').removeClass('open_select');
                $('.job_name_bar input[name=job_name]').css('border-radius', '6px');
            }
            // 岗位输入框输入
            $(document).off('focus','.job_name_bar input[name=job_name], input[name=jobFunction]');
            $(document).on('focus','.job_name_bar input[name=job_name], input[name=jobFunction]',function(){
            	$(this).attr('placeholder', '在这里输入岗位名称');
                $('body').unbind('click',job_select_listner);
                $('body').bind('click',job_select_listner);
            });
            var is_show_selector = true;
            // 开关岗位选择框
            $('.open_jobselector_pointer').off('click');
            $('.open_jobselector_pointer').on('click', function(){
            	var $selector = $('.job_name_select');
            	if($selector.is(':hidden')) {
            		open_select_listner();
            		is_show_selector = true;
            	} else {
            		close_select_listner();
            		is_show_selector = false;
            	}
            	initial_job_select();
            });
            // 移出岗位选择框关闭
            $('.job_name_select').off('mouseleave');
            $('.job_name_select').on('mouseleave', function(){
            	close_select_listner();
            });
            // 搜索框向上左右移出关闭选择框
            $('.job_name_bar input').off('mouseout');
            $('.job_name_bar input').on('mouseout', function(e){
            	if(e.originalEvent.offsetX <= 0 || e.originalEvent.offsetX >= $(this).width() || e.originalEvent.offsetY <= 0) {
            		close_select_listner();
            	}
            });
            // 输入框鼠标位置操作
            $('.job_name_bar input').off('mousemove');
            $('.job_name_bar input').on('mousemove', function(e){
            	var	size = 360;
            	if((e.originalEvent.offsetX >= size) && (e.originalEvent.offsetX <= $(this).width() - 50)) {
            		if(is_show_selector) {
            			$(this).css('cursor', 'default');
	            		open_select_listner();
	            	}
            	}
            	if(e.originalEvent.offsetX <= size) {
            		$(this).css('cursor', 'text');
            		is_show_selector = true;
            	}
            	initial_job_select();
            });
            $('.job_name_bar input[name="job_name"]').off('blur');
            $('.job_name_bar input[name="job_name"]').on('blur', function(){
            	$(this).attr('placeholder', '请准确选择意向岗位，我们将推送该岗位的优秀简历范例供您参考');
            });
            $('.job_name_bar input[name="job_name"], .job_name_bar input[name="jobFunction"]').off('mouseleave');
            $('.job_name_bar input[name="job_name"], .job_name_bar input[name="jobFunction"]').on('mouseleave', function(){
            	is_show_selector = true;
            });
            // 选择一级筛选条件
            // 鼠标移入延迟
            var hoverTimer;
            $(document).off('mouseenter', '.first_filter');
			$(document).on('mouseenter', '.first_filter', function(){
				var $this = $(this),
					index = $this.index(),
                    $second_filter_bar = $('.second_filter_bar');
		        hoverTimer = setTimeout(function(){
		        	$this.addClass('checked').siblings().removeClass('checked');
                  	$second_filter_bar.eq(index).show().siblings().hide();
                  	open_secondFilter_first($second_filter_bar.eq(index).find('.second_filter').eq(0));
		        }, 200);
            });
            $(document).off('mouseleave', '.first_filter');
            $(document).on('mouseleave', '.first_filter', function(){
            	clearTimeout(hoverTimer);
            });
            // 选择二级筛选条件
            $(document).off('mouseenter','.second_filter');
            $(document).on('mouseenter', '.second_filter', function(){
            	open_secondFilter_first($(this));
            });
            // 打开二级筛选条件第一项
            function open_secondFilter_first($el){
            	var index = $el.parent().find(".second_filter").index($el),
                    $row = $el.parents('.second_filter_row'),
                    $third_list = $row.find('.third_filter_list').eq(index),
                    row_h = Number(39),
                    third_list_h = Number($third_list.height()) + 14;
                if(!$el.hasClass('checked')){
                    $('.second_filter_row').removeAttr('style');
                    $('.second_filter').removeClass('checked');
                    $('.third_filter_list').hide();
                    $el.addClass('checked');
                    $third_list.show();
                    $row.css('height',row_h + third_list_h);
                    $third_list.show();
                }
            }
            // 选择岗位
            $(document).off('click','.third_filter span');
            $(document).on('click', '.third_filter span', function(){
                var job_name = $(this).text();
                $('.job_name_bar input').val(job_name);
                $('input[name=jobFunction]').val(job_name);
                close_select_listner();
                initial_job_select();
                $('body').unbind('click',job_select_listner);
                
            });
            // 选择模板
            $(document).off("click", "#create_resume_panel .template_card");
            $(document).on("click", "#create_resume_panel .template_card", function(){
            	$("#create_resume_panel .template_card").removeClass("checkmark");
            	$(this).addClass("checkmark");
            });
			// 自由编辑选择事件
			$(".create_resume_panel .to_drop_resume").off("click");
			$(".create_resume_panel .to_drop_resume").on("click", function(){
				$(this).addClass('checked');
				common.main.resume_confirm({
                    title:"",
                    content_html:"<span class='tips_title'>进入完全自由编辑模式</span><span class='tips-content'>你可以根据自己的喜好来控制整体的布局</span>",
                    tips_modal_class:"confirm_modal",
					modal_class:"tips-modal-content change_content_confirm dropcvresume_modal",
					ok:"开始编辑",
                    onOk:function(){
                        location.href="/dropcvresume/edit/";
                    },
                    onCancel:function(){
						$(".create_resume_panel .dropcvresume").removeClass('checked');
                    }
                });
			});
			// 关闭自由编辑弹框
			$(document).off("click", ".dropcvresume_modal .modal-header .close");
			$(document).on("click", ".dropcvresume_modal .modal-header .close", function(){
				$(".create_resume_panel .to_drop_resume").removeClass('checked');
			});
		    // 开始编辑点击事件
		    $(document).off("click", "#create_resume_panel .start_edit_btn");
        	$(document).on("click", "#create_resume_panel .start_edit_btn", function(){
        		
        		var resume_lang = $("#create_resume_panel .select_resume_lang .selected_name").attr("data-value"),
        			identity_type = $("#create_resume_panel .select_identity_type .selected_name").attr("data-value"),
        			itemid = $("#create_resume_panel .template_card.checkmark").attr("data_itemid"),
        			job = $("#create_resume_panel input[name='job_name']").val(),
        			url;
        		if(common.main.is_empty(job)) {
        			$("#create_resume_panel").animate({scrollTop: 0});
        			$("#create_resume_panel input[name='job_name']").css("border", "2px solid #ef6371");
        			return layer.msg("请完成设置后继续");
        		}
        		if(opt.type == "content" && !common.main.is_empty(opt.itemid)) {
        			url = encodeURI("/cvresume/edit/?itemid=" + itemid + "&resumeContentId=" + opt.itemid);
        		} else {
        			url = encodeURI("/cvresume/create/?itemid=" + itemid + "&language=" + resume_lang + "&job=" + job + "&identity=" + identity_type);
        		}
				location.href = url;
		    });
        },
		// 简历投递跳转
        send_resume:function(){
		    $(document).on("click",".open_send_resume_modal",function(){
				if($("html").attr("class") == 'sendResumePage'){
					window.location.href ="/member/resumesendedit/";
				}else{
					window.open("/member/resumesendedit/")
				}
            });
        },
        ab_test_event:function(){
        	var _abTest;
        	if(window.localStorage){
    			_abTest = localStorage.getItem("abTest");
    			if(common.main.is_empty(_abTest)){
    				_abTest = Math.floor(Math.random()*2+1);
    				localStorage.setItem("abTest", _abTest);
    			}
        	}else{
        		_abTest = Math.floor(Math.random()*2+1);
        	}
        	common.info.abTest = _abTest;
        },
        isIE9:function(){
        	try{
        		if(navigator.userAgent.indexOf("MSIE")>0){    
		     	 	if(navigator.userAgent.indexOf("MSIE 9.0")>0){  
		   	     		return true;
		  	    	}else{
		   		   		return false;
		     		}
		  	  	} 
        	}catch(e){
        		console.log("浏览器版本判断错误"+e);
        		return false;
        	}
        },

        /*
		          倒计时
		      common.main.countDown({
				h: 1, // h, m, s 也可以只传一个
				m: 1,
				s: 5,
				run: function(h, m, s) { // 正在计时时回调
					h = (h < 10) ? '0' + h : h;
					m = (m < 10) ? '0' + m : m;
					s = (s < 10) ? '0' + s : s;
					console.log(h + ":" + m + ":" + s);
				},
				end: function() { // 结束后回调
		
				}
			});
         */
	countDown: function(time) {
		var time = time || {},
			h = time.h || 0,
			m = time.m || 0,
			s = time.s || 1,
			interval;
		// 判断秒 和 分超出时间规则  分 和 时 递增
		if(h <= 0 && m <= 0 && s <= 0) {
			h = 0;
			m = 0;
			s = 0;
			if(time.run) time.run(h, m, s);
			if(time.end) time.end(h, m, s);
			return;
		}
		if(s >= 60) {
			m += parseInt(s / 60);
			s = s % 60;
		}
		if(m >= 60) {
			h += parseInt(m / 60);
			m = m % 60;
		}
		interval = setInterval(function() {
			s--;
			if(s < 0) {
				if(m <= 0) {
					if(h <= 0) {
						if(h <= 0 && m <= 0 && s <= 0) {
							clearInterval(interval);
							// 倒计时结束回调
							if(time.end) time.end(h, m, s);
						}
					} else {
						h -= 1;
						m = 59;
						s = 59;
					}
				} else {
					m -= 1;
					s = 59;
				}
			}
			// 计时 实时回调
			if(time.run) time.run(h, m, s);
		}, 1000);
	},
     
	//	优惠券弹窗
	get_discount_ticket: function(){
		if(!getCookie("memberId")|| !window.localStorage) {
			return;
		}
		var day=common.main.date_format(new Date(),"yyyyMMdd");
		var stroage_discount_ticket=window.localStorage.getItem("discount_ticket");
		if(stroage_discount_ticket!=undefined && stroage_discount_ticket.indexOf("all_close")>=0){//判断是否全部关闭
			//判断时效性，一天有效
			var all_close_day="all_close,"+day;
			if(stroage_discount_ticket==all_close_day){//一天不再显示
				return;
			}
		}
		if(!stroage_discount_ticket) {
			window.localStorage.setItem("discount_ticket", "show_modal");
		}
		if(stroage_discount_ticket !== "show_modal") {
			return;
		}
		$.get("/coupon/can_receive/", function(data){
			if(data.type === "success" && data.content) {
				var _data = JSON.parse(data.content),
					_ids = [];
				// 优惠券弹窗
				var html = '<p class="discount_ticket_title">专享福利&emsp;限时「领取」</p><ul id="discount_ticket_lists" class="discount_ticket_lists"></ul>';
				common.main.resume_confirm({
					title:"",
					content_html: html,
					modal_class:"modal_discount_ticket",
					ok: "立即领取",
					onOk: function(){
						_data.couponList.forEach(function(i, e){
							_ids.push(i.id);
						});
						$.post("/coupon/receive/", {
							ids: _ids.join(",")
						}, function(data){
							if(data.type == "success") {
								
								// 领取优惠券成功
								window.localStorage.setItem("discount_ticket", "all_close," +day);
								window.localStorage.removeItem("ticket_name");
								setTimeout(function(){
									var success_html = '<p class="getticket_success_title">成功领取福利</p>'+
														'<p class="getticket_success_link">可在<a href="/member/coupon/">个人中心</a>查看</p>'+
														'<p class="getticket_success_msgtitle">开始完善你的求职材料！</p>'+
														'<ul class="getticket_success_msglist"><li class="getticket_success_massage"><p>在线编辑简历，海量内容模板供您参考</p></li>'+
														'<li class="getticket_success_massage"><p>各行业资深HR答疑解惑，求职烦恼全解决</p></li>'+
														'<li class="getticket_success_massage"><p><span>4,000,000+</span>位求职者在使用的简悦</p></li></ul>';
									common.main.resume_confirm({
										title:"",
										content_html: success_html,
										modal_class:"modal_discount_ticket success",
										ok: "去使用",
										onOk: function(){
											
											location.href = "/member/coupon/";
										},
									});
								}, 300);
							}
						});
					},
					onLayer: function(){
						window.localStorage.setItem("discount_ticket", "show_banner");
					},
				});
				// 优惠券节点渲染 2张
				$.each(_data.couponList, function(i, e) {
					var $html = '<li class="discount_ticket_list">'+
									'<div class="left">'+
										'<p class="ticket_name">'+e.name+'</p>'+
										'<p class="ticket_massage">'+e.scope+'</p>'+
										'<p class="ticket_massage">有效期：'+e.effectBeginDate.replace(/\-/g, ".")+' - '+e.effectEndDate.substring(5).replace(/-/g, ".")+'</p>'+
									'</div>'+
									'<div class="right">'+
										'<p class="ticket_money">'+(e.type == "减免券" ? '&yen;<span>'+e.discount+'</span>' : '<span>'+e.discount+'</span>折')+'</p>'+
										'<p class="ticket_condition">满'+e.minPrice+'可用</p>'+
									'</div>'+
								'</li>';
					$("#discount_ticket_lists").append($html);
				});
				// 监听关闭按钮
				$(".modal_discount_ticket").find("button.close").click(function(){
					
					window.localStorage.setItem("discount_ticket", "show_banner");
				});
				window.localStorage.setItem("ticket_name", _data.couponList[0].name);
			} else {
				// 已领取
				window.localStorage.setItem("discount_ticket", "all_close," + day);
			}
		});
	},
	//	优惠券置顶板块
	top_discount_ticket: function(){
		if(!getCookie("memberId")||!window.localStorage) {
			// 退出登陆清除
			window.localStorage.removeItem("discount_ticket");
			window.localStorage.removeItem("ticket_name");
			return;
		}
		var stroage_discount_ticket=window.localStorage.getItem("discount_ticket")
		if( !stroage_discount_ticket || stroage_discount_ticket!=="show_banner" || $(".top_discount_ticket").length > 0) {
			return;
		}
		var html = '<div class="top_discount_ticket">'+
						'<div class="discount_ticket_content">'+
							'<i class="ticket_content_img"></i>'+
							'<p class="ticket_content_text">您有待领取的优惠券——<span>'+(window.localStorage.getItem("ticket_name") || "优惠券")+'</span></p>'+
							'<div class="ticket_content_btn">立即领取</div>'+
						'</div>'+
						'<i class="close_discount_ticket"></i>'+
					'<div>';
		$("body").prepend($(html));
		// 处理首页顶部导航条重叠
		if(window.location.pathname == "/") {
			if($(window).scrollTop() > 800) {
				setTimeout(function(){
					$(".jl-header").css("top", 0);
				}, 50);
			} else {
				$(".jl-header").css("top", "auto");
			}
			$(window).on("scroll", function(){
				if($(".jl-header").css("position") == "fixed") {
					$(".jl-header").css("top", 0);
				} else {
					$(".jl-header").css("top", "auto");
				}
			});
		}
		// 立即领取点击
		$(".top_discount_ticket").find(".ticket_content_btn").click(function(){
			
			window.localStorage.setItem("discount_ticket", "show_modal");
			common.main.get_discount_ticket();
			close();
		});
		// 关闭按钮点击
		$(".top_discount_ticket").find(".close_discount_ticket").click(function(){
			
			close();
			window.localStorage.setItem("discount_ticket", "all_close," + common.main.date_format(new Date(),"yyyyMMdd"));
		});
		// 关闭
		function close(){
			$(".top_discount_ticket").animate({
				"height": 0
			}, 500, function(){
				$(this).hide();
			});
		}
	},
    // 编辑页功能区域初始化
    function_panel_initial:function(){
	    function panel_initial() {
            var radio = 240/1240,
                window_w = $(window).width(),
                window_h = $(window).height(),
                panel_w = window_w * radio + 824,
                $container = $('.jyCv-container'),
                $panel = $('.function_panel'),
                panel_offset, top_h, other_h;
            $panel.attr('style','');
            $panel.css('width',window_w * radio+'px');
            if($container.hasClass('mobile')){
                $('html.jy_cvresume_edit body').css('paddingRight',window_w * radio+'px');
                $panel.css({
                    'position':'fixed',
                    'top':74,
                    'right':0
                });
                top_h = $('.function_panel .panel_top').height();
                other_h = (window_h - 4 - 74 - top_h)/2;
                $('.function_panel .panel_tips, .function_panel .panel_case').css('height',other_h);
            }else{
                $container.css('width', panel_w + 'px');
            }
        }
        panel_initial();
        $(window).resize(panel_initial);
        // 点击小贴士内容列表显示隐藏事件
        $(document).on("click",".tips_content_text .list .title",function(){
            var $thislist = $(this).parent(".list");
            if($thislist.hasClass("show")){
                $thislist.removeClass("show");
                $thislist.siblings(".list").removeClass("show");
            }else{
                $thislist.addClass("show");
                $thislist.siblings(".list").removeClass("show");
            }
        });
        // 点击模块显示小贴士事件 (切换案例方法可以写在这里)
        $(document).on("click",".moduleItem",function(){
            if($(this).hasClass("customItem")){return;}
            if($(this).hasClass("bInfoItem")){
                $(".tips_content_select ul li[data-select-id='base_info']").addClass("selected").siblings().removeClass("selected");
                $(".tips_content_select span").text("基本信息");
                $(".tips_content_text ul li[data-list-id='base_info']").addClass("selected").siblings().removeClass("selected");
            }else if($(this).hasClass("ewmItem")){
            }else{
                var $id;
                if($(this).hasClass("coverItem") || $(this).hasClass("letterItem")){
                    $id = $(this).parent().attr("id");
                }else{
                    $id = $(this).attr("id");
                }
                var $text = $(".tips_content_select ul li[data-select-id="+$id+"]").text();
                $(".tips_content_select ul li[data-select-id="+$id+"]").addClass("selected").siblings().removeClass("selected");
                $(".tips_content_select span").text($text);
                $(".tips_content_text ul li[data-list-id="+$id+"]").addClass("selected").siblings().removeClass("selected");
            }
            var modules = ["resume_edu","resume_work","resume_project","resume_internship","resume_volunteer","resume_honor","resume_summary"];
            var editModule = $(this).attr("id");
            if($.inArray(editModule, ["base_info","resume_name","resume_hobby","resume_skill"]) != -1){
            	editModule = "resume_work";
            }
            if($.inArray(editModule, modules) != -1){
            	if(cvmutual){
            		cvmutual.main.recommend_cases();
            	}
            	$(".panel_case .case_bar").find(".case_list").addClass("hidden");
            	$(".panel_case .case_bar").find(".case_list[data-id='"+editModule+"']").removeClass("hidden");
            }
        });
        // 案例弹框
        $(document).on("click", ".panel_case .more_case", function(){
            if($("#case-modal").empty()){
                var itemid=$(this).attr("itemid");
                $.get("/cvresume/cases/",{"itemid":itemid,"resumeId":cvresume.info.resumeid},function(result){
                    $("#case-modal").append(result);
                    common.main.resume_cases_event();
                });
            }
            $("#case-modal").modal("show");
            $("#case-modal").css({"background":"none"})
        });
        // 案例弹框关闭
        $(document).on("click","#case-modal .close",function(){
            
            $(".modal-backdrop").remove();
            $(".defaultmodal.case_modal .modal-content").css({"animation": "close_slow 0.5s ease forwards"});
            setTimeout(function(){
                $("#case-modal").modal("hide");
            },800);
        });
        // 面板应用案例按钮
        $(document).on('mouseover','.panel_case .case_list',function(){
            var editModule = $('.moduleItem.current').attr("id"),
                modules = ["resume_edu","resume_work","resume_project","resume_internship","resume_volunteer","resume_honor","resume_summary"];
            if($('.moduleItem.current').length > 0 && $.inArray(editModule, modules) >= 0){
                $(this).find('.case_masking').show()
            }
        });
        $(document).on('mouseout','.panel_case .case_list .case_masking',function(){
            $(this).hide()
        });
        $(document).on('click','.panel_case .case_masking span',function(){
        	
            var $case = $(this).parents('.case_list'),
                $item = $('.moduleItem.current'),
                $target, content = $case.find('.case_content').html();

            if($item.hasClass('timeItem')){
                $target = $item.find('.moduleItemList').eq(0);
                var $time = $target.find('.dd-title span.time div[contenteditable]'),
                    $span_1 = $target.find('.dd-title span.company div[contenteditable]'),
                    $span_2 = $target.find('.dd-title span.post div[contenteditable]'),
                    time_text = typeof $case.find('.case_title p').html() === "undefined" ? '' : $case.find('.case_title p').html(),
                    span_1 = $case.find('.case_title span').eq(0).html(),
                    span_2 = $case.find('.case_title span').eq(1).html();
                if(time_text !== '' && time_text.length > 0){
                    var tiem_arr = time_text.split('-');
                    $time.html('<i class="time-start">'+ tiem_arr[0] +'</i>-<i class="time-end">'+ tiem_arr[1] +'</i>')
                }else{
                    $time.html('')
                }
                $span_1.html(span_1);
                $span_2.html(span_2);
                $target.find('div.resume_content').html(content);
            }else{
                $target = $item.find('.resume_content[contenteditable]');
                $target.html(content)
            }
        })
    },
    get_job_function_list:function(size){//获取意向岗位列表
    	if(!size){
    		size = 4;
    	}
        var json = common.main.get_job_json(),
            list = JSON.parse(json),
            filter_obj = {one:'', two:''};
        $.each(list, function(key,value){
            filter_obj.one += '<span class="first_filter">'+key+'</span>';
            filter_obj.two += '<div class="second_filter_bar">';
            var count = 1;
            $.each(value,function(key1,value1){
                $.each(value1,function(key2,value2){
                    if(count === 1){
                        filter_obj.two += '<div class="second_filter_row">';
                    }
                    count++;
                    filter_obj.two += '<div class="second_filter">';
                    filter_obj.two += '<span class="second_filter_name">'+key2+'</span>';
                    filter_obj.two += '</div>';
                    filter_obj.two += '<div class="third_filter_list">';
                    $.each(value2,function(key3,value3){
                        filter_obj.two += '<p class="third_filter"><span>'+value3+'</span></p>';
                    });
                    filter_obj.two += '</div>';
                    if(count %size === 0){
                        filter_obj.two += '</div>';
                        count = 1;
                    }
                });
            });
            if(count %size !== 0){filter_obj.two += '</div>';}
            filter_obj.two += '</div>';
        });
        return filter_obj;
    },
	contain_emoji:function(content){
		try{
			var ranges = [
		        '\ud83c[\udc00-\udfff]', 
		        '\ud83d[\udc00-\udfff]', 
		        '\ud83e[\udd00-\udfff]',
		        '[\u2600-\u27ff]'
	    	];
	    	var reg = new RegExp(ranges.join('|'), 'g');
	    	return reg.test(content);
    	}catch(e){
    		return false;
    	}
	},
	validate: function(obj) {
		/*	配置项
			common.main.validate({
				rules: [{
					target: tag | string,
					required: boolean,
					type: string | regexp,
					rangelength: number | array,
					equalTo: tag | string,
					massage: string
				}],
				onTips: function(tag, massage){},
				onOk: function(value){},
			})
		*/
		var validate_data = {
			rules: [],
			onTips: null,
			onOk: null
		};
		// 验证提示文案
		var massage = {
			"common": '请输入正确的内容！',
			"email": '请输入正确的邮箱地址！',
			"phone": '请输入正确的手机号码！',
			"number": '请输入数字！',
			"int": '请输入0以上的整数！',
			"floor": '请输入带有小数点的数字！',
			"url": '请输入正确的链接！',
			"cn": '请输入中文！',
			"en": '请输入英文！',
			"equalTo": '再次输入内容不一致！',
			"required": '请输入必填项！',
			"rangelength": '输入的内容字数不符和！',
			"nopassword": '请输入密码！',
			"noconfirm_password": '请输入确认密码！',
			"illegal": '存在非法内容，请输入正确的内容！'
		};
		$.extend(validate_data, obj);
		if (validate_data.rules.length <= 0) {
			return console.error("rules No iteration");
		}
		var validate_val = []; // 验证字段数组
		for (var i = 0, len = validate_data.rules.length; i < len; i++) {
			var item = validate_data.rules[i];
			if (typeof item.target !== "string" && !item.target) {
				return console.error('rules.target not defined'); // 没有target 跳过
			}
			var val = get_target_val(item.target),
				msg = null,
				tag = item.target;
			// 验证内容是否非法
			if (is_illegal(val)) {
				validate_tips(tag, massage['illegal']);
				return;
			}
			// 是否必填项    空值跳过，有值会进行验证
			if (!item.required && is_null(val)) {
				// 放入数组通过回调导出
				validate_val.push(val);
				continue; // 非必填项跳过
			}
			// 是否定制massge提示文案
			if (item.massage && typeof item.massage == "string") {
				msg = item.massage;
			}
			// 必填项验证类型
			if (item.type && typeof item.type !== "string") {
				// type为正则 正则判断
				try {
					if (!item.type.test(val)) {
						validate_tips(tag, msg || massage['common']);
						return;
					}
				} catch (e) {
					return console.error("type is not a Regexp");
				}
			} else {
				switch (item.type) {
					case "email":
						if (!is_email(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "phone":
						if (!is_phone(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "number":
						if (!is_number(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "int":
						if (!is_int(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "floor":
						if (!is_floor(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "url":
						if (!is_url(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "cn":
						if (!is_cn(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "en":
						if (!is_en(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "password":
						if (is_null(val)) {
							validate_tips(tag, msg || massage['nopassword']);
							return;
						}
						break;
					case "confirm_password":
						if (is_null(val)) {
							validate_tips(tag, msg || massage['noconfirm_password']);
							return;
						}
						break;
					default:
						if (is_null(val)) {
							validate_tips(tag, msg || massage['required']);
							return;
						}
						break;
				}
			}
			// 验证长度
			if (item.rangelength && !rangelength(val, item.rangelength)) {
				validate_tips(tag, msg || massage['rangelength']);
				return;
			}
			// 验证相同值
			if (item.equalTo) {
				var equalTo_val = get_target_val(item.equalTo);
				if (val !== equalTo_val) {
					validate_tips(tag, msg || massage['equalTo']);
					return;
				}
			}
			// 放入数组通过回调导出
			validate_val.push(val);
		}
		// 回调
		if (validate_data.onOk && typeof validate_data.onOk == "function") {
			validate_data.onOk(validate_val);
		}
		// 验证提示 定制
		function validate_tips(tag, msg) {
			if (validate_data.onTips && typeof validate_data.onTips == "function") {
				validate_data.onTips(tag, msg);
				return;
			}
			alert(msg);
		}
		// 获取target值
		function get_target_val(val) {
			var val = val;
			if (typeof val.jquery == "string") { // 判断是否是jq
				val = val.val();
			} else if (val.nodeType === 1) { // 判断是否是dom
				val = val.value;
			}
			return val;
		}
		// 空值判断
		function is_null(val) {
			return /^\s*$/.test(val);
		}
		// 非法字符串验证
		function is_illegal(val) {
			return /(\/?script|\<|\>|\(|\)|\*|%|\$|\^|\&|'|"|;|\{|\}|\\|select\s|insert\s|update\s|delete\s|from\s|join\s|where\s|and\s|or\s)/i.test(val);
		}
		// 验证中文
		function is_cn(val) {
			return /^[\u4e00-\u9fa5]+$/g.test(val);
		}
		// 验证英文
		function is_en(val) {
			return /^[a-zA-Z]+$/g.test(val);
		}
		// 验证数字
		function is_number(val) {
			return /^(\d)+\.?\d*$/g.test(val);
		}
		// 验证整数
		function is_int(val) {
			return /^\d+$/g.test(val);
		}
		// 验证浮点
		function is_floor(val) {
			return /^\d*\.\d+$/g.test(val);
		}
		// 验证url
		function is_url(val) {
			return /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(val);
		}
		// 验证手机号
		function is_phone(val) {
			return /^1\d{10}$/.test(val);
		}
		// 验证邮箱
		function is_email(val) {
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(val);
		}
		// 长度验证
		function rangelength(val, len) {
			var min, max;
			if (Array.isArray(len) && len.length >= 2) {
				min = len[0];
				max = len[1];
			} else if (is_int(len)) {
				min = 0;
				max = len;
			}
			if (val.length >= min && val.length <= max) {
				return true;
			}
			return false;
		}
	},
	// 职位列表json
	get_job_json: function(){
		var json = '{"职能支持":[{"市场":["营销推广","品牌公关","商务合作","销售代表","市场调研"]},{"财务":["财务","会计","审计","出纳","税务","统计","成本管理","资产管理"]},{"法务":["法务","律师","合规","知识产权","法律顾问"]},{"人事":["人力资源","HRBP","猎头","薪酬福利","绩效考核","企业文化","招聘","培训"]},{"行政":["行政","前台","秘书","文员","总助","总机"]}],"互联网通信":[{"技术":["前端开发","后端开发","移动开发","测试","运维","DBA","硬件开发","项目管理","网络运输"]},{"产品":["产品经理","产品策划","游戏策划","产品助理"]},{"设计": ["UI交互设计","平面设计","网页设计","动画人物设计","游戏原画","游戏场景","游戏特效设计"]},{"运营":["产品运营","新媒体运营","游戏运营","用户运营","活动运营","社区运营","内容运营","客服"]}],"金融投资":[{"银行":["客户经理","大堂经理","银行柜员","支行行长","风险控制"]},{"证券基金":["交易员","投资顾问","客户经理","基金经理","证券分析","风险控制","债券发行","基金会计","行业研究"]},{"保险":["销售代表","综合柜员","培训讲师","业务员","理财规划","风险控制","产品研发"]},{"信托期货":["客户经理","信托经理","产品经理","资产管理","资产证券化","风险控制","期货经纪人"]}],"房地产建筑":[{"房地产":["投资分析","项目策划","项目管理","项目招投标","资产管理","合同管理","房产中介","房产经纪人"]},{"土建":["建筑工程师","工程造价","给排水工程师","测绘工程师","水电工程师","工程监理","现场管理"]},{"物业":["物业管理","设施管理","物业招商","客服顾问","物业维修","机电维修","保洁","绿化","保安"]},{"建筑设计":["室内设计","景观设计","结构设计","软装设计","硬装设计","幕墙设计","城市规划"]},{"家装":["工长","木工","泥瓦工","油漆工","水电工","安装施工"]}],"休闲服务":[{"旅游":["导游","旅游顾问","线路策划","计调","领队","票务","会展策划"]},{"酒店":["大堂经理","礼宾","总机","商务中心","行李员","客房服务","餐厅服务","厨师"]},{"餐饮":["西餐厨师","中餐厨师","面点师","调酒师","咖啡师","服务员","传菜员"]},{"美容":["美容师","发型师","美甲师","化妆师","美体师","美发培训","美容整形"]},{"体育保健":["健身教练","健身顾问","按摩师","足疗师","体育教练","赛事策划","体育馆管理","运动员"]},{"生活":["家政","保姆","月嫂","钟点工","家电维修","婚礼策划","宠物美容","摄影师"]}],"教育培训":[{"教育":["舞蹈老师","英语老师","音乐老师","语文老师","化学老师","数学老师","物理老师","政治老师","历史老师","幼师","家教"]},{"培训":["培训讲师","教务助理","课程顾问","课程设计"]},{"咨询":["法律咨询","翻译咨询","心理咨询","财务咨询","调研员"]}],"广告传媒":[{"广告":["广告销售","广告优化","广告设计","文案策划","广告执行"]},{"影视":["导演","编导","导演助理","影视制作","艺术指导","摄像师","后期制作","音效师","配音员","灯光师"]},{"媒体":["主编","编辑","记者","美术编辑","排版设计","出版"]},{"娱乐":["经纪人","练习生","主持人","模特","演员","歌手"]}],"医疗制药":[{"医疗服务":["外科医生","内科医生","放射科医生","麻醉医生","护士","理疗师","中医","心理医生","检验师","药剂师","兽医"]},{"医疗器械":["器械销售","质量管理","器械采购","器械研发","供应链","器械维修"]},{"制药":["药品研发","化学分析","药品注册","产品经理","医药代表","医药招商"]}],"消费运输":[{"消费品":["研发","产品","生产","品牌","采购","供应链","质检"]},{"贸易":["跟单","买手","采购"]},{"运输":["铁路乘务员","列车长","公交司机","的士司机","飞行员","空乘","地勤","船长","水手","安检","调度员","海关事务"]},{"物流":["快递","邮递","理货","仓库管理","订单处理","集装箱业务","物流管理","货运代理"]}],"制造能源":[{"汽车制造":["机械设计","动力系统工程师","底盘工程师","总装工艺工程师","项目管理","二手车评估师","汽车销售","汽车美容"]},{"机械制造":["机械工程师","自动化工程师","机电工程师","结构工程师","焊接工艺工程师","液压工程师","模具设计工程"]},{"能源":["燃气技术","热能工程师","电力工程师","管道设计","自控工程师","水利工程师","测绘工程师","地质工程师","钻井工程师","地质勘查","采矿"]},{"化工":["材料工程师","配方工程师","工艺工程师"]}],"公共事业":[{"公务事业":["警察","公务员","事业单位人员","国企员工"]},{"学术科研":["大学教授","研究员"]},{"非盈利组织":["义工","志愿者","支教老师"]},{"农林牧渔":["饲养员","农艺师","畜牧师","护林员","园艺师","动物养殖","饲料研发"]}]}';
		return json;
	},
	// 横向滚动  一次一屏
	item_view_scroll: function(obj){
    	var _obj = {
    		target: "",
    		right: "",
    		rightCallback: null,
    		leftCallback: null,
    		left: "",
    		item: 6,
    		margin: 0
    	};
    	$.extend(_obj, obj);
    	if(!(_obj.target || _obj.right || _obj.left)) {
    		return console.error('缺少标签');
    	}
    	var index = 1,
    		child = _obj.target.children(),
    		parent = _obj.target.parent();
    	// 滚动宽度
		_obj.target.css({
			"width": child.outerWidth() * child.length + _obj.margin * child.length + "px",
			"left": 0
		});
		// 右翻页
		function right(){
			index++;
			var page = Math.ceil(_obj.target.children().length / _obj.item);
    		if(index > page) {
    			index = page;
    			return layer.msg('已经是最后一页了');
    		}
    		_obj.target.css("left", - parent.width() * (index - 1) + "px");
    		if(_obj.rightCallback && typeof _obj.rightCallback === "function") _obj.rightCallback(index);
		}
		// 左翻页
		function left(){
			index--;
	        if(index < 1) {
	        	index = 1;
    			return layer.msg('已经是第一页了');
    		}
    		_obj.target.css("left", - parent.width() * (index - 1) + "px");
    		if(_obj.leftCallback && typeof _obj.leftCallback === "function") _obj.leftCallback(index);
		}
		_obj.right.off('click');
		_obj.left.off('click');
		_obj.right.on('click', right);
		_obj.left.on('click', left);
    }
};
$(function(){
	common.main.init_();//初始化对象
});