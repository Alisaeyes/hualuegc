/**
 * Created by Administrator on 2017/6/21.
 */

function monitorMsg(){
    var user_id = Stor.getItem("user_id");
    user_id && $.ajax({
        "url":baseUrl+"/api/program/getInfomation",
        "type":"POST",
        "cache" : false,
        "datatype":"JSON",
        "data":"data="+JSON.stringify({"userId":user_id}),
        success:function(data){
            switch (data.code) {   
                case 100:
                  //  monitorMsg();
                    var mySubmit = data.result.myInfo;
                    var received = data.result.programInfo;
                    var saveMsg  = data.result.saveInfo;
                    mySubmit.length||received.length || saveMsg.length ? $(".msgTip").show():0;
                    if(mySubmit.length || saveMsg.length){
                        $(".spTip").text(parseInt(mySubmit.length)+parseInt(saveMsg.length)).show()
                    };

                    /**
                     * @worknum       工作通知数量
                     * @tasknum       任务通知数量
                     * @meetingnum    会议通知数量
                     * @noticenum     公告数量
                     * @contractnum   合同通知数量
                     */
                    var worknum = 0,
                        tasknum = 0,
                        meetingnum = 0,
                        noticenum = 0,
                        contractnum = 0;

                    if(received.length){
                        for(var i = 0;i<received.length;i++){
                            switch (received[i].infotype) {
                                case 1:
                                    worknum++;
                                    $(".workTip").text(worknum).show();
                                    $(".work_msg").attr("href","contract-tip.html?classId="+received[i].infotype+"&title="+$(".work_msg").find(".tz").text());
                                    break;
                                case 2:
                                    tasknum++;
                                    $(".missionTip").text(tasknum).show();
                                    $(".task_msg").attr("href","contract-tip.html?classId="+received[i].infotype+"&title="+$(".task_msg").find(".tz").text());
                                    break;
                                case 3:
                                    meetingnum++;
                                    $(".meetingTip").text(meetingnum).show();
                                    $(".meeting_msg").attr("href","contract-tip.html?classId="+received[i].infotype+"&title="+$(".meeting_msg").find(".tz").text());
                                    break;
                                case 4:
                                    contractnum++;
                                    $(".contractTip").text(contractnum).show();
                                    $(".contract_msg").attr("href","contract-tip.html?classId="+received[i].infotype+"&title="+$(".contract_msg").find(".tz").text());
                                    break;
                                case 5:
                                    noticenum++;
                                    $(".noticeTip").text(noticenum).show();
                                    $(".notice_msg").attr("href","contract-tip.html?classId="+received[i].infotype+"&title="+$(".notice_msg").find(".tz").text());
                                    break;
                            }
                        };
                    };
                    !worknum && $(".workTip").text("0").hide();//无工作通知
                    !tasknum && $(".missionTip").text("0").hide();
                    !meetingnum && $(".meetingTip").text("0").hide();
                    !contractnum && $(".contractTip").text("0").hide();
                    !noticenum && $(".noticenum").text("0").hide();
                    break;
                case -99:
                    $(".msgTip").hide();
                    break;
            }
        },
        error:function(){
            layer.closeAll();
            tip("请求出错");
        }
    });
};
monitorMsg();
//setInterval(monitorMsg,1000);

/**
 * @copyright [获取url值]
 * @license   [license]
 * @version   [version]
 * @DateTime  2017-07-11
 * @Author    吴佳
 * @param     {[string]}    name [参数名字]
 * @param     {[string]}    url  [url地址]
 * @return    {[type]}         [description]
 */
function getUrlValue(name,url){
	url = url?url:location.href;
	url = url.split("?")[1].split("&");
	var i = 0;
	var key = null;
	for(;i<url.length;i++){
		key = url[i].split("=");
		if(key[0]==name){
			return key[1];
		};
	};
};

/**
 * @copyright [弹出信息]
 * @license   [license]
 * @version   [version]
 * @DateTime  2017-07-11
 * @Author    吴佳
 * @param     {[string]}    msg [提示内容]
 * @return    {[type]}        [description]
 */
function tip(msg,fn,time){
    time = time||0.8;
    layer.open({
        content:msg,
        style: 'width:50%;background:rgba(0,0,0,.6);color:#fff;',
        shade:false,
        time:time,
        end:function(){
            fn&&fn();
        }
    });
}


/**
 * @copyright [加载loding]
 * @license   [license]
 * @version   [version]
 * @DateTime  2017-07-13
 * @Author    吴佳
 * @return    {[type]}    [description]
 */
function loading(){
    layer.open({
        type: 2,
        shadeClose: false,
    });
}



/**
 * @copyright [时间转换]
 * @license   [license]
 * @version   [version]
 * @DateTime  2017-07-11
 * @Author    吴佳
 * @param     {[number]}    nS [时间戳]
 * @return    {[type]}       [description]
 */
function formatDate(nS) { 
    var date = new Date(parseInt(nS*1000));
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = zerofill(date.getHours()) + ':';
    m = zerofill(date.getMinutes()); 
    return Y+M+D+h+m; 
};

/**
 * @copyright [时间补零]
 * @license   [license]
 * @version   [version]
 * @DateTime  2017-07-11
 * @Author    吴佳
 * @param     {[number]}    num [时间]
 * @return    {[string||number]}        [新的时间]
 */
function zerofill(num){
    return num < 10 ? "0"+num : num;
}

/**
 * @copyright [设备检测]
 * @license   [license]
 * @version   [version]
 * @DateTime  2017-07-14
 * @Author    吴佳
 * @param     {[function]}    iphone  [苹果设备回调]
 * @param     {[function]}    android [安卓设备回调]
 * @return    {[type]}            [description]
 */
function deviceTesting(iphone,android){
    var deviceMsg = window.navigator.userAgent;
    if(/iPhone/g.test(deviceMsg)){
        iphone&&iphone();
    }else if(/Android/g.test(deviceMsg)){
        android&&android();
    };
};


/**
 * @copyright [上传函数]
 * @license   [license]
 * @version   [version]
 * @DateTime  2017-07-12
 * @Author    吴佳
 * @param     {[string]}    oel         [实例化节点对象]
 * @param     {[string]}    saveOel     [上传成功存储地址的隐藏域节点对象]
 * @param     {[string]}    url         [上传地址接口]
 * @param     {[array]}     type        [设置文件类型]
 * @return    {[type]}                  [null]
 */
function uploadImg(oel,saveOel,url,type){
    var saveAddress = [];
    if($("#"+oel).length){
        $("#"+oel).initUpload({
            "uploadId":oel,
            "uploadUrl":baseUrl+url,
            "showSummerProgress":false,
            //"size":350,
            //"maxFileNumber":3,
            //"filelSavePath":"",//文件上传地址，后台设置的根目录
            "beforeUpload":function (opt){
                //opt.otherData =[{"name":"你要上传的参数","value":"你要上传的值"}];
            },
            "onUpload":function(opt,data){
                var val = $("."+saveOel).val();
                var arrSrc = null;
                if(val!=""){
                    arrSrc = val.split(",");
                    arrSrc.forEach(function(item,i){
                        saveAddress.push(item);        
                    });
                };
                saveAddress.push(data);
                $("."+saveOel).val(saveAddress.join(","));
                // console.log($(".img-src").val())
                uploadTools.uploadError(opt);//显示上传错误
            },
            autoCommit:true,
            "fileType":type
        });
    }
}

var uploadFile = uploadImg;
