//动态设置iframe高度
//在父页面里引用
/**
 * @description 动态设置iframe高度（在父页面里引用）
 * @param {*} iframe_id 父页面中iframe的id
 */
function setIframeHeight(iframe_id = 'iframeArt'){
    /**
     * @description 最小高度
     */
    let min_height =455;

    /**
     * @description 缓存主帧的高度
     */
    let cacheHeight = 0;

    function run(iframe_id) {  
        let iframeObj = $("#"+iframe_id)[0];  

        /**
         * @description iframe的高度
         */
        let iframeHeight = 0;
        
        //当主框架已经加载，检查其高度
        // when the main frame has already been loaded, the check its height  
        if (iframeObj && iframeObj.contentDocument && iframeObj.contentDocument.body) {  

            //获取iframe的当前高度
            iframeHeight = $("#"+iframe_id)[0].contentDocument.body.clientHeight;  
            console.log(iframeHeight);

            if (iframeHeight && iframeHeight != cacheHeight) {  
                // cache the main frame height  缓存主帧的高度
                cacheHeight = iframeHeight; 
                iframeHeight = iframeHeight < min_height ? min_height:iframeHeight;

                //设置iframe的高度
                $("#"+iframe_id).height(iframeHeight);  
            } 
        }
        
        if(iframeHeight && iframeHeight != cacheHeight){
            setTimeout(run, 90, iframe_id);
        }
          
    }  
    run(iframe_id);
}


//如果需要在子页面中调用，则用如下方法：（追加parent）

function setIframeHeight(iframe_id){//父页面中iframe的id
    var min_height =455;
    var cacheHeight = 0;
    function run(iframe_id) {  
        var mf = parent.$("#"+iframe_id)[0];  
        // when the main frame has already been loaded, the check its height  
        if (mf && mf.contentDocument && mf.contentDocument.body) {  
            var iframeHeight = parent.$("#"+iframe_id)[0].contentDocument.body.clientHeight;  
            if (iframeHeight && iframeHeight != cacheHeight) {  
                // cache the main frame height  
                cacheHeight = iframeHeight; 
                iframeHeight=iframeHeight<min_height?min_height:iframeHeight;
        parent.$("#"+iframe_id).height(iframeHeight);  
            }  
        } 
        setTimeout(run, 200,iframe_id);  
    }  
    run(iframe_id);
}