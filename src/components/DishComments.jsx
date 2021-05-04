import React from 'react'
import { ListGroup } from 'react-bootstrap'

class DishComments extends React.Component {


    render () {

        return (
    this.props.dish ? 
    <div className={`mt-${this.props.marginTop}`}>
        <h2>Comments for {this.props.dish.name}</h2>
        <ListGroup>
            {
                this.props.dish.comments.map(c => (
                    <ListGroup.Item key={c.id}>"{c.comment}" from {c.author}</ListGroup.Item>
                ))
            }
        </ListGroup>
    </div> : <h3>Error - developer has screwed up! PLease contact system administrator.</h3>
        )
    }
}

export default DishComments