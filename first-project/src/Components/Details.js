import React from 'react';
import '../Styles/Details.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import exios from 'axios';
import Modal from 'react-modal';
import ReactStars from "react-rating-stars-component";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};



class Details extends React.Component {

    constructor() {
        super();
        this.state = {
            restaurant: {},
            oderModelIsOpen: false,
            addressModelIsOpen: false,
            fooditem: [],
            totalprice: 0,
            totalitem: [],
            paymentresult: [],
            paymentmessage: '',
            fullname: '',
            mobileNumber: '',
            address: '',
            logindata: false,
            userph: ''
        }
    }


    componentDidMount() {
        const restid = this.props.location.pathname.split('/')[2];

        const logindata = sessionStorage.getItem('isloggedin');

        var logindatabool = (logindata == 'true');

        exios({
            method: 'GET',
            url: 'http://localhost:8080/resbyid/' + restid,
            headers: { 'content-Type': 'application/json' }
        }).then(res => this.setState({ restaurant: res.data.restaurant, logindata: logindatabool }))
            .catch(err => console.log(err))
    }

    oderhandle = () => {
        const itemid = this.props.location.pathname.split('/')[2];
        exios({
            method: 'GET',
            url: 'http://localhost:8080/itembyid/' + itemid,
            headers: { 'content-Type': 'application/json' }
        }).then(res => {

            var userdata = JSON.parse(sessionStorage.getItem("user"));
            var pp = userdata == null ? null : userdata[0].Mob_number;


            this.setState({ oderModelIsOpen: true, fooditem: res.data.cityname, userph: pp })

        }).catch(err => console.log(err))
    }

    closeoderModel = () => {
        this.setState({ oderModelIsOpen: false, totalprice: 0, totalitem: 0 })
    }



    DecreaseItem = (v) => {
        var a = v;

        const { fooditem, totalprice } = this.state;

        var obj = fooditem.filter((item) => (item._id) == a);

        var h = parseInt(obj[0].price);

        obj[0].qty = parseInt(obj[0].qty - 1);

        this.setState({
            totalprice: totalprice - h,
            fooditem: fooditem
        });
    };
    IncrementItem = (v) => {
        var a = v;

        const { fooditem } = this.state;

        const obj = fooditem.filter((item) => (item._id) == a);

        var h = parseInt(obj[0].price);

        obj[0].qty = parseInt(obj[0].qty + 1);

        this.setState(prevState => {
            if (prevState.totalitem < 99) {
                return {
                    totalprice: prevState.totalprice + h,
                    fooditem: fooditem
                }
            } else {
                return null;
            }
        });
    };

    handlechanging = (event, state) => {
        this.setState({ [state]: event.target.value })
    }

    closeaddressmodel = () => {
        this.setState({ addressModelIsOpen: false, totalprice: 0, totalitem: 0 })
    }

    pay = () => {
        const { fooditem, userph, totalprice } = this.state;


        const logi = sessionStorage.getItem('isloggedin');

        var logibool = (logi == 'true');

        var em = sessionStorage.getItem('useremail');


        var userdata = JSON.parse(sessionStorage.getItem("user"));
        var pp = userdata == null ? null : userdata[0].first_name;

        var desired = pp == null ? null : pp.replace(/\s+/g, '')


        var pkn = [];
        fooditem.filter((item) => {
            if (item.qty > 0) {
                const p = item.name;
                const qty = item.qty;
                const pric = item.price;
                pkn.push({ 'name': p, 'quantity': qty, 'price': pric });
            }
        });

        this.setState({ oderModelIsOpen: false, addressModelIsOpen: true, totalitem: pkn, logindata: logibool })

        const paytmdata = {
            amount: '' + totalprice,
            customerId: desired,
            customerEmail: em,
            customerPhone: userph
        }

        exios({
            method: 'POST',
            url: 'http://localhost:8080/paytmpayment',
            headers: { 'content-Type': 'application/json' },
            data: paytmdata
        }).then(res => this.setState({ paymentresult: res.data }))
            .catch(err => console.log(err))
    }

    buildForm({ action, params }) {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
        //form.setAttribute('target', target)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form
    }

    post(details) {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }


    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj(val) {
        return typeof val === 'object'
    }

