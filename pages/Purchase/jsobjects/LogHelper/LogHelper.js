export default { 
	async showModalLog (record) {
		showModal(ModalHistoryLog.name)
		storeValue("purchase_id", record.uuid)
		// storeValue("purchase_status", record.status)
		statusHistory.setSelectedOption(record.status)
		queryLogList.run({uuid:appsmith.store.purchase_id})
	},
	
	async addHistoryLog () {
		if(txtLogDetail.text ==null || txtLogDetail.text ==""){
			showAlert("Please Input History Detail","error")
			return;
		}
		await queryLogInsert.run({uuid:appsmith.store.purchase_id,status : statusHistory.selectedOptionValue,description:txtLogDetail.text})
		await updatePurchaseStatus.run({uuid:appsmith.store.purchase_id,status : statusHistory.selectedOptionValue})
		await queryLogList.run({uuid:appsmith.store.purchase_id}); 
		resetWidget("txtLogDetail")
		showAlert("Success","success")
	},
	async showModalLogMore (record) {
		showModal(ModalHistoryDetail.name)
		txtHistoryDetailMore.setValue(record.description)
	}
	
}