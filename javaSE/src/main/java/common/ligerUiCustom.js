var ligerUiCustom = {
	top:null,
	gridManager:null,
	init : function() {

		$.ligerDefaults.Grid.editors['text-date'] = {
			create: function (container, editParam) {
				var width = editParam.column.width + "px";
				var input = $("<input type='text' style='width: " + width + "' class='l-text l-text-field' />");
				input.on('focus', function () {
					WdatePicker({
						dateFmt: editParam.column.editor.format,
						isShowOthers: false,
						errDealMode: 1,
						autoPickDate: true,
						onpicked: function (dp) {
							$(this).change();
							$("body").click();
						}
					});
				})
				input.bind("keydown", function (e) {
					// 兼容FF和IE和Opera
					var theEvent = e || window.event;
					var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
					if (code == 13) {
						//回车执行查询
						ligerUiCustom.gridManager.endEditToNext()
					}
				});
				container.append(input);
				return input;
			},
			getValue: function (input, editParam) {
				return input.val();
			},
			setValue: function (input, value, editParam) {
				input.val(value);
			},
			resize: function (input, width, height, editParm) {
				input.width(width).height(height);
				setTimeout(function () {
					input.trigger('focus')
				}, 100)
			},
			destroy: function (input, editParm){
				input.liger('destroy');
			}
		}

		$.ligerDefaults.Grid.editors['text-input'] = {
			create: function (container, editParam) {
				var width = editParam.column.width + "px";
				var input = $("<input type='text' style='width: " + width + "' class='l-text l-text-field'/>");
				container.append(input);
				return input;
			},
			getValue: function (input, editParam) {
				return input.val();
			},
			setValue: function (input, value, editParam) {
				input.trigger('focus');
				input.bind("keydown", function (e) {
					// 兼容FF和IE和Opera
					var theEvent = e || window.event;
					var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
					if (code == 13) {
						ligerUiCustom.gridManager.endEditToNext()
					}
				});
				input.val(value);
			},
			resize: function (input, width, height, editParm) {
				input.width(width).height(height);
				input.trigger('focus');
			}
		}

		$.ligerDefaults.Grid.editors['input-select'] = $.ligerDefaults.Grid.editors['combobox'] = {
			create: function (container, editParam) {
				var dicType = editParam.column.editor.dicType;
				var dicCode = editParam.column.editor.dicCode;
				var selectBoxHeight = editParam.column.editor.selectBoxHeight;
				var width = editParam.column.width + "px";
				var input = $("<input style='width: " + width + "' type='text'/>");
				container.append(input);
				input.ligerComboBox({
                    width:editParam.column.width,
					// data: editParam.column.editor.options,
					selectBoxHeight:selectBoxHeight,
					url:ctx+'/system/sysdic/dictype/dicList.do?type='+dicType+"&code="+dicCode,
					valueField: 'key',
					textField: 'value',
					autocomplete: editParam.column.editor.autocomplete,  //可输入
					onSelected:editParam.column.editor.onSelected, //初始化值(默认值)
					dataParmName:'data',
					emptyText: '',
                    cancelable:false, //没有那个叉叉
					isTextBoxMode: true,
					keySupport: true, //支持按键上下选择
					onTextBoxKeyEnter:function (call) {
                    	//不可编辑下拉框跳下一个可输入的文本框的支持下一个
                    	/*if(!editParam.column.editor.autocomplete){
							setTimeout(common.gridManager.endEditToNext(),1800);
						}*/
					}
				});
				return input;
			},
			getValue: function (input, value, editParam) {
				return $.trim(input.val());
			},
			setValue: function (input, value, editParam) {
				input.bind("keydown", function (e) {
					var theEvent = e || window.event;
					var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
					if (code == 13) {
						var dis = $(".l-box-select-absolute").css("display");
						if(dis =='none' && !editParam.column.editor.autocomplete){
							setTimeout(ligerUiCustom.gridManager.endEditToNext(),800);
						}
						//这里设置可输入下拉框在没有出现下拉框的情况下跳下一个输入框
						if(dis !='block' && editParam.column.editor.autocomplete){
							setTimeout(ligerUiCustom.gridManager.endEditToNext(),800);
						}
					}
				})
				if(!editParam.column.editor.autocomplete){
					input.liger('option', 'value', value);
				}else {
					input.val(value);
				}
			},
			resize: function (input, width, height, editParam) {

				input.liger('option', 'width', width);
				input.liger('option', 'height', height);
				setTimeout(function () {
					input.trigger('focus');
					// input.trigger('click')
					$(".l-trigger").trigger('click')
					$(".l-trigger").trigger('click')
				},100);
			},
			destroy: function (input, editParam) {
				input.liger('destroy');
			}
		};

		$.ligerDefaults.Grid.editors['select-multiple'] = $.ligerDefaults.Grid.editors['combobox'] = {
			create: function (container, editParam) {
				var dicType = editParam.column.editor.dicType;
				var dicCode = editParam.column.editor.dicCode;
				var selectBoxHeight = editParam.column.editor.selectBoxHeight;
				var width = editParam.column.width + "px";
				var input = $("<input style='width: " + width + "' type='text'/>");
				container.append(input);
				input.ligerComboBox({
                    width:editParam.column.width,
					selectBoxHeight:selectBoxHeight,
					url:ctx+'/system/sysdic/dictype/dicList.do?type='+dicType+"&code="+dicCode,
					valueField: 'key',
					textField: 'value',
					autocomplete: editParam.column.editor.autocomplete,  //可输入
					onSelected:editParam.column.editor.onSelected, //初始化值(默认值)
					isShowCheckBox:true,
					isMultiSelect:true,
					dataParmName:'data',
					emptyText: '',
                    cancelable:false, //没有那个叉叉
					isTextBoxMode: true,
					keySupport: true, //支持按键上下选择
					onTextBoxKeyEnter:function (call) {
                    	//不可编辑下拉框跳下一个可输入的文本框的支持下一个
                    	/*if(!editParam.column.editor.autocomplete){
							setTimeout(common.gridManager.endEditToNext(),1800);
						}*/
					}
				});
				return input;
			},
			getValue: function (input, value, editParam) {
				return $.trim(input.val());
			},
			setValue: function (input, value, editParam) {
				input.bind("keydown", function (e) {
					var theEvent = e || window.event;
					var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
					if (code == 13) {
						var dis = $(".l-box-select-absolute").css("display");
						//这里设置可输入下拉框在没有出现下拉框的情况下跳下一个输入框
						if(dis !='block' && editParam.column.editor.autocomplete){
							setTimeout(ligerUiCustom.gridManager.endEditToNext(),800);
						}
					}
				})
				if(!editParam.column.editor.autocomplete){
					input.liger('option', 'value', value);
				}else {
					input.val(value);
				}
			},
			resize: function (input, width, height, editParam) {

				input.liger('option', 'width', width);
				input.liger('option', 'height', height);
				setTimeout(function () {
					input.trigger('focus')
				},100);
				setTimeout(function () {
					input.trigger('click')
				},100);

			},
			destroy: function (input, editParam) {
				input.liger('destroy');
			}
		};

		$.ligerDefaults.Grid.editors['text-textarea'] = {
			create: function (container, editParam) {
				var width = editParam.column.width + "px";
				var input = $("<textarea type='text' style='width: " + width + "' class='l-text l-text-field'/>");
				container.append(input);
				return input;
			},
			getValue: function (input, editParam) {
				return input.val();
			},
			setValue: function (input, value, editParam) {
				input.trigger('focus');
				input.bind("keydown", function (e) {
					// 兼容FF和IE和Opera
					var theEvent = e || window.event;
					var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
					if (code == 13) {
						ligerUiCustom.gridManager.endEditToNext()
					}
				});
				input.val(value);
			},
			resize: function (input, width, height, editParm) {
				input.width(width).height(height+30);
				input.trigger('focus');
			}
		}
		//顶部框架
		ligerUiCustom.top = ligerUiCustom.getTop();
		// 退出登录
		$('._logout').on('click', ligerUiCustom.logout);
		//退出系统
		$('._close').on('click', ligerUiCustom.closeWindow);
		//修改密码
		$('._setpass').on('click', ligerUiCustom.setPass);
		// 设置主色调
		ligerUiCustom.setMainColor();
		//可以输入下拉
		$('select.input-select').inputSelect();
		// 设置回车事件自动下一个文本框
		ligerUiCustom.addJumpNextEvent();
		// 日期时间
		$('input.b-date,input.b-time').each(function(i,v){
			var format = $(this).attr('format');

			$(this).on('focus',function(){
					WdatePicker({dateFmt:format,isShowOthers:false,errDealMode:1,autoPickDate:true,onpicked:function(dp){
							$(this).change();
						}});

			}).on('keyup',function(){
				$(this).change();
			});

		});
		ligerUiCustom.bindFileEvent();
		// 调整大小
		ligerUiCustom.resizeWindow();
		$(window).resize(function() {
			ligerUiCustom.resizeWindow();
			ligerUiCustom.autoCompute();
		});
		// 关闭layer
		$('[action="close"]').on('click', function(event) {
			var index = ligerUiCustom.top.layer.getFrameIndex(window.name);
			ligerUiCustom.top.layer.close(index);
		});
		// 绑定checkbox事件
		ligerUiCustom.checkboxEvent();
		// 全选和反选
		ligerUiCustom.checkAll();
		//国籍
		$("select.countrys").each(function(){
			var arr = constant.countrys;
			var oldValue = $(this).attr("oldValue");
			for(var i in arr){
				var option = $("<option value='"+arr[i]+"'>"+arr[i]+"</option>");
				if(arr[i] == oldValue){
					option.prop("selected",true);
				}
				$(this).append(option);
			}
		});

		//民族
		$("select.nations").each(function(){
			var arr = constant.nations;
			var oldValue = $(this).attr("oldValue");
			for(var i in arr){
				var option = $("<option value='"+arr[i]+"'>"+arr[i]+"</option>");
				if(arr[i] == oldValue){
					option.prop("selected",true);
				}
				$(this).append(option);
			}
		});

		$("[oldValue]").each(function(){
			var defaultVal = $(this).attr("defaultValue")||'';
			var oldVlaue = $(this).attr("oldValue")||defaultVal;
			$(this).val(oldVlaue);
		});
		//增加定时器计算高度
		ligerUiCustom.autoCompute();
		//滚动条
		$('.left-menu-bottom').each(function(){
			var topHeight = $(this).attr('top')||0;
			var menuWidth = $(this).attr('width')||'200px';
			var marginLeft = $(this).attr('mLeft')||'210px';
			var height = $(ligerUiCustom.top.window).height() - topHeight * 1 - 75;
			$(this).css('top',topHeight + 'px');
			$('.left-menu-bottom').slimScroll({
		        width:menuWidth, //可滚动区域宽度
		        height:height + 'px', //可滚动区域高度
		        size: '10px', //滚动条宽度，即组件宽度
		        color: '#000', //滚动条颜色
		        position: 'right' //组件位置：left/right
		    });
			//设置右边
			if($('.body-margin-left').length>0){
				$('.body-margin-left').css('margin-left',marginLeft);
			}
		});
		//增加图标事件绑定
		$('input[type="text"].icon-input').on('focus',ligerUiCustom.showIconBox);
		$('input[type="text"].icon-input').on('blur',ligerUiCustom.hideIconBox);
		//选中行
		ligerUiCustom.changeSelectTr();
		//多选
		$('select.multiple-select').multipleSelect();
		//打开模板字典页面加载JS。
		ligerUiCustom.addDicEvent();
		ligerUiCustom.addDianXuanEvent();
		//打开复选框模板字典页面加载JS
		ligerUiCustom.addDicCheckEvent();
		//表格行选择事件
		ligerUiCustom.bindTrSelectEvent(false);
		//行点选事件
		ligerUiCustom.addTrCheckEvent(false);
		//复查界面按钮打开弹出层页面内左边选中变色事件
		ligerUiCustom.addCheckItemSelectedEvent();
		//增加双击事件
		ligerUiCustom.bindTableTrDbEvent();
        //打开模板字典页面(多选)
		ligerUiCustom.addDicMulitCheckBoxEvent();
		//增加门诊处理指导模板选择
		ligerUiCustom.addClinicGuideEvent();
	},
	addTrCheckEvent: function(isOff){
		if(isOff){
			$('table:not(.no-bind-table) tr:gt(0)').off('click');
		}
		$('table:not(.no-bind-table) tr:gt(0)').on('click',function(){
			var checkbox = $(this).find('td:eq(0) input[type="checkbox"]');
			var checked  = $(checkbox).is(':checked');
			$(checkbox).parents('table').find('tr:gt(0)').find('td:eq(0) input[type="checkbox"]').each(function(i,v){
				if(!$(this).is(checkbox)){
					$(this).prop('checked',false);
				}
			});
			$(checkbox).prop('checked',!checked);
		});
	},
	bindTableTrDbEvent : function(){
		$('table.dbclick-table[dbCallEvent] tr:gt(0)').off('dblclick').on('dblclick',function(e){
			var targetTable = $(this).parents('table');
			$(targetTable).find('tr').removeClass('selected');
			$(this).addClass('selected');
			$(this).parents('table').find('tr:gt(0)').find('td:eq(0) input[type="checkbox"]').each(function(i,v){
				$(this).prop('checked',false);
			});
			$(this).find('td:eq(0) input[type="checkbox"]').prop('checked',true);
			//处理数据
			var data = $(this).attr('data')||'';
			var dbCallEvent = $(targetTable).attr('dbCallEvent');
			if(dbCallEvent){
				try{
					var callbackFun = eval(dbCallEvent);
					if(callbackFun){
					   new callbackFun(e,data);
					}
				} catch(e){
				}
			}
		});
	},
	bindTrSelectEvent:function(isOff){
		$("table.table-edit").each(function(){
			var editTable = $(this);
			if(isOff){
				$("tbody > tr",editTable).off("click");
			}
			$("tbody > tr",editTable).on("click",function(){
				if($(this).hasClass("selected")){
					$(this).removeClass("selected");
				} else{
					$(".selected",editTable).removeClass("selected");
					$(this).addClass("selected");
				}
			});
		});
	},
	CONSTANTS:{
		DEFAULT_SPLIT :'〓'
	},
	iconInput:null,
	setIconInputVal : function(){
		if(ligerUiCustom.iconInput){
			$(ligerUiCustom.iconInput).val($(this).attr('class'));
		}
	},
	showIconBox : function(){
	   var target = $(this);
	   ligerUiCustom.iconInput =  $(this);
	   $('.icon-box .ico-list >i').off('click').on('click',ligerUiCustom.setIconInputVal);
	   $('.icon-box').css({width:$(this).css('width'),'background-color':'#FFFFFF',left:$(target).offset().left,top:$(target).offset().top});
	   $('.icon-box').show(500);
	},
	hideIconBox : function(){
		setTimeout(function(){
			$('.icon-box').hide(0);
		}, 200);
	},
	autoCompute : function(){
		//顶部高度
		if(ligerUiCustom.top.window.$('iframe[name="bodyFrame"]').length > 0){
			var headerHeight = ligerUiCustom.top.window.$('body>div.header').length>0?ligerUiCustom.top.window.$('body>div.header').outerHeight(true)*1:0;
			var height = $(ligerUiCustom.top).height()*1 - headerHeight;
			if(ligerUiCustom.top.window.$('ul.layui-tab-title').length>0){
				height = height - ligerUiCustom.top.window.$('ul.layui-tab-title').outerHeight(true)*1;
			}
			ligerUiCustom.top.window.$('iframe[name="bodyFrame"]').height(height);
		}
		//内容部分
		if($('iframe[name="contentFrame"]').length > 0){
			var height = $(window).height()*1 - ($('div.sub2-top-header').length>0?$('div.sub2-top-header').outerHeight(true)*1:0) - 5;
			$('iframe[name="contentFrame"]').height(height);
		}
		//系统管理部分
		if($('iframe[name="sysFrame"]').length > 0){
			var height = $(window).height()*1 - 30;
			$('iframe[name="sysFrame"]').height(height);
		}
		// 计算全屏高度
		$('.full-height').each(function(i, v) {
			var fHeight = $(ligerUiCustom.top).height() - ($(this).attr('plus') ? $(this).attr('plus') * 1: 0);
			$(this).height(fHeight);
		});
	},
	bindFileEvent : function(){
		//文件选择回写名字
		$('input[type="file"][target]').off('change').on('change',function(){
			var filePath = $(this).val();
			var allowExt = $(this).attr('fileExt');
			if(ligerUiCustom.checkFileExt(filePath,allowExt)){
				$($(this).attr('target')).html(ligerUiCustom.getFileName(filePath));
			} else {
				ligerUiCustom.errAlert('只能上传' + allowExt + '格式文件');
				$($(this).attr('target')).html('');
				$(this).after($(this).clone().val(''));
				$(this).remove();
				ligerUiCustom.bindFileEvent();
			}
		});
	},
	checkboxEvent : function(target) {
		target = target || 'body';
		$(':checkbox', $(target)).on('click',function() {
			var checked = this.checked;
			var name = this.name;
			var inputs = null;
			// 单选功能
			if ($(this).hasClass('check-single')) {
				var groupName = $(this).attr('groupName');
				if(groupName){
					inputs = $(':checked[name=\"' + name + '\"][groupName=\"' + groupName + '\"]',$(target));
				} else {
					inputs = $(':checked[name=\"' + name + '\"]',$(target));
				}
				inputs.prop('checked', false);
				$(this).prop('checked', checked);
			} else {
				// 复选框框，带互斥功能
				var mutex = $(this).attr('mutex');
				if (mutex) {
					// 取消
					inputs = $(':checked[name=\"' + name + '\"]',$(target));
					inputs.prop('checked', false);
					$(this).prop('checked', checked);
				} else {
					$(':checked[name=\"' + name + '\"][mutex]').prop('checked', false);
				}
			}
			if (inputs && inputs.length > 0) {
				inputs.each(function() {
					ligerUiCustom.checkboxTargetCls(this, target);
				});
			}
			ligerUiCustom.checkboxTargetCls(this, target);
		});
	},
	checkboxTargetCls : function(el, target) {
		var targetCls = $(el).attr("target-class");
		if (targetCls) {
			if (el.checked) {
				// 选中
				$(":input." + targetCls, $(target)).prop("disabled", false);
			} else {
				// 取消
				$(":input[type!=checkbox][type!=radio]", $("." + targetCls)).val("");
				$(":checked", $("." + targetCls)).prop("checked", false);
				$(":input", $("." + targetCls)).prop("disabled", true);
				$(":input." + targetCls + "[type!=checkbox][type!=radio]",$(target)).val("");
				$(":checked." + targetCls, $(target)).prop("checked", false);
				$(":input." + targetCls, $(target)).prop("disabled", true);
			}
		}
	},
	checkAll : function() {
		$(":checkbox[name=checkAll]").on("click", function() {
			var val = $(this).val();
			// 全选
			$(":checkbox[name=" + val + "]").prop("checked", this.checked);
		});
		// 反选
		$(":checkbox[name=checkAll]").each(function() {
			var val = $(this).val();
			$(":checkbox[name=" + val + "]").on('click',function() {
				var checkboxLen = $(":checkbox[name=" + val + "]").length;
				var checkedLen = $(":checkbox[name=" + val + "]:checked").length;
				if (checkboxLen == checkedLen) {
					$(":checkbox[name=checkAll][value="+ val + "]").prop("checked", true);
				} else {
					$(":checkbox[name=checkAll][value=" + val + "]").prop("checked", false);
				}
			});
		});
	},
	resizeWindow : function() {
		// 计算全屏高度
		$('.full-height').each(function(i, v) {
			var fHeight = $(window).height() - ($(this).attr('plus') ? $(this).attr('plus') * 1: 0);
			$(this).height(fHeight);
		});
	},
	addJumpNextEvent : function() {
		var jumpInputs = $('form input[type="text"]:not(:disabled):visible,form input[type="checkbox"]:not(:disabled):visible,form select:visible');
		var inputs = $('form input[type="text"]:not(:disabled):visible,form input[type="checkbox"]:not(:disabled):visible,form select:visible,form textarea');
		var inputLen = inputs.length;
		jumpInputs.on('keydown',function(event){
			var enter = $(this).attr('noEnter');
			if(enter !="true"){
			   var keycode = (window.Event) ? event.which : event.keyCode;
			   if (keycode == 13){
				   if($(this).attr('enterEvent')){
					   var enterEvent = $(this).attr('enterEvent');
					   if(enterEvent != null){
						   try{
								var enterFunction = eval(enterEvent);
								if(enterFunction){
								   new enterFunction(event);
								}
							} catch(e){
							}
					   }
				   }
				   event.preventDefault();
				   var nextIndex = inputs.index(this) + 1;
				   if($(this).is('input[type="checkbox"]')){
					   $(this).parent().removeClass('focus');
				   }
				   if($(this).hasClass("input-select-input") && $(inputs[nextIndex]).hasClass("input-select-input")){
					   $(this).prev().children(".option-hover").click();
				   }
				   if(nextIndex < inputLen){
					   $(inputs[nextIndex]).focus();// 设置焦点
					   $(inputs[nextIndex]).select();// 选中文字
					   if($(inputs[nextIndex]).is('input[type="checkbox"]')){
						   $(inputs[nextIndex]).parent().addClass('focus');
					   }
				   } else {
					   $(inputs[nextIndex - 1]).blur();
				   }
			   }
			}
		});
	},
	setMainColor : function() {
		if (ligerUiCustom.top == window.self) {
			var rgb = $('body').css('background-color');
			rgb = (rgb.replace('rgb', '').replace('(', '').replace(')', '').split(','));
			native.getNativeJsObject().setMainBGColor(rgb[0] * 1, rgb[1] * 1,rgb[2] * 1);
		}
	},
	logout : function() {
		// 执行退出操作
		window.location.href = ctx + '/system/login.html';
	},
	loadHtml : function(url, data, responseFun, async, showLoading, errFun,contentType){
		if (showLoading == undefined || showLoading == null || showLoading == true) {
			ligerUiCustom.showLoading();
		}
		if (async == undefined || async == null) {
			async = true;
		}
		if (contentType == undefined || contentType == null || contentType.indexOf('application/json') == 0) {
			contentType = 'application/json;charset=utf-8';
			data = JSON.stringify(data);
		}
		url = ctx + url;
		$.ajax({
			type : 'POST',
			url : url,
			async : async,
			contentType : contentType,
			data : data,
			timeout : 600000, // 超时时间设置，单位毫秒
			dataType : 'html',
			success : function(respHtml) {
				ligerUiCustom.hideLoading();
				if (responseFun != undefined && typeof (responseFun) == 'function') {
					responseFun(respHtml);
				}
			},
			error : function(e) {
				ligerUiCustom.hideLoading();
				if (errFun != undefined && errFun != null && typeof (errFun) === 'function') {
					errFun(e);
				}
			}
		});
	},
	ajaxForm : function(url, data, responseFun, async, showLoading, errFun) {
		ligerUiCustom.ajaxJson(url, data, responseFun, async, showLoading, errFun,'application/x-www-form-urlencoded');
	},
	ajaxJson : function(url, data, responseFun, async, showLoading, errFun,contentType) {
		if (showLoading == undefined || showLoading == null || showLoading == true) {
			ligerUiCustom.showLoading();
		}
		if (async == undefined || async == null) {
			async = true;
		}
		if (contentType == undefined || contentType == null || contentType.indexOf('application/json') == 0) {
			contentType = 'application/json;charset=utf-8';
			data = JSON.stringify(data);
		}
		url = ctx + url;
		$.ajax({
			type : 'POST',
			url : url,
			async : async,
			contentType : contentType,
			data : data,
			timeout : 600000, // 超时时间设置，单位毫秒
			dataType : 'json',
			success : function(resp) {
				ligerUiCustom.hideLoading();
				if (!resp.success && resp.code == -1) {//回话超时
					ligerUiCustom.errAlert(resp.msg,function(){
						ligerUiCustom.logout();
					});
					return;
				}
				if (responseFun != undefined && typeof (responseFun) == 'function') {
					if (!resp.success) {
						ligerUiCustom.errAlert(resp.msg);
					} else {
						responseFun(resp);
					}
				}
			},
			error : function(e) {
				ligerUiCustom.hideLoading();
				if (errFun != undefined && errFun != null && typeof (errFun) === 'function') {
					errFun(e);
				}
			}
		});
	},
	ajaxSubmit : function(jqForm,url, responseFun, showLoading, errFun){
		  var options = {
			type : 'POST',
			url : ctx + url,
			data : {},
			dataType : 'json',
			success : function(resp) {
				ligerUiCustom.hideLoading();
				if (!resp.success && resp.code == -1) {//回话超时
					ligerUiCustom.errAlert(resp.msg,function(){
						ligerUiCustom.logout();
					});
					return;
				}
				if (responseFun != undefined && typeof (responseFun) == 'function') {
					if (!resp.success) {
						ligerUiCustom.errAlert(resp.msg);
					} else {
						responseFun(resp);
					}
				}
			},
			error : function(e) {
				ligerUiCustom.hideLoading();
				if (errFun != undefined && errFun != null && typeof (errFun) === 'function') {
					errFun(e);
				}
			}
		};
		$(jqForm).ajaxSubmit(options);
	},
	loadingIndex : -1,
	showLoading : function() {
		ligerUiCustom.loadingIndex = ligerUiCustom.top.layer.load(0, {
			shade : false
		});// 0代表加载的风格，支持0-2
	},
	hideLoading : function() {
		ligerUiCustom.top.layer.close(this.loadingIndex);
	},
	timeOut : function(e) {
		if (e && e.responseText == 'timeout') {
			ligerUiCustom.showMsg("系统登录超时，请重新登录", function() {
				ligerUiCustom.top.location.href = ctx;
			});
			return true;
		}
		return false;
	},
	confirm : function(msg, sureFun, cacelFun) {
		var layerIndex = ligerUiCustom.top.layer.confirm(msg, {
			icon : 3,
			title : '系统提示',
			btn : [ '确定', '取消' ]
		}, function() {
			ligerUiCustom.top.layer.close(layerIndex);
			if (sureFun) {
				sureFun();
			}
		}, function() {
			if (cacelFun) {
				cacelFun();
			}
		});
	},
	succAlert : function(msg, callbackFun) {
		ligerUiCustom.top.layer.alert(msg, {icon: 1,skin:'layer-ext-moon',title:'系统提示',zIndex:99999999},function(index){
			ligerUiCustom.top.layer.close(index);
			if (callbackFun && typeof callbackFun == 'function') {
				callbackFun();
			}
		});
		var button = ligerUiCustom.top.$('div.layui-layer-dialog:eq(0) .layui-layer-btn:eq(0) a:eq(0)');
		$(button).attr('href','javascript:void(0);');
		$(button).focus();
	},
	errAlert : function(msg,callbackFun) {
		ligerUiCustom.top.layer.alert(msg, {icon: 2,skin:'layer-ext-moon',title:'系统提示',zIndex:99999999},function(index){
			if (callbackFun && typeof callbackFun == 'function') {
				callbackFun();
			}
			if(ligerUiCustom.top && ligerUiCustom.top.layer){
				ligerUiCustom.top.layer.close(index);
			}
		});
		var button = ligerUiCustom.top.$('div.layui-layer-dialog:eq(0) .layui-layer-btn:eq(0) a:eq(0)');
		$(button).attr('href','javascript:void(0);');
		$(button).focus();
	},
	infoAlert : function(msg) {
		ligerUiCustom.top.layer.msg(msg);
		var button = ligerUiCustom.top.$('div.layui-layer-dialog:eq(0) .layui-layer-btn:eq(0) a:eq(0)');
		$(button).attr('href','javascript:void(0);');
		$(button).focus();
	},
	showTips : function(el, tips) {
		$(el).focus();
		var top = $(el).offset().top;
		var scrollTop = $(el).offset().top;
		if(scrollTop - ($(window).height() * 0.3) > 0){
			scrollTop = scrollTop - $(window).height() * 0.3;
		} else {
            scrollTop = scrollTop - 35
        }
		$(document).scrollTop(scrollTop);
		layer.tips(tips, el, {
			tips : 3,
			time : 3000,
			fixed : true
		});
	},
	getMultipleLineData : function(jqTable){
		var data = [];
		$(jqTable).find('tbody tr').each(function(i,v){
			var item = {};
			$(this).find('input[type="text"],input[type="hidden"],select').each(function(ii,vv){
				item[$(this).attr('name')] = $(this).val();
			});
			data.push(item);
		});
		return data;
	},
	getFormArrayData : function(jqSelecter){
		var data = [];
		$(jqSelecter).each(function(i,v){
			var item = {};
			$(this).find('input[type="text"],input[type="hidden"],select').each(function(ii,vv){
				item[$(this).attr('name')] = $(this).val();
			});
			var checkboxAry = null;
			$(this).find('input[type="checkbox"]:checked').each(function(ii,vv){
				if(!checkboxAry){
					checkboxAry = {};
				}
				var key = $(this).attr('name');
				if(checkboxAry[key]){
					checkboxAry[key].push($(this).val());
				} else {
					checkboxAry[key] = [];
					checkboxAry[key].push($(this).val());
				}
			});
			//统一处理
			if(checkboxAry){
				for(var key in checkboxAry){
					item[key] = checkboxAry[key].join("〓");
				}
			}
			data.push(item);
		});
		return data;
	},
	getFormJsonData : function(fs) {
		var o = {};
		var a = $(fs).serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});

		$.each(o, function(key, value) {
			if (value.push) {
				o[key] = value.join("〓")
			}
		});

		$(".area-list").each(function(){
			$("select",$(this)).each(function(i,v){
				if($(this).val() == '-1'){
					o[this.name] = "";
					var rname = $("#"+$(this).attr("relateId")).attr("name");
					o[rname] = "";
				}
			});
		});

		var groupMap = {};
		$(":input[groupName]").each(function(){
			var groupName = $(this).attr("groupName");
			if(groupMap[groupName]){
				return;
			}
			var groupSort = [];
			var groupData = {};
			$(":input[groupName="+groupName+"]").each(function(){
				var val = $(this).val() || '';
				var split = $(this).attr("split") || '';
				var sort = $(this).attr("sort");
				groupSort.push(sort);
				groupData[sort] = val+split;
				if($(this).attr("name")){
					delete o[$(this).attr("name")];
				}
			});
			groupSort.sort();

			var dataList = [];
			for(var i = 0;i<groupSort.length;i++){
				var sort = groupSort[i];
				dataList.push(groupData[sort]);
			}
			o[groupName] = dataList.join("");
			groupMap[groupName] = true;
		});

		return o;
	},
	setFormCheckSplit:'〓',
	setForm : function(el, jsonValue) {
		el = el || 'form';
		$.each(jsonValue, function(name, value) {
			value = value || '';
			if(typeof(value) == 'string' && value.indexOf(ligerUiCustom.setFormCheckSplit) != -1){
				var vals = value.split(ligerUiCustom.setFormCheckSplit);
				for ( var i in vals) {
					var v = vals[i];
					if (!v) {
						return;
					}
					$("input[name='" + name + "'][value='" + v + "']",$(el)).click();
				}
			}else{
				$(":input[type!='radio'][type!=checkbox][name='" + name + "']",$(el)).val(value);
				$(":input[type='checkbox'][name='" + name + "'][value='"+value+"']",$(el)).click();
				$(":input[type='radio'][name='" + name + "'][value='"+value+"']",$(el)).click();
				$("select[oldValue][name='" + name + "']",$(el)).attr("oldValue",value);
			}
		});
	},
	resetForm : function() {
		$(":input[type!=radio][type!=checkbox][name]").val("");
		$(":checked").click();
		// 设置默认选中的值
		$(":input[default]").each(function() {
			if ($(this).is(":checkbox") || $(this).is(":radio")) {
				$(this).click();
			} else {
				var defaultVal = $(this).attr("default");
				$(this).val(defaultVal);
			}
		});
	},
	ajaxDownload : function(param) {
		var iframe = $('#downloadFrame');
		if (iframe.length == 0) {
			iframe = $('<iframe id="downloadFrame" style="display:none;"></iframe>').appendTo('body');
		}
		var url = ctx + "/common/attachment/ajaxDownload.do";
		if (param && param.url) {
			url = param.url;
			delete param.url;
		}
		if ($.type(param) !== 'string') {
			param = $.param(param);
		}
		url = (url + "?" + param);
		// 下载模板
		iframe[0].src = url;
	},
	ajaxDownloadCsv:function(param){
		param.isCsv = "true";
		ligerUiCustom.ajaxDownload(param);
	},
	getCheckboxVal : function(chkName) {
		var resultAry = ligerUiCustom.getCheckboxValues(chkName);
		if(resultAry){
			return resultAry[0];
		}
		return null;
	},
	getCheckboxValues : function(chkName) {
		var resultAry = null;
		var checkboxs = $("input[type=checkbox][name=" + chkName + "]:checked");
		if (checkboxs.length > 0) {
			resultAry = [];
			$.each(checkboxs, function() {
				resultAry.push($(this).val())
			});
		}
		return resultAry;
	},
	print:function(param){
		var url = "/system/custom/reportPrint.do";
		ligerUiCustom.ajaxJson("/system/custom/reportPrint.do", param, function(resp){
			native.getNativeJsObject().printRdlc(url,param,false,JSON.stringify(resp.data),function(){
			});
		});
	},
	printView:function(param){
		var url = "/system/custom/reportPrint.do";
		ligerUiCustom.ajaxJson("/system/custom/reportPrint.do", param, function(resp){
			native.getNativeJsObject().printRdlc(url,param,true,JSON.stringify(resp.data),function(){
			});
		});
	},
	customEvent : function(param){
		var row = param.row;
		var condtions = [];
		if(param.param){
			var condtion = JSON.parse(param.param);
			delete condtion.id;
			for(var k in condtion){
				var val = condtion[k] ||'';
				condtions.push(val);
			}
		}
	    var data = {};
	    data.row = row;
	    data.condtion = condtions;
		var dbCallEvent = param.dbCallEvent;
		if(dbCallEvent){
			try{
				var callbackFun = eval(dbCallEvent);
				if(callbackFun){
				   new callbackFun(data);
				}
			} catch(e){
			}
		}

	},
	 //打开模板窗口
    showTemplate : function(width,height,dicCode,checkedCodes,callback,isMulti){
		//checkedStr为被选中的内容的字符串，callback会返回一个dataList集合，dataList[0]是被选中的内容的字符串以','分割
        //dataList[1]是被选中的编码字符串，以','分割
		ligerUiCustom.layerCallbackOpen('选择',width,height,"/common/template.html?dicCode="+dicCode+"&checkedCodes="+checkedCodes+"&isMulti="+isMulti,false,callback);
	},
	calcLastMenstrual:function(data,weeks,days){
		data = ligerUiCustom.convertToDate(data);
		weeks = weeks || 0;
		days = days || 0;
		var time = data.getTime() - ((weeks * 7 + days * 1) * 1000 * 60 * 60 * 24);
		return endDate = ligerUiCustom.formateDate(time) || '';
	},
	calcWeeks : function(beginDate, endDate) {
		beginDate = ligerUiCustom.convertToDate(beginDate);
		endDate = ligerUiCustom.convertToDate(endDate);
		// 计算孕周
		var weeks = [];
		if (beginDate==null || endDate==null || beginDate.getTime() >= endDate.getTime()) {
			weeks[0] = "";
			weeks[1] = "";
			return weeks;
		}
		var totalDays = (Math.abs((endDate - beginDate)) / (1000 * 60 * 60 * 24));
		var week = Math.floor(totalDays / 7);
		var day = Math.floor(totalDays % 7);
		if(week <= 0 && day <= 0){
			return null;
		}

		week = week * 1 > 42 ? 42 : week;
		day = day * 1 <= 0 ? '0' : day;
		weeks[0] = week;
		weeks[1] = day;
		return weeks;
	},
	calcWeeksHtml:function(beginDate, endDate){
		var html = "";
		var weeks = ligerUiCustom.calcWeeks(beginDate, endDate);
		if(weeks){
			html += weeks[0];
			if(weeks[1] * 1 > 0){
				html + "<sup>+"+weeks[1]+"</sup>"
			}
		}
		return html;
	},
	calcYuchanqiDate : function(date) {
		// 计算预产期
		if (date) {
			/*var times = date.getTime();
			times += (280 * 24 * 3600 * 1000);
			date.setTime(times);
			return common.formateDate(date);*/
            var yuchanqi = new Date((date).replace(/-/g, "/"));
            yuchanqi.setMonth(yuchanqi.getMonth()+9);
            yuchanqi.setDate(yuchanqi.getDate()+7);
            //date.setTime(times);
            return ligerUiCustom.formateDate(yuchanqi);
		}
	},

	isDate:function(date){
        //判断时间是否大于当前时间
		if (date) {
            var times = new Date((date).replace(/-/g, "/")).getTime();
            var newtime = new Date().getTime();
            if (times>newtime) {
            	return false;
			}

		}

	},


	getBirthFromIdCard : function(code) {
		if (!code) {
			return false;
		}
		var isPass = validate.checkIdCardCode(code);
		if(!isPass){
			return false;
		}

		var birth = code.substring(6,14);
		var year = birth.substring(0,4);
		var month = birth.substring(4,6);
		var day = birth.substring(6,8);
		return year +"-"+ month+"-"+day;
	},
	calcAge : function(birthDate) {
		if (!birthDate) {
			return null;
		}

		birthDate = ligerUiCustom.convertToDate(birthDate);
		var birthYear = birthDate.getFullYear();
		var birthMonth = birthDate.getMonth() + 1;
		var birthDay = birthDate.getDate();

		var curdate = new Date();
		var nowYear = curdate.getFullYear();
		var nowMonth = curdate.getMonth() + 1;
		var nowDay = curdate.getDate();

		var age = 0;
		age = nowYear - birthYear;
		if (birthMonth > nowMonth) {
			age--;
		}

		if (birthMonth == nowMonth && birthMonth > nowDay) {
			age--;
		}

		if (age < 0) {
			age = null;
		}
		return age;
	},
	formateDate : function(value, dateformat) {
		if (!value) {
			return null;
		}
		function getFormatDate(date, dateformat) {
			var format = dateformat;
			var o = {
				"M+" : date.getMonth() + 1,
				"d+" : date.getDate(),
				"h+" : date.getHours(),
				"m+" : date.getMinutes(),
				"s+" : date.getSeconds(),
				"q+" : Math.floor((date.getMonth() + 3) / 3),
				"S" : date.getMilliseconds()
			}
			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for ( var k in o) {
				if (new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return format;
		}
		if (typeof (value) == "number") {
			value = new Date(value);
		}
		if (typeof (value) == "string" && /^\/Date/.test(value)) {
			value = value.replace(/^\//, "new ").replace(/\/$/, "");
			eval("value = " + value);
		}
		if (value instanceof Date) {
			var format = dateformat || "yyyy-MM-dd";
			var value = getFormatDate(value, format);
			return value;
		} else {
			return value.toString();
		}
	},
	convertToDate : function(vdate) {
		if (!vdate) {
			return null;
		}
		if ($.type(vdate) == 'date') {
			return vdate;
		} else if ($.type(vdate) == 'string') {
			var vdates = vdate.split(" ");
			var fields = vdates[0].split("-");
			var date = new Date(fields[0], fields[1] * 1 - 1, fields[2]);
			if(vdates.length > 1){
				var times = vdates[1].split(":");
				if(times[0]){
					date.setHours(times[0]);
				}
				if(times[1]){
					date.setMinutes(times[1]);
				}
				if(times[2]){
					date.setSeconds(times[2]);
				}
			}
			return date;
		}
		return null;
	},
	addDate : function(vdate,type,num){
		var rdate = ligerUiCustom.convertToDate(vdate);
		if(!rdate || !type || !num){
			return vdate;
		}

		if(type == 'y'){
			var year = rdate.getFullYear();
			year = year * 1 + num * 1;
			rdate.setFullYear(year);
		}else if(type == 'M'){
			var month = rdate.getMonth();
			month = month * 1  + num * 1 ;
			rdate.setMonth(month);
		}else if(type == 'd'){
			var day = rdate.getDate();
			day = day * 1  + num * 1 ;
			rdate.setDate(day);
		}else if(type == 'h'){
			var hour = rdate.getHours();
			hour = hour * 1 + num * 1;
			rdate.setHours(hour);
		}else if(type == 'm'){
			var minutes = rdate.getMinutes();
			minutes = minutes * 1 + num * 1;
			rdate.setMinutes(minutes);
		}else if(type == 's'){
			var second = rdate.getSeconds();
			second = second * 1 + num * 1;
			rdate.setSeconds(second);
		}
		return ligerUiCustom.formateDate(rdate);
	},
	calDate : function(date,type,format,num,callback){
	 ligerUiCustom.ajaxJson('/system/calDate.do?date='+date+'&type='+type+'&format='+format+'&num='+num,null,function (resp) {
		 if (resp.success) {
			callback(resp.data);
		 } else {
			 ligerUiCustom.errAlert(resp.msg);
		 }
	 }, false, true, function () {
		 ligerUiCustom.errAlert('网络异常，请联系管理员');
	 });
	},
	randomWord : function() {
		var result = "";
		var arr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b',
				'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
				'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
				'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
				'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
				'Y', 'Z' ];
		for (var i = 0; i < 30; i++) {
			result += arr[(Math.round(Math.random() * (arr.length - 1)))];
		}
		return result;
	},
	layerIndex : -1,
	layerOpen : function(title, width, height, content, isDiv) {
		return ligerUiCustom.layerCallbackOpen(title, width, height, content, isDiv);
	},
	layerCallbackOpen : function(title, width, height, content, isDiv,callback,param) {
		var layerId = ligerUiCustom.randomWord();
		ligerUiCustom.layerIndex = ligerUiCustom.top.layer.open({
			id : layerId,
			type : isDiv ? 1 : 2,
			title : title,
			shadeClose : false,
			shade : 0.5,
			area : [ width, height ],
			content : isDiv ? content : (ctx + content)
		});
		//绑定回调函数
		if(callback && $.isFunction(callback)){
			ligerUiCustom.top.layer["callback_"+ligerUiCustom.layerIndex] = callback;
		}
		ligerUiCustom.top.layer["param_"+ligerUiCustom.layerIndex] = param;
		return layerId;
	},
	getLayerParam:function(){
		var index = ligerUiCustom.top.layer.getFrameIndex(window.name);
		return ligerUiCustom.top.layer["param_"+index];
	},
	autocomplete:function(obj,data,zIndex){
		$(obj).autocomplete({
			minLength: 0,
			source:data,
			height:50
	    }).focus(function () {
	    	$(obj).autocomplete("search");
			var ul = $(obj).data("ui-id");
			if(ul){
				var top = ul.offset().top||0;
				var h = $("body").height();
				if(top + 100  > h * 1){
					ul.css("top",(top-130)+"px");
				}
			}
	    }).autocomplete("instance")._renderItem = function (ul, item) {
			if(zIndex){
				ul.css("z-index",zIndex);
			}
			$(obj).data("ui-id",ul);
			ul.css("display","none");
	        return $("<li>")
	            .append("<div>" + item.label + "</div>")
	            .appendTo(ul);
	    }
	},
	loadDictItemListByCode:function(code,callback){
		var url =  "/system/sysdic/dicinfo/list.do";
		var data = {
			type_code : code
		};
		ligerUiCustom.ajaxJson(url, data, function(resp){
			if(resp.success){
				if(callback && $.isFunction(callback)){
					callback(resp.data);
				}
			}else{
				ligerUiCustom.showNoMsg(resp.msg);
			}
		}, false, false, function(){
			ligerUiCustom.showNoMsg("请求异常");
		})
	},
	loadDicItemCustomByCode:function(code,callback){
		var url =  "/system/sysdic/dicInfoList.do";
		var data = {
			code : code
		};
		ligerUiCustom.ajaxJson(url, data, function(resp){
			if(resp.success){
				if(callback && $.isFunction(callback)){
					callback(resp.data);
				}
			}else{
				ligerUiCustom.showNoMsg(resp.msg);
			}
		}, false, false, function(){
			ligerUiCustom.showNoMsg("请求异常");
		})
	},
	loadDictItemMapByCode:function(code,callback){
		ligerUiCustom.loadDictItemListByCode(code,function(list){
			var itemMap = {};
			if(list && list.length > 0){
				for(var i in list){
					var item = list[i];
					itemMap[item.code] = item;
				}
			}
			if(callback && $.isFunction(callback)){
				callback(itemMap);
			}
		});
	},
	loadDoctorList:function(callback){
		var data = {};
		data.user_role = 'doctor';
		ligerUiCustom.ajaxJson("/user/ajaxList.do", data, function(resp){
			if(resp.success){
				var list = resp.data || [];
				callback(list);
			}else{
				//common.showNoMsg(resp.msg);
			}
		}, false, false, function(){
			//common.showNoMsg("请求异常");
		});
	},
	escape : function(str) {
		return encodeURIComponent(encodeURIComponent(str));
	},
	unescape : function(str) {
		return decodeURIComponent(decodeURIComponent(str));
	},
	layerClose : function(data){

		var index = ligerUiCustom.top.layer.getFrameIndex(window.name);

		var callback = ligerUiCustom.top.layer["callback_"+index];
		if(callback && $.isFunction(callback)){
			callback(data);
			delete ligerUiCustom.top.layer["callback_"+index];
		}
        ligerUiCustom.top.layer.close(index);
	},

	refresh : function(){

		window.location.reload();
	},
	log : function(){
		if(console && console.log && arguments){
			$.each(arguments,function(i,v){
				console.log(v);
			});
		}
	},
	PAGINATION:{
		page:1,
		pageSize:10
	},
	getDicTypeList : function(dicTypeName,page,pageSize,callbackFun){
		page = page?page:ligerUiCustom.PAGINATION.page;
		pageSize = pageSize?pageSize:ligerUiCustom.PAGINATION.pageSize;
		var url = '/system/sysdic/dictype/getComboxDicTypeList.do';
		var data = {name:dicTypeName,page:page,pageSize:pageSize};
		ligerUiCustom.ajaxJson(url, data, function(resp){
			if(resp.success && callbackFun != null){
				callbackFun(resp.pagination);
			}
		}, true,false,function(){
			ligerUiCustom.log('网络或参数错误，无法获取字典类型数据');
		});
	},
	bComboSelect:function(obj,options){
		obj.bComboSelect(options);
	},
	setPage : function(page){
		$('#page').val(page);
	},
	checkFileExt : function(filePath,allowExt){//多个逗号分隔
		if(!allowExt){
			return true;
		}
		if(!filePath){
			return false;
		}
		var fileExt = '.' + ligerUiCustom.getFileExt(filePath);
		var extAry = allowExt.split(',');
		for(var i=0;i<extAry.length;i++){
			if(extAry[i] == fileExt){
				return true;
			}
		}
		return false;
	},
	getFileExt : function(filePath){
		return filePath.replace(/.+\./,''); //正则表达式获取后缀
	},
	getFileName : function(filePath){
	   var fileName = filePath.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,'$1');  //正则表达式获取文件名，不带后缀
	   var fileExt  = ligerUiCustom.getFileExt(filePath);
	   return fileName + (fileExt?('.' + fileExt):'');
	},
	getNotNullVal : function(str){
		if(str){
			return str;
		}
		return '';
	},
    // 表格树封装处理
    treeTable: {
        _option: {},
        _treeTable: {},
        // 初始化表格
        init: function(options) {
            var treeTable = $('#bootstrap-table').bootstrapTreeTable({
    		    code : options.id,             // 用于设置父子关系
    	        parentCode : options.parent_id, // 用于设置父子关系
    	    	type: 'POST',                   // 请求方式（*）
    	        url: options.url,              // 请求后台的URL（*）
    	        ajaxParams : {},               // 请求数据的ajax的data属性
    			expandColumn : '0',            // 在哪一列上面显示展开按钮
    			striped : false,               // 是否各行渐变色
    			bordered : true,               // 是否显示边框
    			expandAll :false, // 是否全部展开
    	        columns: options.columns,
    	        responseHandler : function(resp){
    	        	if(resp.success){
    	        		return resp.data;
    	        	}
    	        	return [];
    	        }
    	    });
            ligerUiCustom.treeTable._treeTable = treeTable;
        },
        // 条件查询
        search: function(formId) {
        	var params = {};
        	ligerUiCustom.treeTable._treeTable.bootstrapTreeTable('refresh', params);
        },
        // 刷新
        refresh: function() {
        	ligerUiCustom.treeTable._treeTable.bootstrapTreeTable('refresh');
        }
    },
    trimJSONArrayNull : function(objectList){
    	console.log(objectList instanceof Array)
    	if(objectList instanceof Array){
    		$.each(objectList,function(i,object){
    			for(var ii in object){
    				if(object[ii] == null || object[ii] == 'null'){
    	       		  object[ii] = '';
    	       		}
    			}
    		});
    	}
    	return objectList;
    },
    changeSelectTr:function(){
    	$('table.click-color-table tr').on('click',function(){
    		$(this).parents('table').find('tr:gt(0)').removeClass('select-tr');
    		$(this).parents('table').find('tr:gt(0) td').removeClass('select-tr');
    		//增加样式
    		$(this).addClass('select-tr');
    	});
    },
    toJSON : function(jsonStr){
    	if(jsonStr){
    		return eval("(" + jsonStr + ")");
    	}
    	return jsonStr;
    },
    getSplitAry : function(source,split){
    	var result = [];
    	if(source){
    		var ary = source.split(split);
    		if(ary && ary.length >0){
    			for(var i =0;i<ary.length;i++){
    				result.push(ary[i]);
    			}
    		}
    	}
    	return result;
    },
    appendResidentParam:function(url){
    	url = url+(url.indexOf("?")==-1?"?":"&");
    	url = url+"admission_id="+$("[name=admission_id]").val();
    	url = url+"&patient_id="+$("[name=patient_id]").val();
    	url = url+"&series="+$("[name=series]").val();
    	url = url+"&wm_id="+$("[name=wm_id]").val();
    	return url;
    },
	addDicEvent :function(callback){
		//普通字典
		$('[dicLabel]').off('click').on('click',function(){
			var dicLabel  = $(this).attr('dicLabel');
			var dicInput  = $(this).attr('dicInput')||'';
			var dicAppend = $(this).attr('dicAppend')||'';
			ligerUiCustom.layerCallbackOpen('模板选择','750px','500px','/common/dicTemplate.html?label=' + dicLabel,false,function(data){
				if(data){
					if($(dicInput).length > 0){
						if($(dicInput).val()){
						   $(dicInput).val($(dicInput).val()  + dicAppend + data);
						} else {
						   $(dicInput).val(data);
						}
					}
				}
			});
		});
	},
	addDianXuanEvent :function(callback){
		//普通字典
		$('[liLabel]').off('click').on('click',function(){
			var dicLabel  = $(this).attr('liLabel');
			var action  = $(this).attr('liAction')||'';
			var dicAppend = $(this).attr('dicAppend')||'';
			if(!eval(action)){
				ligerUiCustom.infoAlert("请选择要导入的行")
				return;
			}
			var  textarea = $("tr.l-selected", "#mainGrid").find("textarea");
			ligerUiCustom.layerCallbackOpen('模板选择','750px','500px','/common/dicTemplate.html?label=' + dicLabel,false,function(data){
				if(data){
					if($(textarea).length > 0){
						if($(textarea).val()){
							$(textarea).val($(textarea).val()  + dicAppend + data);
						} else {
							$(textarea).val(data);
						}
					}
				}
			});
		});

		//普通字典
		$('[dx]').off('click').on('click',function(){
			var dicLabel  = $(this).attr('dx');
			var action  = $(this).attr('liAction')||'';
			var dicAppend = $(this).attr('dicAppend')||'';
			var filed = $(this).attr('input-field')||'';
			if(!eval(action)){
				ligerUiCustom.infoAlert("请选择要导入的行")
				return;
			}
			ligerUiCustom.layerCallbackOpen('模板选择','750px','500px','/common/dicTemplate.html?label=' + dicLabel,false,function(data){
				if(data){
					var  textarea = $(eval(action)).find('tr.selected').find(filed);
					if($(textarea).length > 0){
						if($(textarea).val()){
							$(textarea).val($(textarea).val()  + dicAppend + data);
						} else {
							$(textarea).val(data);
						}
					}
				}
			});
		});

	},
	addClinicGuideEvent : function(){
        $('[clinicGuide]').off('click').on('click',function(){
        	var guideWeek   = $(this).attr('week')||'';
        	var guideDay    = $(this).attr('day')||'';
            var guideInput  = $(this).attr('guideInput')||'';
            var guideAppend = $(this).attr('guideAppend')||'';
            var url = '/common/clinicGuide.html?week=' + guideWeek + '&day=' + guideDay;
            ligerUiCustom.layerCallbackOpen('指导处理','1000px','750px',url,false,function(data){
                if(data){
                    if($(guideInput).length > 0){
                        if($(guideInput).val()){
                            $(guideInput).val($(guideInput).val()  + guideAppend + data);
                        } else {
                            $(guideInput).val(data);
                        }
                    }
                }
            });
        });
	},
    addDicMulitCheckBoxEvent: function(){
        //普通字典
        $('[dicMulitCheckBox]').off('click').on('click',function(){
            var dicMulitCheckBox  = $(this).attr('dicMulitCheckBox');
            var dicInput  = $(this).attr('dicInput')||'';
            var dicAppend = $(this).attr('dicAppend')||'';
            ligerUiCustom.layerCallbackOpen('模板选择','650px','500px','/common/dicMulitCheckBox.html?label=' + dicMulitCheckBox,false,function(data){
                if(data){
                    if($(dicInput).length > 0){
                        if($(dicInput).val()){
                            $(dicInput).val($(dicInput).val()  + dicAppend + data);
                        } else {
                            $(dicInput).val(data);
                        }
                    }
                }
            });
        });
    },
	addDicCheckEvent :function(callback){
		$('[dicCheckLabel]').off('click').on('click',function(){
			var dicLabel  = $(this).attr('dicCheckLabel');
			var dicInput  = $(this).attr('dicInput')||'';
			var dicCodeInput  = $(this).attr('dicCodeInput')||'';
			var dicAppend = $(this).attr('dicAppend')||'';
			var param = null;
			var isReset = false;
			if($(dicInput).attr("disabled") || $(dicInput).attr("readonly")){
				isReset = true;
			}
			if(isReset && $(dicCodeInput).length > 0){
				var val = $(dicCodeInput).val();
				param = val.split(dicAppend);
			}
			ligerUiCustom.layerCallbackOpen('模板选择','650px','500px','/common/dicCheckTemplate.html?label=' + dicLabel,false,function(data){
				if(data){
					var codeList = data.codeList;
					var nameList = data.nameList;
					if(isReset){
						//先清空再赋值
						$(dicInput).val("");
						$(dicCodeInput).val("");
					}
					if($(dicInput).length > 0){
						var oldNameValue = $(dicInput).val()?$(dicInput).val() + dicAppend : '';
						$(dicInput).val(oldNameValue + nameList.join(dicAppend));
					}
					if($(dicCodeInput).length > 0){
						var oldCodeValue = $(dicCodeInput).val()?$(dicCodeInput).val() + dicAppend : '';
					    $(dicCodeInput).val(oldCodeValue + codeList.join(dicAppend));
					}
				}
			},param);
		});
	},
	openSpecial : function(callback){
		$(".special-template").on("click",function(){
			var typeId = $(this).attr("dicType");
			ligerUiCustom.layerCallbackOpen('选择符号','475px','220px','/common/special.html?typeId='+typeId,false,callback);
		})
	},
	getCheckedVal:function(selector,split){
		split = split || ",";
		return ligerUiCustom.getCheckedList(selector,split).join(split);
	},
	getCheckedList:function(selector,split){
		var list = [];
		$(selector).each(function(){
			list.push(this.value)
		})
		return list;
	},
	/**
	 * 计算2个日期相隔小时和分钟数
	 * @param beginDate
	 * @param endDate
	 * @returns {Array}
	 */
	getHourMinuteAry : function(beginDate,endDate){
		if(beginDate && endDate){
		  try{
			  var begin = new Date(beginDate.replace(/-/g,'/') + ':00');
			  var end   = new Date(endDate.replace(/-/g,'/') + ':00');
			  var total = Math.abs(end.getTime() -  begin.getTime());
			  var hours =  Math.floor(total/(3600*1000));
			  var minutes = (total - 3600*1000*hours)/(60*1000);
			  return [hours,minutes];
		  } catch (e) {
		  }
		}
		return ["",""];
	},
	closeWindow: function () {
	    native.getNativeJsObject().closeWindow(function(){});
    },
    setExitButtonVisible : function(visible){
       native.getNativeJsObject().setExitButtonVisible(visible);
    },
    setPass: function () {
        ligerUiCustom.layerCallbackOpen('重置密码', '300px', '200px', '/system/user/setPass.html', false, null);
    },
    isOneChecked: function (table, trueCallBack, falseCallBack) {
        var inputs = table.find("tr td:nth-child(1) :checked");
        if (inputs.length == 1) {
            if (trueCallBack) {
                trueCallBack(inputs.val());
            }
        } else if (falseCallBack) {
            falseCallBack();
        } else {
            ligerUiCustom.infoAlert('只能选中一行进行修改！');
        }
    },
    addCheckItemSelectedEvent:function(){
    	$(".check-item",$(".check-item-list")).on("click",function(){
    		$(".selected",$(".check-item-list")).removeClass("selected");
    		$(this).addClass("selected");
    	});
    },
    isMouseDown: false,
    point: {},
	bindMoveWindowEvent: function (selector) {
        $(selector).on('mousedown', function (e) {
            $(this).css('cursor', 'default');
            ligerUiCustom.isMouseDown = true;
            ligerUiCustom.point = {
                x: e.clientX,
                y: e.clientY
            };
        }).on('mouseup mouseout', function (e) {
            ligerUiCustom.isMouseDown = false;
        }).on('mousemove', function (e) {
            if (ligerUiCustom.isMouseDown){
                var point = {
                    x: e.clientX,
                    y: e.clientY
                };
                native.getNativeJsObject().moveWindow(ligerUiCustom.point.x, ligerUiCustom.point.y, point.x, point.y);
            }
        });
    },
    showImage : function(imgUrl){
    	var viewer = $('.viewer',$(ligerUiCustom.top.document));
		if($('.viewer',$(ligerUiCustom.top.document)).length > 0){
			$('.viewer',$(ligerUiCustom.top.document)).remove();
		}
		var viewer = $('<div class="viewer"><div class="viewer-area"><img src="" style="width:100%"/></div><div class="view-close">关闭</div></div>');
		$('.viewer-area',viewer).width($(ligerUiCustom.top).width() * 0.9);
		$('.viewer-area',viewer).height($(ligerUiCustom.top).height() * 0.9);
		$('body',$(ligerUiCustom.top.document)).append(viewer);
		var url = ($(this)?$(this).attr('src'):'')||imgUrl;
		$('img',viewer).attr('src',url);
		var img = new Image();
		//加载图片吗，通过图片计算高度
		img.onload = function () {
			var imgHeight = img.height;
			var imgWidth = img.width;
			if(imgHeight > 0 && imgHeight < $('.viewer-area',viewer).height()){
				$('.viewer-area',viewer).height(imgHeight);
			}
			if(imgWidth > 0 && imgWidth < $('.viewer-area',viewer).width()){
				$('.viewer-area',viewer).width(imgWidth+30);
			}
			viewer.css('margin-top',(viewer.height() * -1 * 0.5)+'px').css('margin-left',(viewer.width() * -1 * 0.5)+'px');
			viewer.show();
			$('.view-close',viewer).on('click',function(){
				viewer.remove();
			});
        };
		img.src = url;
    },
    addCallbackEvent:function(callbackLabel,callback){
    	if(!ligerUiCustom.top.callbackMap){
    		ligerUiCustom.top.callbackMap = {};
    	}
    	ligerUiCustom.top.callbackMap[callbackLabel] = callback;
    },
    callCallbackEvent:function(callbackLabel,data){
    	if(ligerUiCustom.top.callbackMap && ligerUiCustom.top.callbackMap[callbackLabel]){
    		ligerUiCustom.top.callbackMap[callbackLabel](data);
    		delete ligerUiCustom.top.callbackMap[callbackLabel];
    	}
    },
    getBetweenHours : function(beginDate,endDate){
		if(beginDate && endDate){
			  try{
				  var begin = new Date(beginDate.replace(/-/g,'/') + ':00');
				  var end   = new Date(endDate.replace(/-/g,'/') + ':00');
				  var total = Math.abs(end.getTime() -  begin.getTime());
				  var hours = parseFloat((total/(3600*1000)) + '');
				  return hours.toFixed(2) * 1;
			  } catch (e) {
			  }
		}
		return 0;
	},
	getTop : function(self){
		if(!self){
			self = window.self;
		}
		if(self.parent != null && self.parent != self && ligerUiCustom.getParentLayer(self) != null){
			return ligerUiCustom.getTop(self.parent);
		} else {
			return self;
		}
	},
	getParentLayer : function(self){
		try{
			return self.parent.layer;
		} catch(e){
			return null;
		}
	},
	/**
	 * 显示对话框
	 * @param options
	 */
	showDialog: function (options,self) {
		if(options.width && typeof(options.width) == 'string' && options.width.indexOf("%") != -1){
			options.width = ($(ligerUiCustom.top).width() * parseInt(options.width) / 100).toFixed(0);
		}

		if(options.height && typeof(options.height) == 'string' && options.height.indexOf("%") != -1){
			options.height = ($(ligerUiCustom.top).height() * parseInt(options.height) / 100).toFixed(0);
		}
		var opt = {
			width: 500,
			height: 300,
			callback : null,//回调事件
			buttons: [
				{
					text: '保存',
					cls: "btn-primary",
					onclick: function (item, g, i) {
						if (options.save && $.isFunction(options.save)) {
							options.save(item, g, i);
						}
					}
				},
				{
					text: '取消',
					onclick: function (item, g, i) {
						if (options.cancel && $.isFunction(options.cancel)) {
							options.cancel(item, g, i);
						}
						g.close();
					}
				}
			]
		};
		opt = $.extend(true,opt, options);
		if(!self) {
			ligerUiCustom.top.$.ligerDialog.open(opt);
		}else{
			$.ligerDialog.open(opt);
		}
	},

	getBetweenDays: function (beginDate, endDate) {
		if (beginDate && endDate) {
			try {
				var begin = new Date(beginDate);
				var end = new Date(endDate);
				var total = end.getTime() - begin.getTime();

				return parseInt(total / (1000 * 60 * 60 * 24));
			} catch (e) {
			}
		}
		return 0;
	}
	//检索用户信息
    /*canAutoSelected:function (val,re) {
        var values = $(val).val();
        var comboBox = $(re).ligerComboBox(
            {
                url: '/system/user/getdata.do',
                dataGetter:function (resp) {
                    return resp.data;
                },
                highLight:true,
                delayLoad:true,
                initText:values,
                initValue:values,
                valueField: 'user_code',
                textField: 'user_name',
                selectBoxWidth: 200,
                autocomplete: true,
                keySupport:true,
                autocompleAllowEmpty:false,
                selectBoxHeight : 216,
                width: 200,
                // isMultiSelect:true,
                // split:",",
                onSelected:function (user_code, user_name) {
                    val.val(user_name);
                }
            }
        );
        re.val(values);
    },*/

};
$(function() {
	ligerUiCustom.init();
});