    stringifyValue(val) {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    proceed = () => {

        const { fullname, mobileNumber, address, totalprice, totalitem } = this.state;

        const mail = sessionStorage.getItem('useremail');

        const orderId = this.state.paymentresult;

        const user = {
            name: fullname,
            mobile_no: mobileNumber,
            address: address,
            email_address: mail,
            total_price: totalprice,
            total_item: totalitem,
            order_id: orderId.ORDER_ID
        }

        exios({
            method: 'POST',
            url: 'http://localhost:8080/orderdata',
            headers: { 'content-Type': 'application/json' },
            data: user
        }).then(res => {

            this.setState({ addressModelIsOpen: res.data.isModelisopen })

            var details = {
                action: 'https://securegw-stage.paytm.in/order/process',
                params: this.state.paymentresult
            };
            this.post(details);        

        }).catch(err => console.log(err))

    }

    setValue = (event) => {

        this.setState({ mobileNumber: event })

    }

    render() {

        const { restaurant, oderModelIsOpen, addressModelIsOpen, fooditem, totalprice, fullname, mobileNumber, address, logindata } = this.state;
        return (
            <div>
                {restaurant != null ?
                    <div>
                        <div className="container">
                            <div className="imgcon">
                                <img src={restaurant.thumb} alt="Restaurants" height="100%" width="100%" />


                                <button type="button" className="butt btn btn-light">Click to see Image Gallery </button>
                            </div>
                        </div>

                        <div className="container">

                            <span className="headertexcont" >{restaurant.name}</span>

                            <button onClick={this.oderhandle} type="button" className="button btn btn-danger">Place Online Order</button>

                        </div>

                        <div className="container">
                            <Tabs>
                                <TabList>
                                    <Tab>Overview</Tab>
                                    <Tab>Contact</Tab>
                                </TabList>

                                <TabPanel>
                                    <h3 className="adp">About this place</h3>
                                    <p className="cusi">Cuisine</p>
                                    {restaurant && restaurant.Cuisine && restaurant.Cuisine.map((item) => {
                                        return <p className="mt">{item.name}</p>
                                    })}
                                    <p className="ac">Average Cost</p>
                                    <p className="cost">₹{restaurant.cost} for two people (approx.)</p>
                                </TabPanel>
                                <TabPanel>
                                    <h2 className="pnt">Phone Number</h2>
                                    <p className="ph">{restaurant.contact_number}</p>
                                    <p className="rn">{restaurant.name}</p>
                                    <p className="ad">{restaurant.address}</p>
                                </TabPanel>
                            </Tabs>

                        </div>
                    </div> : null}


                <Modal
                    isOpen={oderModelIsOpen}
                    style={customStyles}
                >
                    <React.Fragment>

                        <div className="oderbx" >

                            <button onClick={this.closeoderModel} type="button" className="close" aria-label="Close" style={{ paddingRight: '13px', paddingLeft: '15px' }}>
                                <span aria-hidden="true" >&times;</span>
                            </button>

                            <div className="ming">{restaurant.name}</div>

                            <div className="scrall">
                                {fooditem && fooditem.map((item, index) => {
                                    return (
                                        <React.Fragment>
                                            <div className="itemcont">

                                                <div className="textcont">
                                                    <p className="head">{item.name}</p>
                                                    <span>
                                                        <ReactStars
                                                            count={5}
                                                            size={19}
                                                            value={item.rating}
                                                            a11y={true}
                                                            edit={false}
                                                            isHalf={true}
                                                            emptyIcon={<i className="far fa-star"></i>}
                                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                            fullIcon={<i className="fa fa-star"></i>}
                                                            activeColor="#ffd700"
                                                        />
                                                    </span>
                                                    <p className="price">₹ {item.price}</p>
                                                    <p className="dec">{item.description}</p>
                                                </div>

                                                <div className="picturecont">
                                                    <img src={require('../' + item.img)} alt="Restaurants" height="90" width="90" style={{ borderRadius: '10%', margin: '15px 5px -13px 5px' }} />

                                                    {item.qty > 0 ? <div className="addbutton">
                                                        <button key={item} value={item._id} onClick={() => this.DecreaseItem(item._id)}>-</button>
                                                        <div className="num" >{item.qty}</div>
                                                        <button key={index} value={item._id} onClick={() => this.IncrementItem(item._id)}>+</button>

                                                    </div> : <button key={index} value={item._id} onClick={() => this.IncrementItem(item._id)} className="addbutton">ADD</button>}
                                                </div>

                                            </div>
                                            <hr />
                                        </React.Fragment>
                                    )
                                })}
                            </div>

                            <div >
                                <span className="total">Subtotal</span>
                                <div className="totalprice">₹ {totalprice}</div>
                                {totalprice > 0 ? <button className="paybt btn btn-danger" onClick={this.pay}>Pay Now</button> : null}
                            </div>

                        </div>

                    </React.Fragment>

                </Modal>





                <Modal
                    isOpen={addressModelIsOpen}
                    style={customStyles}
                >
                    <React.Fragment>



                        <button onClick={this.closeaddressmodel} type="button" className="close" aria-label="Close" style={{ paddingRight: '13px', paddingLeft: '15px' }}>
                            <span aria-hidden="true" >&times;</span>
                        </button>

                        <div className="ming">{restaurant.name}</div>



                        {logindata == true ? <form className="fd">
                            <label >Name</label><br />
                            <input className="na" type="text" placeholder="Enter your name" required value={fullname} onChange={(event) => this.handlechanging(event, 'fullname')} /><br />

                            <label >Mobile Number</label><br />



                            <PhoneInput
                                placeholder="Enter phone number"
                                value={mobileNumber}
                                defaultCountry="IN"
                                onChange={(e) => this.setValue(e)}
                            />


                            <label >Address</label><br />
                            <input className="ad" type="text" placeholder="Enter your address" required value={address} onChange={(event) => this.handlechanging(event, 'address')} /><br /><br />
                            <div >
                                <button type='button' className="procedbt btn btn-danger" onClick={this.proceed}>PROCEED</button>
                            </div>
                        </form> : <div className="pl"> Please login</div>}
                    </React.Fragment>

                </Modal>

            </div>
        )
    }
}

export default Details;