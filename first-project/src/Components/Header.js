import React from 'react';
import '../Styles/Header.css'
import Modal from 'react-modal';
import '../Styles/Signup.css';
import '../Styles/Login.css';
import exios from 'axios';



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

class Header extends React.Component {


    constructor() {
        super();
        this.state = {
            logOutModelIsOpen: false,
            signupModelIsOpen: false,
            loginModelIsOpen: false,
            email: '',
            password: '',
            FName: '',
            LName: '',
            MNumber: '',
            checkMail: '',
            checkPassword: '',
            isloggedin: false,
            user: [],
            username: ''
        }
    }

    componentDidMount = () => {

        var pm = sessionStorage.getItem('isloggedin');
        var userdata = JSON.parse(sessionStorage.getItem("user"));
        var pp = userdata == null ? null : userdata[0].first_name;
        var pmBool = (pm == 'true');

        this.setState({ isloggedin: pmBool, username: pp })


    }

    closeModel = () => {
        this.setState({ signupModelIsOpen: false })
    }

    handlechanging = (event, state) => {
        this.setState({ [state]: event.target.value })
    }

    newUserSignup = () => {
        const { email, FName, LName, MNumber, password } = this.state

        const user = {
            first_name: FName,
            last_name: LName,
            email: email,
            Mob_number: MNumber,
            password: password
        }

        exios({
            method: 'POST',
            url: 'http://localhost:8080/singup',
            headers: { 'content-Type': 'application/json' },
            data: user
        }).then(res => {
            this.setState({ signupModelIsOpen: res.data.isModel });
            alert(res.data.message);
        }).catch(err => console.log(err))
    }

    closeLoginModel = () => {
        this.setState({ loginModelIsOpen: false })
    }


    newUserLogin = () => {
        const { checkMail, checkPassword } = this.state

        const user = {
            email: checkMail,
            password: checkPassword
        }

        exios({
            method: 'POST',
            url: 'http://localhost:8080/login',
            headers: { 'content-Type': 'application/json' },
            data: user
        }).then(res => {
            if (res.data.isAuthentigation == true) {
                alert(res.data.message);
                this.setState({ loginModelIsOpen: res.data.modelHandeler, isloggedin: res.data.isAuthentigation, user: res.data.user });
            } else {
                alert(res.data.message);
                this.setState({ loginModelIsOpen: res.data.modelHandeler, isloggedin: res.data.isAuthentigation });
            }
            sessionStorage.setItem('isloggedin', res.data.isAuthentigation);

            sessionStorage.setItem('user', JSON.stringify(res.data.user));

            sessionStorage.setItem('useremail', user.email);



            var userdata = JSON.parse(sessionStorage.getItem("user"));
            var pp = userdata == null ? null : userdata[0].first_name


            this.setState({ username: pp })

        }
        ).catch(err => console.log(err));


    }

    Loggingout = () => {
        this.setState({ logOutModelIsOpen: false, isloggedin: false, user: [] });
        sessionStorage.setItem('isloggedin', false)
    }

    closeLogoutModel = () => {
        this.setState({ logOutModelIsOpen: false })
    }

    Logoutopen = () => {
        this.setState({ logOutModelIsOpen: true })
    }

    signupopen = () => {
        this.setState({ signupModelIsOpen: true })
    }

    loginopen = () => {
        this.setState({ loginModelIsOpen: true })
    }

    logintosignup = () => {
        this.setState({ loginModelIsOpen: false, signupModelIsOpen: true })
    }

    signuptologin = () => {
        this.setState({ loginModelIsOpen: true, signupModelIsOpen: false })
    }

