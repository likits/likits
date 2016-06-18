package com.likits.dao.admin;

import java.util.List;

import com.likits.dao.Dao;
import com.likits.entity.front.Article;

public interface ShowDao extends Dao<Article, Integer>
{
    List<Article> findArticles(int page,int rows, int stateId);
}
