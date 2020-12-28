import React from 'react';
import '../Styles/Filter.css';
import exios from 'axios';
import queryString from 'query-string'

class Filter extends React.Component {

    constructor() {
        super();
        this.state = {
            restaurant: [],
            pagecount: [],
            locations: [],
            mealt: [],
            location: [],
            cuisine: [],
            mealtype: "",
            lcost: "",
            hcost: "",
            sort: 1,
            page: 1,
        }
    };



    componentDidMount() {

        const params = queryString.parse(this.props.location.search);
        const mealtype = params.mealtype;
        const location = params.city;
        const lcost = params.lowcost;
        const hcost = params.highcost;
        var cuisine = [];
        cuisine = params.cuisine.split(',');

        const sort = params.sort;
        const page = params.page;

        const p = page == "" ? 1 : page

        var filterdata = {};

        

        if (cuisine == "") {
            filterdata = {
                mealtype: mealtype,
                location: location == 0 ? 0 : location,
                lcost: lcost,
                hcost: hcost,
                sort: sort,
                page: p
            }
        } else {
            filterdata = {
                mealtype: mealtype,
                location: location == 0 ? 0 : location,
                lcost: lcost,
                hcost: hcost,
                cuisine: cuisine.length != 0 ? cuisine.splice(',') : undefined,
                sort: sort,
                page: p
            }
        }


        exios({
            method: 'POST',
            url: 'http://localhost:8080/res',
            headers: { 'content-Type': 'application/json' },
            data: filterdata
        }).then(res => this.setState({ restaurant: res.data.resturants, pagecount: res.data.page, page: p, mealtype: mealtype, location: location }))
            .catch(err => console.log(err))


        exios({
            method: 'GET',
            url: 'http://localhost:8080/citylist',
            headers: { 'content-Type': 'application/json' }
        }).then(res => this.setState({ locations: res.data.cityname }))
            .catch(err => console.log(err))

        exios({
            method: 'GET',
            url: 'http://localhost:8080/mealtype',
            headers: { 'content-Type': 'application/json' }
        }).then(res => this.setState({ mealt: res.data.meal }))
            .catch(err => console.log(err))
    }


    Navigate = (Id) => {
        this.props.history.push(`/details/${Id}`)
    }

    onCuisineChange = (cuisineid) => {
        const params = queryString.parse(this.props.location.search);
        const mealtype = params.mealtype;
        const { location } = this.state;
        const { lcost, hcost } = this.state;
        const { sort } = this.state;
        const { cuisine, page } = this.state

        if (cuisine.indexOf(cuisineid) == -1) {
            cuisine.push(cuisineid);
        } else {
            var index = cuisine.indexOf(cuisineid);
            cuisine.splice(index, 1);
        }

        var pagee = page == 1 ? page : 1;

        const filterdata = {
            mealtype: mealtype,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            lcost: lcost,
            hcost: hcost,
            sort: sort,
            location: location == 0 ? undefined : location,
            page: pagee
        };

        this.props.history.push(`/filter?mealtype=${mealtype}&city=${location}&cuisine=${cuisine}&lowcost=${lcost}&highcost=${hcost}&sort=${sort}&page=${pagee}`)

        exios({
            method: 'POST',
            url: 'http://localhost:8080/res',
            headers: { 'content-Type': 'application/json' },
            data: filterdata
        }).then(res => this.setState({ restaurant: res.data.resturants, cuisine: cuisine, pagecount: res.data.page, mealtype: mealtype, page: pagee }))
            .catch(err => console.log(err))
    }

    onSortChange = (id) => {
        const params = queryString.parse(this.props.location.search);
        const mealtype = params.mealtype;
        const { location } = this.state;
        const { lcost, hcost } = this.state;
        const { cuisine } = this.state;
        const { page } = this.state

        const filterdata = {
            mealtype: mealtype,
            sort: Number(id),
            lcost: lcost,
            hcost: hcost,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            location: location == 0 ? undefined : location,
            page: page
        };

        exios({
            method: 'POST',
            url: 'http://localhost:8080/res',
            headers: { 'content-Type': 'application/json' },
            data: filterdata
        }).then(res => this.setState({ restaurant: res.data.resturants, sort: Number(id), pagecount: res.data.page, mealtype: mealtype }))
            .catch(err => console.log(err))
    }

    onCostChange = (lcost, hcost) => {
        const { sort } = this.state;
        const { cuisine } = this.state;
        const { location } = this.state;
        const { page } = this.state

        const params = queryString.parse(this.props.location.search);
        const mealtype = params.mealtype;

        const pagee = page == 1 ? page : 1;


        const locc = location == 0 ? undefined : location;
        const filterdata = {
            mealtype: mealtype,
            lcost: lcost,
            hcost: hcost,
            sort: sort,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            location: locc,
            page: pagee
        };

        this.props.history.push(`/filter?mealtype=${mealtype}&city=${locc}&cuisine=${cuisine}&lowcost=${lcost}&highcost=${hcost}&sort=${sort}&page=${pagee}`)

        exios({
            method: 'POST',
            url: 'http://localhost:8080/res',
            headers: { 'content-Type': 'application/json' },
            data: filterdata
        }).then(res => this.setState({
            restaurant: res.data.resturants, lcost: lcost, page: pagee,
            hcost: hcost, pagecount: res.data.page, mealtype: mealtype
        }))
            .catch(err => console.log(err))
    }



