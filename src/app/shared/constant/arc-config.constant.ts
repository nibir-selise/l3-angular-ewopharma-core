export const Emails = ["Email", "Type", "ItemId"];
export const PhoneNumbers = ["Phone", "Type", "ItemId", "Name", "Description"];
export const Country = ["ItemId", "ShortCode", "Name", "IsoCode"];
export const Addresses = [
  "ItemId",
  "AddressLine",
  "Street",
  "PostalCode",
  "Locality",
  "City",
  "State",
  { Country: Country }
];
export const Nationality = ["ItemId", { Country: Country }, "Name"];
export const IdentityImages = ["ItemId", "FileId", "FileUrl"];
export const Identifications = [
  "ItemId",
  "IdentificationNo",
  "Type",
  { IssuedPlace: Addresses },
  "IssuedDate",
  "ValidityDate",
  { Images: IdentityImages }
];
export const Educations = [
  "ItemId",
  "Degree",
  "Grade",
  "StartYear",
  "EndYear",
  "FieldOfStudy",
  "IsStillStudying",
  { Institution: ["Name", "ItemId"] }
];
export const Employments = [
  "ItemId",
  "Industry",
  "EmployedSince",
  "Designation",
  "EmployedTill",
  "IsStillWorking",
  { Company: ["ItemId", "Name"] },
  { Location: Addresses }
];
export const FamilyMembers = [
  "ItemId",
  "Name",
  "Relationship",
  "DateOfBirth",
  { Emails: Emails },
  { PhoneNumbers: PhoneNumbers },
  "Sex",
  "ImageFileId"
];
export const CampaignLeadAnalytics = [
  "ActionType",
  "FiredAt",
  "TenantId",
  "ListId",
  "Email",
  "FirstName",
  "LastName",
  "CampaignId",
  "DataId",
  "OldEmail",
  "NewEmail",
  "Reason",
  "IpOpt",
  "EmailType"
];
const SegmentationCriteriaString = ["Type", "Value"];
const Between = ["Max", "Min"];
export const Analytics = ["Selected", "Send", "Reject", "Delivery", "Bounce", "Complaint", "Click", "Open", "RenderingFailure", "RenderingSuccess", "Unsubscribed"];
export const CampaignMediaDetails = ["MediaId", {Analytics}];
export const CampaignPublisherDetail = ["ItemId", "TemplateId"];
export const CustomerGroupFilter = [
  "ItemId",
  "SearchText",
  "SegmentationGraphQLQuery",
  "Name",
  "Description",
  { Sex: SegmentationCriteriaString },
  { LeadType: SegmentationCriteriaString },
  { Member: SegmentationCriteriaString },
  { MetaTags: SegmentationCriteriaString },
  { JoinedForm: SegmentationCriteriaString },
  { City: SegmentationCriteriaString },
  { PostalCode: SegmentationCriteriaString },
  { SKU: SegmentationCriteriaString },
  { TotalOrderAmout: SegmentationCriteriaString },
  { CampaignPublisherDetail }
];

export const AnalyticsSummary = [
  "UnSubscriber",
  "EmailSent",
  "ReportingTime",
  "BounceHard",
  "BounceSoft",
  "SyntaxErrors",
  "ForwardCount",
  "ForwardOpen",
  "OpenTotal",
  "OpenUnique",
  "OpenRate",
  "ClickTotal",
  "ClickUnique",
  "ClickUniqueSubscriber",
  "ClickRate"
];
export const Locations = ["CountryCode", "Region", "RegionName", "Opens"];
export const CampaignAnalyticsLocationWiseSummary = [{ Locations }];
export const Domains = [
  "Domain",
  "EmailSent",
  "Bounces",
  "Opens",
  "Clicks",
  "Unsbuscribes",
  "Delivered",
  "EmailPct",
  "BouncePct",
  "OpenPct",
  "ClickPct",
  "UnsubscribePct"
];
export const CampaignAnalyticsDomainWiseSummary = [{ Domains }];

