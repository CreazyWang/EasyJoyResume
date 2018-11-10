/**
 * 简历行家js文件
 * template.info:存放全局通用属性(常量等)
 *
 * 通用方法和事件结构为 template.main.xxx();

 * 变量命名规范：
 * 1一律使用下横杆 _ 号来分隔英文单词，而不是采用驼峰式写法。
 2常量（声明后不会变化的变量）命名全部字母统一大写，用下横杆 _ 分隔英文
 3函数 / 方法 内 局部变量的命名，添加前缀 _ 号
 4声明变量赋值 jquery 对象或 js 对象时，添加变量名前缀 $ 符号

 * 方法命名规范：按功能命名，命名清晰易懂，规则按统一命名方式
 */

var template = template || {};

template.info = {
	                                 
};
template.main = {
	ppt_imgmove_event:function(){
        // PPT缩略图 上 & 下 移动
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
	}
};
template.event = {
	index:function(){
		//导航栏
	    $(window).scroll(function(){
	        var scroll_top = $(window).scrollTop();
	        if(scroll_top > 500){
	            $(".jl-header").parent("div").addClass("fixed");
	        }else{
	            $(".jl-header").parent("div").removeClass("fixed");;
	        };
	    });	
	    //浮动搜索框，追加到head里去
	    $(".jl-header").children("div:last").after($("#search_fixed_div"));
	    $(".search_fixed .search_tab span").click(function(e){
	    	e.stopPropagation();
			$(this).parent().toggleClass("show");
		});	
		$("body").click(function(){
			$(".search_fixed .search_tab").removeClass("show");
		});		
		$(document).on("click",".search_fixed .search_tab li",function(){
			var data_value = $(this).attr("data-value");
			var data_text = $(this).text();
			$(this).addClass("checked").siblings().removeClass("checked");
			$(this).parent().siblings("span").attr("data-search",data_value);
			$(this).parent().siblings("span").text(data_text);
			$(".search_fixed .searchType").val(data_value);
		});		

		//搜索栏
		$(document).on("click",".search_tab .tab_a",function(){
			$(this).addClass("current").siblings().removeClass("current")
			if($(this).attr("data-value")=="ppt"){
				$(".template_search .searchType").val("ppt");
				$(".template_search .ppt").removeClass("hidden");
				$(".template_search .words").addClass("hidden");
				$(".word_tab").attr("data_track","PC-MB3.1.1-模板商城-商城首页-ppt搜索框-左上角分类-搜word模板");
				$(".ppt_tab").attr("data_track","PC-MB3.1.1-模板商城-商城首页-ppt搜索框-左上角分类-搜PPT模板");
				$(".search_btn").attr("data_track","PC-MB3.1.1-模板商城-商城首页-ppt搜索框-搜索框右侧-搜索按钮");
			}else{
				$(".template_search .searchType").val("word");
				$(".template_search .ppt").addClass("hidden");
				$(".template_search .words").removeClass("hidden");
			}
		});	
		//word热门分类
		$(".wordType").click(function(){
			var _url=$(this).attr("url");
			location.href = _url;
		})
		//首页轮播图
	    var swiper = new Swiper('.template_swiper', {
	    	loop:true,
            loopedSlides:0,
            speed:500,
            autoplay:true,
			pagination: {
		      el: '.swiper-pagination',
		    },
		    // 如果需要前进后退按钮
		    navigation: {
		      nextEl: '.swiper-button-next',
		      prevEl: '.swiper-button-prev',
		    }
	    });
        var _slide_length = $(".swiper-slide").length;
        if(_slide_length <=3){
            $(".swiper-pagination,.swiper-button-prev,.swiper-button-next").stop().hide();
            swiper.autoplay.stop();
        }
	},
	word_list:function(){		
		    $(window).scroll(function(){
		    	if($("#results").height() > 800){
			        var scroll_top = $(window).scrollTop();
			        if(scroll_top > 200){
			            $(".jl-template-form").addClass("fixed");
			        }else{
			            $(".jl-template-form").removeClass("fixed");;
			        };
		        }
		    });	
		    $(".dl_CV_Template dd p i").hover(function(){
		    	var selector ="." + $(this).attr("class") + "_tips";
		    	$(this).parents(".inner").find(selector).addClass("show")
		    },function(){
		    	var selector ="." + $(this).attr("class") + "_tips";
		    	$(this).parents(".inner").find(selector).removeClass("show")
		    })
	    
	}
};
