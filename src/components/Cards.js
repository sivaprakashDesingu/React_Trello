import React, { Component } from 'react';
import { SortableContainer, SortableElement, SortableHandle,arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value, openTheCard }) =>
    <div
        onClick={(e) => openTheCard(value.id)}
        className="list-item">
            <h2>{value.name}</h2>
    </div>
)


class Card extends Component {

    render() {
        return (
            <div className="list-item-wrapper">
                {this.props.card.map((value, index) => (
                    <SortableItem
                        openTheCard={(id) => this.props.openTheCard(id)}
                        key={`item-${index}`}
                        index={index}
                        useDragHandle={true}
                        value={value} />
                ))}
            </div>
        )
    }
}

export default SortableContainer(Card);