import React from 'react';
import './modal.css';

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: "",
			status: "",
			username: "",
			email: ""
		}

		this.handleSave = this.handleSave.bind(this);
        this.textHandler = this.textHandler.bind(this);
        this.statusHandler = this.statusHandler.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			text: nextProps.text,
			status: nextProps.status,
			username: nextProps.username,
			email: nextProps.email
		})
	}

	textHandler(e) {
        this.setState({ text: e.target.value });
    }

    statusHandler(e) {
        this.setState({ status: e.target.value });
    }	
	
    handleSave() {
    	const item = this.state;
    	console.log(item);
    	this.props.modifyData(item)
    }

    render() {
    	return (
    		<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>                     
                        <div className="modal-body">
                            <p>
                                <span className="modal-lable">Text: </span>
                                <input type="text" 
                                    placeholder="text" 
									maxLength="35"
                                    value={this.state.text} 
                                    onChange={(e) => this.textHandler(e)} />
                            </p>
                            <p>
                                <span className="modal-lable">Status: </span>
                                <input type="number" 
                                    placeholder="0-10"
                                    min="0"
                                    max="10"                                      
                                    value={this.state.status} 
                                    onChange={(e) => this.statusHandler(e)}  />
                            </p>                            
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-dismiss="modal">Close
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                data-dismiss="modal" 
                                onClick={() => { this.handleSave() }}>Save changes
                            </button>
                        </div>                    
                    </div>
                </div>
            </div>
    		);
    }
} 

export default Modal;