    onlocationChange = (event) => {
        const cos = event.target.value
        const { sort, page } = this.state;
        const { cuisine } = this.state;
        const { lcost, hcost } = this.state;

        const params = queryString.parse(this.props.location.search);
        const mealtype = params.mealtype;


        //alert('Your selected location is: ' + event.target.value);

        const pagee = page == 1 ? page : 1;

        const filterdata = {
            mealtype: mealtype,
            lcost: lcost,
            hcost: hcost,
            sort: sort,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            location: cos,
            page: pagee
        };

        this.props.history.push(`/filter?mealtype=${mealtype}&city=${cos}&cuisine=${cuisine}&lowcost=${lcost}&highcost=${hcost}&sort=${sort}&page=${pagee}`)

        exios({
            method: 'POST',
            url: 'http://localhost:8080/res',
            headers: { 'content-Type': 'application/json' },
            data: filterdata
        }).then(res => this.setState({
            restaurant: res.data.resturants, location: cos, page: pagee,
            pagecount: res.data.page, mealtype: mealtype
        }))
            .catch(err => console.log(err))
    }



    onPagechange = (item) => {

        const params = queryString.parse(this.props.location.search);
        const mealtype = params.mealtype;
        const { location } = this.state;
        const { lcost, hcost } = this.state;
        const { sort } = this.state;
        const { cuisine } = this.state;

        const filterdata = {
            page: Number(item),
            mealtype: mealtype,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            lcost: lcost,
            hcost: hcost,
            sort: sort,
            location: location == 0 ? undefined : location
        };

        this.props.history.push(`/filter?mealtype=${mealtype}&city=${location}&cuisine=${cuisine}&lowcost=${lcost}&highcost=${hcost}&sort=${sort}&page=${item}`)

        exios({
            method: 'POST',
            url: 'http://localhost:8080/res',
            headers: { 'content-Type': 'application/json' },
            data: filterdata
        }).then(res => this.setState({ restaurant: res.data.resturants, page: Number(item), pagecount: res.data.page, mealtype: mealtype }))
            .catch(err => console.log(err))
    }


    onPagechan = (pc) => {
        const params = queryString.parse(this.props.location.search);
        const mealtype = params.mealtype;
        const { location } = this.state;
        const { lcost, hcost } = this.state;
        const { sort } = this.state;
        const { cuisine } = this.state;

        const filterdata = {
            page: pc,
            mealtype: mealtype,
            cuisine: cuisine.length != 0 ? cuisine : undefined,
            lcost: lcost,
            hcost: hcost,
            sort: sort,
            location: location == 0 ? undefined : location
        };

        this.props.history.push(`/filter?mealtype=${mealtype}&city=${location}&cuisine=${cuisine}&lowcost=${lcost}&highcost=${hcost}&sort=${sort}&page=${pc}`)

        exios({
            method: 'POST',
            url: 'http://localhost:8080/res',
            headers: { 'content-Type': 'application/json' },
            data: filterdata
        }).then(res => this.setState({ restaurant: res.data.resturants, page: pc, pagecount: res.data.page, mealtype: mealtype }))
            .catch(err => console.log(err))
    }



