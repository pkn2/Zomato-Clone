import React from 'react';
import HomeBody from './HomeBody';
import HomeHader from './HomeHader';
import axios from 'axios';

class Home extends React.Component {

    constructor(){
        super();
        this.state={
            mealtypes:[]
        }
    }
 
    componentDidMount(){

        sessionStorage.setItem("city", 0)

        axios({
            method:'GET',
            url:'http://localhost:8080/mealtype',
            headers:{'Content-Type':'application/json'}
        }).then(res=>this.setState({mealtypes : res.data.meal}))
        .catch(err=>console.log(err))
        
    }


    render() {
        const {mealtypes}=this.state;
        return (
            <React.Fragment>
                <HomeHader />
                <HomeBody mealtypes={mealtypes}/>
            </React.Fragment>
        )
    }
}


export default Home;