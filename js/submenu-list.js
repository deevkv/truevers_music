(function() {

	var navSubmenu = document.querySelector('.site-list__album');
	var submenuList = document.querySelector('.submenu-list');

	navSubmenu.addEventListener('click', function() {
		if(submenuList.classList.contains('submenu-list__closed')) {
			submenuList.classList.remove('submenu-list__closed');
			submenuList.classList.add('submenu-list__show');
		} else {
			submenuList.classList.add('submenu-list__closed');
			submenuList.classList.remove('submenu-list__show');
		} 
	});
	
})();