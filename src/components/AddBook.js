import React, { useState } from "react"
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries"
import { useQuery, useMutation } from "@apollo/react-hooks"


export default function Addbook(props) {
    const [user, setUser] = useState({})
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const submitData = (e) => {
        e.preventDefault()
        addBook({ variables: { name: user.name, genre: user.genre, authorId: user.authorId }, refetchQueries: [{ query: getBooksQuery }] })
    }
    return (
        <div>
            {loading ?
                <p>loading</p>
                :
                <form id="add-book" onSubmit={submitData}>
                    <div className="field">
                        <label>Book name:</label>
                        <input type="text" name="name" onChange={handleChange} required />
                    </div>

                    <div className="field">
                        <label>Genre:</label>
                        <input type="text" name="genre" onChange={handleChange} required />
                    </div>

                    <div className="field">
                        <label>Author:</label>
                        <select name="authorId" onChange={handleChange} required>
                            <option>Select author</option>
                            {data.authors &&
                                data.authors.map(adata =>
                                <option key={adata.id} value={adata.id}>{adata.name}</option>
                            )}
                        </select>
                    </div>
                    <button>+</button>
                </form>
            }
        </div>
    )
}

