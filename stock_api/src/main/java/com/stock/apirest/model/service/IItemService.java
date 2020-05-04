package com.stock.apirest.model.service;

import java.util.List;

import com.stock.apirest.model.entity.Item;

public interface IItemService {
	
	public List<Item> findAll();
	
	public Item findById(Integer id);
	
	public Item save(Item item);
	
	public void delete(Integer id);

}
