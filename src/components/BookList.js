import React, { useState } from "react"
import { getBooksQuery } from "../queries"
import { useQuery } from "@apollo/react-hooks"
import BookDetails from "./BookDetails"

export default function BookList(props) {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [bookId,setId] = useState(null)
    const showBookdetails=(bookId)=>{
        setId(bookId)
    }
    return (
        <div>
            {loading ?
                <p>loading</p>
                :
                <ul id="book-list">
                    {data.books && 
                        data.books.map(bdata =>
                        <li key={bdata.id} onClick={()=>showBookdetails(bdata.id)}>{bdata.name}</li>
                    )}
                </ul>
            }
            {bookId!==null &&
            <BookDetails bookId={bookId}/>
            }
        </div>
    )
}