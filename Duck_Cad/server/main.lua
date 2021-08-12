Keys = {
    ['ESC'] = 322, ['F1'] = 288, ['F2'] = 289, ['F3'] = 170, ['F5'] = 166, ['F6'] = 167, ['F7'] = 168, ['F8'] = 169, ['F9'] = 56, ['F10'] = 57,
    ['~'] = 243, ['1'] = 157, ['2'] = 158, ['3'] = 160, ['4'] = 164, ['5'] = 165, ['6'] = 159, ['7'] = 161, ['8'] = 162, ['9'] = 163, ['-'] = 84, ['='] = 83, ['BACKSPACE'] = 177,
    ['TAB'] = 37, ['Q'] = 44, ['W'] = 32, ['E'] = 38, ['R'] = 45, ['T'] = 245, ['Y'] = 246, ['U'] = 303, ['P'] = 199, ['['] = 39, [']'] = 40, ['ENTER'] = 18,
    ['CAPS'] = 137, ['A'] = 34, ['S'] = 8, ['D'] = 9, ['F'] = 23, ['G'] = 47, ['H'] = 74, ['K'] = 311, ['L'] = 182,
    ['LEFTSHIFT'] = 21, ['Z'] = 20, ['X'] = 73, ['C'] = 26, ['V'] = 0, ['B'] = 29, ['N'] = 249, ['M'] = 244, [','] = 82, ['.'] = 81,
    ['LEFTCTRL'] = 36, ['LEFTALT'] = 19, ['SPACE'] = 22, ['RIGHTCTRL'] = 70,
    ['HOME'] = 213, ['PAGEUP'] = 10, ['PAGEDOWN'] = 11, ['DELETE'] = 178,
    ['LEFT'] = 174, ['RIGHT'] = 175, ['TOP'] = 27, ['DOWN'] = 173,
}


ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)


ESX.RegisterServerCallback('DuckMdt:GetAllWanteds', function(src, cb)
    local object = {}
    local wait = true
    MySQL.Async.fetchAll('SELECT `modelname`, `plate` FROM owned_vehicles WHERE WantedLevel <> "standard"', {}, function(result)
        object.cars = result
        MySQL.Async.fetchAll('SELECT `playerName`, `phone_number`, `identifier` FROM users WHERE WantedLevel <> "standard"', {}, function(result2)
            object.peoples = result2
            wait = false
        end)
    end)
    Wait(500)
    cb(object)
end)


ESX.RegisterServerCallback('DuckMdt:SearchCitizen', function(src, cb, Text)
    local object = {}
    local wait = true
    local text = "%"..Text.."%"
    -- print(text)
    MySQL.Async.fetchAll('SELECT `playerName`, `phone_number`, `WantedLevel`, `identifier` FROM users WHERE `playerName` LIKE @name', {['@name'] = text}, function(result)
        print(json.encode(result))
        object.Citizens = result
    end)
    Wait(500)
    cb(object)
end)

ESX.RegisterServerCallback('DuckMdt:SearchCars', function(src, cb, Text)
    local object = {}
    local wait = true
    local text = "%"..Text.."%"
    -- print(text)
    MySQL.Async.fetchAll('SELECT `plate`, `owner`, `stored`, `WantedLevel` FROM owned_vehicles WHERE `plate` LIKE @plate', {['@plate'] = text}, function(result)
        print(json.encode(result))
        object.Cars = result
    end)
    Wait(500)
    cb(object)
end)

ESX.RegisterServerCallback('DuckMdt:CitizenProfile', function(src, cb, Steam)
    local object = {}
    local wait = true
    -- print(Steam)
    MySQL.Async.fetchAll('SELECT `playerName`, `bank`, `gender`, `job`, `job_grade`, `jail`, `phone_number`, `WantedLevel`, `identifier`, `Profile_Pic` FROM users WHERE `identifier` =  @identifier', {['@identifier'] = Steam}, function(result)
        object.CitizenProfile = result
        MySQL.Async.fetchAll('SELECT `plate`, `owner`, `stored`, `WantedLevel` FROM owned_vehicles WHERE `owner` =  @owner', {['@owner'] = Steam}, function(result)
            object.CitizenCars = result
            MySQL.Async.fetchAll('SELECT `id`, `steam`, `reason`, `date`, `author` FROM duckcad_data WHERE `deleted` = 0 AND `steam` = @steam', {['@steam'] = Steam}, function(result)
                object.Data = result
                -- print(json.encode(object.Data))
            end)
        end)
    end)
    Wait(500)
    cb(object)
end)

