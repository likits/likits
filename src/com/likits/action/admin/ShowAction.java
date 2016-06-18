package com.likits.action.admin;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.likits.entity.front.Article;
import com.likits.service.admin.ShowService;
import com.likits.util.BaseAction;
import com.opensymphony.xwork2.ModelDriven;

@Controller("showAction")
@Scope("prototype")
public class ShowAction extends BaseAction implements ModelDriven<Article>
{

    private static final long serialVersionUID = 1L;
    Article article;

    @Resource
    private ShowService showService;

    private int page;
    private int rows;

    public void findAllArticles()
    {
        String json = showService.findAllShows(page, rows);
        this.toResponse(json);
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
