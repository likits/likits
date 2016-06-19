package com.likits.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

public class BaseAction extends ActionSupport implements ServletRequestAware, ServletResponseAware {

	private static final long serialVersionUID = 1L;
	HttpServletRequest request;
	HttpServletResponse response;

	public void toResponse(String json) {
		try {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write(json);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

}
