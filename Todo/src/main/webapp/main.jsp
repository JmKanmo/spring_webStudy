<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="com.fasterxml.jackson.core.type.TypeReference"%>
<%@page import="java.util.Map"%>
<%@page import="com.fasterxml.jackson.databind.ObjectMapper"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	ObjectMapper objectMapper = new ObjectMapper();
	String json = objectMapper.writeValueAsString((request.getAttribute("todo_list")));
	List<Map<String, String>> resultSet = objectMapper.readValue(json,
			new TypeReference<List<Map<String, String>>>() {
			});

	List<Map<String, String>> todo_list = new ArrayList<>();
	List<Map<String, String>> doing_list = new ArrayList<>();
	List<Map<String, String>> done_list = new ArrayList<>();

	for (Map<String, String> item : resultSet) {
		switch (item.get("type")) {
			case "TODO" : {
				todo_list.add(item);
				break;
			}
			case "DOING" : {
				doing_list.add(item);
				break;
			}
			case "DONE" : {
				done_list.add(item);
				break;
			}
		}
	}
	request.setAttribute("todo_list", todo_list);
	request.setAttribute("doing_list", doing_list);
	request.setAttribute("done_list", done_list);
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./css/main.css">
<script type="text/javascript">
	let todo_set = new Array();
	let doing_set = new Array();
</script>
<title>할일목록화면</title>
</head>

<body>
	<div class="wrap clear_fix">
		<div class="todo_box clear_fix">
			<nav class="menu">
				<h1 class="status_title">TODO</h1>
				<ul class="todo_list" id="todo">
					<c:forEach items="${todo_list}" var="item">
						<li class="item">
							<h2 class="todo_title">${item.title}</h2>
							<p class="todo_text">등록날짜:${item.regDate}, ${item.name}
								우선순위:${item.sequence}</p>
							<button type="button" class="move_btn">
								<span class="blind">카드우측한칸이동</span>
							</button>
						</li>
						<script>
							todo_set.push({
								id : "${item.id}"
							});
						</script>
					</c:forEach>
				</ul>
			</nav>

			<nav class="menu">
				<h1 class="status_title">DOING</h1>
				<ul class="todo_list" id="doing">
					<c:forEach items="${doing_list}" var="item">
						<li class="item">
							<h2 class="todo_title">${item.title}</h2>
							<p class="todo_text">등록날짜:${item.regDate}, ${item.name}
								우선순위:${item.sequence}</p>
							<button type="button" class="move_btn">
								<span class="blind">카드우측한칸이동</span>
							</button>
						</li>
						<script>
							doing_set.push({
								id : "${item.id}"
							});
						</script>
					</c:forEach>
				</ul>
			</nav>

			<nav class="menu">
				<h1 class="status_title">DONE</h1>
				<ul class="todo_list" id="done">
					<c:forEach items="${done_list}" var="item">
						<li class="item">
							<h2 class="todo_title">${item.title}</h2>
							<p class="todo_text">등록날짜:${item.regDate}, ${item.name}
								우선순위:${item.sequence}</p>
						</li>
					</c:forEach>
				</ul>
			</nav>
		</div>

		<a href="/mavenweb/TodoFormServlet" class="register"
			alt="">새로운 TODO 등록</a>
	</div>
	<script type="text/javascript" src="./js/main.js"></script>
</body>
</html>
