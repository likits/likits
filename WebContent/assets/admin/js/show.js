$(document).ready(function(){
	
	
	//Listen the auto push button
	$('#autoButton').switchbutton({
		onChange:function(checked){			
			//自动推送
			isAutoPush(checked);				
		}
	});
	
});

//通用类
//提交表单，确认数据时候更新成功
function submitForm(formId,url){
	$(formId).form('submit', {
        url: url,
        success:function(data){
        	var result = $.parseJSON(data);
        	if(result.status){
        		$.messager.alert('成功','数据更新成功！','info');
        		$('#check').datagrid('reload');
        	}else{
        		$.messager.alert('失败','数据更新失败！','error');
        	}
        }
    });
}


// 待审核
var check_url = 'showAction_update.action?';

function normalCheck(){
    var row = $('#check').datagrid('getSelected');
    if (row){
        $('#check-dlg').dialog('open').dialog('center').dialog('setTitle','待审核');
        $('#check-form').form('load',row);
    }
}

function multipleCheck(){	
    var rows = $('#check').datagrid('getSelections');
    var dataSize = rows.length;
    if (dataSize>0){
    	$.messager.confirm('批量审核','确认批量审核文章 ：'+dataSize,function(r){
    	    if (r){
    	    	for(var i = 0; i<rows.length ; i++){
    	        	var title = rows[i].title;
    	        	$.post(check_url, rows[i],
    	        			  function(result){
    			        		if(result.status){
    				        		$.messager.alert('成功','数据更新成功！'+title,'info');			        		
    				        	}else{
    				        		$.messager.alert('失败','数据更新失败！'+title,'error');
    				        	}
    	        			 }, "json");
    	        }
    	    	$('#check').datagrid('reload');
    	    }
    	});    
    }else{
    	$.messager.alert('警告','未选中文章！','info');
    }
}

function checkPass(){
	var row = $('#check').datagrid('getSelected');	
	var status = $('#check-combobox').combobox('getText');
	var status_value = $('#check-combobox').combobox('getValue');
	if (row) {
		$.messager.confirm('确认', '确认更改文章状态为 : '+status+'?', function(r) {
			if(r){
				//The value is changed.
				if (status_value == 1) {
					$.messager.alert('警告','文章状态没有改变。','warning');
				}else{									
					submitForm('#check-form',check_url);
					$('#check-dlg').dialog('close');
				}								
			}			
			
		});
	}	
}




//待推送

var push_url = "showAction_update.action?";

function normalPush(){
	var row = $('#push').datagrid('getSelected');
    if (row){
        $('#push-dlg').dialog('open').dialog('center').dialog('setTitle','待推送');
        $('#push-form').form('load',row);
    }
}

function mutiplePush(){
	var rows = $('#push').datagrid('getSelections');
    var dataSize = rows.length;
    if (dataSize>0){
    	$.messager.confirm('批量推送','确认批量推送文章 ：'+dataSize,function(r){
    	    if (r){
    	    	for(var i = 0; i<rows.length ; i++){
    	        	var title = rows[i].title;
    	        	$.post(push_url, rows[i],
    	        			  function(result){
    			        		if(result.status){
    				        		$.messager.alert('成功','数据更新成功！'+title,'info');			        		
    				        	}else{
    				        		$.messager.alert('失败','数据更新失败！'+title,'error');
    				        	}
    	        			 }, "json");
    	        }
    	    	$('#push').datagrid('reload');
    	    }
    	});    
    }else{
    	$.messager.alert('警告','未选中文章！','info');
    }
}

function autoPush(){
	$('#push').datagrid({
		
	});
}

//Set the clock process
var timeClockProcess;

function isAutoPush(checked){
	
	if(checked){
		var text = $('#autoTime').combobox('getText');
		var time = $('#autoTime').combobox('getValue');
		var seconds = time*60*1000;
		timeClockProcess = setInterval('autoPush()',seconds);
		
		$('#autoTime').combobox('disable');
		$('#normalPush').linkbutton({
			disabled:true
		});
		$('#mutiplePush').linkbutton({
			disabled:true
		});				
		
		$('#push').datagrid('loading');
		$.messager.alert('提示','自动推送中，时间间隔为：'+text+'。<p>如需取消自动推送，请按确定按钮。</p>','info',function(r){
			
			$('#push').datagrid('loaded');
			clearInterval(timeClockProcess);
			$('#autoTime').combobox('enable');	
			$('#normalPush').linkbutton({
				disabled:false
			});
			$('#mutiplePush').linkbutton({
				disabled:false
			});
			$('#autoButton').switchbutton({
				checked:false
			});
			
		});
	}
}

function pushPass(){
	var row = $('#push').datagrid('getSelected');	
	var status = $('#push-combobox').combobox('getText');
	var status_value = $('#push-combobox').combobox('getValue');
	if (row) {
		$.messager.confirm('确认', '确认更改文章状态为 : '+status+'?', function(r) {
			if(r){
				//The value is changed.
				if (status_value == 2) {
					$.messager.alert('警告','文章状态没有改变。','warning');
				}else{
					submitForm('#push-form',push_url);		
					$('#check-dlg').dialog('close');
				}								
			}			
			
		});
	}
}

//已推送

var publish_url = "showAction_update.action?";

function publishDown(){
	var row = $('#publish').datagrid('getSelected');
    if (row){
        $('#publish-dlg').dialog('open').dialog('center').dialog('setTitle','待下架');
        $('#publish-form').form('load',row);
    }
}

function publishMultiDown(){
	var rows = $('#publish').datagrid('getSelections');
    var dataSize = rows.length;
    if (dataSize>0){
    	$.messager.confirm('批量推送','确认批量推送文章 ：'+dataSize,function(r){
    	    if (r){
    	    	for(var i = 0; i<rows.length ; i++){
    	        	var title = rows[i].title;
    	        	$.post(publish_url, rows[i],
    	        			  function(result){
    			        		if(result.status){
    				        		$.messager.alert('成功','数据更新成功！'+title,'info');			        		
    				        	}else{
    				        		$.messager.alert('失败','数据更新失败！'+title,'error');
    				        	}
    	        			 }, "json");
    	        }
    	    	$('#publish').datagrid('reload');
    	    }
    	});    
    }else{
    	$.messager.alert('警告','未选中文章！','info');
    }
}

function publishPass(){
	var row = $('#publish').datagrid('getSelected');	
	var status = $('#publish-combobox').combobox('getText');
	var status_value = $('#publish-combobox').combobox('getValue');
	if (row) {
		$.messager.confirm('确认', '确认更改文章状态为 : '+status+'?', function(r) {
			if(r){
				//The value is changed.
				if (status_value == 3) {
					$.messager.alert('警告','文章状态没有改变。','warning');
				}else{
					submitForm('#push-form',push_url);		
					$('#publish-dlg').dialog('close');
				}								
			}			
			
		});
	}
}
