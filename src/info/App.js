import React from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';
import SearchForm from './SearchForm';
import Axios from 'axios';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            user_data:[],
            edit_user_data:[]
        }
    }
    //add user to node js post method
    addUser = data =>{
        if(!data.isEdit){
            Axios.post("http://localhost:5000/users/add-user",data).then(res=>{
            this.getUserData();
            });
        }else{
            Axios.put(`http://localhost:5000/users/update-user/${data._id}`,data).then(res=>{
            this.getUserData();
            });
        }
       
    }

    //Search user from NOde JS
    searchUser = data =>{
        console.log(data);
        Axios.get(`http://localhost:5000/users/${data.search_text}`,data).then(res=>{
            this.setState({
                user_data:res.data
            })
            //console.log(res);
        })
    }

    //Delete user
    deleteUser = data =>{
        //console.log(data);
       var option = window.confirm(`Are you sure to delete ${data.user_name}`);
       if(option){
            Axios.delete(`http://localhost:5000/users//remove-user/${data._id}`,data).then(res=>{
            this.getUserData();
        })
       }
      
    }

    //update user to node js put method
    updateUser = data=>{
        this.setState({edit_user_data:data});    
       
    }

    componentDidMount(){
        this.getUserData();
    }

    //Get all users from node js get method
    getUserData(){
        Axios.get("http://localhost:5000/users").then(res=>{
            this.setState({
                user_data:res.data
            })
            //console.log(res);
        })
    }

    render(){
        return(
            <div className="container mt-4">
                <div className="text-center"><h1>Sample Application</h1></div>
                <div className="row">
                    <div className="col-6">
                       <UserForm userData={this.addUser} editUserData={this.state.edit_user_data}
                       />
                    </div>
                    <div className="col-6">
                        <SearchForm SearchData={this.searchUser}/>
                        <UserTable displayUser={this.state.user_data} 
                        editData={this.updateUser}  delData={this.deleteUser}/>
                    </div>

                </div>
            </div>
        )
    }
}

export default App;