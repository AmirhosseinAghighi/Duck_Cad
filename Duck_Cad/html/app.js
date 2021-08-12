//Config !

const backgrounds = {
    ['Menu'] : 'https://idtop.ir/files/images/TblGalleryImage/2d1128da-48f3-414a-8d8d-ccb88bc657ac-upload-8.PNGipad.PNGx.PNG',
    ['Setting'] : '#f7f7f7',
    ['Contacts'] : '#f7f7f7',
    ['Call'] : '#f7f7f7',
    ['FaceTime'] : '#f7f7f7',
    ['Tweeter'] : '#243f4b',
    ['Message'] : '#f7f7f7',
}

let DuckMdt = {}
let currenttab = 'MainPanel';
let inswitchpage = false
let steam =  null
let plate = null

DuckMdt.Loading = function(firstpage, nextpage, time) {
    $("#" + firstpage).fadeOut()
    $("#LoadingPage").fadeIn()
    setTimeout(function(){
        $("#LoadingPage").fadeOut()
        $("#" + nextpage).fadeIn()
    }, time)
}

DuckMdt.Login = function() {
    $.post('https://Duck_Cad/Login', JSON.stringify({}));  
    DuckMdt.Loading('LoginPage', 'MainPage', 1000)
}

DuckMdt.PageSwitch = function(FirstPage, NextPage, Time) {
    // console.log('#Page_Button_' + NextPage)
    $('#Page_Button_' + FirstPage).removeClass('MainPageTabActiveButton')
    $('#Page_Button_' + NextPage).addClass('MainPageTabActiveButton')

    if (NextPage === 'TenCodes') {
        $.post('https://Duck_Cad/LoadTenCodes', JSON.stringify({}));
    } else if (NextPage === 'LoginPage') {
        $("#MainPage").fadeOut()
        $("#LoginPage").fadeIn()
    }

    if (currenttab === 'CitizensDetailInfo') {
        $('#Page_Button_CitizensList').removeClass('MainPageTabActiveButton')
    } else if (currenttab === 'CarDetailInfo') {
        $('#Page_Button_VehiclesList').removeClass('MainPageTabActiveButton')
    }

    $("#Page_" + FirstPage).fadeOut()
    setTimeout(function(){
        $("#Page_" + NextPage).fadeIn()
    }, Time)
}

DuckMdt.TabSelected = function(NewTab) {
    if (!inswitchpage) {
        if (NewTab === 'MainPanel') {
            $.post('https://Duck_Cad/Login', JSON.stringify({}));  
        }
        DuckMdt.PageSwitch(currenttab, NewTab, 500)
        currenttab = NewTab
        inswitchpage = true
        setTimeout(function() {
            inswitchpage = false
        }, 500)
    }
}



DuckMdt.BackToCitzenList = function() {
    DuckMdt.Loading('MainPage', 'MainPage', 800)
    setTimeout(() => {
        $('#Page_CitizensList').show()
        $('#Page_CitizensDetailInfo').hide()
        currenttab = 'CitizensList'
    }, 500);
}

DuckMdt.BackToCarList = function() {
    DuckMdt.Loading('MainPage', 'MainPage', 800)
    setTimeout(() => {
        $('#Page_VehiclesList').show()
        $('#Page_CarDetailInfo').hide()
        currenttab = 'VehiclesList'
    }, 500);
}



function Open_Citizen_Profile(steam) {
    // // console.log(typeof steam)
    $.post('https://Duck_Cad/CitizenProfile', JSON.stringify({Steam: steam}));
}   

function Open_Car_Profile(plate) {
    $.post('https://Duck_Cad/CarProfile', JSON.stringify({Plate: plate}));
}

function DataButton() {
    $('#myModal').show()
}

function CloseDataModal() {
    $('#NewDataReason').text('')
    $('#myModal').hide()
}

function SaveNewData(steam) {
    let reason = $('#NewDataReason').val()
    // console.log(reason)
    if (reason != '') {
        $.post('https://Duck_Cad/SaveNewData', JSON.stringify({Reason: reason, steam: steam}));
        CloseDataModal()
    } else {
        $('#NewDataReason').addClass('Input-error')
    }
}

function DeleteData(id, steam) {
    if (id) {
        $.post('https://Duck_Cad/DeleteData', JSON.stringify({id: id, steam: steam}));
    }
}


function CloseCProfileModal() {
    $('#NewCPorfileUrl').text('')
    $('#NewCPorfileUrlModal').hide()
}


function SetProfileCitizen() {
    $('#NewCPorfileUrlModal').show()
}

