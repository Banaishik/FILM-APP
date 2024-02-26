import React from "react";
import "./pagination.css"

const ItemCountPagination = (count, id, handleChange) => {
    return (
        <>
            <div key={id}>
                {
                    count.map(
                        item => <span onClick={() => handleChange(item)} className={item === id ? 'activeCount' : 'itemPagesCount'} id={`item${item}`}>{item}</span>
                    )
                }
            </div>
        </>
    )
}

export default ItemCountPagination