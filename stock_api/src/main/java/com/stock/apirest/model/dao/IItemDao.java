package com.stock.apirest.model.dao;

import org.springframework.data.repository.CrudRepository;

import com.stock.apirest.model.entity.Item;



public interface IItemDao extends CrudRepository<Item, Integer> {

}
