import * as React from "react";
import { useState } from "react";
import { Edit, SimpleForm, ReferenceInput, SelectInput, TextField, PurpleTextField, TextInput, required, FileInput, FileField, SaveButton, Create } from 'react-admin';
import { FilePond, File, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


export const FileUpload = () => {

    const [files, setFiles] = useState([])

    return(

    <div className="App" style={{marginTop: 100}}>
    <FilePond
    files={files}
    onupdatefiles={setFiles}
    allowMultiple={false}
    allowReplace={true}
    maxFiles={3}
    // allowFileTypeValidation={true}
    acceptedFileTypes={'.png'}
    server="http://localhost:8000/stock/general/upload-stock/"
    instantUpload={false}
    labelIdle='Drag & Drop your csv file with the new stock or <span class="filepond--label-action">Browse</span>'
    />
    </div>
    )
}
