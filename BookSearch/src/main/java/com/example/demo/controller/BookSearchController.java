package com.example.demo.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class BookSearchController {

	@Autowired
	JdbcTemplate jdbcTemplate;

	@RequestMapping(path = "/", method = RequestMethod.GET)
	public String index() throws IOException {
		return "home";
	}

	@RequestMapping(path = "/list", method = RequestMethod.GET)
	public String list(Model model) throws IOException {
		List<Map<String, Object>> lists = jdbcTemplate.queryForList("SELECT * FROM book;");
		model.addAttribute("lists", lists);
		return "list";
	}

	@RequestMapping(path = "/favorite", method = RequestMethod.GET)
	public String purchase(Model model) throws IOException {
		List<Map<String, Object>> favorites = jdbcTemplate.queryForList("SELECT * FROM favorite F INNER JOIN book B ON F.book_id = B.id;");
		model.addAttribute("lists", favorites);
		return "favorite";
	}

	@RequestMapping(path = "/register", method = RequestMethod.POST)
	public String register(String title, String src, String pages, String link) throws IOException {

		jdbcTemplate.update("INSERT INTO book (title,src,pages,link,favorite) VALUES(?,?,?,?,?)", title, src, pages,
				link, 0);
		return "redirect:/list";
	}

	@RequestMapping(path = "/deleteList/{id}", method = RequestMethod.GET)
	public String deleteList(@PathVariable("id") String id) throws IOException {
		jdbcTemplate.update("DELETE FROM book WHERE id = ?", id);
		return "redirect:/list";
	}

	@RequestMapping(path = "/deleteFavorite/{id}", method = RequestMethod.GET)
	public String deletePurchase(@PathVariable("id") String id) throws IOException {
		jdbcTemplate.update("DELETE FROM favorite WHERE book_id = ?", id);
		jdbcTemplate.update("UPDATE book SET favorite = 0 WHERE id = ?",id);
		return "redirect:/favorite";
	}

	@RequestMapping(path = "/favorite/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void purchase(@PathVariable("id") String id) throws IOException {
		int count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM favorite WHERE book_id = ?",
				Integer.class, id);
		if (count == 0) {
			jdbcTemplate.update("INSERT INTO favorite (book_id) VALUES(?)", id);
			jdbcTemplate.update("UPDATE book SET favorite = 1 WHERE id = ?", id);
		} else {
			jdbcTemplate.update("DELETE FROM favorite WHERE book_id = ?", id);
			jdbcTemplate.update("UPDATE book SET favorite = 0 WHERE id = ?", id);
		}
	}
}
