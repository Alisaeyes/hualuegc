;(function(win){
	var Storage = {
		oStor: win.localStorage,
		setItem:function(key,value){
			this.oStor.setItem(key,value);
		},
		getItem:function(key){
			return Storage.oStor.getItem(key);
		},
		removeItem:function(key){
			this.oStor.removeItem(key);
		},
		clearStor:function(){
			this.oStor.clear();
		}
	};

	win.Stor = Storage;	
})(window);