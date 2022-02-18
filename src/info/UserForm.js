import React from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class UserForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _id:"",
            user_name:"",
            user_email:"",
            age:"",
            city:"",
            isEdit:false,
            formErrors: {user_name: '', user_email: ''},
            user_nameValid: false,
            user_emailValid: false,
            formValid: false,
            disableSubmitButton: true
        }
        this.infoSubmit = this.infoSubmit.bind(this);
    }

    infoChange = event =>{
        /*this.setState({
             name: event.target.value
        });*/
        const {name,value} = event.target;
        this.setState({[name]:value}, () => { this.validateField(name, value) });
        this.setState({disableSubmitButton: false});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let user_nameValid = this.state.user_nameValid;
        let user_emailValid = this.state.user_emailValid;
    
        switch(fieldName) {
          case 'user_email':
            user_emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.user_email = user_emailValid ? '' : ' is invalid';
            break;
          case 'user_name':
            user_nameValid = value.length >= 6;
            fieldValidationErrors.user_name = user_nameValid ? '': ' is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        user_nameValid: user_nameValid,
                        user_emailValid: user_emailValid
                      }, this.validateForm);
      }

    validateForm() {
    this.setState({formValid: this.state.user_nameValid && this.state.user_emailValid});
    }

    errorClass(error) {
    return(error.length === 0 ? '' : 'text-danger');
    }

    isFormValid = () => {
        const {user_name, user_email, age, city} = this.state
        
        return user_name && user_email && age && city 
    }

    infoSubmit = event =>{
       event.preventDefault();
       if(!this.state.isEdit){
            //console.log(this.state.user_name);
            if(this.state.user_name ==="" && this.state.user_email === ""){        
                window.alert("Fill the fields");
            }else{
                let data={
                    isEdit:this.state.isEdit,
                    name:this.state.user_name,
                    email:this.state.user_email,
                    age:this.state.age,
                    city:this.state.city,
                    disableSubmitButton:false
                }      
                this.props.userData(data) 
                
            }     
                
       }
       else{
           event.preventDefault();
        let data={
            isEdit:this.state.isEdit,
            _id:this.state._id,
            name:this.state.user_name,
            email:this.state.user_email,
            age:this.state.age,
            city:this.state.city
        }
        this.props.userData(data);
       }
        
        //console.log(this.state.user_name);
        
    }

    componentWillReceiveProps(props){
        //console.log(props.editUserData);
        if(props.editUserData._id!=null){
            this.setState({    
                isEdit:true,
                _id:props.editUserData._id,
                user_name:props.editUserData.user_name,
                user_email:props.editUserData.user_email,
                age:props.editUserData.age,
                city:props.editUserData.city
               
            })
        }
    }
    
    render(){
        return(            
            <form onSubmit={this.infoSubmit.bind(this)} autoComplete="off">
                <h2>User Creation</h2>
                <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.user_name)}`}>
                    <label for="user_name">User Name:</label>
                    <input type="text" className="form-control" placeholder="Enter name" 
                    name="user_name" value={this.state.user_name} onChange={this.infoChange.bind(this)}/>
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.user_email)}`}>
                    <label for="email">Email address:</label>
                    <input type="email" className="form-control" placeholder="Enter email" 
                    name="user_email" value={this.state.user_email} onChange={this.infoChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label for="age">Age:</label>
                    <input type="text" className="form-control" placeholder="Enter age" 
                    name="age" value={this.state.age} onChange={this.infoChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label for="city">City:</label>
                    <input type="text" className="form-control" placeholder="Enter city" 
                    name="city" value={this.state.city} onChange={this.infoChange.bind(this)} />
                </div><br/>
                <button type="submit" disabled={this.state.disableSubmitButton} className="btn btn-primary">{this.state.isEdit? 'Update'  : 'Add'}</button>
            </form>
        )
    }
}

export default UserForm;