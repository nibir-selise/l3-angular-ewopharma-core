export const ModuleDMSConfig = {
    AdminUserEmail: 'selisetest.delta@gmail.com',
    SharedWorkspaceId: 'd18ee152-462c-4e0b-b790-4e3abb82446a',
    CRMFolderId: 'f4374837-c244-4a85-92d6-081715c9c57d',
    DirectoryFolderId: '576d2202-632a-4978-8c4d-6fd567581631',
    ProjectFolderId: '93ad5cc8-e563-43e0-a00d-ea5e7bc0b65a',
    forbiddenIdsToDelete: [
        'd18ee152-462c-4e0b-b790-4e3abb82446a',
        'f4374837-c244-4a85-92d6-081715c9c57d',
        '576d2202-632a-4978-8c4d-6fd567581631',
        '93ad5cc8-e563-43e0-a00d-ea5e7bc0b65a'
    ],
    FolderNameAtCreation:'SystemWillDeleteIt'
}
export const DmsCommonConfig = {
    maxFileSize: 10000000,
    viewConfig: {
        listView: true,
    },
    folderNameMinLength: 2,
    hideSideNav: true,
    RowBreakPoint: {
        xs: "100",
        sm: "33",
        md: "20",
        lg: "20",
    },
    ExtMap: {
        default: {
            IconName: "insert_drive_file",
        },
        aif: { IconName: "music_note" },
        cda: { IconName: "music_note" },
        mid: { IconName: "music_note" },
        mp3: { IconName: "music_note" },
        mpa: { IconName: "music_note" },
        ogg: { IconName: "music_note" },
        wav: { IconName: "music_note" },
        wma: { IconName: "music_note" },
        wpl: { IconName: "music_note" },

        "7z": { IconName: "inventory_2" },
        arj: { IconName: "inventory_2" },
        deb: { IconName: "inventory_2" },
        pkg: { IconName: "inventory_2" },
        rar: { IconName: "inventory_2" },
        rpm: { IconName: "inventory_2" },
        "tar.gz": { IconName: "inventory_2" },
        z: { IconName: "inventory_2" },
        zip: { IconName: "inventory_2" },

        ai: { IconName: "image" },
        bmp: { IconName: "image" },
        gif: { IconName: "image" },
        ico: { IconName: "image" },
        jpeg: { IconName: "image" },
        jpg: { IconName: "image" },
        png: { IconName: "image" },
        ps: { IconName: "image" },
        psd: { IconName: "image" },
        svg: { IconName: "image" },
        tif: { IconName: "image" },

        xlr: { IconName: "list" },
        ods: { IconName: "list" },
        xls: { IconName: "list" },
        xlsx: { IconName: "list" },

        pdf: { IconName: "picture_as_pdf" },
        doc: { IconName: "description" },
        docx: { IconName: "description" },
        odt: { IconName: "description" },
        rtf: { IconName: "description" },
        tex: { IconName: "description" },
        txt: { IconName: "description" },
        wks: { IconName: "description" },
        wps: { IconName: "description" },
        wpd: { IconName: "description" },

        "3g2": { IconName: "play_circle" },
        "3gp": { IconName: "play_circle" },
        avi: { IconName: "play_circle" },
        flv: { IconName: "play_circle" },
        h264: { IconName: "play_circle" },
        m4v: { IconName: "play_circle" },
        mkv: { IconName: "play_circle" },
        mov: { IconName: "play_circle" },
        mp4: { IconName: "play_circle" },
        mpg: { IconName: "play_circle" },
        mpeg: { IconName: "play_circle" },
        rm: { IconName: "play_circle" },
        swf: { IconName: "play_circle" },
        vob: { IconName: "play_circle" },
        wmv: { IconName: "play_circle" },
    },
    detailsTab: {
        isShowPersons: true,
        isShowRoles: true,
        dynamicRoleCallback: true,
        rolesList: [
            {
                'Value': 'admin',
                'ViewValue': 'App Admin'
            }
        ]
    },
    downloadSecureFile: true,
    viewArchivedDoc:false
}
export const DocumentFeaturesForModule = {
    CRM:{
        "AppName" : "CRM.Details.Documents.DocumentList",
        "FeatureId" : "crm.details.documents.documentlist",
    },
    HR:{
        "AppName" : "directory.employeedetails.document",
        "FeatureId" : "directory.employeedetails.document",
    },
    Projects:{
        "AppName" : "Workforce.Planning.overall.Details.DocsTab.Docs",
        "FeatureId" : "workforce.planning.overall.details.docstab.docs",
    }
}