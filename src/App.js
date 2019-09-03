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
      requiredItem: 0,
      id: 0
    }

    this.loadData = this.loadData.bind(this);
    this.addData = this.addData.bind(this);
    this.replaceModalItem = this.replaceModalItem.bind(this);
  };

  
  componentDidMount(){
    this.loadData();
  }

  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
      textToModal: this.state.tasks[index].text,
      statusToModal: this.state.tasks[index].status,
      id: this.state.tasks[index].id      
    });
    console.log(index);    
    const i = this.state.requiredItem;
    console.log(i);
    console.log(this.state.tasks[i]);
  }
  
//GET
  loadData = (e) => {
    axios.get("https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Yurii", {
      params: {
        sort_field: "id",
        sort_direction: "asc",
        page: 1
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

  modifyData(item) {
    //const requiredItem = this.state.requiredItem;
    //console.log(requiredItem);
    const id = this.state.id;

    let form = new FormData();
    form.append("text", item.text);
    form.append("status", item.status);

    let authOptions = {
      url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Yurii/edit/:' + id,
      crossDomain: true,
      method: 'POST',
      mimeType: "multipart/form-data",
      contentType: false,
      processData: false,
      data: form,
      dataType: "json"
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
                          className="far fa-edit btnEdit" 
                          data-toggle="modal" 
                          data-target="#exampleModal">
                   </i></td>               
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

        <Modal    
            text={this.state.textToModal} 
            status={this.state.statusToModal}             
            modifyData={this.modifyData}          
         />     
    </div>
  );
}
}
  

export default App;
