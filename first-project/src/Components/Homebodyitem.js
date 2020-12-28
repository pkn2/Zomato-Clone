import React from 'react';
import '../Styles/Home.css'
import {withRouter} from 'react-router-dom'


class Homebodyitem extends React.Component {

    
    handleClick = (id) => {
        const city = sessionStorage.getItem("city");
        const cuisine = [];
        var page = [] ;
        this.props.history.push(`/filter/?mealtype=${id}&city=${city}&cuisine=${cuisine}&page=${page}`);
    }

    render() {
        const { id, name, content, image } = this.props;
        return (
            <div className="col-sm-12 col-md-6 col-lg-4" >
                <div className="titlecontainer" onClick={()=>this.handleClick(id)}>
                    <div className="titleComponent1">
                        <img src={require('../' + image)} alt="Restaurants" height="150" width="140" />
                    </div>
                    <div className="titleContainer2">
                        <div className="containerheading">{name}</div>
                        <div className="containerSubheading">{content}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Homebodyitem);
