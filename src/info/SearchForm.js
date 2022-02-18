import React from 'react';

class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search_name:"",
           // isDisabled:false
        }
    }

    handleChange = event =>{
        this.setState({
            search_name : event.target.value
        });
    }

    handleSubmitClicked = event => {
        event.preventDefault();
        let data = {
            search_text:this.state.search_name
        }
        this.props.SearchData(data);
       /* if(!this.state.isEdit){
            
            this.setState({
                isDisabled: true
            });
        
            setTimeout(
            function() {
                this.enableComponents()
            }.bind(this),
            3000
            );
        }*/
    }
    
     /* enableComponents() {
        this.setState({
          isDisabled: false
        });
      }*/

    render(){
        return(
            
            <form autoComplete="off">
                <div className="row">
                    <div><h3>Search Form</h3></div>
                    <div className="col-8">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search" 
                                name="search_name" value={this.state.search_name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="col-4">
                        <button type="submit" className="btn btn-primary"
                        /*disabled={this.state.isDisabled}*/
                        onClick={this.handleSubmitClicked.bind(this)}
                        >Search</button>
                    </div>
                </div>
            </form>
        )
    }
    

}



export default SearchForm;