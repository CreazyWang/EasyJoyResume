/**
 * 首页js文件
 * hr.info:存放全局通用属性(常量等)
 * 页面事件结构为 hr.hr_detail_event()
 * 变量命名规范：
 * 1一律使用下横杆 _ 号来分隔英文单词，而不是采用驼峰式写法。
 2常量（声明后不会变化的变量）命名全部字母统一大写，用下横杆 _ 分隔英文
 3函数 / 方法 内 局部变量的命名，添加前缀 _ 号
 4声明变量赋值 jquery 对象或 js 对象时，添加变量名前缀 $ 符号
 * 方法命名规范：按功能命名，命名清晰易懂，规则按统一命名方式
 */
var index = index || {};
index.info = {};
index.main = {
    _init: function () { }, //全局初始化
};
index.event = {
    _init: function () {
        // 身份 语言下拉框
        // 打开下拉框
        $(document).on("mouseenter", ".startmake-select", function (e) {
            var $this = $(this);
            $(".startmake-select").removeClass("open-select");
            $this.addClass("open-select");
        });
        $(document).on("mouseleave", ".startmake-select", function (e) {
            var $this = $(this);
            $this.removeClass("open-select");
        });
        // 点击选项事件
        $(document).on("click", ".startmake-select.open-select .select-option li", function () {
            var $this = $(this).parents(".startmake-select");
            $this.removeClass("open-select");
            $this.find(".selected-name span").text($(this).text());
            $this.find(".selected-name").attr("data-value", $(this).attr("data-value"));
        });
        // 轮播图
        var slide_index = 0;
        setInterval(function () {
            slide_index++;
            if (slide_index > $(".index-banner-slide li").length - 1) {
                slide_index = 0;
            }
            $(".index-banner-slide li").eq(slide_index).addClass("show").siblings().removeClass("show");
        }, 5000);
        // 免费制作简历按钮事件
        $(".free-resume-btn, .makeresume-btn").on("click", function () {
            location.href = "/CvResume/CvTemplate";
        });
        // 创建简历切换
        $(".createresume-select li").on("click", function () {
            if ($(this).hasClass("selected")) {
                return;
            }
            $(this).addClass("selected").siblings().removeClass("selected");
            if ($(this).index() == 1) {
                // 切换到内容模板
                $(".jl-index-createresume .createresume-select-pointer").css("margin-left", "230px");
                $(".jl-index-createresume .show-template-content").css("left", "-" + $(".show-template-container").width() + "px");
                // 内容模板高度
                $(".show-template-content").addClass("content-template-height");
                // 初始化内容模板列表
                if ($(".content-template-item").length <= 0) {
                    get_resume_content("/cvresume/resume_content_list/");
                }
            } else {
                // 切换到样式模板
                $(".jl-index-createresume .createresume-select-pointer").css("margin-left", "-270px");
                $(".jl-index-createresume .show-template-content").css("left", 0);
                $(".show-template-content").removeClass("content-template-height");
            }
        });
        // 按钮切换
        $(".lock_template_btn").on("click", function () {
            $("html").animate({ scrollTop: 640 });
            $(".createresume-select li").eq(1).addClass("selected").siblings().removeClass("selected");
            // 切换到内容模板
            $(".jl-index-createresume .createresume-select-pointer").css("margin-left", "230px");
            $(".jl-index-createresume .show-template-content").css("left", "-" + $(".show-template-container").width() + "px");
            // 内容模板高度
            $(".show-template-content").addClass("content-template-height");
            // 初始化内容模板列表
            if ($(".content-template-item").length <= 0) {
                get_resume_content("/cvresume/resume_content_list/");
            }
        });
        // 渲染样式模板
        $("#createresume-template .template_type_title").append("<div class='template-next'></div><div class='template-prev disable'></div>");
        $("#createresume-template .template_card").on("click", function () {
            var $this = $(this);
            location.href = "/cvresume/edit/?itemid=" + $this.attr("data_itemid");
        });
        var view_num = 6;
        $(".type_template_list").each(function (indx, item) {
            var pagenum = Math.ceil($(item).children().length / view_num);
            if (pagenum == 1) {
                $(item).siblings(".template_type_title").find(".template-next").addClass("disable");
                $(item).siblings(".template_type_title").find(".template-prev").addClass("disable");
            }
            common.main.item_view_scroll({
                target: $(item),
                left: $(item).siblings(".template_type_title").find(".template-prev"),
                right: $(item).siblings(".template_type_title").find(".template-next"),
                item: view_num,
                margin: 30,
                rightCallback: function (index) {
                    $(item).siblings(".template_type_title").find(".template-prev").removeClass("disable");
                    if (pagenum >= index) {
                        $(item).siblings(".template_type_title").find(".template-next").addClass("disable");
                    } else {
                        $(item).siblings(".template_type_title").find(".template-next").removeClass("disable");
                    }
                },
                leftCallback: function (index) {
                    $(item).siblings(".template_type_title").find(".template-next").removeClass("disable");
                    if (pagenum >= index) {
                        $(item).siblings(".template_type_title").find(".template-prev").addClass("disable");
                    } else {
                        $(item).siblings(".template_type_title").find(".template-prev").removeClass("disable");
                    }
                }
            });
        });
        // 内容模板导航效果
        $(".zx-mblist-nav .nav-box").mouseover(function () {
            var $this = $(this);
            $this.addClass("current");
            var nav_sub = $this.find(".nav-sub"),
                sub_offset_bottom = nav_sub.offset().top + nav_sub.outerHeight(),
                nav_offset_bottom = $(".zx-mblist-nav").offset().top + $(".zx-mblist-nav").outerHeight();
            if (sub_offset_bottom > nav_offset_bottom) {
                nav_sub.css({
                    "top": "auto",
                    "bottom": 0
                });
            }
        });
        $(".zx-mblist-nav .nav-box").mouseleave(function () {
            $(this).removeClass("current");
        });
        $(".zx-mblist-nav .nav-box a").on("click", function () {
            
            var data_url = $(this).attr("data_url");
            var url = "/cvresume/resume_content_list/?categoryUrls=" + data_url;
            get_resume_content(url);
            $(this).parents(".nav-box").removeClass("current");
            $(".template-search-input").val("");
        })
        //搜索按钮
        $(".template-search-btn").click(function () {
            
            var keyword = $(".template-search-input").val();
            var url = "/cvresume/resume_content_list/?keyword=" + keyword;
            get_resume_content(url);
            $(".template-search-input").val("");
        });
        //搜索回车事件
        $(".template-search-input").keypress(function () {
            if (event.keyCode == 13) {
                var keyword = $(this).val();
                var url = "/cvresume/resume_content_list/?keyword=" + keyword;
                get_resume_content(url);
                $(this).val("");
            }
        });
        //最新、最热模板
        $(".content-template-itemtitle a").click(function () {
            var sort = "";
            var data_track = "";
            if ($(this).hasClass("new_content")) {
                sort = "create_date"
                data_track = "PC-V10.0.0-首页-首页-内容模板选区-左上-最新按钮";
            } else {
                data_track = "PC-V10.0.0-首页-首页-内容模板选区-左上-热门按钮";
            }
            
            $(this).addClass("current").siblings().removeClass("current");
            var url = "/cvresume/resume_content_list/?sort=" + sort;
            get_resume_content(url);
            $(".template-search-input").val("");
        });
        // 监听窗口大小
        var win_L = 1680,
            win_M = 1400,
            template_col_4 = 32,
            template_col_3 = 24,
            template_col_2 = 16;
        var content_template_pageNumber = template_col_4;
        if (($(window).width() <= win_L) && ($(window).width() >= win_M)) {
            content_template_pageNumber = template_col_3;
        } else if ($(window).width() < win_M) {
            content_template_pageNumber = template_col_2;
        }
        $(window).on("resize", function () {
            switch (true) {
                case $(window).width() > win_L:
                    content_template_pageNumber = template_col_4;
                    get_resume_content("/cvresume/resume_content_list/?sort=create_date");
                    break;
                case ($(window).width() <= win_L) && ($(window).width() >= win_M):
                    content_template_pageNumber = template_col_3;
                    get_resume_content("/cvresume/resume_content_list/?sort=create_date");
                    break;
                case $(window).width() < win_M:
                    content_template_pageNumber = template_col_2;
                    get_resume_content("/cvresume/resume_content_list/?sort=create_date");
                    break;
            }
            if ($(".createresume-select li.selected").index() == 1) {
                $(".jl-index-createresume .show-template-content").css("left", "-" + $(".show-template-container").width() + "px");
            }
        });
        // 内容模板翻页
        $(".content-template-pagebtn .pagebtn-up").on("click", function () {
            // 上一页
            var $this = $(this),
                pageNumber = parseInt($this.attr("data_number")),
                url = $this.attr("data_url");
            if (pageNumber == 1) {
                return;
            }
            $.get(url, { "pageNumber": pageNumber, "pageSize": content_template_pageNumber }, function (result) {
                if (result != "") {
                    $(".content-template-content li").not($(".content-template-content li").eq(0)).addClass("templatefadeout");
                    setTimeout(function () {
                        $(".content-template-content li").not($(".content-template-content li").eq(0)).remove();
                        pageNumber--;
                        $(".content-template-pagebtn .pagebtn-down").attr("data_number", pageNumber + 1);
                        $(".content-template-content").append(result);
                        $this.attr("data_number", pageNumber);
                        $("html").animate({ scrollTop: 640 });
                        if (pageNumber == 1) {
                            $this.addClass("disable");
                        }
                    }, 300);
                }
            });
        });
        $(".content-template-pagebtn .pagebtn-down").on("click", function () {
            // 下一页
            var $this = $(this),
                pageNumber = parseInt($this.attr("data_number")),
                url = $this.attr("data_url");
            $.get(url, { "pageNumber": pageNumber, "pageSize": content_template_pageNumber }, function (result) {
                if (result != "") {
                    $(".content-template-content li").not($(".content-template-content li").eq(0)).addClass("templatefadeout");
                    setTimeout(function () {
                        $(".content-template-content li").not($(".content-template-content li").eq(0)).remove();
                        pageNumber++;
                        $(".content-template-pagebtn .pagebtn-up").attr("data_number", pageNumber - 1);
                        $(".content-template-content").append(result);
                        $this.attr("data_number", pageNumber);
                        $("html").animate({ scrollTop: 640 });
                        $(".content-template-pagebtn .pagebtn-up").removeClass("disable");
                    }, 300);
                } else {
                    layer.msg("没有更多了");
                }
            });
        });
        function get_resume_content(url) {
            $.get(url, { "pageSize": content_template_pageNumber }, function (result) {
                $(".content-template-content li").not($(".content-template-content li").eq(0)).addClass("templatefadeout");
                setTimeout(function () {
                    if (result != "") {
                        $(".content-template-content li").not($(".content-template-content li").eq(0)).remove();
                        $(".content-template-content").append(result);
                        $(".content-template-pagebtn").show();
                        $(".content-template-pagebtn .pagebtn-down").attr({
                            "data_url": url,
                            "data_number": 2
                        });
                        $(".content-template-pagebtn .pagebtn-up").attr({
                            "data_url": url,
                            "data_number": 1
                        }).addClass("disable");
                    } else {
                        // 空列表
                        $(".content-template-content li").not($(".content-template-content li").eq(0)).remove();
                        $(".content-template-content").append("<li class='none_list'>抱歉，没有找到你要的内容</li>");
                        $(".content-template-pagebtn").hide();
                    }
                }, 300);
            });
        }
        // hr 服务 板块 鼠标滑入切换
        $(".task_type_button_bar .task_type_plate").hover(function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
        // hr列表滚动
        common.main.item_view_scroll({
            target: $("#index_hr_list_li"),
            left: $(".card_left"),
            right: $(".card_right"),
            item: 6,
            margin: 36
        });
        // hr分类筛选
        $(".hr_sort li").on("click", function () {
            var channel = $(this).attr("data");
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $.get("/hr/channel_list/", { "channel": channel }, function (result) {
                if (result!="") {
                    $("#index_hr_list_li").html(result);
                    var list_item = 6;
                    common.main.item_view_scroll({
                        target: $("#index_hr_list_li"),
                        left: $(".card_left"),
                        right: $(".card_right"),
                        item: list_item,
                        margin: 36
                    });
                    if ($("#index_hr_list_li .reuse_hr_card").length < list_item) {
                        $(".index_quick_task .card_left, .index_quick_task .card_right").hide();
                    } else {
                        $(".index_quick_task .card_left, .index_quick_task .card_right").show();
                    }
                }
            });
        });
        $(window).scroll(function () {
            var scrolltop = $(window).scrollTop();
            if (scrolltop > 0) {
                $(".jl-header").parent("div").removeClass("index_header").addClass("index_header_fixed");
            } else {
                $(".jl-header").parent("div").addClass("index_header").removeClass("index_header_fixed");;
            };
        });
        var owl = $("#owl-demo");
        owl.owlCarousel({
            items: 4, //10 items above 1000px browser width
            itemsDesktop: [1680, 3], //5 items between 1000px and 901px
        });
        $(".jl-index-box .next").click(function () {
            owl.trigger('owl.next');
        });
        $(".jl-index-box .prev").click(function () {
            owl.trigger('owl.prev');
        });
        owl.trigger('owl.play', 3000);
        // 友情链接重新排列
        var foot_link_item = 0,
            foot_link_num = 6,
            foot_link_col = Math.ceil($(".link-list li").length / foot_link_num),
            link_list = Array.prototype.slice.call($(".link-list li"));
        $(".link-list").remove();
        for (; foot_link_item < foot_link_col; foot_link_item++) {
            $(".foot-link").append("<ul class='link-list'></ul>");
            var $list = $(".foot-link .link-list").eq(foot_link_item);
            $list.append(link_list.slice(foot_link_item * foot_link_num, (foot_link_item + 1) * foot_link_num));
        }
        // 交互效果----------------------
        // 首页1屏搜索
        $(".jl-index-search .search-keyword").on("focus", function () {
            $(this).addClass("index-search-focus");
            $(this).parents(".jl-index-search").addClass("index_search_focus");
        }).on("blur", function () {
            $(this).removeClass("index-search-focus");
            $(this).parents(".jl-index-search").removeClass("index_search_focus");
        });
        // 内容模板搜索
        $(".template-search-input").on("focus", function () {
            $(this).parent(".content-template-search").css({
                "background-color": "#fff",
                "border-color": "#aaa"
            });
        }).on("blur", function () {
            $(this).parent(".content-template-search").css({
                "background-color": "transparent",
                "border-color": "#ddd"
            });
        });
        // -------------
    }, //全局初始化
};
$(function () {
    index.main._init(); //初始化
    index.event._init(); //初始化	
})