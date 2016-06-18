package com.likits.service.admin;

import com.likits.entity.front.Article;

public interface ShowService
{
    void update(Article article);
    
    String findAllShows(int page,int rows,int stateId);
}