function SetNewProfilePic(steam) {
    let picurl = $("#NewCPorfileUrl").val()
    $("#Character_Profile_Picture").attr('src', picurl)
    $.post('https://Duck_Cad/UpdateProfilePicCharacter', JSON.stringify({url: picurl, steam: steam}));
    CloseCProfileModal()
}



function CloseCarProfileModal() {
    $('#NewCarPorfileUrl').text('')
    $('#NewCarPorfileUrlModal').hide()
}


function Car_SetProfileCitizen() {
    $('#NewCarPorfileUrlModal').show()
}

function Car_SetNewProfilePic(plate) {
    let picurl = $("#NewCarPorfileUrl").val()
    $("#Car_Profile_Picture").attr('src', picurl)
    $.post('https://Duck_Cad/UpdateProfilePicCar', JSON.stringify({url: picurl, plate: plate}));
    CloseCarProfileModal()
}

function ExitTablet() {
    $.post('https://Duck_Cad/Exit', JSON.stringify({}));
}




$(document).ready(function(){
    $("#CitizenSearch").keyup(function(event) {
        if (event.keyCode === 13) {
            let SearchInput = $("#CitizenSearch").val()
            if (SearchInput != "") {
                $.post('https://Duck_Cad/SearchCitizen', JSON.stringify({Text: SearchInput}));
            }
        }
    });


    $("#VehicleSearch").keyup(function(event) {
        if (event.keyCode === 13) {
            let SearchInput = $("#VehicleSearch").val()
            if (SearchInput != "") {
                $.post('https://Duck_Cad/SearchCars', JSON.stringify({Text: SearchInput}));
            }
        }
    });

    $("#Character_Profile_Select_Wanted").on('change', function() {
        // console.log(this.value)
        switch (this.value) {
            case 'standard':
                $("#Character_Profile_Select_Wanted").css('color', 'white')
                $("#WantedColor_Character").css('background-color', 'white')
                $.post('https://Duck_Cad/UpdateCharacterStatus', JSON.stringify({NewStatus: this.value, steam: steam}));  
            break;

            case 'arrested':
            case 'wanted':
                // console.log('its working')
                $("#Character_Profile_Select_Wanted").css('color', 'rgb(201, 36, 36)')
                $("#WantedColor_Character").css('background-color', 'rgb(201, 36, 36)')
                $.post('https://Duck_Cad/UpdateCharacterStatus', JSON.stringify({NewStatus: this.value, steam: steam}));  
            break;

            case 'in_prison':
            case 'special':
                $("#Character_Profile_Select_Wanted").css('color', 'rgb(36, 74, 201)')
                $("#WantedColor_Character").css('background-color', 'rgb(36, 74, 201)')
                $.post('https://Duck_Cad/UpdateCharacterStatus', JSON.stringify({NewStatus: this.value, steam: steam}));  
            break;
        }
    })

    $("#Car_Profile_Select_Wanted").on('change', function() {
        // console.log(this.value)
        switch (this.value) {
            case 'standard':
                $("#Car_Profile_Select_Wanted").css('color', 'white')
                $("#WantedColor_Car").css('background-color', 'white')
                $.post('https://Duck_Cad/UpdateCarStatus', JSON.stringify({NewStatus: this.value, plate: plate}));  

            break;
            
            case 'arrested':
            case 'wanted':
                $("#Car_Profile_Select_Wanted").css('color', 'rgb(201, 36, 36)')
                $("#WantedColor_Car").css('background-color', 'rgb(201, 36, 36)')
                $.post('https://Duck_Cad/UpdateCarStatus', JSON.stringify({NewStatus: this.value, plate: plate}));  
            break;

            case 'in_prison':
            case 'special':
                $("#Car_Profile_Select_Wanted").css('color', 'rgb(36, 74, 201)')
                $("#WantedColor_Car").css('background-color', 'rgb(36, 74, 201)')
                $.post('https://Duck_Cad/UpdateCarStatus', JSON.stringify({NewStatus: this.value, plate: plate}));  
            break;
        }
    })


});



// other functons

function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }





