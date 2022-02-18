import React from 'react';

class UserTable extends React.Component{
   constructor(props){
        super(props)
    }
    render(){
        return(
        <div className="container">
            <h2>Users List</h2>
                       
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>UserName</th>
                    <th>UserEmail</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Update</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {
                    //console.log(this.props.displayUser.length)
                    this.props.displayUser.length > 0 ?
                    (
                        this.props.displayUser.map(e => 
                                <tr key={e._id}>
                                    <td>{e.user_name}</td>
                                    <td>{e.user_email}</td>
                                    <td>{e.age}</td>
                                    <td>{e.city}</td>
                                    <td><button className="btn btn-primary" 
                                    onClick = {event =>{
                                        this.props.editData(e)
                                    }}>Edit</button></td>
                                    <td><button className="btn btn-primary" 
                                    onClick = {event =>{
                                        this.props.delData(e)
                                    }}>Delete</button></td>
                                </tr>
                        )
                    )
                    :
                    (
                        
                            <tr>
                                <td>No records found</td> 
                            </tr>
                        
                    
                    )
                }
                </tbody>
            </table>
            </div>
        )
    }
}

export default UserTable;