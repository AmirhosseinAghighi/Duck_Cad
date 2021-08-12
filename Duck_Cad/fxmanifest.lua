fx_version 'cerulean'
game 'gta5'

description 'QB-Aghighi_Police_MDT'
version '1.0.0'


client_scripts {
    'Config.lua',
    'client/main.lua',
}

server_scripts {
    '@mysql-async/lib/MySQL.lua',
    'server/main.lua',
    'Config.lua'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/app.js',
    'html/style.css',
    'html/img/logo.png',
	'html/img/Loading.gif',
}