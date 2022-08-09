import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [formSubmitted, setFromSubmitted] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("your description")
  const [author, setAuthor] = useState("Other")

  useEffect(()=>{
    //Fetch stuff
    if(title.length > 3 && description.length > 10){
     setValidForm(true)
    }
  },[title, description, author])

  // console.log(title)

  async function formSubmit(e) {
    e.preventDefault()
    if(!validForm){
      setErrorMessage("Not a valid forms")
      return
    }else{
      setValidForm(false)
    }
    try {
      console.log("form submited")

      // const comment = {
      //   title: title,
      //   description: description,
      //   author: author,

      // }

      const comment = {
        title,
        description: description,
        author: author,
      }
      console.log("form submitted with ", comment)

      // really submit it to an api
      const results = await fetch(`https://sql.bocacode.com/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      })
      console.log(results)
      const data = await results.json()

      console.log(data)
      setFromSubmitted(true)
      setErrorMessage("")
      setValidForm(true)
      alert("Wow! Submitted")

    } catch (error) {
      console.error(error)
      setErrorMessage(
        "There was an error submitting your comment",
        error.toString()
      )
    }
  }
  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <h1>Comments</h1>

        {/* here goes the title */}
        <label>Title</label>
        <input
          type="text"
          // required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <h3>{title}</h3>
        {/* this is the description*/}
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        ></textarea>
        <h3>{description}</h3>
        {/* This is the author*/}
        <label>Author</label>
        <select
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value)
          }}
        >
          <option value="">Choose One</option>
          <option value="Todd">Doctor Todd</option>
          <option value="Ludwigson">Ludwigson</option>
          <option value="Other">Other</option>
        </select>
        <h3>{author}</h3>

        {!formSubmitted && <button>Submit Form</button>}
        {errorMessage && (
          <h1>
            There was an error:
            <br />
            {errorMessage}
          </h1>
        )}
      </form>
    </div>
  )
}

export default App
