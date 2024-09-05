export default { 
	async AddNewPurchase(){ 
	
		storeValue("purchase_id",Utils.getUUID()) 
		storeValue("form_type","ADD") 

		txtRequestBy.setValue(appsmith.store.userLogin.name) 
		dateRequire.setValue(new Date())
		txtDescription.setValue("");
		resetWidget("FilePicker1Copy");
		showModal(ModalRequestForm.name);
	},

	async ShowPurchaseDetail(record){  
		storeValue("purchase_id",record.uuid) 
		storeValue("form_type","EDIT") 

		txtRequestBy.setValue(record.request_by) 
		dateRequire.setValue(record.require_date)
		txtDescription.setValue(record.request_description);

		await queryFileList.run({uuid:appsmith.store.purchase_id});
		console.log(appsmith.store.purchase_id)
		resetWidget("FilePicker1Copy");
		showModal(ModalRequestForm.name);
	},

	async UploadFilePurchase () { 
		// if(txtFileDescription.text == null || txtFileDescription.text ==""){
		// showAlert("Plase Input File Description","error");
		// }

		if( FilePicker1Copy.files[0].name ==null || FilePicker1Copy.files[0].name ==""){
			showAlert("Plase Upload File","error");
			return;
		}
		let data = await S3Upload.run(); 

		// txtDescription.setValue(JSON.stringify((data)));
	
		showAlert( FilePicker1Copy.files[0].name)
		await queryFileInsert.run(
			{ uuid : appsmith.store.purchase_id,
			 file_name : FilePicker1Copy.files[0].name, 
			 file_url:data.signedUrl,
			})

		await queryFileList.run({uuid:appsmith.store.purchase_id});

		resetWidget("FilePicker1Copy");
		// showAlert("success","success")
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	},
	async DeleteFilePurchase(record){
			await S3DeleteFile.run({fileName : record.file_name})
			await queryFileDelete.run({id:record.id})
			await queryFileList.run({uuid:appsmith.store.purchase_id});
			showAlert("success","success") 		
	},
	async savePurchease(){ 
		if(txtDescription.text == null || txtDescription.text ==""){
			showAlert("Plase Input Description","error");
			return;
		} 
		if(appsmith.store.form_type == "ADD"){
			await	queryPurchaseInsert.run(
				{ 
					uuid : appsmith.store.purchase_id,
					request_by : txtRequestBy.text,
					require_date: dateRequire.formattedDate.toString(),
					request_description: txtDescription.text,
					status : "New"
				});
			await queryPurchaseList.run();
			showAlert("success","success")
		}else if(appsmith.store.form_type == "EDIT"){
			await	queryPurchaseUpdate.run(
				{ 
					uuid : appsmith.store.purchase_id,
					request_by : txtRequestBy.text,
					require_date: dateRequire.formattedDate.toString(),
					request_description: txtDescription.text,
					status : "New"
				});
			await queryPurchaseList.run();
			showAlert("success","success")
		}

		closeModal(ModalRequestForm.name)
	},

	async deletePurchease(record){  
		await queryPurchaseDelete.run({uuid:record.uuid});
		await queryPurchaseList.run();
		showAlert("success","success")
	}


}