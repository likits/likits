package com.likits.action.admin;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.likits.entity.front.Article;
import com.likits.service.admin.ShowService;
import com.likits.util.BaseAction;
import com.opensymphony.xwork2.ModelDriven;

import net.sf.json.JSONObject;

@Controller("showAction")
@Scope("prototype")
public class ShowAction extends BaseAction implements ModelDriven<Article>
{

    private static final long serialVersionUID = 1L;

    // 自动推送时间,单位分钟
    private static int autoTime = 60;
    // 自动推送开关
    private static boolean switchAutoTime = false;
    
    private int remoteAutoTime;
    
    private boolean remoteSwitchAutoTime;

    Article article;

    @Resource
    private ShowService showService;

    private int page;
    private int rows;

    private static JSONObject successMsg;
    private static JSONObject errorMsg;

    static
    {
        successMsg = new JSONObject();
        successMsg.put("status", true);
        errorMsg = new JSONObject();
        errorMsg.put("status", false);
    }

    public void switchAutoPush()
    {
        if (remoteSwitchAutoTime)
        {
            switchAutoTime = true;
            // set up auto time
        }else if(!remoteSwitchAutoTime){
            switchAutoTime = false;
            //shut down auto time
        }
    }

    public static void autoPush()
    {

    }
    
    public void getAutoPushState(){
        JSONObject jo = new JSONObject();
        jo.put("autoTime", autoTime);
        jo.put("switchAutoTime", switchAutoTime);
        this.toResponse(jo.toString());
    }
    
    public void setAutoPushState(){
        try
        {
            if (remoteSwitchAutoTime)
            {
                switchAutoTime = true;
                autoTime = remoteAutoTime;
            }else{
                switchAutoTime = false;
            }
            this.toResponse(successMsg.toString());
        } catch (Exception e)
        {
            this.toResponse(errorMsg.toString());
            e.printStackTrace();
        }
    }

    public void findAllArticles()
    {
        try
        {
            String json = showService.findAllShows(page, rows, article.getStateId());
            this.toResponse(json);
        } catch (Exception e)
        {
            this.toResponse(errorMsg.toString());
            e.printStackTrace();
        }
    }

    public void update()
    {
        try
        {
            showService.update(article);
            this.toResponse(successMsg.toString());
        } catch (Exception e)
        {
            this.toResponse(errorMsg.toString());
            e.printStackTrace();
        }
    }

    public int getRemoteAutoTime()
    {
        return remoteAutoTime;
    }

    public void setRemoteAutoTime(int remoteAutoTime)
    {
        this.remoteAutoTime = remoteAutoTime;
    }

    public boolean isRemoteSwitchAutoTime()
    {
        return remoteSwitchAutoTime;
    }

    public void setRemoteSwitchAutoTime(boolean remoteSwitchAutoTime)
    {
        this.remoteSwitchAutoTime = remoteSwitchAutoTime;
    }

    public static int getAutoTime()
    {
        return autoTime;
    }

    public static void setAutoTime(int autoTime)
    {
        ShowAction.autoTime = autoTime;
    }

    public static boolean isSwitchAutoTime()
    {
        return switchAutoTime;
    }

    public static void setSwitchAutoTime(boolean switchAutoTime)
    {
        ShowAction.switchAutoTime = switchAutoTime;
    }

    public int getPage()
    {
        return page;
    }

    public void setPage(int page)
    {
        this.page = page;
    }

    public int getRows()
    {
        return rows;
    }

    public void setRows(int rows)
    {
        this.rows = rows;
    }

    public Article getModel()
    {
        if (article == null)
        {
            article = new Article();
        }
        return article;
    }

}
