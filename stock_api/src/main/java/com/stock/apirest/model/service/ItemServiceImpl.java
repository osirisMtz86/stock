package com.stock.apirest.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.stock.apirest.model.dao.IItemDao;
import com.stock.apirest.model.entity.Item;


@Service("item")
public class ItemServiceImpl implements IItemService {
	
	@Autowired
	private IItemDao iItemDao;

	@Override
	@Transactional(readOnly = true)
	public List<Item> findAll() {	
		return (List<Item>) iItemDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Item findById(Integer id) {
		return iItemDao.findById(id).orElse(null); 
	}

	@Override
	@Transactional
	public Item save(Item item) {
		return iItemDao.save(item);
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		iItemDao.deleteById(id);
	}


}