    render() {
        const { restaurant, pagecount, locations, mealtype, mealt } = this.state;



        if (this.state.page < pagecount.length) {
            var ip = parseInt(this.state.page + 1);
        } else {
            ip = this.state.page;
        }

        if (this.state.page > 1) {
            var dp = parseInt(this.state.page - 1);
        } else {
            dp = this.state.page;
        }



        return (
            <div>


                <div className="container">
                    {mealt.map((item) => {
                        if (item._id === mealtype) {

                            return <span className="bcon">{item.name} Places in</span>

                        }
                    })}

                    {locations.map((item) => {
                        if (this.state.location === item.city_id) {
                            return <span className="bcon" >{item.city_name}</span>
                        }
                    })}

                    <div className="row">

                        <div className="col-sm-12 col-md-3 col-lg-3">

                            <div className="lb">
                                <span className="fhed">Filters</span>
                                <span className="glyphicon glyphicon-menu-down toggle-span" data-toggle="collapse"
                                    data-target="#demo"></span>

                                <div id="demo" className="collapse in">

                                    <form>

                                        <label for="Location" className="cu">Select Location</label><br />

                                        <select name="Location" id="loc"
                                            value={this.state.value}
                                            onChange={this.onlocationChange}>



                                            {locations.map((item) => {
                                                
                                                if (item.city_id == this.state.location) {
                                                    
                                                    return <option value='0' disabled selected hidden >{item.name}</option>

                                                }

                                            })}

                                            if (this.state.location == "0") {
                                                <option value='0' disabled selected hidden >Select Location</option>
                                            }

                                            {locations.map((item, value) => {

                                                return <option className="it" key={value} value={item.city_id}>{item.name}</option>
                                            })}


                                        </select><br /><br />

                                        <label for="Cuisine" className="cu">Cuisine</label><br />


                                        <input type="checkbox" value="1" onChange={() => this.onCuisineChange("1")} />
                                        <label for="Ni" className="it" > North Indian</label><br />
                                        <input type="checkbox" value="2" onChange={() => this.onCuisineChange("2")} />
                                        <label for="Si" className="it"> South Indian</label><br />
                                        <input type="checkbox" value="3" onChange={() => this.onCuisineChange("3")} />
                                        <label for="Ci" className="it"> Chinese</label><br />
                                        <input type="checkbox" value="4" onChange={() => this.onCuisineChange("4")} />
                                        <label for="Ff" className="it"> Fast Food</label><br />
                                        <input type="checkbox" value="5" onChange={() => this.onCuisineChange("5")} />
                                        <label for="Sf" className="it"> Street Food</label><br /><br />


                                        <label for="Cft" className="cu">Cost For Two</label><br />

                                        <input type="radio" id="rs1" name="rs" value="rs1" onChange={() => this.onCostChange('1', '500')} />
                                        <label for="bl500" className="it">Less than ₹ 500</label><br />
                                        <input type="radio" id="rs2" name="rs" value="rs2" onChange={() => this.onCostChange('500', '999')} />
                                        <label for="500to1000" className="it">₹ 500 to ₹ 999</label><br />
                                        <input type="radio" id="rs3" name="rs" value="rs3" onChange={() => this.onCostChange('1000', '1500')} />
                                        <label for="1000to1500" className="it">₹ 1000 to ₹ 1500</label><br />
                                        <input type="radio" id="rs4" name="rs" value="rs4" onChange={() => this.onCostChange('1500', '2000')} />
                                        <label for="1500to2000" className="it">₹ 1500 to ₹ 2000</label><br />
                                        <input type="radio" id="rs5" name="rs" value="rs5" onChange={() => this.onCostChange('2000', '20000')} />
                                        <label for="ab2000" className="it">₹ 2000+</label><br />
                                        <input type="radio" id="rs6" name="rs" value="rs6" onChange={() => this.onCostChange('1', '9999')} />
                                        <label for="ab2000" className="it">For all cost</label><br /><br />


                                        <label for="Cft" className="sortt">Sort</label><br />

                                        <input type="radio" id="price1" name="price" value="1" onChange={() => this.onSortChange('1')} />
                                        <label for="lotohi" className="it">Price low to high</label><br />
                                        <input type="radio" id="price2" name="price" value="-1" onChange={() => this.onSortChange('-1')} />
                                        <label for="hitolo" className="it">Price high to low</label><br /><br />

                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-9 col-lg-9">

                            {restaurant.length > 0 ? restaurant.map((item) => {
                                return <div className="rb" onClick={() => this.Navigate(item._id)}>
                                    <div className="test1">
                                        <div className="piccont">
                                            <div className="repic">
                                                <img src={item.thumb} alt="The Bake Shop" width="100%" height="100%"
                                                    style={{ borderRadius: '24%' }} />
                                            </div>
                                        </div>

                                        <div className="restext">
                                            <h3 className="rena">{item.name}</h3>
                                            <h5 className="place">{item.city_name}</h5>
                                            <h6 className="address">{item.address}</h6>
                                        </div>

                                    </div>

                                    <hr className="line" />

                                    <div>
                                        <div className="resitem">
                                            <div className="fona">
                                                <p className="t1">CUISINES:</p>
                                                <p className="t1">COST FOR TWO:</p>
                                            </div>

                                            <div className="fopr">
                                                {item.Cuisine.map((it) => { return <p className="t2 ps">{it.name}</p> })}

                                                <p className="t2">₹{item.cost}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            }) :

                                <div className="rb" >

                                    <div className="nodata" >Sorry. No result found</div>


                                </div>


                            }


                            {pagecount.length > 1 ?
                                <div className="page">
                                    <div className="pagination">
                                        <a value={dp} onClick={() => this.onPagechan(dp)} >&laquo;</a>
                                        {pagecount.map((item) => {

                                            if (this.state.page == item) {
                                                return <a key={item} className="active" onClick={() => this.onPagechange(item)}>{item}</a>
                                            }
                                            else {
                                                return <a key={item} onClick={() => this.onPagechange(item)}>{item}</a>
                                            }

                                        })}
                                        <a value={ip} onClick={() => this.onPagechan(ip)}>&raquo;</a>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Filter;