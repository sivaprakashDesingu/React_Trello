import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { List } from './../../components'
import { throwStatement } from '@babel/types';

const cardsamepl = [
  {
    name: "List1",
    id: 0,
    newList: {
      show: false,
      name: '',
    },
    cards: [
      {

        name: "Recipe Listing page",
        id: 0,
        discription: `User Can land to this page anywhere from the application Like is user searching Mutton Briyani, we should crawl the category table along with the count which tagged has been tagged with the Recipe table. once user selected the purticular category we have to should the result which has been tagged with the recipe in the SR page.`,
        currentMessage: '',
        comment: [

          {
            user: '',
            message: "Design has been ready for listing page",
            time: 'Dec 14, 2015 at 3:55:03'
          },
          {
            user: '',
            message: "This is the page where we are going to list the recipes in out app.",
            time: 'Dec 14, 2015 at 4:55:45'
          }
        ]
      },
      {
        name: "Card2",
        id: 1,
        discription: "Card2 discription",
        currentMessage: '',
        comment: []
      }
    ]
  }
]
const initialState = {
  lists: [],
  isNewListName: '',
  isNewItem: false,
  newCard: {
    show: false,
    name: ''
  },
  cardshouldBelisted: {
    listId: 0,
    cardId: 0
  }

}
class Dash extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleAddingList() {
    const { lists, isNewListName } = this.state
    lists.push(
      {
        name: isNewListName,
        id: lists.length,
        newList: {
          show: false,
          name: ''
        },
        cards: []
      }
    )
    this.setState({ lists, isNewItem: false, isNewListName: '' })
  }

  handleAddingNewItem(keys, card) {
    const data = this.state[keys]
    const { lists } = this.state
    let toBeAdded = {
      name: lists[card].newList.name,
      id: lists[card].cards && lists[card].cards.length,
      discription: '',
      currentMessage: '',
      comment: []
    }
    if (keys === 'newCard') {
      lists[card].cards.push(toBeAdded)

    }
    lists[card].newList.name = ''
    lists[card].newList.show = false
    this.setState({ lists: lists })
  }

  handleNewCard(keys, card) {
    const { lists } = this.state
    lists[card].newList.show = !lists[card].newList.show
    this.setState({ lists })
  }

  handleTextBoxValue(value, keys, card) {
    const { lists } = this.state
    lists[card].newList.name = value
    this.setState({ lists })
  }

  getTime(){
    const date = new Date()
    const months = [
      'Jan','Feb','Mar',
      'Apr','May','Jun',
      'Jul','Aug','Sep',
      'Oct','Nov','Dec'
    ]
    // ${date.getDate()} ${date.getFullYear()} at ${date.getHours} ${date.setMinutes()}
    const fullformat = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return fullformat;
  }

  handleResetNewItem(keys, card) {
    const { lists } = this.state
    lists[card].newList.show = false;
    lists[card].newList.name = '';
    this.setState({ lists: lists })
  }
  sortCards(listId, index) {
    const { lists } = this.state
    const oldIndex = index.oldIndex
    const newIndex = index.newIndex
    const temp = lists[listId].cards[oldIndex]
    lists[listId].cards[oldIndex] = lists[listId].cards[newIndex]
    lists[listId].cards[newIndex] = temp
    this.setState(lists)

  }
  closeBox() {
    document.getElementById("lightbox").classList.remove("open")
    document.getElementById("card-details").classList.remove("open")
  }
  openCardModel(listId, cardId) {
    const { cardshouldBelisted } = this.state
    document.getElementById("lightbox").classList.add("open")
    document.getElementById("card-details").classList.add("open")

    cardshouldBelisted.listId = listId && listId
    cardshouldBelisted.cardId = cardId && cardId
    this.setState({ cardshouldBelisted })
  }

  renerMessages(comments) {

    const items = comments.map((item, i) => {
      return (
        <li key={item.time+i}>
          <div className="user">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          </div>
          <div className="message">
            <span>{item.message}</span>
          </div>
          <div className="tiemstatp">
            <span>{item.time}</span>
          </div>
        </li>
      )
    })
    return items;
  }

  handleTextArea(value, object, listId, cardId) {
    const { lists } = this.state
    lists[listId].cards[cardId][object] = value
    this.setState({ lists })
  }

  handleAddingComment(listId, cardId){
    const { lists } = this.state
    lists[listId].cards[cardId].comment.push(
      {
        "user":'',
        "message":lists[listId].cards[cardId].currentMessage,
        "time":this.getTime()
      }
    )
    lists[listId].cards[cardId].currentMessage=''
    this.setState({lists})
  }
  handleListObjectUpdate(value,listId,object){
    const { lists } = this.state
    lists[listId][object]= value
    this.setState({lists})
  }
  renderCardDetails() {
    const { cardshouldBelisted: { listId, cardId }, lists } = this.state
    return (
      <form className="card-user-input">
        <h3  suppressContentEditableWarning={true} contentEditable="true" >{lists[listId].cards[cardId].name}</h3>
        <h4 className="discription">Description</h4>
        <textarea onChange={(e) => this.handleTextArea(e.target.value, 'discription', listId, cardId)} className="dis-field" value={lists[listId].cards[cardId].discription} text="text" placeholder="Add the card Description" />
        <h4 className="discription">Activity</h4>
        <div className="currrent-comment">
          <textarea onChange={(e) => this.handleTextArea(e.target.value, 'currentMessage', listId, cardId)} className="comment-seciton" placeholder="Write you comment.." value={lists[listId].cards[cardId].currentMessage} rows="10" cols="10" ></textarea>
          <button onClick={(e)=> [e.preventDefault(),this.handleAddingComment(listId, cardId)]} className="" >Submit</button>
        </div>

        <ul className="existing-command">
          {this.renerMessages(lists[listId].cards[cardId].comment)}
        </ul>
      </form>
    )
  }

  handleRemoveList(listId){
    const { lists } = this.state
    delete lists[listId]
    this.setState({lists})
  }

  render() {

    const { lists, isNewItem, isNewListName } = this.state
    return (
      <div className="dashboard centered-1024">
        <Container fluid="md">
          <Row>
            <Col sm="12">

              <div className="list-wrapper">
                <List
                  items={this.state.items}
                  stateKey={'newCard'}
                  sortCards={(listId, index) => this.sortCards(listId, index)}
                  openTheCard={(listId, cardID) => this.openCardModel(listId, cardID)}
                  handleNewCard={(keys, card) => this.handleNewCard(keys, card)}
                  handleTextBoxValue={(value, keys, card) => this.handleTextBoxValue(value, keys, card)}
                  handleAddingNewItem={(keys, card) => this.handleAddingNewItem(keys, card)}
                  handleResetNewItem={(keys, card) => this.handleResetNewItem(keys, card)}
                  handleListObjectUpdate = {(value,listId,object) => this.handleListObjectUpdate(value,listId,object)}
                  handleRemoveList={(listId)=>this.handleRemoveList(listId)}
                  lists={lists}
                  newCard={this.state.newCard}
                />
                <div className="add-new-list">
                  {!isNewItem ? (
                    <a onClick={() => this.setState({ isNewItem: true })} href="#">
                      <span className="icons"><i className="fa fa-plus" aria-hidden="Plus icon"></i></span>
                      <span>Add New List</span>
                    </a>
                  )
                    : (
                      <form className="new-list-from">
                        <input onChange={(e) => this.setState({ isNewListName: e.target.value })} value={isNewListName} type="text" placeholder="Enter list name" />
                        <div className="btn-wrappar">

                          <button onClick={() => this.handleAddingList()}>
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </button>
                          <button onClick={() => this.setState({ isNewItem: false, isNewListName: '' })} className="cancel">
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </button>
                        </div>
                      </form>
                    )
                  }
                </div>

              </div>

            </Col>
          </Row>

        </Container>
        <div id="card-details" className="card-details">
          <div className="card-details-section">
            <div className="close-icon"><i onClick={() => this.closeBox()} class="fa fa-times" aria-hidden="true"></i></div>
            {this.state.lists.length>=1 ? this.renderCardDetails() : null}
          </div>

        </div>
      </div>
    );
  }
}

export default Dash;