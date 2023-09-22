import express from 'express';
const Routes = express.Router()
import { importExceltodb } from "./ImportExcel/excelcontroller.js"
import { empStatus } from "./task2/empStatus.js"
import uploadFile from "../middlewears/fileupload.js"

Routes.post('/excelImport', uploadFile.single("file"), importExceltodb);
Routes.get('/empStatus', empStatus)


export default Routes;