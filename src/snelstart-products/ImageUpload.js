import * as React from "react";
import { useState  } from "react";
import { Edit, SimpleForm, ReferenceInput, SelectInput, TextField, PurpleTextField, TextInput, required, FileInput, FileField, SaveButton, Create } from 'react-admin';
import { FilePond, File, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


export const ImageUpload = () => {

    const [files, setFiles] = useState([])

    const [url, setUrl] = useState("")
    // const { query } = useRouter();
    // console.log(query.id)
    // console.log(window.location.pathname)
    
    // url = "http://192.168.1.63:8001/products/upload-image/" + product_id
    const getImageId = () => {
        const product_id = window.location.pathname.split('/products/list/')[1];
    //     setUrl("https://services.mafico.com/data-worker/rest/files/read?id")
    //     const query_req = `
    //     {websiteProducts(input: {filter:{id:"` + product_id + `"}} )
    //     {
    //         pagination{
    //             itemTotal
    //             pageTotal
    //             rangeEnd
    //             rangeStart
    //         }
    //         products {
    //             description
    //             maficoCode
    //             ean
    //             maficoPrice
    //             model
    //             id
    //             pictures { name url}
    //         }
    //     }
    // }`
    //     const image_list = []
    //     fetch("http://192.168.1.63:8001/products/list/" + product_id + "/", {
    //         mode: 'cors',
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" },
    //       })
    //       .then(response => response.json())
    //       .then(responseJson => {
    //         for (const image of responseJson['pictures']){
    //             image_list.push(
    //             {   source : image['url'].split('https://services.mafico.com/data-worker/rest/files/read?id=')[1],
    //                 options : {
    //                     type : 'local',
    //                 }
    //             })
    //         }
    //         console.log(image_list);
    //         });
    //     setFiles(image_list);
        // console.log(image_list);
        // console.log(files);
        
        setUrl("http://192.168.1.63:8001/website-products/upload-image/" + product_id + "/");
        // console.log(url);
    }

    return(

    <div className="App" style={{marginTop: 100}}>
    <FilePond
    oninit={() => getImageId()}
    files={files}
    onupdatefiles={setFiles}
    allowMultiple={true}
    allowReplace={true}
    maxFiles={10}
    // allowFileTypeValidation={true}
    // acceptedFileTypes={'.csv'}
    server={url}
    // instantUpload={false}
    labelIdle='Drag & Drop images for this product or <span class="filepond--label-action">Select from your files</span>'
    />
    </div>
    )
}
