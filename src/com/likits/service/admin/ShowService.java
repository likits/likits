package com.likits.service.admin;

import java.util.List;

import com.likits.entity.front.Article;

public interface ShowService
{
    void update(Article article);
    
    String findAllShows(int page,int rows,int stateId);
    
    List<Article> findBylimitNumber(String queryString, int limit);
}