window.addEventListener('message', function(event) {
    var data = event.data;
      if (data.type === "MDT") {
        if (data.info == "Open") {
            $(".tablet").show();
        } else if (data.info == "Close") {
            $(".tablet").hide();
            DuckMdt.PageSwitch(currenttab, 'LoginPage', 100)
        }
      } else if (data.type === "LoginUpdate") {
        $('#Main_Page_PeopleWanted_List').empty()
        $('#Main_Page_CarsWanted_List').empty()
          $('#username_mdt').text(data.name)
          $('#Rank_mdt').text(data.rank)
          data.PeopleWanteds.forEach(element =>
                // $('#Main_Page_PeopleWanted_List').append('<div class="List_Row" style="border-top: 9px solid rgb(196, 0, 0);"><p>' + element['playerName'] + '</p><p>' + element['phone_number'] + '</p></div>')
                $('#Main_Page_PeopleWanted_List').append('<div class="List_Row" onclick="Open_Citizen_Profile(`' + element['identifier'] + '`)"><p>' + element['playerName'] + '</p><p>' + element['phone_number'] + '</p></div>')
            );

        data.WantedCars.forEach(element =>
            // $('#Main_Page_CarsWanted_List').append('<div class="List_Row" style="border-top: 9px solid rgb(196, 0, 0);"><p>' + element['model'] + '</p><p>' + element['plate'] + '</p></div>')
            $('#Main_Page_CarsWanted_List').append('<div class="List_Row" onclick="Open_Car_Profile(`' + element['plate'] + '`)"><p>' + element['modelname'] + '</p><p>' + element['plate'] + '</p></div>')
        );
      } else if (data.type === "SearchResult") {
        if (data.Stype === 'Citizen') {
            // console.log('s')
            let number = 1;
            DuckMdt.Loading('MainPage', 'MainPage', 1500)
                setTimeout(function(){
                    $('#Citizens_List_Search_Resualts').empty()
                    data.object.forEach(element => {
                        if (element['playerName'] != "") {
                            if (element['WantedLevel'] != 'standard') {
                                $('#Citizens_List_Search_Resualts').append('<div class="List_Row List_Row_Wanted" id="Citizen_SearchResult_List"  style="padding-right: 120px;" onclick="Open_Citizen_Profile(`' + element['identifier'] + '`)"><p>' + number++ + '</p><p>' + element['playerName'] + '</p><p>' + element['phone_number'] + '</p><p style="color: rgb(255, 47, 47);">Wanted</p></div>')
                            } else {
                                $('#Citizens_List_Search_Resualts').append('<div class="List_Row" id="Citizen_SearchResult_List"  style="padding-right: 265px; padding-left: 25px;" onclick="Open_Citizen_Profile(`' + element['identifier'] + '`)"><p>' + number++ + '</p><p>' + element['playerName'] + '</p><p>' + element['phone_number'] + '</p></div>')
                            }
                        }
                    })
                }, 500)


            } else if (data.Stype === 'Car') {
                // console.log('s')
                let number = 1;
                DuckMdt.Loading('MainPage', 'MainPage', 500)
                    setTimeout(function(){
                        $('#Cars_List_Search_Resualts').empty()
                        data.object.forEach(element => {
                            if (element['plate'] != "") {
                                let status = 'Impound'
                                if (element['stored']) {
                                    status = 'Parking'
                                }
                                if (element['WantedLevel'] != 'standard') {
                                    $('#Cars_List_Search_Resualts').append('<div class="List_Row List_Row_Wanted" id="Cars_SearchResult_List"  style="padding-right: 120px;" onclick="Open_Car_Profile(`' + element['plate'] + '`)" onclick="Open_Car_Profile(`' + element['owner'] + '`)"><p>' + number++ + '</p><p>' + element['plate'] + '</p><p>' + status + '</p><p style="color: rgb(255, 47, 47);">Wanted</p></div>')
                                } else {
                                    $('#Cars_List_Search_Resualts').append('<div class="List_Row" id="Cars_SearchResult_List"  style="padding-right: 265px; padding-left: 25px;" onclick="Open_Car_Profile(`' + element['plate'] + '`)" onclick="Open_Car_Profile(`' + element['owner'] + '`)"><p>' + number++ + '</p><p>' + element['plate'] + '</p><p>' + status + '</p></div>')
                                }
                            }
                        })
                    }, 500)
            }

    } else if (data.type === "LoadCitizenProfile") {
        if (currenttab === 'MainPanel') {
            // $('#Page_MainPanel').hide()
            DuckMdt.PageSwitch('MainPanel', 'CitizensList', 500)
        }
        currenttab = 'CitizensDetailInfo'
        let user = data.object[0]
        let gender = 'male'
        if (user['gender'] != 0) {
            gender = 'female'
        }
        DuckMdt.Loading('MainPage', 'MainPage', 500)
        setTimeout(function(){
            $('#Page_CitizensList').hide()
            $('#Page_CitizensDetailInfo').show()
            $("#Character_Details_Gender").text(gender)
            $("#Character_Details_Phonenumber").text(user['phone_number'])
            $("#Character_Details_Bank").text(user['bank'])
            $("#Character_Profile_Select_Wanted").val(user['WantedLevel']).change();
            $('#CharacterName_P').text(user['playerName'].split('_').join(' ')) // ic name
            $("#Character_Profile_Picture").attr('src', user['Profile_Pic'])
            $("#Character_Profile_Picture_Button").attr('onclick', 'SetProfileCitizen()')
            $("#Character_SetNewProfilePic").attr('onclick', 'SetNewProfilePic("' + user['identifier'] + '")')
            steam =  user.identifier
            $("#SaveNewData").attr('onclick', 'SaveNewData("' + user['identifier'] + '")')
            let number = 1;
            // console.log(data.cars)
            data.cars.forEach(element => {
                let status = 'Impound'
                if (element['stored']) {
                    status = 'Parking'
                }
                if (element['WantedLevel'] != 'standard') {
                    $('#Character_Profile_Cars_List').append('<div class="List_Row List_Row_Wanted" id="Cars_SearchResult_List"  style="padding-right: 120px;" onclick="Open_Car_Profile(`' + element['plate'] + '`)" onclick="Open_Car_Profile(`' + element['owner'] + '`)"><p>' + number++ + '</p><p>' + element['plate'] + '</p><p>' + status + '</p><p style="color: rgb(255, 47, 47);">Wanted</p></div>')
                } else {
                    $('#Character_Profile_Cars_List').append('<div class="List_Row" id="Cars_SearchResult_List"  style="padding-right: 265px; padding-left: 25px;" onclick="Open_Car_Profile(`' + element['plate'] + '`)" onclick="Open_Car_Profile(`' + element['owner'] + '`)"><p>' + number++ + '</p><p>' + element['plate'] + '</p><p>' + status + '</p></div>')
                }
            })
        }, 500)

    } else if (data.type === "LoadCarProfile") {
        // console.log(currenttab)
        if (currenttab === 'MainPanel') {
            // $('#Page_MainPanel').hide()
            DuckMdt.PageSwitch('MainPanel', 'VehiclesList', 500)
        } else if (currenttab === 'CitizensDetailInfo') {
            DuckMdt.PageSwitch('CitizensDetailInfo', 'VehiclesList', 500)
        }
        currenttab = 'CarDetailInfo'
        // if (!data.object) 
        // // let user = data.object[0]
        // let gender = 'male'
        // if (user['gender'] != 0) {
        //     gender = 'female'
        // }
        DuckMdt.Loading('MainPage', 'MainPage', 500)
        let car = data.object[0]
        let owner = data.owner[0]
        setTimeout(function(){
            $('#Page_CitizensDetailInfo').hide()
            $('#Page_VehiclesList').hide()
            $('#Page_CarDetailInfo').show()
            $("#Car_Details_Owner").text(owner['playerName'])
            $("#Car_Details_Owner_Phone_Number").text(owner['phone_number'])
            $("#Car_Profile_Select_Wanted").val(car['WantedLevel']).change();
            $('#CarName_P').text(car['plate']) // plate as ic name
            $("#Car_Profile_Picture").attr('src', car['Profile_Pic'])
            $("#Car_Profile_Picture_Button").attr('onclick', 'Car_SetProfileCitizen()')
            $("#Car_SetNewProfilePic").attr('onclick', 'Car_SetNewProfilePic("' + car['plate'] + '")')
            plate = car['plate']
        }, 500);
    } else if (data.type === 'LoadDataList') {
        // console.log('s')
        $('#list_data_citizen').empty()
        let number = 1;
        data.object.forEach(element => {
            // console.log('"DeleteData(' + element['id'] + ', ' + element['steam'] + ')"')
            $('#list_data_citizen').append('<div style="width: 100%;"><div class="data_Row" style="float: left;"><p>' + number++ + '</p><p>' + element['author'] + '</p><p>2021/3/21</p><p>' + element['reason'] + '</p></div><div style="float: right;"><button class="Data_Delete_Button" onclick="DeleteData(' + element['id'] + ', `' + element['steam'] + '`)" >✖</button></div></div>')
        })

    } else if (data.type === 'LoadTenCodes') {
        $('#Page_TenCodes').empty()
        data.Codes.forEach(element => {
            $('#Page_TenCodes').append('<span style="font-size: 1.5vw;">' + element + '</span><br>')
        })
    }


});









