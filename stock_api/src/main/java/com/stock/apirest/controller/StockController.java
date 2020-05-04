package com.stock.apirest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.stock.apirest.model.entity.Item;
import com.stock.apirest.model.service.IItemService;


//@CrossOrigin(origins= {"http://localhost:4200", })
@CrossOrigin(origins= "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class StockController {
	
	
	@Autowired
	@Qualifier("item")
	private IItemService itemService;
	
	@GetMapping("/items")
	public List<Item> index(){
		return itemService.findAll();
		
	}
	
	@GetMapping("/item/{id}")
	public ResponseEntity<?> show(@PathVariable Integer id) {
		
		Item item = null;
		Map<String, Object> res = new HashMap<>();
		try {
			item = itemService.findById(id);
			
		}catch(DataAccessException e) {
			res.put("msn", " Some was Wrong...");
			res.put("error", e.getMessage());
			res.put("status", 500);
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.INTERNAL_SERVER_ERROR); // 500
		}
	
		if(item == null) {
			res.put("msn", " Item No. " + id.toString() + " Not Found...");
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.NOT_FOUND); // 404
		}
		return new ResponseEntity<Item>(item, HttpStatus.OK); // 200
		
	}
	
	@PostMapping("/item")
	public ResponseEntity<?>  create(@RequestBody Item item) {
	
		Item itemN = null;
		Map<String, Object> res = new HashMap<>();
		//return itemService.save(item);
		try {
			itemN = itemService.save(item);
			
		}catch(DataAccessException e) {
			res.put("msn", " Some was Wrong...");
			res.put("error", e.getMessage());
			res.put("status", 500);
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.INTERNAL_SERVER_ERROR); //500
		}
		res.put("msn", "Item has been created...");
		res.put("status", "201");
		res.put("item", itemN);
		return new ResponseEntity<Map<String, Object>>(res, HttpStatus.CREATED); //201
		
	}
	
	@PutMapping("/item/{id}")
	public ResponseEntity<?> update(@RequestBody Item item, @PathVariable Integer id) {
		
		Map<String, Object> res = new HashMap<>();
		Item itemUpd = null;
	
		try {
			Item itemAnt = itemService.findById(id);
			if(itemAnt == null) {
				res.put("msn", " Item No. " + id.toString() + " Not Found...This item cannot be updated");
				return new ResponseEntity<Map<String, Object>>(res, HttpStatus.NOT_FOUND); // 404
			}
			
			itemAnt.setName(item.getName());
			itemAnt.setInventoryCode(item.getInventoryCode());
			itemAnt.setAmount(item.getAmount());
			itemAnt.setQuantity(item.getQuantity());
			
			itemUpd = itemService.save(itemAnt);
		}catch(DataAccessException e) {
			res.put("msn", " Some was Wrong...Item cannot be updated");
			res.put("error", e.getMessage());
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.INTERNAL_SERVER_ERROR); //500
		}
	
		res.put("msn", "Item has been updated...");
		res.put("status", "201");
		res.put("item", itemUpd);
		return new ResponseEntity<Map<String, Object>>(res, HttpStatus.CREATED); //201
	}
	
	@DeleteMapping("/item/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		
		Map<String, Object> res = new HashMap<>();
		
		try {
			itemService.delete(id);
		}catch(DataAccessException e) {
			res.put("msn", " Some was Wrong...Item cannot be deleted");
			res.put("error", e.getMessage());
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.INTERNAL_SERVER_ERROR); //500
		}
		res.put("msn", "Item has been deleted");
		res.put("status", "200");
		return new ResponseEntity<Map<String, Object>>(res, HttpStatus.OK); //200
		
	}

	

}
