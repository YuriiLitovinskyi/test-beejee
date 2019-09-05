import React from 'react';
import './App.css';
import axios from "axios";
import Modal from "./modal/modal";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tasks: [],
      textToModal: "",
      statusToModal: "",
	    usernameToModal: "",
	    emailToModal: "",
      requiredItem: 0,
      id: 0,
  	  loginUsername: "",
  	  loginPass: "",
  	  loggedIn: false,
      page: 1,
      sort_field: "id",
      sort_direction: "asc"
      }

    this.loadData = this.loadData.bind(this);
    this.addData = this.addData.bind(this);
    this.replaceModalItem = this.replaceModalItem.bind(this);
  	this.modifyData = this.modifyData.bind(this);
  	this.handleUsername = this.handleUsername.bind(this);
  	this.handlePassword = this.handlePassword.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  	this.loggingOut = this.loggingOut.bind(this);
  	this.loginToServer = this.loginToServer.bind(this);
  };

  
  componentDidMount(){
    this.loadData();
  }
  
  handleUsername = (e) => {   
    this.setState({ loginUsername: e.target.value });   
  }
  
  handlePassword = (e) => {   
    this.setState({ loginPass: e.target.value });   
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
  	console.log(this.state.loginUsername);
  	console.log(this.state.loginPass);
  	this.setState({
      loggedIn: true
  	}, () => this.loginToServer());  		
  }
  
  loggingOut = (e) => {
    //e.preventDefault();
  	this.setState({
      loggedIn: false,
  	  loginUsername: "",
  	  loginPass: ""
  	});
  	console.log(this.state.loginUsername);
  	console.log(this.state.loginPass);
  }
	  

  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
      textToModal: this.state.tasks[index].text,
      statusToModal: this.state.tasks[index].status,
	    usernameToModal: this.state.tasks[index].username,
	    emailToModal: this.state.tasks[index].email,
      id: this.state.tasks[index].id      
    });
    console.log(index);    
    const i = this.state.requiredItem;
    console.log(i);
    console.log(this.state.tasks[i]); 
    console.log(this.state.id);   	
  }
  
