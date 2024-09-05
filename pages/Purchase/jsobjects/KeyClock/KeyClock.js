export default { 
	async checkLogin(){
		if(appsmith.store.userLogin == null){
			navigateTo("Login"); 
		}
	},
	async logout () { 
		clearStore(); 
		navigateTo("https://sso.clicksbiz.com/realms/SCGJWD-Portal/protocol/openid-connect/logout?redirect_uri=https://appsmith.clicksbiz.com/app/purchase-request/login-66d80e85444411108d7b0c48")
	}
}