export default {
	async logout () {
		//	use async-await or promises 
		clearStore();
		navigateTo("https://sso.clicksbiz.com/realms/SCGJWD-Portal/protocol/openid-connect/logout?redirect_uri=https://appsmith.clicksbiz.com/app/purchase-request/login-66d80e85444411108d7b0c48")
	}
}