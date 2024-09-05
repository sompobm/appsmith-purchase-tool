export default { 
	async getParam(url){
  	 var params = {};
				(url).split('?')[1].split('&').forEach(function (pair) {
					pair = (pair + '=').split('=').map(decodeURIComponent);
					if (pair[0].length) {
						params[pair[0]] = pair[1];
					}
				});
  return params;
	},

	async getToken () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
		
		try{
				const queryString = await this.getParam(appsmith.URL.fullPath); 
				// const parm = await this.getParam(queryString)  
				if(queryString["code"] != undefined){
					console.log(queryString["code"])
						let objToken = await ApiKeyCloakGetToken.run({code :queryString["code"] });
						console.log(objToken)
						let user = await ApiKeyCloakUser.run({token : objToken.access_token});
						console.log(user)
						Text1.setText("Welcome : " +user.name)
					  storeValue("userLogin",user)
						navigateTo("Purchase")
				}else{
					 storeValue("userLogin",null)
				}
     }catch(error){
 		  	//navigateTo('Login')
     }
		
	}
}