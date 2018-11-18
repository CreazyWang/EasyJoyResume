/**
 * 在线简历简历数据操作
 * @author huangcanhui
 * 文档提示
 * .moduleItem 标记模块
 * .moduleItemList 标记模块下的子栏目
 * .divIconFont 标记自定义图标
 **/
var cvresume = cvresume || {};
cvresume.main = cvresume.main || {};
cvresume.info = {
    itemid: 0,
    resumeid: 0,
    memberid: 0,
    downloadFlag: false,
    downloadUrl: "",
    resumecontentid: 0,
    visitid: "",
    sortPosition: ["Left", "Top", "Right", "Bottom"],
    cases: "",
    language: "zh",
    resume_type: "文档",
    resume_fontType_change: -1//0：简历，1：繁体，-1：不做任何操作
}
cvresume.localStorage = true;//localStorge兼容，方便测试（默认true）
cvresume.save_trigger = true;
cvresume.resume_save_trigger = true;
cvresume.module_save_trigger = true;//模块数据保存
cvresume.history_save_trigger = true;//历史记录
cvresume.cur_opt_content = "";//当前用户正在操作原始数据，使用获得焦点数据保存
cvresume.main = {
    event_: function () {//事件绑定
        //分享功能
        $("#shareResume-modal #copyUrl").on("click", function () {
            var str = $(".shareContent span").html() + $(".shareContent input").val() + "/";
            cvresume.main.set_copyToClipBoard(str);
            $("#copyUrl").html("复制成功");
            setTimeout(function () {
                $("#copyUrl").html("复制链接")
            }, 2000);
        });

        //设置隐私id
        $("#visitid").change(function () {
            cvresume.main.set_visitid($(this).val());
        });
        //设置访问类别
        $("#resume_authority_modal .authority_list:not(li:eq(1))").click(function () {
            if (false /*cvresume.main.is_empty(cvresume.info.resumeid)*/) {
                layer.msg("没有登录");
            } else {
                var data_type = $(this).attr("data-type");
                if (!cvresume.main.is_empty(data_type)) {
                    $.post("/cvresume/SetVisitType/", { "visitType": data_type, "resumeid": cvresume.info.resumeid }, function (message) {
                        if (message.type == "success") {
                            $("#edit_resume_sharebtn").attr("data-visittype", data_type)
                        }
                    });
                }
            }
        });
        //设置访问密码
        $("#visitPasswordSubBtn").click(function () {
            //设置密码访问类别
            var data_type = $("#resume_authority_modal .authority_list:nth-child(1)").attr("data_type");
            if (!cvresume.main.is_empty(data_type)) {
                $.post("/cvresume/SetVisitType/", { "visitType": data_type, "resumeid": cvresume.info.resumeid }, function (message) {
                    $("#edit_resume_sharebtn").attr("data-visittype", data_type)
                });
            }
            var password = $("#visitPassword").val();
            if (cvresume.main.is_empty(password)) {
                layer.msg("密码不能为空~");
                return;
            }
            if (password.length > 6) {
                layer.msg("密码长度不允许超过6位数！");
                return;
            }
            if (!/^[0-9]*$/.test(password)) {
                layer.msg("密码只允许输入数字！");
                return;
            }
            $.post("/cvresume/SetVisitPassword/", { "password": password, "resumeid": cvresume.info.resumeid }, function (message) {
                if (message.type == "success") {
                    layer.msg("密码设置成功~");
                    $("#resume_authority_modal").modal("hide");
                } else {
                    layer.msg(message.content);
                }
            });
        });
        //简历命名(弹框)
        $("#resumeName .submit").click(function () {
            var _resumeName = $("#resumeName").find("input").val();
            if (_resumeName.length > 15) {
                layer.msg("不能超过15个字！");
                return;
            } else if (!/^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/.test(_resumeName)) {
                layer.msg("不能含有特殊字符！");
                return;
            }
            $("#resumeName").modal("hide");
            var isSaveSuccess = cvresume.main.base_resume_save(true, cvresume.main.get_resume(), false);
            if (isSaveSuccess) {
                var _href = "/cvresume/" + cvresume.info.visitid + "/";
                if (!cvresume.main.is_empty($(".publish a").attr("data-value"))) {
                    _href += "?device=" + $(".publish a").attr("data-value");
                }
                window.open(_href);
            }
        });
        //简历命名(顶部命名框)
        $(".set_resume_name input[name=resume_name]").on("blur", function () {
            $(this).attr("placeholder", "无标题");
            var _val = $(this).attr("data-value");
            var _resumeName = $(this).val();
            if (_resumeName.length == 0) {
                $(this).val(_val);
                return;
            } else if (_resumeName.length > 15) {
                layer.msg("不能超过15个字！");
                return;
            } else if (!/^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/.test(_resumeName)) {
                layer.msg("不能含有特殊字符！");
                return;
            } else {
                $("#resumeName").find("input").val(_resumeName);
                cvresume.main.base_resume_save(true, cvresume.main.get_resume(), false);
            }
        });
        $(".set_resume_name input[name=resume_name]").keydown(function (e) {
            var key = window.event ? e.keyCode : e.which;
            if (key.toString() == "13") {
                $(this).blur();
            }
        });
        $(".set_resume_name input[name=resume_name]").click(function () {
            var _val = $(this).val();
            $(this).attr("data-value", _val);
            $(this).attr("placeholder", "");
            $(this).val("");
        });
        //历史记录列表
        $(".czls a").click(function () {
            cvresume.main.get_resume_history();
        });
        //恢复简历提示
        //发布(保存->简历->历史记录)
        $(document).on("click", ".publish a:not(.jy-vip-lock)", function () {
            var resume_title = $("#resumeName").find("input").val();
            var uri_resume_title = decodeURI(common.main.getUrlParamsValue("title"));
            if ($("html").hasClass("ie9")) {
                alert("当前浏览器内核为ie9,如果简历加载不出来,请更换浏览器,或切换至极速模式,可以正常下载简历.");
            }
            if (cvresume.main.is_empty(resume_title) && (cvresume.main.is_empty(uri_resume_title) || uri_resume_title == "null")) {//如果简历未保存并且url没带简历命名就弹出简历命名框
                $("#resumeName").modal("show");
            } else {
                var isSaveSuccess = cvresume.main.resume_save(true, false);
                if (isSaveSuccess) {
                    var _href = "/cvresume/" + cvresume.info.visitid + "/"
                    if (!cvresume.main.is_empty($(this).attr("data-value"))) {
                        _href += "?device=" + $(this).attr("data-value");
                    }
                    window.open(_href);
                }
            }
            return;
        });
        //获得焦点,保存原始操作内容
        $(document).on("focus", "div[contenteditable='true']", function (e) {
            cvresume.cur_opt_content = $(this).html();
        });
        //失去焦点就保存
        $(document).on("blur", "div[contenteditable='true']", function (e) {
            var html_content = $(this).html();
            //焦点失去后，对去两者的内容是否有修改，如果有修改则保存
            if (cvresume.cur_opt_content == html_content) {
                console.log("没有修改不用保存");
                return;
            }
            //时间模块数据抽取
            try {
                var timeModules = ["resume_work", "resume_internship", "resume_volunteer", "resume_project", "resume_edu"];
                var id = $(this).closest(".moduleItem").attr("id");
                if ($.inArray(id, timeModules) != -1) {
                    cvresume.main.resume_save_time(id, $(this).closest(".moduleItemList"));
                    return;
                }
            } catch (e) { }
            cvresume.main.resume_save();
        });
        // .save_opt
        $(document).on("click", ".save_opt:not(.jy-vip-lock)", function () {
            //简繁体切换标识
            var _id = $(this).attr("id");
            if (_id == "jian") {
                cvresume.info.resume_fontType_change = 0;
            } else if (_id == "fan") {
                cvresume.info.resume_fontType_change = 1;
            } else {
                cvresume.info.resume_fontType_change = -1;
            }
            cvresume.main.delay_resume_save();
        });
        //判断简历类型
        if ($(".jyCv-container").hasClass("mobile")) {
            cvresume.info.resume_type = "手机";
        }
        //发布页切换简历类型点击事件
        $("div.release_operation div.resume_type a").click(function () {
            var _url = "/cvresume/" + cvresume.info.visitid + "/";
            if (!$(this).hasClass("phone_resume")) {
                _url += "?device=wap";
            }
            location.href = _url;
        });
    },
    init_: function () {//初始化
        cvresume.main.event_();
    },
    save_notice: function (save_status) {
        if (save_status == undefined)
            save_status = false;
        if (cvresume.save_trigger != save_status) {
            cvresume.save_trigger = save_status;
            if (save_status)
                $(window).unbind("beforeunload", cvresume.main.not_save_notice);
            else
                $(window).bind("beforeunload", cvresume.main.not_save_notice);
        }
    },
    not_save_notice: function (event) {
        return "你有修改内容没有保存，确定要离开吗？";
    },
    template_set: function (settings, resumeid) {//模板配置渲染
        if (settings) {
            var _classStr = "#resume_base .jyCv-base";
            $(cvresume.info.sortPosition).each(function (i, item) {//遍历方位
                var pos_set = settings[item.toLocaleLowerCase()];
                $(pos_set.reverse()).each(function (j, jtem) {//reverse()素组翻转
                    if (cvresume.main.is_empty(resumeid)) {
                        //隐藏
                        if (!jtem.isShow) {
                            $("#" + jtem.key).addClass("hidden");
                        }
                    }
                    //移位
                    $(_classStr + item).prepend($("#" + jtem.key));
                    var _class = $("#" + jtem.key).attr("data-parts");
                    if (_class != null && _class != "") {
                        $("#" + jtem.key).removeClass(_class).addClass("template_css").attr("data-parts", "");
                    }
                });
            });
        }
    },
    resume_save_time: function (type, target) {//数据抽取-保存时间模块
        var time = {};
        var id = $(target).attr("data-id");
        var beginTime = $(target).find("i.time-start").text();
        var endTime = $(target).find("i.time-end").text();
        var unit = $(target).find(".company").find("div[contenteditable]").html();
        var job = $(target).find(".post").find("div[contenteditable]").html();
        var content = $(target).find(".resume_content").html();
        if (!cvresume.main.timeModuleIsEmpty(beginTime) ||
            !cvresume.main.timeModuleIsEmpty(endTime) ||
            !cvresume.main.timeModuleIsEmpty(unit) ||
            !cvresume.main.timeModuleIsEmpty(job) ||
            !cvresume.main.timeModuleIsEmpty(content)) {
            if (!cvresume.main.is_empty(id)) {
                time["id"] = id;
            }
            time["beginTime"] = beginTime;
            time["endTime"] = endTime;
            time["unit"] = unit;
            time["job"] = job;
            time["content"] = content;
            if (!cvresume.module_save_trigger) {
                console.log("模块数据正在保存...");
            }
            var timeJson = JSON.stringify(time);
            if (common.main.contain_emoji(timeJson)) {
                cvresume.main.delay_resume_save();
                return;
            }
            cvresume.module_save_trigger = false;
            $.ajax({
                type: "POST",
                url: "/cvresume/module/time/save/",
                data: {
                    "resumeId": cvresume.info.resumeid,
                    "type": type.replace("resume_", ""),
                    "json": timeJson
                },
                success: function (message) {
                    if (message.type == "success") {
                        $(target).attr("data-id", message.content);
                    }
                },
                complete: function () {
                    cvresume.module_save_trigger = true;
                    cvresume.main.delay_resume_save();
                }
            });
        } else if (!cvresume.main.is_empty(id)) {//有id没数据,删除
            $.ajax({
                type: "POST",
                url: "/cvresume/module/time/delete/",
                data: {
                    "resumeId": cvresume.info.resumeid,
                    "type": type.replace("resume_", ""),
                    "id": id
                },
                success: function (message) {
                    if (message.type == "success") {
                        $(target).removeAttr("data-id");
                    }
                },
                complete: function () {
                    cvresume.main.delay_resume_save();
                }
            });
        } else {
            cvresume.main.delay_resume_save();
        }
    },
    resume_save_recoment: function (item) {//推荐信保存
        if (item.length <= 0) {
            layer.msg("推荐信保存出错，请刷新重试~");
            return;
        }
        var recoment = {};
        var $e = item;
        recoment["id"] = $e.attr("data-id");
        recoment["name"] = $e.find(".name").find("div[contenteditable]").html();
        recoment["mobile"] = $e.find(".contact_mobile").html();
        recoment["content"] = $e.find(".resume_content").html();
        $.ajax({
            type: "POST",
            url: "/recommend/update/",
            data: recoment,
            success: function (message) {
                if (message.type != "success") {
                    layer.msg(message.content);
                }
            }
        });
    },
    resume_draw: function (itemid, resumeid, memberid, visitid) {
        cvresume.info.itemid = itemid;
        cvresume.info.resumeid = resumeid;
        cvresume.info.memberid = memberid;
        cvresume.info.visitid = visitid;
    },
    set_language: function (language) {
        cvresume.info.language = language;
    },
    resume_cases: function (type) {//简历简历、实例
        if (cvresume.main.is_empty(type)) {
            $.get("/cvresume/cases/", { "resumeContentId": cvresume.info.resumecontentid }, function (message) {
                cvresume.info.cases = message;
            });
        } else if (!cvresume.main.is_empty(cvresume.info.cases)) {
            $("#reCase-caeousel").html($(cvresume.info.cases).siblings(".cases-type-" + type));
            $("#reCase-modal").modal("show");
        }
    },
    delay_resume_save: function (s) {
        if (cvresume.main.is_empty(s)) {
            s = 2000;
        }
        setTimeout(function () {
            cvresume.main.resume_save();
        }, s)
    },
    //isAsync:是否异步（默认true）
    resume_save: function (isRelease, isAsync) {//简历保存
        if (isAsync == undefined) {
            isAsync = true;
        }
        var resume = cvresume.main.get_resume();
        var title = decodeURI(common.main.getUrlParamsValue("title"));
        if (!cvresume.main.is_empty(title) && title != "null") {
            resume["resume_title"] = title;
        }
        return cvresume.main.base_resume_save(isRelease, resume, isAsync);
    },
    //isAsync:是否异步（默认true）
    base_resume_save: function (isRelease, resume, isAsync) {//isRelease 控制history保存
        if (isAsync == undefined) {
            isAsync = true;
        }
        if (isAsync && cvresume.resume_save_trigger) {//异步并且可以保存
            cvresume.resume_save_trigger = false;
        } else if (isAsync && !cvresume.resume_save_trigger) {//异步并且可以不可以保存
            console.log("简历数据正在保存...");
            return;
        }
        cvmutual.main.caclulate_resume_scale(resume);//计算简历进度
        var resumeSaveflag = cvresume.main.validate_resume(resume);//校验简历内容
        if (!resumeSaveflag) {
            cvresume.resume_save_trigger = true;
            return false;
        }
        var _resumeJson = JSON.stringify(resume);
        //emojy表情拦截
        if (common.main.contain_emoji(_resumeJson)) {
            layer.msg("不支持存储含emjoy表情的简历数据,请清除后再进行保存");
            cvresume.resume_save_trigger = true;
            return false;
        }
        //简繁体切换标识
        if (cvresume.info.resume_fontType_change == 0) {
            _resumeJson = resumeJson = $.t2s(_resumeJson);
        } else if (cvresume.info.resume_fontType_change == 1) {
            _resumeJson = resumeJson = $.s2t(_resumeJson);
        }
        cvresume.info.resume_fontType_change = -1;

        var saveUrl = "/cvresume/save/";
        $.ajax({
            type: "post",
            cache: false,
            async: isAsync,
            url: saveUrl,
            data: { "memberid": cvresume.info.memberid, "itemid": cvresume.info.itemid, "resumeid": cvresume.info.resumeid, "json": _resumeJson },
            beforeSend: function () {
                if (cvresume.main.is_empty(cvmutual.main.set_intervalProgress)) {
                    cvmutual.main.set_progressBar("sending");
                }
                $(".liveupdate").find("span").text("正在保存...");
            },
            success: function (message) {
                if (message.type == "success") {
                    cvresume.main.save_notice(true);//移除提示
                    resumeSaveflag = true;
                    if (cvresume.main.isJsonFormat(message.content)) {//首次保存
                        var msg_content = cvresume.main.strToJson(message.content);
                        cvresume.main.resume_draw(msg_content.itemid, msg_content.resumeid, msg_content.memberid, msg_content.visitid);
                        var data_url = jycnf.base + '/cvresume/edit/?itemid=' + msg_content.itemid + '&resumeId=' + msg_content.resumeid;
                        history.pushState(null, "简历首次保存", data_url);
                        //编辑器切换地址
                        $(".wapresume .tips a[href]").attr("href", $(".wapresume .tips a[href]").attr("href") + '&resumeId=' + msg_content.resumeid);
                        common.main.resumeOperationLogUpload(cvresume.info.resumeid, "create", "", "");//日志上报
                        //内容模板使用数据累加
                        if (cvresume.info.resumecontentid != 0 && !cvresume.main.is_empty(cvresume.info.resumecontentid)) {
                            $.post("/cvresume/resume_content/post_use_num/", { "rcid": cvresume.info.resumecontentid }, function () { });
                        }
                    } else {
                        //打点简历修改数据
                        cvresume.main._("PC-简历-修改简历");
                    }
                    setTimeout(function () {
                        $(".liveupdate").find("span").css("color", "#00c190").text(common.main.date_format(new Date(), "HH:mm") + " 保存成功");
                        cvresume.main.resume_save_history();
                    }, 1000);
                    cvresume.main.gernateResumeWapQrCodeImage(cvresume.info.resumeid);//自动手机简历二维码
                } else {
                    if (message.content == "已超过最大简历创建数量，请升级会员继续") {
                        if (cvresume.save_trigger) {//只提示一次VIP
                            common.main.resume_confirm({
                                title: "VIP会员升级提示",
                                modal_class: "vip-content",
                                content: "超出最大创建简历数量，请删除部分简历或升级会员后继续",
                                ok: "立即升级",
                                onOk: function () {
                                    common.main.vip_opt_tips();
                                }
                            });
                        } else {
                            layer.msg(message.content);
                        }
                    } else if (message.content == "没有登录！") {
                        setTimeout(function () {
                            layer.msg(message.content);
                        }, 1000 * 60);
                    } else {
                        layer.msg(message.content);
                    }
                    cvresume.main.save_notice(false);//添加提示
                    $(".liveupdate").find("span").css("color", "red").text(common.main.date_format(new Date(), "HH:mm") + " 保存失败");
                }
                if (!cvresume.main.is_empty(cvmutual.main.set_intervalProgress)) {
                    cvmutual.main.set_progressBar("success");
                }
                cvresume.resume_save_trigger = true;
            },
            error: function () {
                cvmutual.main.set_progressBar("fail");
                $(".liveupdate").find("span").css("color", "#00c190").text(common.main.date_format(new Date(), "HH:mm") + " 保存失败");
                cvresume.resume_save_trigger = true;
            }
        });
        return resumeSaveflag;
    },
    get_resume: function () {//获取保存数据
        var resume = {};
        resume = cvresume.main.get_resume_title(resume);//简历名称
        resume = cvresume.main.get_resume_scale(resume);//简历修改比例
        resume = cvresume.main.get_resume_language(resume);//中英文简历
        resume = cvresume.main.get_resume_set(resume);//简历设置信息，主题，字体，字体大小，字体间距，简繁体
        resume = cvresume.main.get_resume_modul_mg(resume);//模块管理信息
        resume = cvresume.main.get_resume_icon_map(resume);//图标管理
        resume = cvresume.main.get_resume_cover_info(resume);//封面信息
        resume = cvresume.main.get_resume_letter(resume);//自荐信
        resume = cvresume.main.get_resume_head(resume);//头像
        resume = cvresume.main.get_resume_base_info(resume);//基本信息
        resume = cvresume.main.get_resume_job_preference(resume);//求职意向
        resume = cvresume.main.get_resume_skill(resume);//技能特长
        resume = cvresume.main.get_resume_hobby(resume);//兴趣爱好
        resume = cvresume.main.get_resume_time_module(resume, "#resume_edu");//教育背景
        resume = cvresume.main.get_resume_time_module(resume, "#resume_work");//工作经历
        resume = cvresume.main.get_resume_time_module(resume, "#resume_internship");//实习经历
        resume = cvresume.main.get_resume_time_module(resume, "#resume_volunteer");//志愿者经历
        resume = cvresume.main.get_resume_time_module(resume, "#resume_project");//项目经历
        resume = cvresume.main.get_resume_summary(resume);//自我评价
        resume = cvresume.main.get_resume_honor(resume);//荣誉证书
        resume = cvresume.main.get_resume_portfolio(resume);//作品集
        resume = cvresume.main.get_resume_custom(resume);//自定项
        resume = cvresume.main.get_resume_sort(resume);//模块排序信息
        resume = cvresume.main.get_resume_contact(resume);//联系我样本保存
        resume = cvresume.main.get_resume_qrcode(resume);//手机二维码
        return resume;
    },
    validate_resume: function (resume) {//校验简历Json串
        var isPass = true;
        //主要模块
        var main_modules = {
            "resume_head": "头像",
            "resume_job_preference": "求职意向",
            "resume_edu": "教育背景",
            "resume_internship": "实习经验",
            "resume_volunteer": "自愿者经历",
            "resume_project": "项目经验",
            "resume_work": "工作经验",
            "resume_honor": "奖项荣誉",
            "resume_summary": "自我评价",
            "resume_portfolio": "作品集",
            "resume_hobby": "个人标签",
            "resume_skill": "技能特长",
            "resume_qrcode": "二维码",
        };
        //模块管理信息校验
        $.each(main_modules, function (key, value) {
            if (!cvresume.main.isResumeMgFormat(resume.modul_show[key])) {
                layer.msg(value + "模块信息格式有误");
                return isPass = false;
            }
        });
        //模块内容校验
        //封面
        var resume_cover_json = JSON.stringify(resume.resume_cover);
        if (resume_cover_json.length > 255) {
            layer.msg("封面内容长度超过最大限制");
            isPass = false;
        }
        //头像
        var resume_head = resume["resume_head"];
        if (resume["resume_head"].length > 255 || !/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(resume_head)) {
            layer.msg("头像链接异常");
            isPass = false;
        }
        return isPass;
    },
    get_resume_title: function (resume) {//简历命名
        var resume_title = $("#resumeName").find("input").val();
        if (!cvresume.main.is_empty(resume_title)) {
            resume["resume_title"] = resume_title;
        }
        return resume
    },
    get_resume_scale: function (resume) {//简历修改比例
        resume["resume_scale"] = $(".r-viewbar .number").attr("data-value");
        return resume
    },
    get_resume_language: function (resume) {//中英文简历
        resume["resume_language"] = cvresume.info.language;
        return resume
    },
    get_resume_set: function (resume) {//获取简历设置信息
        var resume_set = {};
        //获取颜色
        var color = $("#resume_base").attr("data_color");
        if (!cvresume.main.is_empty(color)) {
            resume_set["color"] = color;
        }
        //获取字体
        var font = $("#resume_base").attr("data_font_name");
        if (!cvresume.main.is_empty(font)) {
            resume_set["font"] = font;
        }
        //获取字体大小
        var fontSize = $("#resume_base").attr("data_font_size");
        if (!cvresume.main.is_empty(fontSize)) {
            resume_set["fontSize"] = fontSize;
        }
        //获取行距
        var padding = $("#resume_base").attr("data_line_height");
        if (!cvresume.main.is_empty(padding)) {
            resume_set["padding"] = padding;
        }
        //获取块距
        var margin = $("#resume_base").attr("data-modal_margin");
        if (!cvresume.main.is_empty(margin)) {
            resume_set["margin"] = margin;
        }
        resume["resume_set"] = resume_set;
        //获取字体类别
        var fontType = $("#resume_base").attr("data_font_type");
        if (!cvresume.main.is_empty(fontType)) {
            resume_set["fontType"] = fontType;
        }
        return resume;
    },
    get_resume_modul_mg: function (resume) {//获取模块管理信息
        var modul_show = {};
        //获取自荐信是否显示
        if ($("#resume_letter").length == 0 || $("#resume_letter").hasClass("hidden")) {
            modul_show["letterShow"] = false;
        } else {
            modul_show["letterShow"] = true;
        }
        //是否封面是否显示
        if ($("#resume_cover").length == 0 || $("#resume_cover").hasClass("hidden")) {
            modul_show["coverShow"] = false;
        } else {
            modul_show["coverShow"] = true;
        }
        //个人照片是否显示
        if ($("#resume_head").hasClass("hidden")) {
            modul_show["headShow"] = false;
        } else {
            modul_show["headShow"] = true;
        }
        //联系我是否显示
        if ($("#resume_contact").hasClass("hidden")) {
            modul_show["contactShow"] = false;
        } else {
            modul_show["contactShow"] = true;
        }
        //模块配置信息抽取
        var $all_modul = $("#resume_base").find(".moduleItem");

        $all_modul.each(function (index, ele) {
            var $ele = $(ele);
            var set_config = {};
            var key = $ele.attr("id");
            if (cvresume.main.is_empty(key)) {
                return true;
            }
            //模块是否显示
            if ($ele.hasClass("hidden")) {
                set_config["isShow"] = false;
            } else {
                set_config["isShow"] = true;
            }
            //标题是否显示
            if ($ele.find(".hiddenTitle s").hasClass("checked")) {
                set_config["isTitleShow"] = false;
            } else {
                set_config["isTitleShow"] = true;
            }
            //时间是否显示
            if ($ele.find(".hiddenTime s").hasClass("checked")) {
                set_config["isTimeShow"] = false;
            } else {
                set_config["isTimeShow"] = true;
            }
            //内容是否显示
            if ($ele.find(".hiddenText s").hasClass("checked")) {
                set_config["isContentShow"] = false;
            } else {
                set_config["isContentShow"] = true;
            }
            //标题
            var $ele_title = $ele.find(".module_item_title");
            set_config["title"] = $ele_title.html().replace(/<\/?[^>]*>/g, '');//清除html标签
            //样式
            var $ele_class = $ele.attr("data-parts");
            if ($ele_class != null && $ele_class != "") {
                if (cvresume.info.resume_type == "手机") {
                    set_config["wapModelStyle"] = $ele_class;
                } else {
                    set_config["docModelStyle"] = $ele_class;
                }
            }
            set_config["key"] = key;
            modul_show[key] = set_config;
        });
        resume["modul_show"] = modul_show;
        return resume;
    },
    set_copyToClipBoard: function (str) {
        //复制到剪贴板
        var copyInput = $("<input type='text' value='" + str + "' style='opacity:1;position:absolute;top:20px;z-index:999;' id='copyText'>");
        $(".in").length > 0 ? dom = $(".in")[0] : dom = "body"
        copyInput.appendTo(dom);
        document.getElementById("copyText").select();
        document.execCommand("copy", false, null)
        $("#copyText").remove();
    },
    get_resume_icon_map: function (resume) {//图标
        var $all_icon = $("#resume_base").find("a.divIconFont");
        var iconFontMap = {};
        $all_icon.each(function (index, ele) {
            var key = $(ele).attr("for-key");
            if (cvresume.main.is_empty(key)) {
                return true;
            }
            var icon = $(ele).html();
            iconFontMap[key] = icon;
        });
        resume["iconFontMap"] = iconFontMap;
        return resume;
    },
    get_resume_cover_info: function (resume) {//获取封面信息
        var cover_info = new Array();
        var $allList = $("#resume_cover").find(".moduleItemList");
        $allList.each(function (index, ele) {
            var info = {};
            var info_icon = $(ele).find(".divIconFont").html();
            var info_content = $(ele).find('div[contenteditable="true"]').html();
            if (!cvresume.main.is_empty(info_content)) {
                info["icon"] = info_icon;
                info["content"] = info_content;
                cover_info.push(info);
            }
        });
        resume["resume_cover"] = cover_info;
        return resume;
    },
    get_resume_letter: function (resume) {//获取自荐信信息
        var letter = $("#resume_letter").find('div[contenteditable="true"]').html();
        if (!cvresume.main.is_empty(letter)) {
            resume["resume_letter"] = letter;
        }
        return resume;
    },
    get_resume_head: function (resume) {
        var head = $("#resume_head").find('.img-preview img').attr("src");
        var _size = $("#resume_head").attr("data-size");
        if (!cvresume.main.is_empty(head)) {
            resume["resume_head"] = head;
            resume["resume_headType"] = _size;
        }
        return resume;
    },
    get_resume_base_info: function (resume) {//获取基本信息--从弹框里获取
        var $baseMsg = $("#baseMsg-modal");
        var resume_base = {};
        var base_name = $baseMsg.find('input[name="name"]').val();//姓名
        var base_minSummary = $baseMsg.find('input[name="minSummary"]').val();//简单介绍语
        //个人基本信息
        var base_birth = $baseMsg.find('input[name="birth"]').val();
        var base_city = $baseMsg.find('input[name="city"]').val();
        var base_cityName = $baseMsg.find('input[name="city"]').attr("data-name");
        var base_jobYear = $baseMsg.find('input[name="jobYear"]').val();
        var base_mobile = $baseMsg.find('input[name="mobile"]').val().trim();
        var base_email = $baseMsg.find('input[name="email"]').val();
        var base_sex = !cvresume.main.is_empty($baseMsg.find('input[name="sex"]:checked').val()) ? $baseMsg.find('input[name="sex"]:checked').val() : "";
        var base_education = $baseMsg.find('input[name="education"]').val();
        var base_nation = $baseMsg.find('input[name="nation"]').val();
        var base_marriageStatus = $baseMsg.find('input[name="marriageStatus"]').val();
        var base_politicalStatus = $baseMsg.find('input[name="politicalStatus"]').val();
        var base_height = $baseMsg.find('input[name="height"]').val();
        var base_weight = $baseMsg.find('input[name="weight"]').val();
        if (!cvresume.main.is_empty(base_name)) {
            resume_base["name"] = base_name;
        }
        if (!cvresume.main.is_empty(base_minSummary)) {
            resume_base["minSummary"] = base_minSummary;
        }
        if (!cvresume.main.is_empty(base_birth)) {
            resume_base["birth"] = base_birth;
        }
        if (!cvresume.main.is_empty(base_city)) {
            resume_base["city"] = base_city;
        }
        if (!cvresume.main.is_empty(base_cityName)) {
            resume_base["cityName"] = base_cityName;
        }
        if (!cvresume.main.is_empty(base_jobYear)) {
            resume_base["jobYear"] = base_jobYear;
        }
        if (!cvresume.main.is_empty(base_mobile)) {
            resume_base["mobile"] = base_mobile;
        }
        if (!cvresume.main.is_empty(base_email)) {
            resume_base["email"] = base_email;
        }
        if (!cvresume.main.is_empty(base_sex)) {
            resume_base["sex"] = base_sex;
        }
        if (!cvresume.main.is_empty(base_education)) {
            resume_base["education"] = base_education;
        }
        if (!cvresume.main.is_empty(base_nation)) {
            resume_base["nation"] = base_nation;
        }
        if (!cvresume.main.is_empty(base_marriageStatus)) {
            resume_base["marriageStatus"] = base_marriageStatus;
        }
        if (!cvresume.main.is_empty(base_politicalStatus)) {
            resume_base["politicalStatus"] = base_politicalStatus;
        }
        if (!cvresume.main.is_empty(base_height)) {
            resume_base["height"] = base_height;
        }
        if (!cvresume.main.is_empty(base_weight)) {
            resume_base["weight"] = base_weight;
        }
        //个人自定义信息
        var $customMsg = $baseMsg.find('.defindItem').find('[data-panel="defind"]');
        var msgArray = new Array();
        $customMsg.each(function (index, ele) {
            var custommsg = {};
            var custommsg_key = $(ele).attr("data-value");
            var custommsg_name = $(ele).find(".defindName").val();
            var custommsg_desc = $(ele).find(".defindContent").val();
            if (!cvresume.main.is_empty(custommsg_desc)) {
                custommsg["key"] = custommsg_key;
                custommsg["name"] = custommsg_name;
                custommsg["desc"] = custommsg_desc;
                msgArray.push(custommsg);
            }
        });
        resume_base["customMsg"] = msgArray;
        //个人网站
        var $homePages = $baseMsg.find('[data-panel="homePage"]');
        var homeArray = new Array();
        $homePages.each(function (index, ele) {
            var home = {};
            var home_key = $(ele).attr("data-value");
            var home_url = $(ele).find("[name='homeUrl']").val();
            var home_desc = $(ele).find("[name='homeDesc']").val();
            if (!cvresume.main.is_empty(home_url) || !cvresume.main.is_empty(home_desc)) {
                home["key"] = home_key;
                home["url"] = home_url;
                home["desc"] = home_desc;
                homeArray.push(home);
            }
        });
        resume_base["customWebsite"] = homeArray;
        resume["resume_base_info"] = resume_base;
        return resume;
    },
    get_resume_job_preference: function (resume) {//求职意向
        var job_preference = {};
        var $jobIntension = $("#jobIntension-modal");
        var jp_jobFunction = $jobIntension.find('input[name="jobFunction"]').val();
        var jp_jobType = $jobIntension.find('input[name="jobType"]').val();
        var jp_jobTime = $jobIntension.find('input[name="jobTime"]').val();
        var jp_jobCity = $jobIntension.find('input[name="jobCity"]').val();
        var jp_jobCityName = $jobIntension.find('input[name="jobCity"]').attr("data-name");
        var jp_jobMinSalary = $jobIntension.find('input[name="jobMinSalary"]').val();
        var jp_jobMaxSalary = $jobIntension.find('input[name="jobMaxSalary"]').val();
        var jp_jobSalary = $jobIntension.find('input[name="jobSalary"]').val();
        var jp_negotiable = $jobIntension.find('input[name="negotiable"]').prop("checked");
        if (!cvresume.main.is_empty(jp_jobFunction)) {
            job_preference["jobFunction"] = jp_jobFunction;
        }
        if (!cvresume.main.is_empty(jp_jobType)) {
            job_preference["jobType"] = jp_jobType;
        }
        if (!cvresume.main.is_empty(jp_jobTime)) {
            job_preference["jobTime"] = jp_jobTime;
        }
        if (!cvresume.main.is_empty(jp_jobCity)) {
            job_preference["jobCity"] = jp_jobCity;
        }
        if (!cvresume.main.is_empty(jp_jobCityName)) {
            job_preference["jobCityName"] = jp_jobCityName;
        }
        if (!cvresume.main.is_empty(jp_jobType) && jp_jobType == "partTime") {
            if (!cvresume.main.is_empty(jp_jobSalary)) {
                job_preference["jobMinSalary"] = job_preference["jobMaxSalary"] = jp_jobSalary;
            }
        } else {
            if (!cvresume.main.is_empty(jp_jobMinSalary)) {
                job_preference["jobMinSalary"] = jp_jobMinSalary;
            }
            if (!cvresume.main.is_empty(jp_jobMaxSalary)) {
                job_preference["jobMaxSalary"] = jp_jobMaxSalary;
            }
        }
        if (jp_negotiable) {
            job_preference["jobMinSalary"] = 0;
            job_preference["jobMaxSalary"] = 0;
        }
        resume["resume_job_preference"] = job_preference;
        return resume;
    },
    get_resume_skill: function (resume) {//技能特长
        var $skill = $("#resume_skill");
        var $allmoduleItemList = $skill.find(".moduleItemList");
        var skillArray = new Array();
        $allmoduleItemList.each(function (i, e) {
            var skillItem = {};
            skillItem["name"] = $(e).find(".item_title").text();
            if (!cvresume.main.is_empty($(e).attr("data-id"))) {
                skillItem["id"] = $(e).attr("data-id");
            }
            skillItem["masterLevel"] = $(e).find(".item_level").attr("data_level");
            skillItem["masterLevelDesc"] = $(e).find(".item_level span").text();
            skillArray.push(skillItem);
        });
        resume["resume_skill"] = skillArray;
        return resume;
    },
    get_resume_hobby: function (resume) {//兴趣爱好
        var $hobby = $("#resume_hobby");
        var $allmoduleItemList = $hobby.find(".moduleItemList");
        var hobbyArray = new Array();
        $allmoduleItemList.each(function (i, e) {
            var hobbyItem = {};
            hobbyItem["key"] = $(e).attr("id");
            if (!cvresume.main.is_empty($(e).attr("data-id"))) {
                hobbyItem["id"] = $(e).attr("data-id");
            }
            hobbyItem["name"] = $(e).find(".item_title").text();
            hobbyArray.push(hobbyItem);
        });
        resume["resume_hobby"] = hobbyArray;
        return resume;
    },
    get_resume_time_module: function (resume, id) {//时间模块数据抓取（教育背景、工作经历、实习经历、志愿者经历、项目经历）
        var $module = $(id);
        var key = $module.attr("id");
        var timeItemArray = new Array();
        var $allmoduleItemList = $module.find(".moduleItemList");
        $allmoduleItemList.each(function (i, e) {
            var timeItem = {};
            var id = $(e).attr("data-id");
            var beginTime = $(e).find("i.time-start").text();
            var endTime = $(e).find("i.time-end").text();
            var unit = $(e).find(".company").find("div[contenteditable]").html();
            var job = $(e).find(".post").find("div[contenteditable]").html();
            var content = $(e).find(".resume_content").html();
            if (!cvresume.main.timeModuleIsEmpty(beginTime) ||
                !cvresume.main.timeModuleIsEmpty(endTime) ||
                !cvresume.main.timeModuleIsEmpty(unit) ||
                !cvresume.main.timeModuleIsEmpty(job) ||
                !cvresume.main.timeModuleIsEmpty(content)) {
                if (!cvresume.main.is_empty(id)) {
                    timeItem["id"] = id;
                }
                timeItem["beginTime"] = beginTime;
                timeItem["endTime"] = endTime;
                timeItem["unit"] = unit;
                timeItem["job"] = job;
                timeItem["content"] = content;
                timeItemArray.push(timeItem);
            }
        });
        resume[key] = timeItemArray;
        return resume;
    },
    get_resume_summary: function (resume) {//自我评价模块
        var summary = $("#resume_summary").find(".moduleItemList").find("div.resume_content").html();
        if (!cvresume.main.is_empty(summary)) {
            resume["resume_summary"] = summary;
        }
        return resume;
    },
    get_resume_honor: function (resume) {//奖项荣誉
        var honor = $("#resume_honor").find(".moduleItemList").find("div.resume_content").html();
        if (!cvresume.main.is_empty(honor)) {
            resume["resume_honor"] = honor;
        }
        return resume;
    },
    get_resume_portfolio: function (resume) {//作品展示
        var $resume_portfolio = $("#resume_portfolio");
        var $allmoduleItemList = $resume_portfolio.find(".moduleItemList");
        var portfolio = {};
        var portfolio_imgArray = new Array();
        var portfolio_linkArray = new Array();
        $allmoduleItemList.each(function (index, ele) {
            var $ele = $(ele);
            var portfolioTemp = {};
            portfolioTemp["title"] = $ele.find(".work-title").html();
            portfolioTemp["desc"] = $ele.find(".work-text").html();
            if ($ele.find(".work-img").length > 0) {//图片
                portfolioTemp["img"] = $ele.find(".work-img").find("img").attr("src");
                portfolio_imgArray.push(portfolioTemp);
            } else {//地址使用title存放
                portfolio_linkArray.push(portfolioTemp);
            }
        });
        portfolio["img"] = portfolio_imgArray;
        portfolio["link"] = portfolio_linkArray;
        resume["resume_portfolio"] = portfolio;
        return resume;
    },
    get_resume_custom: function (resume) {//自定义模块
        var resume_customs = new Array();
        var $resume_customs = $(".customItem");
        $resume_customs.each(function (index, ele) {
            var $ele = $(ele);
            var custom = {};
            custom["key"] = $ele.attr("id");//key
            //var position=$ele.parent().attr("id");
            //custom["position"]=!cvresume.main.is_empty(position) && position == "bar" ? "right" : "left";//位置
            if ($ele.find(".hiddenTitle s").hasClass("checked")) {//标题是否隐藏
                custom["isTitleShow"] = false;
            } else {
                custom["isTitleShow"] = true;
            }
            if ($ele.find(".hiddenTime s").hasClass("checked")) {//时间模块是否隐藏
                custom["isTimeShow"] = false;
            } else {
                custom["isTimeShow"] = true;
            }
            if ($ele.find(".hiddenText s").hasClass("checked")) {//描述是否隐藏
                custom["isContentShow"] = false;
            } else {
                custom["isContentShow"] = true;
            }
            var $ele_title = $ele.find(".module_item_title");

            custom["title"] = $ele_title.html();
            if ($ele.hasClass("descItem")) {//描述模块
                custom["content"] = $ele.find(".resume_content").html();
            } else {//经验模块
                var timeItemArray = new Array();
                var $allmoduleItemList = $ele.find(".moduleItemList");
                $allmoduleItemList.each(function (i, e) {
                    var timeItem = {};
                    timeItem["beginTime"] = $(e).find("i.time-start").text();
                    timeItem["endTime"] = $(e).find("i.time-end").text();
                    timeItem["unit"] = $(e).find(".company").find("div[contenteditable]").html();
                    timeItem["job"] = $(e).find(".post").find("div[contenteditable]").html();
                    timeItem["content"] = $(e).find(".resume_content").html();
                    timeItemArray.push(timeItem);
                });
                custom["itemList"] = timeItemArray;
            }
            resume_customs.push(custom);
        });
        resume["custom"] = resume_customs;
        return resume;
    },
    get_resume_contact: function (resume) {//联系我
        var contact = {};
        var $resume_contact = $("#resume_contact");
        var contact_name = $resume_contact.find(".resume_contact_name").html();
        var contact_desc = $resume_contact.find(".resume_contact_desc").html();
        var contact_contact = $resume_contact.find(".resume_contact_mobile").html();
        var contact_content = $resume_contact.find(".resume_contact_content").html();
        if (!cvresume.main.is_empty(contact_name) ||
            !cvresume.main.is_empty(contact_desc) ||
            !cvresume.main.is_empty(contact_contact) ||
            !cvresume.main.is_empty(contact_content)) {
            contact["name"] = contact_name;
            contact["desc"] = contact_desc;
            contact["contact"] = contact_contact;
            contact["content"] = contact_content;
        }
        resume["resume_contact"] = contact;
        return resume;
    },
    get_resume_qrcode: function (resume) {//二维码
        var qrcode = {};
        var $qrcode = $("#resume_qrcode");
        //qrcode["qrCodeImg"]=$qrcode.find("img.qrImg").attr("src");
        qrcode["qrcodeTips"] = $qrcode.find(".resume_content").html();
        resume["resume_qrcode"] = qrcode;
        return resume;
    },
    get_resume_sort: function (resume) {//模块排序
        var sort = {};
        var _classStr = "#resume_base .jyCv-base";
        $(cvresume.info.sortPosition).each(function (index, item) {
            var arr = [];
            $($(_classStr + item + " .resume_sort")).each(function (index, ele) {
                arr.push($(ele).attr("id"));
            });
            sort[item.toLocaleLowerCase()] = arr;
        });
        resume["sort"] = sort;
        return resume;
    },
    get_resume_recoment: function () {//推荐信
        var $recoments = $("#resume_recoment");
        var recomentArray = new Array();
        var $recomentItem = $recoments.find(".moduleItemList");
        $recomentItem.each(function (index, ele) {
            var recoment = {};
            var $e = $(ele);
            recoment["id"] = $e.attr("data-id");
            recoment["name"] = $e.find(".name").find("div[contenteditable]").html();
            recoment["contactType"] = $e.find(".contact_type").html();
            recoment["mobile"] = $e.find(".contact_mobile").html();
            recoment["relative"] = $e.find(".relation").find("div[contenteditable]").html();
            recoment["time"] = $e.find(".time").find("div[contenteditable]").html();
            recoment["content"] = $e.find(".resume_content").html();
            recomentArray.push(recoment);
        });
        return recomentArray;
    },
    set_cvresume_info: function (itemid, resumeid, memberid) {//简历id,模板ID，会员id设置
        if (!cvresume.main.is_empty(itemid)) {
            cvresume.main.info.itemid = itemid;
        }
        if (!cvresume.main.is_empty(resumeid)) {
            cvresume.main.info.resumeid = resumeid;
        }
        if (!cvresume.main.is_empty(memberid)) {
            cvresume.main.info.memberid = memberid;
        }
    },
    resume_sort: function (sort) {//简历初始排序(sort:排序配置)
        if (sort) {
            var _classStr = "#resume_base .jyCv-base";
            $(cvresume.info.sortPosition).each(function (i, item) {//遍历方位
                var pos = sort[item.toLocaleLowerCase()];
                $(pos.reverse()).each(function (j, jtem) {//遍历各方位的id，reverse()素组翻转
                    $(_classStr + item).prepend($("#" + jtem));//在所在方位的div开头添加节点
                });
            });
        }
    },
    get_resume_history: function () {//获取简历历史记录
        $.get("/resume/history/list/", { "itemid": cvresume.info.itemid, "resumeId": cvresume.info.resumeid }, function (message) {
            if ($(message).filter("li").length > 0) {
                $("#historyModal .czls-null").hide();
            }
            message = message.replace(/\{0}/g, cvresume.info.resume_type);
            $("#historyModal ul").html(message);
        });
    },
    resume_save_history: function () {//保存简历历史记录
        if (!window.sessionStorage) {
            return;
        }
        var _history = window.sessionStorage.getItem("history");
        var _historyid;
        var _historyResumeid;
        if (!cvresume.main.is_empty(_history)) {
            _historyid = _history.split(",")[0];
            _historyResumeid = _history.split(",")[1];
            if (_historyResumeid == cvresume.info.resumeid) {
                return;
            } else {
                _historyid = '';
            }
        }
        var _resume = cvresume.main.get_resume();
        var _scale = _resume['resume_scale'];
        if (_scale > 20 && cvresume.history_save_trigger) {
            cvresume.history_save_trigger = false;
            $.ajax({
                type: "POST",
                url: "/resume/history/save/",
                data: {
                    "historyid": _historyid,
                    "resumeId": cvresume.info.resumeid,
                    "json": JSON.stringify(_resume)
                },
                success: function (message) {
                    var _type = message.type;
                    var _content = message.content;
                    if (_type == "success") {
                        window.sessionStorage.setItem("history", _content + "," + cvresume.info.resumeid);
                    }
                },
                complate: function () {
                    cvresume.history_save_trigger = true;
                }
            });
        }
    },
    resume_preview_history: function (id, type) {//简历历史记录预览
        window.open("/resume/history/preview/" + type + "/" + id + "/");
    },
    resume_preview_pageInit: function () {//简历预览页面初始化
        $("div[contenteditable]").attr("contenteditable", "false");//可编辑状态为false
        $(".baseItem-null").attr("style", "display:none;");//自定义框隐藏
        //求职意向图标去除
        $("#resume_job_preference .moduleItemList").each(function (id, item) {
            var _span = $(item).find("span").text();
            if (cvresume.main.is_empty(_span)) {
                $(this).attr("style", "display:none");
            }
        });
    },
    resume_release_pageInit: function () {//简历发布页面初始化
        $(document).off("blur", "div[contenteditable='true']");//去除失去焦点保存
        $("div[contenteditable='true']").off("blur");
        $("div[contenteditable]").attr("contenteditable", "false");//可编辑状态为false
        $(".baseItem-null").attr("style", "display:none;");//自定义框隐藏
        $("#resume_contact").find("div[contenteditable]:gt(0)").attr("contenteditable", "true");//联系我可编辑状态

        if ($(".jyCv-container").hasClass("mobile") || $(".jyCv-baseStyle").parents('.mobile').length > 0) {

        } else {
            var nowPageSize = 0; // 当前页数
            var resumePageHeight = 1160;// 每页高度
            var resumePageHtml = '<div class="page_tips"><span></span></div>';
            var resumeHeight = $(".jyCv-resume").css({ "height": "auto", "min-height": 1160 }).outerHeight();
            var pageSize = Math.ceil(resumeHeight / resumePageHeight);
            $(".jyCv-resume").css("height", resumePageHeight * pageSize);
            if (pageSize != nowPageSize) {
                nowPageSize = pageSize;
                $("div.page_tips").remove();
                for (var index = 1; index < pageSize; index++) {
                    var pageBreakObj = $(resumePageHtml);
                    pageBreakObj.css({ "top": (index * resumePageHeight) - 16 + "px" });
                    pageBreakObj.find('span').text('第' + index + '页');
                    $(".jyCv-resume").append(pageBreakObj);
                }
            }
        }
    },
    resume_visit_pwd: function (visitid, visitpwd) {//密码访问简历
        $.ajax({
            type: "post",
            cache: false,
            async: false,
            url: "/cvresume/" + visitid + "/pwd/",
            data: { "visitpwd": visitpwd },
            success: function (message) {
                if (message.type == "success") {
                    location.reload();
                } else {
                    layer.msg(message.content);
                }
            }
        });
    },
    contact_me: function (resumeid) {//联系我
        var name = $("#resume_contact").find('.resume_contact_name').text();
        var contact = $("#resume_contact").find('.resume_contact_mobile').text();
        var content = $("#resume_contact").find('.resume_contact_content').text();
        $.ajax({
            type: "POST",
            url: "/leaveWord/save/",
            data: {
                resumeId: resumeid,
                name: name,
                contact: contact,
                content: content
            },
            datetype: "Json",
            success: function (message) {
                if (message.type == "success") {
                    layer.msg(message.content);
                    $("#resume_contact").find('.resume_contact_name').text("");
                    $("#resume_contact").find('.resume_contact_mobile').text("");
                    $("#resume_contact").find('.resume_contact_content').text("");
                } else {
                    layer.msg(message.content);
                }
            }
        });
    },
    is_empty: function (str) {
        if (str == null || str == "" || str == undefined) {
            return true;
        } else {
            return false;
        }
    },
    is_empty_ext: function (str) {
        if (str === null || str === "" || str === undefined) {
            return true;
        } else {
            return false;
        }
    },
    isJsonFormat: function (str) {//json格式校验
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    },
    isResumeMgFormat: function (resumeMg) {//模块管理格式验证(resumeMg必须包含：isContenShow、isShow、isTimeShow、isTimeShow、key、title)
        if (cvresume.main.is_empty_ext(resumeMg)) {
            return false;
        }
        if (cvresume.main.is_empty_ext(resumeMg.isContentShow)) {//描述是否显示
            return false;
        }
        if (cvresume.main.is_empty_ext(resumeMg.isShow)) {//模块是否显示
            return false;
        }
        if (cvresume.main.is_empty_ext(resumeMg.isTimeShow)) {//时间模块是否显示
            return false;
        }
        if (cvresume.main.is_empty_ext(resumeMg.isTitleShow)) {//标题是否显示
            return false;
        }
        if (cvresume.main.is_empty_ext(resumeMg.key)) {//key
            return false;
        }
        if (resumeMg.title === undefined) {//标题
            return false;
        }
        return true;
    },
    strToJson: function (str) {
        return JSON.parse(str);
    },
    set_visitid: function (visitid) {
        $.post("/cvresume/set_visitid/", { "visitid": visitid, "resumeid": cvresume.info.resumeid }, function (message) {
            if (message.type == "success") {
                if (cvresume.main.is_empty(cvresume.info.resumeid) || cvresume.info.resumeid == 0) {
                    var resumeJson = cvresume.main.strToJson(message.content);
                    cvresume.info.resumeid = resumeJson.resumeid;
                    cvresume.info.memberid = resumeJson.memberid;
                }
                var _oldVisitid = cvresume.info.visitid;
                cvresume.info.visitid = visitid;
                if (location.href.indexOf("/cvresume/" + _oldVisitid + "/") != -1) {//发布页修改浏览器地址
                    history.pushState(null, "个性域名修改", jycnf.base + "/cvresume/" + cvresume.info.visitid + "/");
                }
                layer.msg("修改成功~");
            } else {
                layer.msg(message.content);
                setTimeout(function () {
                    $("#visitid").val(cvresume.info.visitid);
                }, 1500)
            }
        });
    },
    /**获取唯一标识*/
    uuid: function () {
        var uuid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            uuid += n;
            if (i == 8 || i == 12 || i == 16 || i == 20)
                uuid += "";
        }
        return uuid;
    },
    replaceAll: function (str, sou, tar) {
        return str.replace(new RegExp(sou, "gm"), tar);
    },
    //时间模块空值校验
    timeModuleIsEmpty: function (str) {
        if (cvresume.main.is_empty(str) || str == "开始时间" || str == "结束时间") {
            return true;
        } else {
            return false;
        }
    },
    gernateResumeWapQrCodeImage: function (resumeid) {//生成手机简历二维码
        var message = {};
        //1拼接二维码连接
        if (cvresume.main.is_empty(resumeid)) {
            message["type"] = "error";
            message["content"] = "resumeid不能为空";
            return message;
        }
        //判断二维码图片地址
        var $resume_qrcode = $("#resume_qrcode").find("img")
        var resume_qrcode_url = $resume_qrcode.attr("src");
        if (resume_qrcode_url.indexOf("ad_Attention_weixin_ewm.png") == -1) {
            message["type"] = "error";
            message["content"] = "已生成为二维码，不能重复生成";
            return message;
        }
        var host = location.hostname;
        var codeUrl = "http://" + host + "/cvresume/qrcode_redirect/" + resumeid + "/";
        //2生成隐藏的画布节点
        var $qrCodeImage = $("#gernateResumeWapQrCodeImage");
        if ($qrCodeImage.length <= 0) {
            $("body").append("<div style='display:none' id='gernateResumeWapQrCodeImage'></div>");
            $qrCodeImage = $("#gernateResumeWapQrCodeImage");
            $qrCodeImage.hide();
        }
        $qrCodeImage.qrcode({
            width: 173, //宽度 
            height: 173, //高度 
            text: codeUrl//任意内容 
        });
        //3获取图片base64编码
        var iamge_data = $qrCodeImage.children("canvas")[0].toDataURL("image/png");
        //4上传图片并返回连接
        $.post(jycnf.base + '/file/upload/cropper_image/', { "token": getCookie("token"), "cropper_image": iamge_data.toString() }, function (result) {
            if (result.type == 'error') {
                message["type"] = "error";
                message["content"] = result.content;
                return message;
            } else {
                //调用更新接口
                $.post(jycnf.base + '/cvresume/setResumeQrCodeImg/' + resumeid + '/', { "token": getCookie("token"), "qrcodeImg": result.content }, function (message) {
                    if (message.type == "success") {
                        $resume_qrcode.attr("src", result.content);
                        message["type"] = "success";
                        message["content"] = result.content;
                        return message;
                    } else {
                        message["type"] = "error";
                        message["content"] = message.content;
                        return message;
                    }
                });
            }
        });
    },
    _: function (lable) {
        try {
            if (window.localStorage && (cvresume.main.is_empty(localStorage.getItem("pcEditDataUpdated")) || localStorage.getItem("pcEditDataUpdated") != cvresume.info.resumeid)) {
                common.main._(lable);
                localStorage.setItem("pcEditDataUpdated", cvresume.info.resumeid);
            }
        } catch (e) {
            console.log("统计埋点错误~");
        }
    },
    preview_pdf: function () {
        var isChrome = navigator.userAgent.indexOf("Chrome");
        var isFirefox = navigator.userAgent.indexOf("Firefox");
        var is360 = window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length;
        var isqq = window.navigator.userAgent.indexOf('QQBrowser') > -1;
        var isSg = window.navigator.userAgent.toLowerCase().indexOf('se 2.x') > -1;
        var isSafari = window.navigator.userAgent.indexOf("Safari") > -1;
        var isIe = window.navigator.userAgent.indexOf('MSIE') > -1;
        function isShow() {
            $(".pdf_tips").addClass("show");
        }
        function isHide() {
            $(".pdf_tips").removeClass("show");
        }
        if (is360 || isSg) {
            isShow();
        } else {
            isHide();
        }
        $(".pdf_tips .close").click(function () {
            isHide();
        });
    },
}
$(function () {
    cvresume.main.init_();//初始化
});