import './index.css'

import {AiFillDelete} from 'react-icons/ai'



const TodoItem = props => {
    const {eachData, onDeleteList} = props
    const {title, body, id} = eachData

    const onRemoveList = () => {
        onDeleteList(id)
    }


    return (
        <li className="listBox">
            <div className="titleBox">
                    <h1 className="title2">Id No: {id}</h1>
                    <h1 className="title">Title: {title}</h1>
                    <p className="body">Body: {body}</p>
            </div>
            <AiFillDelete onClick={onRemoveList} className="deleteButton"/>
        </li>
    )
}

export default TodoItem