<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	List<String> list = new ArrayList<>();
	list.add("hello");
	list.add("gello");
	list.add("sello");
	list.add("fello");

	request.setAttribute("list", list);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>

<body>
	<c:forEach items="${list}" var="item" begin="1">
		${item}<br>
	</c:forEach>
	
</body>
</html>