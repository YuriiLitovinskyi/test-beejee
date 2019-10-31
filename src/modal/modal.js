import React from 'react';
import './modal.css';

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: "",
			status: "",
			username: "",
			email: "",
			id: ""
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
			email: nextProps.email,
			id: nextProps.id
		})
	}

	textHandler(e) {
        this.setState({ text: e.target.value });
    }

    statusHandler(e) {
        this.setState({ status: +e.target.value });   // '+'' converts string to number
    }	
	
    handleSave() {
    	const item = this.state;
    	//console.log(item);
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
                                       className="inputText" 
                                       placeholder="text" 
									   maxLength="35"
                                       value={this.state.text} 
                                       onChange={(e) => this.textHandler(e)} />
                            </p>                            
                            <div className="form-check form-check-inline">
                              <label className="form-check-label" htmlFor="inlineRadio1">Open</label>
							  <input className="form-check-input" 
							         type="radio"
							         name="inlineRadioOptions" 
							         id="inlineRadio1" 
							         value={0}
							         checked={this.state.status === 0 ? true : false}
							         onChange={(e) => this.statusHandler(e)} />							  
							</div>
							<div className="form-check form-check-inline">
							  <label className="form-check-label" htmlFor="inlineRadio2">Done</label>
							  <input className="form-check-input" 
							         type="radio" 
							         name="inlineRadioOptions" 
							         id="inlineRadio2" 
							         value={10}
							         checked={this.state.status === 10 ? true : false}
							         onChange={(e) => this.statusHandler(e)} />							  
							</div>                            
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-dismiss="modal">Cancel
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