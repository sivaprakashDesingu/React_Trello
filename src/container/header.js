import React from 'react';


export default  function  Header(){
    return(
        <header>
            <div suppressContentEditableWarning={true} contentEditable="true" className="left-board">
            Sample Board
            </div>
            <div className="title">ToDo App</div>
            <div className="profile"><i className="fa fa-user-circle-o" aria-hidden="true"></i></div>
        </header>
    )
}