ESX.RegisterServerCallback('DuckMdt:CarProfile', function(src, cb, Plate)
    local object = {}
    local wait = true
    -- print(Plate)
    MySQL.Async.fetchAll('SELECT `owner`, `WantedLevel`, `plate`, `Profile_Pic`  FROM owned_vehicles WHERE `plate` =  @plate', {['@plate'] = Plate}, function(result)
        object.CarInfo = result
        MySQL.Async.fetchAll('SELECT `playerName`, `phone_number` FROM users WHERE `identifier` =  @identifier', {['@identifier'] = object.CarInfo[1]['owner']}, function(result)
            object.OwnerInfo = result
        end)
    end)
    Wait(500)
    cb(object)
end)

ESX.RegisterServerCallback('DuckMdt:SaveNewData', function(src, cb, reason, name, steam)
    -- print(reason, name, steam)
    -- print('done')
    local object = {}
    MySQL.Async.fetchAll('INSERT INTO duckcad_data (`steam`, `reason`, `author`) VALUES (@steam, @reason, @author)', {['@steam'] = steam, ['@reason'] = reason, ['@author'] = name}, function(result) 
        MySQL.Async.fetchAll('SELECT `id`, `steam`, `reason`, `date`, `author` FROM duckcad_data WHERE `deleted` = 0 AND `steam` = @steam', {['@steam'] = steam}, function(result)
            object.result = result
        end)
    end)
    Wait(500)
    cb(object)
end)


ESX.RegisterServerCallback('DuckMdt:DeleteData', function(src, cb, id, steam)
    -- print(id, steam)
    -- print('done')
    local object = {}
    MySQL.Async.fetchAll('DELETE FROM duckcad_data WHERE `id` = @id', {['@id'] = id}, function(result) 
        MySQL.Async.fetchAll('SELECT `id`, `steam`, `reason`, `date`, `author` FROM duckcad_data WHERE `deleted` = 0 AND `steam` = @steam', {['@steam'] = steam}, function(result)
            object.result = result
        end)
    end)
    Wait(500)
    cb(object)
end)

RegisterNetEvent('DuckMdt:UpdateCharacterStatus')
AddEventHandler('DuckMdt:UpdateCharacterStatus', function(NewStatus, steam)
    MySQL.Async.fetchAll('UPDATE users SET `WantedLevel` = @NewStatus WHERE `identifier` = @steam', {['@NewStatus'] = NewStatus, ['@steam'] = steam}, function(result) 

    end)
end)

RegisterNetEvent('DuckMdt:UpdateCarStatus')
AddEventHandler('DuckMdt:UpdateCarStatus', function(NewStatus, plate)
    MySQL.Async.fetchAll('UPDATE owned_vehicles SET `WantedLevel` = @NewStatus WHERE `plate` = @plate', {['@NewStatus'] = NewStatus, ['@plate'] = plate}, function(result) 

    end)
end)

RegisterNetEvent('DuckMdt:UpdateProfilePicCharacter')
AddEventHandler('DuckMdt:UpdateProfilePicCharacter', function(Profile_Pic, steam)
    MySQL.Async.fetchAll('UPDATE users SET `Profile_Pic` = @Profile_Pic WHERE `identifier` = @steam', {['@Profile_Pic'] = Profile_Pic, ['@steam'] = steam}, function(result) 

    end)
end)

RegisterNetEvent('DuckMdt:UpdateProfilePicCar')
AddEventHandler('DuckMdt:UpdateProfilePicCar', function(Profile_Pic, plate)
    MySQL.Async.fetchAll('UPDATE owned_vehicles SET `Profile_Pic` = @Profile_Pic WHERE `plate` = @plate', {['@Profile_Pic'] = Profile_Pic, ['@plate'] = plate}, function(result) 

    end)
end)


------------------------------



RegisterNetEvent('DuckMdt:PrintLog')
AddEventHandler('DuckMdt:PrintLog', function()
        print(DuckMdt.AnnouneText..source)
end)

RegisterNetEvent('DuckMdt:Announce')
AddEventHandler('DuckMdt:Announce', function()
    local xPlayers = ESX.GetPlayers()
    for i=1, #xPlayers, 1 do
        local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
        if xPlayer.permission_level >= DuckMdt.AnnouncePerm then
            print('Announced')
        	TriggerClientEvent('chat:addMessage', -1, {
		    	color = { 255, 0, 0},
		 		multiline = true,
				args = {"[Duck_Cad]", "^1 " ..DuckMdt.AnnouneText..source}
			})
        end
    end
end)