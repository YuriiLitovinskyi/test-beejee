import React from 'react';
import ReactDOM from 'react-dom';
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
      id: 0,
  	  loginUsername: "",
  	  loginPass: "",
  	  loggedIn: false,
      page: 1,
      sort_field: "id",
      sort_direction: "asc",
	    token: "",
	    userNamePost: "",
	    emailPost: "",
	    textPost: "",
      postStatus: "",
      loginStatus: "",
      loginMessageUsername: "",
      loginMessagePass: "",
      postMessageUsername: "",
      postMessageEmail: "",
      postMessageText: ""
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
	  this.handleUsernamePost = this.handleUsernamePost.bind(this);
  	this.handleEmailPost = this.handleEmailPost.bind(this);
	  this.handleTextPost = this.handleTextPost.bind(this);
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
  
  handleUsernamePost = (e) => {   
    this.setState({ userNamePost: e.target.value });   
  }
  
  handleEmailPost = (e) => {   
    this.setState({ emailPost: e.target.value });   
  }
  
  handleTextPost = (e) => {   
    this.setState({ textPost: e.target.value });   
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
  	//console.log(this.state.loginUsername);
  	//console.log(this.state.loginPass);
  	this.setState({
      loggedIn: true
  	}, () => this.loginToServer());  		
  }
  
  loggingOut = (e) => {    
  	this.setState({
      loggedIn: false,
  	  loginUsername: "",
  	  loginPass: ""
  	});
  	//console.log(this.state.loginUsername);
  	//console.log(this.state.loginPass);
  }
	  

  replaceModalItem(index) {
    this.setState({      
      textToModal: this.state.tasks[index].text,
      statusToModal: this.state.tasks[index].status,
	    usernameToModal: this.state.tasks[index].username,
	    emailToModal: this.state.tasks[index].email,
      id: this.state.tasks[index].id      
    });     	
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
      //console.log(request.data);
      //console.log(request.data.message.tasks);
      //console.log(this.state.loggedIn);
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
      //console.log(res);
  	  this.setState({
  		  userNamePost: "",
  	    emailPost: "",
  	    textPost: "",
        postStatus: res.data.status,
        postMessageUsername: res.data.message.username,
        postMessageEmail: res.data.message.email,
        postMessageText: res.data.message.text
	  }, () => {
      //console.log(this.state.postStatus);
		  this.loadData();
      if (this.state.postStatus === "ok") {
        //alert("New Task was added successfully!");
        ReactDOM.render(<p className="successParagraph"><strong>New Task was added successfully!</strong></p>, document.getElementById('alert2'));
            setTimeout( () => {
                ReactDOM.unmountComponentAtNode(document.getElementById('alert2'));
            }, 5000);
      } else {
        //alert(`Error! New Task wasn't added!\nServer response:\nusername: ${this.state.postMessageUsername}\nemail: ${this.state.postMessageEmail}\ntext: ${this.state.postMessageText}`);
        ReactDOM.render(<p className="errorParagraph"><strong>Error! New Task wasn't added! Server response:</strong><br /> username: { this.state.postMessageUsername }<br /> email: { this.state.postMessageEmail }<br /> text: { this.state.postMessageText }</p>, document.getElementById('alert2'));
            setTimeout( () => {
                ReactDOM.unmountComponentAtNode(document.getElementById('alert2'));
            }, 5000);
      }		  
	  });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  modifyData = (item) => {  

    let form = new FormData();
  	form.append("username", item.username);
    form.append("email", item.email);
    form.append("text", item.text);
    form.append("status", item.status);
	  form.append("token", this.state.token);

    let authOptions = {
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/edit/' + item.id + '?developer=Yurii',  
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
      //console.log(res);
	    this.loadData();
      ReactDOM.render(<p className="successParagraph"><strong>Task was successfully modified!</strong></p>, document.getElementById('alert1'));
            setTimeout( () => {
                ReactDOM.unmountComponentAtNode(document.getElementById('alert1'));
            }, 5000);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  //Login  
  loginToServer = (e) => {
    let form = new FormData();
  	form.append("username", this.state.loginUsername);
    form.append("password", this.state.loginPass);
	  form.append("email", "yurii@gmail.com");
	  form.append("text", "test text");

    let authOptions = {
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Yurii',
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
      //console.log(res);
  	  this.setState({
  		  token: res.data.message.token,
        loginStatus: res.data.status,
        loginMessagePass: res.data.message.password,
        loginMessageUsername: res.data.message.username
  	  }, () => {
  		  //console.log(this.state.token);
        if (this.state.loginStatus !== "ok") {
          //alert("Registration error!\nServer response:\nusername: " + this.state.loginMessageUsername + `\npassword: ${this.state.loginMessagePass}`);
          ReactDOM.render(<p className="errorParagraph"><strong>Registration error! Server response:</strong><br /> username: { this.state.loginMessageUsername }<br /> password: { this.state.loginMessagePass }</p>, document.getElementById('alert1'));
            setTimeout( () => {
                ReactDOM.unmountComponentAtNode(document.getElementById('alert1'));
            }, 5000);
          this.setState({
            loggedIn: false
          });
        } else {
          ReactDOM.render(<p className="successParagraph"><strong>Registration was succesfull!</strong></p>, document.getElementById('alert1'));
            setTimeout( () => {
                ReactDOM.unmountComponentAtNode(document.getElementById('alert1'));
            }, 5000);
        }
  	  });
    })
    .catch((err) => {
      console.log(err);
    })	  
  }

  //Pagination
  prevPage() {
    if (this.state.page > 1) {
        this.setState({
          page: this.state.page - 1
        }, () => {
          this.loadData();
          //console.log(this.state.page);
    });      
    }         
  }

  nextPage() {
    if ((this.state.data.message.total_task_count/this.state.page) > 3) {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.loadData();
        //console.log(this.state.page);
        //console.log(this.state.data.message.total_task_count);
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

          <div className="alerts" id="alert1"></div> 

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
                    <td className={item.status === 0 ? "openTask" : "doneTask"}>{ item.status === 0 ? "open" : "done (edited)" }</td>
                    <td><i onClick={() => this.replaceModalItem(index)}					      
                          className={this.state.loggedIn ? "far fa-edit btnEdit" : "far fa-edit btnEdit disabled" } 
                          data-toggle="modal" 
                          data-target="#exampleModal">
                   </i><span className={this.state.loggedIn ? "tooltipLogged" : "tooltiptext"}>You need to be logged in!</span>
                    </td>               
                  </tr>
                  )
              })}
            </tbody>
          </table> 
                    
          <nav aria-label="Page navigation example">           
            <button type="button" className="btn btn-light btn-sm paginBtn" onClick={this.prevPage.bind(this)}>Prev</button>
            <button type="button" className="btn btn-light btn-sm paginBtn" disabled>{this.state.page}</button>
            <button type="button" className="btn btn-light btn-sm paginBtn" onClick={this.nextPage.bind(this)}>Next</button>
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

          <div className="alertsNewTask" id="alert2"></div>

          <form id="formId" className="form-group" onSubmit={this.addData}>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"><b>User Name:</b></label>
                <div className="col-sm-10">
                  <input                      
                    type="text" 
                    className="form-control"                      
                    placeholder="username"                     
                    onChange={(e) => this.handleUsernamePost(e)}	
                    value={this.state.userNamePost} 					
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
					          onChange={(e) => this.handleEmailPost(e)}	
                    value={this.state.emailPost} 
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
					          onChange={(e) => this.handleTextPost(e)}	
                    value={this.state.textPost} 
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