export const EmailTemplate = [
  "ItemId",
  "Tags",
  "Language",
  "Name",
  "TemplateBody",
  "TemplateSubject",
  "GeneratedBy",
  "JsonContent",
  "ImageId",
  "ImageUrl"
];
export const SMSTemplate = ["ItemId", "Tags", "Body", "Subject"];
export const Coversations = ["DateTime", "BodyText"];

export const ARC_CONFIG = {
  DateFormat: "dd.MM.yyyy",
  ImgBaseUrl: "https://cdn.selise.biz/",
  TenantId: "874A6A2B-F0F5-43EB-A458-47C2C1A21231",
  CampaignWorkFlowId: "d6307ce4-ce7d-4fab-bad0-bbdb7bec22ae",
  Roles: {
    AppUser: "appuser",
    Anonymous: "anonymous",
    Admin: "admin",
    GlobalAdmin: "globaladmin",
    CompanyAdmin: "companyadmin"
  },
  Datatable: {
    DefaultPageNumber: 0,
    PageSize: 10
  },
  Pagination: {
    PageNumber: 0,
    PageSize: 100
  },
  Entity: {
    CountryInfo: "CountryInfo",
    Connection: "Connection",
    File: "File",
    User: "User",
    Person: "Person",
    Tag: "Tag",
    PlatformDictionary: "PlatformDictionary",
    MailThread: "MailThread",
    EntityBasedProgressStatusResult: "EntityBasedProgressStatusResult",
    CampaignSegmentation: "CampaignSegmentation",
    LaluGUlu: "LaluGulu",
    DeltaContactInformation: "DeltaContactInformation",
    CustomerGroup: "CustomerGroup",
    ArcCampaign: "ArcCampaign",
    ArcCampaignAnalytics: "ArcCampaignAnalytics",
    ArcCompany: "ArcCompany",
    SubscriptionFeature: "SubscriptionFeature",
    Meeting: "Meeting",
    SnTask: "SnTask",
    MeetingDetail: "MeetingDetail",
    SnBusinessOppurtunity: "SnBusinessOppurtunity",
    NetworkPartner: "NetworkPartner"
  },
  WorkflowEntity: {
    WorkflowPathDefined: "WorkflowPathDefined",
    Workflow: "Workflow",
    WorkflowFileTemplate: "WorkflowFileTemplate",
    WorkflowInstence: "WorkflowInstence",
    SnProductWorkflowPath: "SnProductWorkflowPath",
    ProductOfNLIVehicle: "ProductOfNLIVehicle",
    SnApplication: "SnApplication",
    SNAdvisorPromotion: "SNAdvisorPromotion",
    SnProductWorkflowDocument: "SnProductWorkflowDocument",
    SnApplicationBasket: "SnApplicationBasket",
    SnSignature: "SnSignature",
    ProductOfRetirementCashValueLifeInsurance:
      "ProductOfRetirementCashValueLifeInsurance"
  },
  WorkflowTags: {
    FileOfSnApplicationBasket: "File-Of-SnApplicationBasket"
  },
  AllFieldsOfWorkflowEntity: {
    WorkflowPathDefined: ["ItemId", "Category", "SubCategory"],
    Workflow: ["ItemId", "WorkFlowName"],
    SNAdvisorPromotionList: [
      "ItemId",
      "Name",
      "CreateDate",
      "FileIds",
      "Description",
      "Completed",
      "StartDate",
      "EndDate",
      "Priority",
      "Status",
      "WorkflowInstance",
      "StatusInProgressCount",
      "StatusDoneCount",
      "StatusToDoCount",
      "StatusRedundantCount",
      "LastUpdateDate",
      "IsDataFilterProcessRunning"
    ]
  },
  WorkflowFilterProperty: {
    WorkflowId: "WorkflowId"
  },
  SortBy: {
    Name: "Name",
    Title: "Title",
    DisplayName: "DisplayName"
  },
  Tags: {
    PersonForUser: "Person-For-User",
    IsAPersonIdentification: "Is-A-PersonIdentification",
    Person: "Person",
    Admin: "Is-A-Admin",
    IsATag: "Is-A-Tag",
    IsALead: "Is-A-Lead",
    IsAEmailTemplateGallery: "Is-A-EmailTemplateGallery",
    IsAEmailTemplate: "Is-A-EmailTemplate",
    IsASmsTemplate: "Is-A-SmsTemplate",
    IsAArcCampaignAnalytics: "Is-A-ArcCampaignAnalytics",
    IsACustomerGroup: "Is-A-CustomerGroup",
    Dictionary: "Dictionary",
    IsAArcCampaign: "Is-A-ArcCampaign",
    IsAEmployee: "Is-A-Employee",
    IsAArcCompany: "Is-A-ArcCompany",
    IsATenantCompany: "Is-A-TenantCompany",
    IsASubscriptionFeature: "Is-A-SubscriptionFeature",
    IsACompanyLogo: "Is-A-CompanyLogo",
    IsAMeeting: "Is-A-Meeting",
    IsAMeetingDetails: "MeetingDetails-of-Activity",
    IsAResource: "Is-A-Resource",
    ProfileImageOfPerson: "ProfileImage-Of-Person",
    IsAPartner: "Is-A-Partner",
    PartnerOfSLNProduct: "Partner-Of-SLNProduct"
  },
  LanguageKey: {
    English: "en-US",
    French: "fr-FR",
    German: "de-DE"
  },
  Currency: [
    {
      name: "ATS"
    }
  ],
  CountryCode: {
    Austria: "AT"
  },
  Salutation: {
    MR: "Mr",
    MRS: "Mrs"
  },
  FilterProperty: {
    Tags: "Tags",
    ParentEntityName: "ParentEntityName",
    ParentEntityID: "ParentEntityID",
    ChildEntityName: "ChildEntityName",
    ChildEntityID: "ChildEntityID",
    ItemId: "ItemId",
    PersonId: "PersonId",
    CustomerId: "CustomerId",
    Active: "Active",
    Title: "Title",
    Email: "Email",
    Date: "Date"
  },
  FileIcons: {
    docx: "Icon_docx",
    rtf: "Icon_docx",
    txt: "Icon_docx",
    xml: "Icon_docx",
    odt: "Icon_docx",
    doc: "Icon_docx",
    jpg: "Icon_jpg",
    jpeg: "Icon_jpg",
    gif: "Icon_jpg",
    bmp: "Icon_jpg",
    tiff: "Icon_jpg",
    pdf: "Icon_PDF",
    png: "Icon_png",
    xls: "Icon_xls",
    xlsx: "Icon_xls",
    xlsm: "Icon_xls",
    csv: "Icon_xls",
    xlsb: "Icon_xls",
    xlt: "Icon_xls",
    xltx: "Icon_xls",
    xltm: "Icon_xls",
    xla: "Icon_xls",
    xlam: "Icon_xls",
    zip: "Icon_zip",
    rar: "Icon_zip",
    tar: "Icon_zip",
    deb: "Icon_zip",
    Unknown: "Icon_Unknown"
  },
  FileExtention: {
    Image: [
      "ANI",
      "BMP",
      "CAL",
      "FAX",
      "GIF",
      "IMG",
      "JBG",
      "JPE",
      "JPEG",
      "JPG",
      "MAC",
      "PBM",
      "PCD",
      "PCX",
      "PCT",
      "PGM",
      "PNG",
      "PPM",
      "PSD",
      "RAS",
      "TGA",
      "TIFF",
      "WMF"
    ]
  },

  FileTypes:
    "jpg, jpeg, pjpeg, png, ico, x-icon, gif, pdf, doc, msword, docx, vnd.openxmlformats-officedocument.wordprocessingml.document, vnd.oasis.opendocument.text, xls, excel, vnd.ms-excel, x-excel, x-msexcel,  xlsx, vnd.openxmlformats-officedocument.spreadsheetml.sheet, psd, bmp, txt, plain, richtext, asc, csv, xla, vnd.ms-excel, xlt, xlw, sql, zip, x-zip-compressed, tar.gz, tar, rar, 7z, x-7z-compressed, onenote, wordperfect, ppt, mspowerpoint, powerpoint, vnd.ms-powerpoint, x-mspowerpoint, pptx, vnd.openxmlformats-officedocument.presentationml.presentation, pps, mspowerpoint, vnd.ms-powerpoint, ppsx, vnd.openxmlformats-officedocument.presentationml.slideshow, odt, vnd.oasis.opendocument.text",
  AllFieldsOfEntity: {
    LaluGUlu: ["Active"],
    User: [
      "Active",
      "CreateDate",
      "CreatedBy",
      "DisplayName",
      "Email",
      "EmailVarified",
      "Language",
      "LastUpdateDate",
      "LastUpdatedBy",
      "PhoneNumber",
      "Platform",
      "ProfileImageUrl",
      "Roles",
      "TenantId",
      "UserName",
      "FirstName",
      "LastName",
      "UserSignup",
      "ExternalProviderUserId",
      "ProfileImageId",
      "DefaultPassword",
      "EverLoggedIn",
      "ItemId",
      "Tags",
      "CountryCode",
      "Salutation",
      "TwoFactorEnabled",
      "IsSystemBlocked"
    ],
    Person: [
      "ItemId",
      "CreatedBy",
      "Tags",
      "DateOfBirth",
      "Salutation",
      "Title",
      "Sex",
      "FirstName",
      "LastName",
      "MiddleName",
      "DisplayName",
      "Nationality",
      "PhoneNumber",
      "OrganizationId",
      "Organization",
      "ProfileImageId",
      "Email",
      "Roles",
      "ProposedUserId",
      "Active"
    ],
    DeltaContactInformation: [
      "ItemId",
      "ContactTypes",
      "DateOfBirth",
      "DisplayName",
      "FirstName",
      "Roles",
      "LastName",
      "Email",
      "Phone",
      "Salutation",
      "Sex"
    ],
    CustomerGroup: [
      "ItemId",
      "CreatedBy",
      "CreateDate",
      "Name",
      "Filters",
      "CampaignPublishGraphQLQuery"
    ],
    CountryInfo: [
      "ItemId",
      "Tags",
      "Name",
      "Code",
      "CurrencyCode",
      "CurrencyName",
      "DialingCode"
    ],
    PlatformDictionary: ["Name", "Key", "Value"],
    Tag: ["ItemId", "Tags", "Name", "Language"],
    Connection: [
      "ItemId",
      "ParentEntityName",
      "ParentEntityID",
      "ChildEntityName",
      "ChildEntityID"
    ],
    ArcCampaign: [
      "ItemId",
      "Name",
      "Priority",
      "DatePublished",
      "Status",
      "Type",
      "CampaignPublishGraphQLQuery",
      "IsGraphQLQueryBySegmentWise",
      { Filters: CustomerGroupFilter },
      "WorkflowInstance",
      "CreateDate",
      "IsCampaignTargetAll",
      { CampaignPublisherDetailForTargetAll: CampaignPublisherDetail },
      {CampaignMediaDetails},
      "TargetAudience"
    ],
    ArcCampaignBasic: [
      "ItemId",
      "Name",
      "Priority",
      "DatePublished",
      "Status",
      "Type",
      "CampaignPublishGraphQLQuery",
      "WorkflowInstance",
      "CreateDate"
    ],
    ArcCampaignAnalytics: [
      "ItemId",
      "CampaignId",
      "IsTemplatewise",
      { AnalyticsSummary },
      { CampaignAnalyticsLocationWiseSummary },
      { CampaignAnalyticsDomainWiseSummary }
    ],
    ArcCompany: [
      "ItemId",
      "Language",
      "CreatedBy",
      "Name",
      "ShortName",
      "Type",
      "CompanyNr",
      { Addresses: Addresses },
      { PhoneNumbers: PhoneNumbers },
      { Emails: Emails },
      "TotalEmployees",
      "LogoId",
      "Industry",
      "Tags",
      "IsEnableListCampaign"
    ],
    SubscriptionFeature: [
      "ItemId",
      "Name",
      "Price",
      "Logo",
      "LogoType",
      "IsDisplay",
      "FeatureId",
      "IsExistKnowledgeBase",
      "IsDefaultFeature",
      "SerialNo"
    ],
    Meeting: [
      "ItemId",
      "Title",
      "Type",
      "CustomerName",
      "CustomerId",
      "Email",
      "Date",
      "Time",
      "Description",
      "MeetingHeld",
      "Status",
      "StartTime",
      "EndTime",
      "Location",
      "ActivitySubject",
      "MeetingCategory",
      "ActivityMeetingId",
      "FileIds",
      "ReservationId",
      "MeetingGuestsPersonIds"
    ],
    MeetingDetails: [
      "ItemId",
      "InviteePersonId",
      "InviteePersonName",
      "InviteePersonEmail",
      "ActivityMeetingId",
      "MeetingStatus",
      "GuestCategory",
      "LinkBaseActionIds",
      "InviteeProposedUserId"
    ],
    SnTask: [
      "ItemId",
      "Title",
      "StartDate",
      "EndDate",
      "Priority",
      "Organizer",
      "ResponsiblePerson",
      "ResponsiblePersonName",
      "DenomTeam",
      "Team",
      "Status",
      "RelatedToCategory",
      "RelatedToItemName",
      "RelatedToItemDate",
      "RelatedToItemInfo",
      "Description",
      "TaskTags",
      "FileIds"
    ],
    SnBusinessOppurtunity: [
      "ItemId",
      "BusinessOpportunityName",
      "SelectedCustomerId",
      "SelectedCustomerName",
      "SelectedCustomerProfileImage",
      "CatagoryName",
      "SubCatagoryName",
      "PartnerName",
      "ProductName",
      "Unit",
      "Currency",
      "Frequency",
      "ExpiringDate",
      "SalesStage",
      "AsignedAdvisorName",
      "AsignedAdvisorId",
      "TeamOfAdvisors",
      "Description",
      "OpportunityTag",
      "FileIds",
      "BruttoBody",
      "CreatedBy"
    ],
    SnLinkBasedActionConfig: ["ItemId", "ContextName", "ShortUrlBase"],
    CampaignSegmentation: [
      "ItemId",
      "AdvisorPromotionId",
      "WorkflowInstanceId",
      "AdvisorPersonId",
      "AdvisorName",
      "AdvisorEmail",
      "CustomerPersonId",
      "CustomerEmail",
      "CustomerName",
      "CustomerPhoneNumber"
    ],
    NetworkPartner: [
      "Language",
      "Tags",
      "Address",
      "NetworkPartnerNr",
      "Country",
      "CountryCode",
      "Description",
      "Email",
      "Fax",
      "Logo",
      "Name",
      "NameMirror",
      "Phone",
      "Sector",
      "ShortName",
      "TotalEmployees",
      "Website",
      "PartnerSince",
      "ExistingContracts",
      "NewOpportunities",
      "NumberOfCustomers",
      "TotalProductionInCHF",
      "Rank",
      "Longitude",
      "Latitude"
    ]
  },
  AllSearchFieldsOfEntity: {
    Person: ["CustomerId", "DisplayName", "PhoneNumber"]
  },
  AllListFieldsOfEntity: {
    Person: [
      "ItemId",
      "CustomerId",
      "DisplayName",
      "PhoneNumber",
      "ColorCode",
      "ProfileImage",
      "Email",
      "Tags",
      "ProposedUserId"
    ],
    Connection: ["ChildEntityID"]
  },
  NotificationKeys: [
    {
      Type: "UserSpecificReceiverType",
      Keys: [
        "MessagingThreadNotification",
        "SchedulingNotification",
        "AssignAdvisorNotification",
        "LoanRequest",
        "RetirementRequest",
        "FirstTimeSignedIn",
        "ServiceCheckSubmit",
        "synccustomerdocument",
        "ConnectionResponse",
        "BankConnectionUpdated",
        "FinUserDeleted",
        "TransactionLoaded",
        "syncustomermeetingrecorddocument",
        "syncactivityevent",
        "customerupdatedinkvv",
        "customercreatedinkvv"
      ]
    },
    {
      Type: "FilterSpecificReceiverType",
      Keys: [
        "AdvisorAssignRequestNotification",
        "SolutionSubmit_qa_2999991",
        "SolutionSubmit_qa_2999992"
      ]
    }
  ],
  DATE_FORMATS: {
    parse: {
      dateInput: "DD/MM/YYYY"
    },
    display: {
      dateInput: "DD/MM/YYYY",
      monthYearLabel: "MMM YYYY",
      dateA11yLabel: "LL",
      monthYearA11yLabel: "MMMM YYYY"
    }
  },
  MeetingColorCode: {
    Meeting: {
      primary: "#7049f2",
      secondary: "#EEEEEE"
    },
    Events: {
      primary: "#323336",
      secondary: "#16171c"
    },
    Conference: {
      primary: "#6592e6",
      secondary: "#456ab0"
    },
    "Phone Call": {
      primary: "#FF0000",
      secondary: "#FF8080"
    },
    Appointment: {
      primary: "#00FFFF",
      secondary: "#80FFFF"
    }
  },
  ProfileImageUploaderConfig: {
    thumbnailHeight: 200,
    thumbnailWidth: 200,
    defaultImage: "https://cdn.selise.biz/arc2/user.jpg",
    profileImage: true,
    allowedImageTypes: ["jpg", "jpeg", "png"],
    maxImageSize: 5 // Megabyte,
  },
  ImageConversionSizes: [
    {
      Width: 32,
      Height: 32
    },
    {
      Width: 64,
      Height: 64
    },
    {
      Width: 128,
      Height: 128
    },
    {
      Width: 640,
      Height: 180
    },
    {
      Width: 400,
      Height: 200
    }
  ],
  ThumbnailDimensions: [
    {
      Width: 64,
      Height: 64
    },
    {
      Width: 128,
      Height: 128
    },
    {
      Width: 256,
      Height: 256
    },
    {
      Width: 512,
      Height: 512
    },
    {
      Width: 200,
      Height: 100
    }
  ],
  FormFileUploadNumberOfFiles: [1, 5, 10],
  FormFileUploadMaximumFileSize: ["1MB", "5MB", "10MB", "25MB"],
  FormFileUploadFileTypes: ["Document", "Spreadsheet", "PDF", "Image"],
  snackBar: {
    Duration: 2000,
    DurationError: 5000,
    VerticalPosition: "bottom",
    HorizontalPosition: "end",
    PanelClass: ["snackbar-message"]
  },
  CKEditorConfig: {
    toolbar: [
      {
        name: "clipboard",
        items: ["Cut", "Copy", "Paste", "-", "Undo", "Redo"]
      },
      { name: "links", items: ["Link", "Unlink"] },
      {
        name: "basicstyles",
        items: [
          "Bold",
          "Italic",
          "Underline",
          "Strike",
          "-",
          "TextColor",
          "BGColor",
          "-",
          "RemoveFormat"
        ]
      },
      {
        name: "paragraph",
        items: [
          "NumberedList",
          "BulletedList",
          "Blockquote",
          "JustifyLeft",
          "JustifyCenter",
          "JustifyRight",
          "JustifyBlock"
        ]
      }
    ],
    resize_enabled: false,
    extraPlugins: "colorbutton,colordialog",
    // entities: false,
    // basicEntities: true,
    // entities_greek: false,
    // entities_latin: false,
    // height : '25em',
    height: "200px",
    // font_names: 'Sans-Regualr',
    // format_h5 : { element : 'h5' , attributes: { 'class': 'mat-h5' }, styles: { font: '400 25px/25px Lato'}},
    // format_h3 : { element : 'h3' , attributes: { 'class': 'mat-h3' }, styles: { fontSize: '15px'}},
    // format_p : { element : 'p' , attributes: { 'class': 'mat-caption' } , styles: { fontSize: '13px'}},
    // extraCss: ['body {font-family:Sans-Regular;}'],
    // font_defaultLabel: 'Times New Roman/Times New Roman, Times, serif;',
    removePlugins:
      "elementspath" /*,
  on: {
      // maximize the editor on startup
      'instanceReady': function (evt) {
          evt.editor.resize('100%', document.querySelector('.ckEditor').clientHeight - 64);
      }
  }*/
  }
};
