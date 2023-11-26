
import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";

// Put your API key here

builder.init(import.meta.env.BUILDER_API_PUBLIC_KEY);

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
interface props {
    data: any
}

export default function BuilderComponentReact({ data }: props) {
    // get the page content from Builder

    const [builderContentJson, setBuilderContentJson] = useState(undefined)

    useEffect(() => {
        console.log('useEffect')
        builder.get('cursos', { url: '/builder-preview' })
            .promise().then(setBuilderContentJson)
    }, [])
    // return the page when found
    return (

        <div className="w-full h-full">
            <BuilderComponent
                model="cursos"
                content={data}
            />
        </div>
    );


}