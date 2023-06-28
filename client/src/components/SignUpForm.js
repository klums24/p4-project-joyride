
import {useState} from 'react'


const SignUpForm = ({handleNewUser}) => {

  // const [name, setName] = useState("");
  // const [about, setAbout] = useState("");
  // const [phase, setPhase] = useState("");
  // const [link, setLink] = useState("");
  // const [image, setImage] = useState("");

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    age: "",
    zip_code: "",
    email: "",
    profile_picture: ""
  });


  const validateData = () =>  [newUser.first_name, newUser.last_name, newUser.user_name, newUser.age, newUser.zip_code, newUser.email, newUser.profile_picture].some(el => el.trim() === '' )

  const handleChange = ({target: {id, value}}) => {
    
    setNewUser({
      ...newUser,
      [id]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateData()) {
      alert("Must fill all fields of the form to join")
    } else {
      // the new project object has to make it to the page
      // const newProject = {name, about, phase, link, image}
      // the new project has to make it to the json-server
      fetch('http://localhost:4000/drivers', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })
      .then(resp => {
        if (resp.status === 201) {
          resp.json().then(userFromDb => handleNewUser(userFromDb))
        } else {
          alert("Something went wrong with new user signup POST")
        }
      })
      .catch(err => console.error(err))
      setNewUser({
        first_name: "",
        last_name: "",
        user_name: "",
        age: "",
        zip_code: "",
        email: "",
        profile_picture: ""
      })
      // [setName, setAbout, setImage, setLink, setPhase].forEach(fn => fn(""))
      // setName("")
      // setAbout("")
      // setImage("")
      // setLink("")
      // setPhase("")
    }
  }

  return (
    <div>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <label htmlFor="first_name">First Name</label>
        <input type="text" id="first_name" name="first_name" onChange={handleChange} value={newUser.first_name} required/>
        
        <label htmlFor="last_name">Last Name</label>
        <input type="text" id="last_name" name="last_name" onChange={handleChange} value={newUser.last_name} required/>
        
        <label htmlFor="user_name">User Name</label>
        <textarea id="user_name" name="user_name" onChange={handleChange} value={newUser.user_name} required/>

        <label htmlFor="age">Age</label>
        <input type="text" id="age" name="age" onChange={handleChange} value={newUser.age} required/>
      
        <label htmlFor="zip_code">zip code</label>
        <input type="text" id="zip_code" name="zip_code" onChange={handleChange} value={newUser.zip_code} required/>
        
        <label htmlFor="email">email</label>
        <input type="text" id="email" name="email" onChange={handleChange} value={newUser.email} required/>
        
        <label htmlFor="profile_picture">Profile Picture</label>
        <input type="text" id="profile_picture" name="profile_picture" onChange={handleChange} value={newUser.profile_picture} required/>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignUpForm;
