import React, { Component } from 'react';


class NewItem extends Component {

    render() {
        const {value,keys,card} = this.props
        return (
            <form className="new-list-from">
                <input 
                onChange={(e) => this.props.handleTextBoxValue(e.target.value,keys,card)}
                value={value} type="text" placeholder="Enter list name" />
                <div className="btn-wrappar">

                    <button onClick={() => this.props.handleAddingNewItem(keys,card)}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </button>
                    <button onClick={() => this.props.handleResetNewItem(keys,card)} className="cancel">
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
        )
    }
}

export default NewItem;