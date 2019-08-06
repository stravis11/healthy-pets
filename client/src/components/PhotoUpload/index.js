import React, { Component } from "react";
import ReactFilestack from "filestack-react";
import "./style.css";
import axios from "axios";


const apiKey = process.env.REACT_APP_FILESTACK_API_KEY;

class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      currentPetId: 0,
      petUrl: "https://dummyimage.com/200x200/696669/ffffff&text=Add+a+Photo",
      modalIsOpen: true
    };
  }

<<<<<<< HEAD
  componentDidMount() {
    console.log(this.props.petId)
=======
  componentDidMount = () =>{
>>>>>>> 1ffa68a9dff9b35fb78c568c35574666e96031c5
    this.setState({userId: this.props.uid, currentPetId: this.props.petId, petUrl: this.props.petUrl })
    this.props.modalOpen(true);
    this.findPetPic();
  }

  // Not firing this function, but also not responding with the error?
  findPetPic() {
    axios.get(`/api/pets/pic/${this.props.petId}`)
      .then(res => {
        this.setState({ 
          petUrl: res.data[0].petUrl, 
      })
    })
      .catch(err => console.log(err));
  }

  // This function is successfully updating the peturl to the db. 
  updateDb(petId) {
    let photoUrl = this.state.petUrl;
    axios.put(`/api/pets/update/${petId}`, {petUrl: photoUrl, currentPetId: petId})
      .then(res => { 
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  // photo renders upon closing, but is not persistent on changing pet or page refresh.
  closeModal = () => {
    this.props.updatedModal(this.props.currentPetId);
    this.setState({ modalIsOpen: false });
    this.props.modalOpen(false)
  }

  render() {
    return (
      <div id="pet-pic">
        <div className="card-body text-center">
          <h3 className="card-title">
            <strong>Pet Picture</strong>
          </h3>
          <ReactFilestack
          apikey={apiKey}
          componentDisplayMode={{
            type: "button",
            customText: "Upload Photo"
          }}
          clientOptions={{
            accept: "image/*",
            fromSources: ["local_file_system"],
            maxSize: 1024 * 1024,
            maxFiles: 1
          }}
          onSuccess={result => {
            this.setState({petUrl: result.filesUploaded[0].url})
            this.updateDb(this.props.petId)
            this.closeModal();
          }}
          onRequestClose={this.closeModal}
          onError={err => console.log(err)}
        />
        </div>
        
        {/* <img
          className="petImageUpload"
          src={this.state.petUrl}
          style={{ width: "350px", height: "350px", margin: "20px" }}
          alt="yourPet"
        /> */}
      </div>
    );
  }
}

export default PhotoUpload;
