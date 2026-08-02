import {useEffect,useState} from "react";
import {Link} from "react-router-dom";

import {navigation} from "../services/navigation";

export default function Sidebar(){

    const [docs,setDocs]=useState([]);

    useEffect(()=>{

        navigation().then(setDocs);

    },[]);

    return(

        <aside>

            <h2>SUTI.world</h2>

            {docs.map((doc:any)=>(

                <div key={doc.slug}>

                    <Link to={"/docs/"+doc.slug}>

                        {doc.slug}

                    </Link>

                </div>

            ))}

        </aside>

    );

}
