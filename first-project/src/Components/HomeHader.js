import React from 'react';
import '../Styles/Home.css';
import exios from 'axios';
import { withRouter } from 'react-router-dom'

class HomeHader extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            suggestion: [],
            text: '',
            restaurent: [],


            location: []
        }
    }

    componentDidMount = () => {
        exios({
            method: 'GET',
            url: 'http://localhost:8080/citylist',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => this.setState({ location: res.data.cityname }))
            .catch(err => console.log(err))
    }

    onTextchange = (e) => {
        const value = e.target.value;
        const { restaurent } = this.state;
        let suggestion = [];

        if (value.length > 0) {
            suggestion = restaurent && restaurent.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        }

        this.setState(() => ({
            suggestion: suggestion,
            text: value
        }))
    }

    selectedtext(value) {
        this.setState({
            text: value.name,
            suggestion: [],
        }, () => {
            this.props.history.push(`/details/${value._id}`)
        })
    }

    rendersuggestion = () => {
        let { suggestion } = this.state;

        if (suggestion.length == 0) {
            return null;
        }
        return (

            <div className="serbox">
                {
                    suggestion.map((item, index) => (
                        <React.Fragment>
                            <div style={{ height: '72px' }} key={index} onClick={() => this.selectedtext(item)}>

                                <img src={item.thumb} className="hocerimg" alt="Restaurants" height="50" width="50" />

                                <span className="hoti">{item.name}</span>
                                <br /><br />
                                <span className="addre">{item.locality}</span>

                            </div>
                            <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
                        </React.Fragment>))
                }
            </div>
        );
    }


    handleChange = (event) => {
        const city = event.target.value;

        sessionStorage.setItem("city", city)

        exios({
            method: 'GET',
            url: `http://localhost:8080/resbycity/${city}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(res => this.setState({ restaurent: res.data.restbyloc }))
            .catch(err => console.log(err))
    }

    render() {
        const { location } = this.state;
        const { text } = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12" id="bg-gra" style={{ height: '480px' }}>

                        <div id="bg" style={{ height: '480px', width: '100%' }}></div>

                        <div className="logocontaner position-absolute text-center">
                            <div className="logo text-cente">e!</div>
                        </div>
                        <div className="text-center" id="headtextcontainer">
                            <h3 className="headtitle">Find the best restaurants, cafés, and bars</h3>
                            <select type="search" id="locser" onChange={this.handleChange}>
                                <option value='0' selected hidden disabled>Select</option>
                                {location.map((item, value) => {
                                    return <option key={value} value={item.city_id}>{item.name}</option>
                                })}
                            </select>

                            <span className="glyphicon glyphicon-search"
                                style={{ backgroundColor: 'white', paddingLeft: '11px', color: 'rgb(148, 148, 135)', lineHeight: 'unset', display: 'inline-table', opacity: '2.8', marginLeft: '17px' }}>
                                <input type="text" id="resser" placeholder="Search for restaurants" value={text} onChange={this.onTextchange} />
                                {this.rendersuggestion()}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HomeHader);