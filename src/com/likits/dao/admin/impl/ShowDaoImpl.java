package com.likits.dao.admin.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.likits.dao.BaseDao;
import com.likits.dao.admin.ShowDao;
import com.likits.entity.front.Article;

@Repository("showDao")
public class ShowDaoImpl extends BaseDao<Article, Integer> implements ShowDao
{
    
    public List<Article> findArticles(int page, int rows,int stateId)
    {
        Session session = this.getSessionFactory().getCurrentSession();
        String hql = "from Article as a where a.stateId=?";
        Query query = session.createQuery(hql);
        query.setParameter(0, stateId);        
        query.setFirstResult((page-1)*rows);
        query.setMaxResults(rows);
        @SuppressWarnings("unchecked")
        List<Article> articles = query.list();
        return articles;
    }

}
