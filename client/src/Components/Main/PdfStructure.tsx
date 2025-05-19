import React from "react";

interface props{
    title: string
    content: string
}

const PdfStructure: React.FC<props> = ({ title, content }) => {
    return(
        <div>
            <h1>{title}</h1>
            <div className="px-16" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}

export default PdfStructure;