//GET
  loadData = (e) => {
    axios.get("https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Yurii", {
      params: {
        sort_field: this.state.sort_field,
        sort_direction: this.state.sort_direction,
        page: this.state.page
      }
    })
    .then((request) => {
      console.log(request.data);
      console.log(request.data.message.tasks);
      this.setState({
        data: request.data,
        tasks: request.data.message.tasks
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

//POST
  addData = (e) => {
    e.preventDefault();     
    
    //values from input fields
    let form = new FormData();
    form.append("username", e.target[0].value);
    form.append("email", e.target[1].value);
    form.append("text", e.target[2].value);    

    let authOptions = {
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Yurii',
      crossDomain: true,
      method: 'POST',
      mimeType: "multipart/form-data",
      contentType: false,
      processData: false,
      data: form,
      dataType: "json",
      success: function(data) {
          console.log(data);
      }
    }

    axios(authOptions)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  modifyData = (item) => {
    const requiredItem = this.state.requiredItem;
    console.log(requiredItem);
    //const id = this.state.id;

    let form = new FormData();
  	form.append("username", item.username);
    form.append("email", item.email);
    form.append("text", item.text);
    form.append("status", item.status);

    let authOptions = {
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Yurii/edit/:' + item.id,
      crossDomain: true,
      method: 'POST',
      mimeType: "multipart/form-data",
      contentType: false,
      processData: false,
      data: form,
      dataType: "json",
	    success: function(data) {
          console.log(data);
      }
    }
    axios(authOptions)
    .then((res) => {
      console.log(res);
	  this.loadData();
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  loginToServer = (e) => {
    let form = new FormData();
  	form.append("username", this.state.loginUsername);
    form.append("password", this.state.loginPass);
	  form.append("email", "yurii@gmail.com");
	  form.append("text", "test text");

    let authOptions = {
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Yurii/login',
      crossDomain: true,
      method: 'POST',
      mimeType: "multipart/form-data",
      contentType: false,
      processData: false,
      data: form,
      dataType: "json",
	    success: function(data) {
          console.log(data);
      }
    }
    axios(authOptions)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })	  
  }

  prevPage() {
    if (this.state.page > 1) {
        this.setState({
          page: this.state.page - 1
    }, () => {
      this.loadData();
      console.log(this.state.page);
    });     
    }         
  }

  nextPage() {
    if ((this.state.data.message.total_task_count/this.state.page) > 3) {
      this.setState({
        page: this.state.page + 1
    }, () => {
      this.loadData();
      console.log(this.state.page);
      console.log(this.state.data.message.total_task_count);
    });
    }        
  }

//Sort data from server
  sortById() {
    this.setState({
      sort_field: "id"
    }, () => {
      this.loadData();
    });
  }

  sortByUsername() {
    this.setState({
      sort_field: "username"
    }, () => {
      this.loadData();
    });
  }

  sortByEmail() {
    this.setState({
      sort_field: "email"
    }, () => {
      this.loadData();
    });
  } 

  sortByStatus() {
    this.setState({
      sort_field: "status"
    }, () => {
      this.loadData();
    });
  }

  sortByDirectionAsc() {
    this.setState({
      sort_direction: "asc"
    }, () => {
      this.loadData();
    });
  }

  sortByDirectionDesc() {
    this.setState({
      sort_direction: "desc"
    }, () => {
      this.loadData();
    });
  }


render(){

  // let tasks = Object.values(this.state.tasks);
  // let taskKey = Object.keys(this.state.tasks);
  // console.log(tasks);
  // console.log(taskKey); 

  return (
    <div className="App">
      <h1>Task Application</h1>     
   

        <div className="container">		
		
		<div className="loginForm">		
		  <form onSubmit={this.handleSubmit}>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInput">Login</label>
            <input type="text" 
      	           className="form-control mb-2" 
      			       id="inlineFormInput" 
            			 placeholder="Login"
            			 required             
                   onChange={(e) => this.handleUsername(e)}
                   value={this.state.loginUsername}			 
      			 />
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInputGroup">Password</label>
            <div className="input-group mb-2">        
              <input type="password" 
          		       className="form-control" 
            			   id="inlineFormInputGroup" 
            			   placeholder="Password"
            			   autoComplete="password" 
            			   required			  
                     onChange={(e) => this.handlePassword(e)}
                     value={this.state.loginPass}			   
      			   />
            </div>
          </div>
          <div className="col-auto">     
          </div>
          <div className="col-auto">
            <button type="submit" 
                    className="btn btn-primary mb-2" 
                    disabled={this.state.loggedIn ? true : false}
                    >Login</button>
			<button className="btn btn-primary mb-2 logout" 
          		    onClick={(e) => this.loggingOut(e)}
          		    disabled={!this.state.loggedIn ? true : false}
          		    >Logout</button>
          </div>
        </div>
      </form>
	  </div>
      
		
		
		
          <table className="table table-striped">
            <thead className="thead-dark tableHead">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>            
                <th scope="col">E-Mail</th>
                <th scope="col">Task Text</th>
                <th scope="col">Task Status</th>
                <th scope="col">Edit</th>            
              </tr>
            </thead>
            <tbody>
              {this.state.tasks.map((item, index) => {
                return (   
                  <tr key={ item.id}>
                    <td>{ index + 1 }</td>
                    <td>{ item.username }</td>
                    <td>{ item.email }</td>
                    <td>{ item.text }</td>
                    <td>{ item.status }</td>
                    <td><i onClick={() => this.replaceModalItem(index)}					      
                          className={this.state.loggedIn ? "far fa-edit btnEdit" : "far fa-edit btnEdit disabled" } 
                          data-toggle="modal" 
                          data-target="#exampleModal">
                   </i></td>               
                  </tr>
                  )
              })}
            </tbody>
          </table> 
                    
          <nav aria-label="Page navigation example">           
            <button type="button" className="btn btn-light btn-sm" onClick={this.prevPage.bind(this)}>Prev</button>
            <button type="button" className="btn btn-light btn-sm" disabled>{this.state.page}</button>
            <button type="button" className="btn btn-light btn-sm" onClick={this.nextPage.bind(this)}>Next</button>
          </nav>
          <div className="dropdown">
            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort by
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button className="dropdown-item btn-sm" type="button" onClick={this.sortById.bind(this)}>id</button>
              <button className="dropdown-item btn-sm" type="button" onClick={this.sortByUsername.bind(this)}>username</button>
              <button className="dropdown-item btn-sm" type="button" onClick={this.sortByEmail.bind(this)}>email</button>
              <button className="dropdown-item btn-sm" type="button" onClick={this.sortByStatus.bind(this)}>status</button>
              <button className="dropdown-item btn-sm" type="button" onClick={this.sortByDirectionAsc.bind(this)}>asc</button>
              <button className="dropdown-item btn-sm" type="button" onClick={this.sortByDirectionDesc.bind(this)}>desc</button>
            </div>
          </div>
          <br />

          <form id="formId" className="form-group" onSubmit={this.addData}>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"><b>User Name:</b></label>
                <div className="col-sm-10">
                  <input                      
                    type="text" 
                    className="form-control"                      
                    placeholder="username" 
                    required 
                    />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"><b>E-Mail:</b></label>
                <div className="col-sm-10">
                  <input                       
                    type="email" 
                    className="form-control"                      
                    placeholder="email" 
                    required 
                    />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"><b>Task Text:</b></label>
                <div className="col-sm-10">
                  <input                      
                    type="text" 
                    className="form-control"                      
                    placeholder="text" 
                    required 
                    />
                </div>
            </div>            
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-10">
                  <button 
                    className="btn btn-primary btn-front" 
                    type="submit">Add New Task
                  </button> 
                </div>
            </div>                     
        </form>

        </div>  

        <Modal    
            text={this.state.textToModal} 
            status={this.state.statusToModal}  
            username={this.state.usernameToModal} 
            email={this.state.emailToModal} 
            id={this.state.id}			
            modifyData={this.modifyData}          
         />     
    </div>
  );
}
}
  

export default App;
