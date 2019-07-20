import React, { Component } from "react";
import OwnerInfo from "../components/OwnerInfo";
import PetInfo from "../components/PetInfo";
import Medical from "../components/MedicalHistory";
import NavBar from "../components/NavBar";
import { Container, Row, Col } from "react-grid-system";

class Profile extends Component {
  state = {
    currentUserName: "",
    currentUserEmail: "",
    isSignedIn: true
  };

  componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const username = user.displayName;
    const useremail = user.email;
    const userSignedIn = window.localStorage.getItem('userSignedIn');
    this.setState({
      currentUserName: username,
      currentUserEmail: useremail,
      isSignedIn: userSignedIn
    })
  }

  handleLogout = (e) => {
    this.setState({ isSignedIn: false })
  }

  render() {
    const { currentUserEmail, currentUserName } = this.state;

    return (
      <div>
        <NavBar />
        <h1>Welcome {this.state.currentUserName}</h1>
        <p>Email: {currentUserEmail}</p>
        <p>This is where we are going to put all of our pet information</p>
        <div>
          <Container>
            <Row>
              <Col sm={4}>
                <OwnerInfo />
                <Medical />
              </Col>
              <Col sm={4}></Col>
              <Col sm={4}>
                <PetInfo />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
  // componentDidMount() {
  //   const idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
  //   this.setState({
  //     currentUserEmail: idToken.idToken.claims.email,
  //     currentUserName: idToken.idToken.claims.name
  //   });
  // }
  // render() {
  //   const { currentUserEmail, currentUserName } = this.state;
  //   return (
  //     <div>
  //       <div className="profile-welcome text-center">
  //         <h1>Welcome {currentUserName}!</h1>
  //         <p>Email: {currentUserEmail}</p>
  //       </div>
  //       <div>
  //         <Container>
  //           <Row>
  //             <Col sm={4}>
  //               <OwnerInfo />
  //               <Medical />
  //             </Col>
  //             <Col sm={4} />
  //             <Col sm={4}>
  //               <PetInfo />
  //             </Col>
  //           </Row>
  //         </Container>
  //       </div>
  //     </div>
  //   );
  // }
}

export default Profile;
