import React from "react"
import { getBookQuery } from "../queries"
import { useQuery } from "@apollo/react-hooks"

export default function BookList(props) {
    const { loading, error, data } = useQuery(getBookQuery, { variables: { id: props.bookId } });

    return (
        <div id="book-details">
            {loading ?
                <p>loading</p>
                :
                <div>
                    <h2>{data.book.name}</h2>
                    <p>{data.book.genre}</p>
                    <p>{data.book.author.name}</p>
                    <p>All books of the author</p>
                    <ul className="other-books">
                        {data.book.author.books.map(bdata =>
                            <li key={bdata.id}>{bdata.name}</li>
                        )}
                    </ul>
                </div>
            }
        </div>
    )
}