    render() {
        const { isloggedin, signupModelIsOpen, loginModelIsOpen, logOutModelIsOpen, FName, LName, email, password, MNumber, checkMail, checkPassword, user } = this.state;


        return (
            <div>
                <div className="box">
                    <div className="boxmanu">

                        {isloggedin == true ? null : <button onClick={this.loginopen} type="button" className="pk btn btn-danger">Login</button>}



                        {isloggedin == true ? null : <button onClick={this.signupopen} type="button" className="btn btn-danger">Create an account</button>}



                        {isloggedin == true ? <button className="btn btn-success" onClick={this.Logoutopen}>{this.state.username}</button> : null}



                    </div>

                    <Modal
                        isOpen={signupModelIsOpen}
                        style={customStyles}
                    >
                        <React.Fragment>

                            <div className="bx center-block">

                                <button onClick={this.closeModel} type="button" className="close" aria-label="Close" style={{ paddingRight: '13px', paddingLeft: '15px' }}>
                                    <span aria-hidden="true" >&times;</span>
                                </button>


                                <div className="mainheading">Sign Up</div>

                                <form className="fs">
                                    <label >First name:</label><br />
                                    <input type="text" placeholder="Enter first name" required maxLength="15" value={FName} onChange={(event) => this.handlechanging(event, 'FName')} /><br />

                                    <label >Last name:</label><br />
                                    <input type="text" placeholder="Enter last name" required maxLength="15" value={LName} onChange={(event) => this.handlechanging(event, 'LName')} /><br />

                                    <label >Email:</label><br />
                                    <input type="email" placeholder="example@gmail.com" required maxLength="35" value={email} onChange={(event) => this.handlechanging(event, 'email')} /><br />

                                    <label >Mobile Number:</label><br />
                                    <input type="text" pattern="[0-9]*" placeholder="9000009999" required minLength="10" maxLength="12" value={MNumber} onChange={(event) => this.handlechanging(event, 'MNumber')} /><br />

                                    <label >Password:</label><br />
                                    <input type="password" placeholder="abc@!123" minLength='6' title="Password must be 8 characters including 1 uppercase letter, 1 lowercase letter and numeric characters" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} onChange={(event) => this.handlechanging(event, 'password')} /><br /><br />

                                    <button onClick={this.newUserSignup} className="bbt btn-success">Login</button>

                                </form>
                                <hr className="linee" />
                                <div className="aha">Already have an account?<span style={{ color: 'red' }} onClick={this.signuptologin}>Login</span> </div>

                            </div>


                        </React.Fragment>

                    </Modal>

                    <Modal
                        isOpen={loginModelIsOpen}
                        style={customStyles}
                    >
                        <React.Fragment>

                            <div className="bx center-block">

                                <button onClick={this.closeLoginModel} type="button" className="close" aria-label="Close" style={{ paddingRight: '13px', paddingLeft: '15px' }}>
                                    <span aria-hidden="true" >&times;</span>
                                </button>

                                <div className="mainheading">Login</div>
                                <div className="mailbutton">
                                    <span className="mailbox">
                                        <span className="glyphicon glyphicon-envelope em"></span>
                                        <span className="rbder"></span>
                                    </span>
                                    <span className="mtext">
                                        Continue with Gmail
                                    </span>
                                </div>
                                <div className="mailbutton">
                                    <span className="fa fa-facebook" style={{ fontSize: '28px' }}></span>
                                    <span className="mtext">
                                        Continue with Facebook
                                    </span>
                                </div>


                                <div className="or">Or</div>


                                <div className="fs">
                                    <label >Email:</label><br />
                                    <input type="email" placeholder="example@gmail.com" required maxLength="35" value={checkMail} onChange={(event) => this.handlechanging(event, 'checkMail')} /><br />

                                    <label >Password:</label><br />
                                    <input type="password" placeholder="abc@!123" value={checkPassword} onChange={(event) => this.handlechanging(event, 'checkPassword')} /><br /><br />

                                    <button onClick={this.newUserLogin} className="bbt btn btn-success">Login</button>

                                </div>


                                <hr className="lineee" />
                                <div className="nac ">Don’t have account? <span style={{ color: 'red' }} onClick={this.logintosignup}>Sign UP</span> </div>

                            </div>

                        </React.Fragment>

                    </Modal>

                    <Modal
                        isOpen={logOutModelIsOpen}
                        style={customStyles}
                    >
                        <React.Fragment>

                            <div className="bx center-block">

                                <button onClick={this.closeLogoutModel} type="button" className="close" aria-label="Close" style={{ paddingRight: '13px', paddingLeft: '15px' }}>
                                    <span aria-hidden="true" >&times;</span>
                                </button>

                                <div className="mading">Are you want to logout?</div>

                                <div className="fs">

                                    <button onClick={this.Loggingout} className="pppb bbt btn btn-danger">Logout</button>

                                </div>

                            </div>

                        </React.Fragment>

                    </Modal>

                </div>

                <h1 id="logo">e!</h1>
            </div>
        )
    }
}

export default Header;