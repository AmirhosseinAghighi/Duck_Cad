DuckMdt = {}

DuckMdt.Command = 'PoliceMdt' -- Command to show up the mdt

DuckMdt.PoliceJob = 'police' -- police name in db

DuckMdt.OnDutyCheck = false -- check player is onduty or not for openning tablet

DuckMdt.CheckRank = false -- Check Rank Of Player for openning tablet

DuckMdt.MinRank = 1 -- minimum of rank for openning tablet ( if CheckRank is true )

DuckMdt.TenCodes = { -- list of ten codes for ten codes page
    '10-3 | Radio Mute', -- Example
    'Example Code | Example Explation'
}


-- Security

DuckMdt.BlockNuiDevTool = true -- check player job for every stuff !

DuckMdt.LogUsingNuiDevTool = true -- log cheater id in console of server if player job wasnt DuckMdt.PoliceJob !

DuckMdt.AnnouneAdminUsingNuiDevTool = true -- Announe Cheater Id in cinsole of server if player job wasnt DuckMdt.PoliceJob !

DuckMdt.AnnouneText = 'Some One Wants to use tablet without permission ! id : ' -- Announce Text (if DuckMdt.AnnouneAdminUsingNuiDevTool is true) (this text is using for Server consol log too)

DuckMdt.AnnouncePerm = 1 -- minimum perm to get announce (if DuckMdt.AnnouneAdminUsingNuiDevTool is true)