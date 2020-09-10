import React, {useState} from 'react';
import Button from "@material-ui/core/Button";

const Paginator = ({pagesCount, portionSize}) => {

    let pages = [];
    for (let i = 1; i < pagesCount; i++){
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionSize * portionNumber;


    const onPrevHandler = () => {
        setPortionNumber(prev => prev - 1);
    };

    const onNextHandler = () => {
        setPortionNumber(prev => prev + 1);
    };


    return (
        <div>
            {portionNumber > 1 && <Button onClick={onPrevHandler}>Prev</Button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <span>{p}</span>)
            }
            {portionNumber < portionCount && <Button onClick={onNextHandler}>Next</Button>}
        </div>
    );
};

export default Paginator;