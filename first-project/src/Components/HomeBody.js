import React from 'react';
import '../Styles/Home.css';
import Homebodyitem from './Homebodyitem';

class HomeBody extends React.Component {

    render() {
        const { mealtypes } = this.props;
        return (
            <div>
                <div className="quicksearch">
                    <p className="quick_ser_heading">Quick Searches</p>
                    <p className="quick_ser_sub_title">Discover restaurants by type of meal</p>
                    <div className="container-fluid">
                        <div style={{ marginLeft: '4%', marginRight: '4%' }}>
                            <div className="row">
                                {mealtypes.map((item) => {
                                    return <Homebodyitem id={item._id} name={item.name} content={item.content} image={item.image}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeBody;