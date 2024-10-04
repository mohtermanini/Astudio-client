import React, { useEffect, useState } from 'react'
import classNames from 'classnames';

export default function TruncatedText({ cutCharacters = 40, text, showMoreLabel = "more", showLessLabel = "less", ...props }) {
    const [isExpandable, setIsExpandable] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const btnClasses = classNames(props.className);

    function handleButtonClick() {
        setIsExpanded(!isExpanded);
    }

    useEffect(() => {
        setIsExpandable(text.length > cutCharacters);
    }, [text]);

    return (
        <span className='mb-0'>
            {text.length > cutCharacters ?
                <>
                    {isExpandable && isExpanded ? text : `${text.substring(0, cutCharacters)}...`}
                    {isExpandable && (
                        <>
                            {" "}
                            <span role='button' className={`${btnClasses} text-muted`} onClick={handleButtonClick}>
                                {isExpanded ? showLessLabel : showMoreLabel}
                            </span>
                        </>
                    )}
                </>
                :
                text
            }
        </span >
    )
}
