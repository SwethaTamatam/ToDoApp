import React, { Component } from 'react';
import './App.css'
import ListItems from './components/ListItems';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       items:[],
       currentItem:{
        text:'',
        key:''
       }
    }
  }
  handleInput =(e)=>{
    this.setState({
      currentItem:{
        text:e.target.value,
        key:Date.now()
      }
    })
  }
  addItem = (e)=>{
    e.preventDefault()
    const newItem = this.state.currentItem;
    if(newItem.text.trim()!=""){
      this.setState({
        items :[newItem,...this.state.items],
        currentItem:{
          text:'',
          key:''
        }
      })
    }
  }
  deleteItem = (key) =>{
    const newItems = this.state.items.filter(item=>item.key!==key)
    this.setState({
      items:newItems
    })
  }
  setUpdate = (text,key) =>{
    const newItems = this.state.items.map(item=>{
      if(item.key===key){
        item.text = text;
      }
      return item;
    })
    this.setState({
      items:newItems
    })
  }
  render() {
    return (
      <div className='App'>
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
              <input type="text" placeholder='Enter todo ' value={this.state.currentItem.text} onChange={this.handleInput}/>
              <button type="submit" >Submit</button>
          </form>
        </header>
        <ListItems items={this.state.items} deleteItem = {this.deleteItem} setUpdate = {this.setUpdate}/>
      </div>
    );
  }
}

export default App;

