package com.likits.service.admin.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.likits.dao.admin.ShowDao;
import com.likits.entity.front.Article;
import com.likits.service.admin.ShowService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("showService")
@Transactional
public class ShowServiceImpl implements ShowService
{
    @Autowired
    @Qualifier("showDao")
    ShowDao showDao;

    public String findAllShows(int page, int rows, int stateId)
    {
        List<Article> articles = showDao.findArticles(page, rows, stateId);
        int total = articles.size();
        JSONArray ja = new JSONArray();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (int i = 0; i < articles.size(); i++)
        {
            Article article = articles.get(i);
            JSONObject jo = new JSONObject();
            jo.put("id", article.getId());
            jo.put("title", article.getTitle());
            jo.put("publishTime", simpleDateFormat.format(article.getPublishTime()));
            jo.put("content", article.getContent());
            jo.put("coverImage", article.getCoverImage());
            jo.put("stateId", article.getStateId());
            ja.add(jo);
        }
        String json = ja.toString();
        json = "{\"total\":\"" + total + "\",\"rows\":" + json + "}";
        return json;
    }

    public void update(Article article)
    {
        showDao.update(article);        
    }
}
