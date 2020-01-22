import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';

import { Card, NewItem } from './index'


class List extends Component {

    renderList = (list) => {
        const action = this.props[this.props.stateKey]
        const lists = list.map((item, i) => {
            return (

                <div className="list-item" key={i}>
                    <div className="list-header">
                        <h2  onBlur ={(e)=>this.props.handleListObjectUpdate(e.target.textContent,item.id,'name')} suppressContentEditableWarning={true} contentEditable="true" >{item.name}</h2>
                        <a onClick={()=>this.props.handleRemoveList(item.id)}href="#">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </a>

                    </div>

                    <div id={`list-${item.id}`}
                        onDrop={(ev) => this.handleDrop(ev)}
                        className="card-section">

                        <Card
                            distance={1}
                            openTheCard={(id) => this.props.openTheCard(item.id,id)}
                            card={item.cards}
                            onSortEnd={(index) => this.props.sortCards(item.id, index)} />
                    </div>
                    {item.newList.show ?
                        (
                            <NewItem
                                card={item.id}
                                keys={this.props.stateKey}
                                value={item.newList.name}
                                handleTextBoxValue={(value, keys, card) => this.props.handleTextBoxValue(value, keys, card)}
                                handleAddingNewItem={(keys, card) => this.props.handleAddingNewItem(keys, card)}
                                handleResetNewItem={(keys, card) => this.props.handleResetNewItem(keys, card)}
                            />
                        ) :
                        (
                            <a onClick={() => this.props.handleNewCard(this.props.stateKey, item.id)} href="#" className="new-control" title="Add New Card">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </a>
                        )
                    }

                </div >
            )
        })
        return lists;
    }

    render() {

        return (
            this.renderList(this.props.lists)
        )
    }
}

export default List;