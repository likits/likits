$(document).ready(function(){
	
	
	//Listen the auto push button
	$('#autoButton').switchbutton({
		onChange:function(checked){			
			//开启自动推送
			if(checked){
				sendAutoPushStatus();
			}else{
				cancelAutoPushStatus();
			}		
		}
	});
	
	$('#menu-tabs').tabs({
	    onSelect:function(title,index){
	    	if(index == 0){
	    		$('#check').datagrid('load','showAction_findAllArticles.action?stateId=1');
	    	}
	    	else if(index == 1){
	    		getAutoPushStatus();
	    		$('#push').datagrid('load','showAction_findAllArticles.action?stateId=2');
	    	}
	    	else if(index == 2){
	    		$('#publish').datagrid('load','showAction_findAllArticles.action?stateId=3');
	    	}
	    }
	});
	
});

//通用类
//提交表单，确认数据时候更新成功
function submitForm(formId,url,dgId){
	$(formId).form('submit', {
        url: url,
        success:function(data){
        	var result = $.parseJSON(data);
        	if(result.status){
        		$.messager.alert('成功','数据更新成功！','info');
        		$(dgId).datagrid('reload');
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
    	$.messager.confirm('批量审核','确认批量审核文章？<p>选中文章数量：'+dataSize+'</p>',function(r){
    	    if (r){
    	    	var status;
    	    	for(var i = 0; i<rows.length ; i++){
    	        	rows[i].stateId = 2;
    	        	$.post(check_url, rows[i],
    	        			  function(result){
    			        		status = result.status;
		    	        		if(status){
		    		        		$.messager.alert('成功','数据更新成功！','info');			        		
		    		        	}else{
		    		        		$.messager.alert('失败','数据更新失败！','error');
		    		        	}
		    	    	    	$('#check').datagrid('reload');
    	        			 }, "json");
    	        	
    	        }    	    	
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
					submitForm('#check-form',check_url,'#check');
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
    	$.messager.confirm('批量推送','确认批量推送文章 ：<p>选中文章数量：'+dataSize+'</p>',function(r){
    	    if (r){
    	    	var status;
    	    	for(var i = 0; i<rows.length ; i++){
    	    		rows[i].stateId = 3;
    	        	$.post(push_url, rows[i],
    	        			  function(result){
		    	        		status = result.status;
		    	        		if(status){
		    		        		$.messager.alert('成功','数据更新成功！','info');			        		
		    		        	}else{
		    		        		$.messager.alert('失败','数据更新失败！','error');
		    		        	}
		    	        		$('#push').datagrid('reload');
    	        			 }, "json");
    	        }
    	    }
    	});    
    }else{
    	$.messager.alert('警告','未选中文章！','info');
    }
}


//Get server push status
function getAutoPushStatus(){
	$.getJSON("showAction_getAutoPushState.action?", function(data){
		  setAutoPushStatus(data.autoTime,data.switchAutoTime);
	});
}

function setAutoPushStatus(autoTime,switchAutoTime){
	if(switchAutoTime){
		$('#autoTime').combobox('setValue',autoTime);	
		$('#autoTime').combobox('disable');
		$('#autoButton').switchbutton({
			checked:switchAutoTime
		});
		$('#normalPush').linkbutton({
			disabled:true
		});
		$('#mutiplePush').linkbutton({
			disabled:true
		});						
		
	}else{
		$('#autoTime').combobox('setValue',autoTime);
	}
}

function cancelAutoPushStatus(){
	var text = $('#autoTime').combobox('getText');
	$.messager.confirm('提示','自动推送中，时间间隔为：'+text+'。<p>如需取消自动推送，请按确定按钮。</p>',function(r){		
		if(r){
			$.post("showAction_setAutoPushState.action", 
					{'remoteSwitchAutoTime':'false'},
					function(result){					
						if(result.status){
			        		$.messager.alert('成功','取消自动推动成功！','info');	
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
			        	}else{
			        		$.messager.alert('失败','取消自动推动失败！','error');
			        		$('#push').datagrid('reload');
			        	}
				}, "json");
		}else{
			$('#autoButton').switchbutton({
				checked:true
			});
		}
	});
}

function sendAutoPushStatus(){
	var time = $('#autoTime').combobox('getValue');
	
	if(time>0&&time<=1440){
		$.post("showAction_setAutoPushState.action", 
			{'remoteSwitchAutoTime':'true',
			 'remoteAutoTime':time},
			function(result){
				if(result.status){
	    			setAutoPushStatus(time,true);
	        	}else{
	        		$.messager.alert('失败','取消自动推动失败！','error');
	        		$('#push').datagrid('reload');
	        }
		}, "json");
	}else{
		$.messager.alert('失败','请检查数据参数是否正确！','error');
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
					submitForm('#push-form',push_url,'#push');						
					$('#push-dlg').dialog('close');
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
    	$.messager.confirm('批量下架','确认批量下架文章 ？<p>选中文章数量：'+dataSize+'</p>',function(r){
    	    if (r){
    	    	var status;
    	    	for(var i = 0; i<rows.length ; i++){
    	    		rows[i].stateId = 4;
    	        	$.post(publish_url, rows[i],
    	        			  function(result){
    	        				status = result.status;
    			        		if(status){
    				        		$.messager.alert('成功','数据更新成功！','info');			        		
    				        	}else{
    				        		$.messager.alert('失败','数据更新失败！','error');
    				        	}
    			        		$('#publish').datagrid('reload');
    	        			 }, "json");
    	        }    	    	
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
					submitForm('#publish-form',publish_url,'#publish');		
					$('#publish-dlg').dialog('close');
				}								
			}			
			
		});
	}
}
