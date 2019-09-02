import React from 'react';
import './App.css';

import axios from "axios";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tasks: []
    }

    this.loadData = this.loadData.bind(this);
    this.addData = this.addData.bind(this);
  };

  
  componentDidMount(){
    this.loadData();
  }

//GET
  loadData = (e) => {
    axios.get("https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Yuriy")
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
    // axios.post("https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Yuriy", {
    //   username: e.target[0].value,
    //   email: e.target[1].value,
    //   text: e.target[2].value
    // })
    //values from input fields
    let form = {                
      username: e.target[0].value, 
      email: e.target[1].value,
      text: e.target[2].value
    }

    let authOptions = {
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Yuriy',
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


render(){

  // let tasks = Object.values(this.state.tasks);
  // let taskKey = Object.keys(this.state.tasks);
  // console.log(tasks);
  // console.log(taskKey); 

  return (
    <div className="App">
      <h1>Task Application</h1>     
   

        <div className="container">
          <table className="table table-striped">
            <thead className="thead-dark tableHead">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>            
                <th scope="col">E-Mail</th>
                <th scope="col">Task Text</th>
                <th scope="col">Task Status</th>            
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
                  </tr>
                  )
              })}
            </tbody>
          </table> 
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
    </div>
  );
}
}
  

export default App;
