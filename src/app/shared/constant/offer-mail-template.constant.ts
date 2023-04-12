export const OfferEmailHeaderTemplate = `
<!DOCTYPE html>
<html
   style="
   height: 100%;
   margin: 0;
   padding: 0;
   border: 0;
   vertical-align: baseline;
   font-family: 'roboto', sans-serif;
   font-size: 14px;
   "
   >
   <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>DElTA Email</title>
      <style media="all" type="text/css">
         @media screen and (max-width: 567px) and (min-width: 320px) {
         .logo {
         text-align: center !important;
         }
         .mobile-padding {
         padding-right: 0 !important;
         padding-left: 0 !important;
         }
         }
         @media screen and (max-width: 600px) {
         .table-responsive {
         width: 100%;
         margin-bottom: 18px;
         overflow-y: hidden;
         border: 1px solid #f2f2f2;
         }
         .table-responsive > .table {
         margin-bottom: 0;
         }
         .table-responsive > .table > thead > tr > td,
         .table-responsive > .table > thead > tr > th,
         .table-responsive > .table > tbody > tr > td,
         .table-responsive > .table > tbody > tr > th,
         .table-responsive > .table > tfoot > tr > td,
         .table-responsive > .table > tfoot > tr > th {
         white-space: nowrap;
         }
         .table-responsive > .table-bordered {
         border: 0;
         }
         .table-responsive
         > .table-bordered
         > thead
         > tr
         > td:first-child,
         .table-responsive
         > .table-bordered
         > thead
         > tr
         > th:first-child,
         .table-responsive
         > .table-bordered
         > tbody
         > tr
         > td:first-child,
         .table-responsive
         > .table-bordered
         > tbody
         > tr
         > th:first-child,
         .table-responsive
         > .table-bordered
         > tfoot
         > tr
         > td:first-child,
         .table-responsive
         > .table-bordered
         > tfoot
         > tr
         > th:first-child {
         border-left: 0;
         }
         .table-responsive
         > .table-bordered
         > thead
         > tr
         > td:last-child,
         .table-responsive
         > .table-bordered
         > thead
         > tr
         > th:last-child,
         .table-responsive
         > .table-bordered
         > tbody
         > tr
         > td:last-child,
         .table-responsive
         > .table-bordered
         > tbody
         > tr
         > th:last-child,
         .table-responsive
         > .table-bordered
         > tfoot
         > tr
         > td:last-child,
         .table-responsive
         > .table-bordered
         > tfoot
         > tr
         > th:last-child {
         border-right: 0;
         }
         .table-responsive
         > .table-bordered
         > tbody
         > tr:last-child
         > td,
         .table-responsive
         > .table-bordered
         > tbody
         > tr:last-child
         > th,
         .table-responsive
         > .table-bordered
         > tfoot
         > tr:last-child
         > td,
         .table-responsive
         > .table-bordered
         > tfoot
         > tr:last-child
         > th {
         border-bottom: 0;
         }
         }
         @media print {
         md-sidenav,
         .md-fab {
         display: none !important;
         }
         md-content {
         overflow: visible;
         }
         .print-full {
         page-break-inside: avoid;
         }
         .full-height {
         height: auto;
         }
         }
         @media (max-width: 600px) {
         .mobile-fullwidth-dialog {
         max-width: 100%;
         min-height: 100%;
         }
         }
         @media screen and (min-width: 800px) {
         .pad_h_100_desktop {
         padding-left: 10rem !important;
         padding-right: 10rem !important;
         }
         }
         @media screen and (max-width: 799px) {
         .pad_h_100_desktop {
         padding-left: 2.5rem !important;
         padding-right: 2.5rem !important;
         }
         }
         @media screen and (max-width: 500px) {
         .mobile-display-block {
         display: block !important;
         }
         }
         table.request td,
         th {
         border: 1px solid #dddddd !important;
         text-align: left !important;
         padding: 8px !important;
         }
      </style>
   </head>
   <body
      style="
      font-weight: 400;
      vertical-align: baseline;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      color: #212121;
      font-family: 'roboto', sans-serif;
      min-width: 100%;
      font-size: 14px;
      line-height: 1.429;
      letter-spacing: 0.001em;
      background-color: #fff;
      height: 100%;
      border: 0;
      width: 100% !important;
      "
      >
      <table
         class="mui-body container"
         cellpadding="0"
         cellspacing="0"
         border="0"
         style="
         border-spacing: 0;
         vertical-align: baseline;
         mso-table-lspace: 0pt;
         mso-table-rspace: 0pt;
         -webkit-text-size-adjust: 100%;
         -ms-text-size-adjust: 100%;
         border: 0;
         border-collapse: collapse;
         font-size: 15px;
         height: 100%;
         color: #212121;
         font-family: Arial, Verdana, 'Trebuchet MS';
         font-weight: 400;
         padding: 0;
         line-height: 1.429;
         letter-spacing: 0.001em;
         margin: 0 auto;
         width: 100%;
         background-color: #fff !important;
         "
         width="100%"
         bgcolor="#fff !important"
         valign="baseline"
         >
      <tr>
         <td
            style="
            hyphens: auto;
            padding: 0;
            word-break: break-word;
            -webkit-hyphens: auto;
            -moz-hyphens: auto;
            text-align: left;
            -webkit-text-size-adjust: 100%;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            -ms-text-size-adjust: 100%;
            border-collapse: collapse !important;
            "
            align="left"
            ></td>
         <td
            style="
            hyphens: auto;
            padding: 0;
            word-break: break-word;
            -webkit-hyphens: auto;
            -moz-hyphens: auto;
            text-align: left;
            -webkit-text-size-adjust: 100%;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            -ms-text-size-adjust: 100%;
            border-collapse: collapse !important;
            "
            align="left"
            >
            <div
               class="content"
               style="
               margin: 0;
               padding: 0;
               border: 0;
               vertical-align: baseline;
               "
               >
            <center
               style="
               margin: 0;
               padding: 0;
               border: 0;
               vertical-align: baseline;
               "
               >
            <div
               class="mui-container mui-container--600 mobile-padding"
               style="
               vertical-align: baseline;
               padding: 0;
               border: 0;
               clear: both;
               text-align: left;
               padding-left: 15px;
               display: block;
               padding-top: 15px;
               padding-bottom: 15px;
               max-width: 600px;
               margin: 0 auto;
               padding-right: 15px;
               "
               >
            <table
               cellpadding="0"
               cellspacing="0"
               border="0"
               width="100%"
               style="
               -ms-text-size-adjust: 100%;
               border-spacing: 0;
               mso-table-lspace: 0pt;
               mso-table-rspace: 0pt;
               -webkit-text-size-adjust: 100%;
               border-collapse: collapse;
               border: 0;
               margin: 0;
               padding: 0;
               vertical-align: baseline;
               background-color: #fff !important;
               "
               bgcolor="#fff !important"
               valign="baseline"
               >
      <tr>
         <td
            class="mui-panel border_none"
            style="
            -webkit-text-size-adjust: 100%;
            word-break: break-word;
            -webkit-hyphens: auto;
            -moz-hyphens: auto;
            hyphens: auto;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            text-align: left;
            -ms-text-size-adjust: 100%;
            padding: 15px;
            border-bottom: 2px solid #d4d4d4;
            border-radius: 0;
            background-color: #fff;
            border-top: 1px solid #ededed;
            border-left: 1px solid #e6e6e6;
            border-right: 1px solid #e6e6e6;
            border-collapse: collapse !important;
            border: none !important;
            "
            align="left"
            bgcolor="#FFF"
            >
            <table
               id="content-wrapper"
               border="0"
               cellpadding="0"
               cellspacing="0"
               width="100%"
               style="
               -ms-text-size-adjust: 100%;
               border-spacing: 0;
               mso-table-lspace: 0pt;
               mso-table-rspace: 0pt;
               -webkit-text-size-adjust: 100%;
               border-collapse: collapse;
               border: 0;
               margin: 0;
               padding: 0;
               vertical-align: baseline;
               background-color: #fff !important;
               "
               bgcolor="#fff !important"
               valign="baseline"
               >
      <tbody>
         <tr>
            <td
               class="mui--text-right logo padding-h-24"
               style="
               mso-table-lspace: 0pt;
               padding: 0;
               word-break: break-word;
               -webkit-hyphens: auto;
               -moz-hyphens: auto;
               hyphens: auto;
               -ms-text-size-adjust: 100%;
               -webkit-text-size-adjust: 100%;
               mso-table-rspace: 0pt;
               text-align: center;
               padding-bottom: 15px;
               border-collapse: collapse !important;
               padding-left: 24px !important;
               padding-right: 24px !important;
               "
               align="right"
               >
               <a
                  href="https://www.deltagroup.cloud/"
                  style="
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                  color: #2196f3;
                  text-decoration: none;
                  margin: 0;
                  padding: 0;
                  border: 0;
                  vertical-align: baseline;
                  "
                  ><img
                  class="height-90"
                  src="https://cdn.selise.biz/delta/logo-delta/delta_logo_email.png"
                  alt="Delta"
                  style="
                  margin: 0;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                  -ms-interpolation-mode: bicubic;
                  max-width: 100%;
                  padding: 0;
                  vertical-align: baseline;
                  border: 0
                  none;
                  height: 120px !important;
                  min-height: 120px !important;
                  max-height: 120px !important;
                  "
                  /></a>
            </td>
         </tr>
         <tr>
            <td
               class="mui--text-left body_background_color padding-24"
               style="
               -webkit-hyphens: auto;
               -moz-hyphens: auto;
               hyphens: auto;
               word-break: break-word;
               mso-table-lspace: 0pt;
               mso-table-rspace: 0pt;
               -webkit-text-size-adjust: 100%;
               -ms-text-size-adjust: 100%;
               text-align: left;
               background-color: #f8f8f8;
               padding-bottom: 15px;
               padding: 24px !important;
               border-collapse: collapse !important;
               "
               id="display-custom-txt"
               align="left"
               bgcolor="#f8f8f8"
               >`;

export const OfferEmailFooterTemplate = `</td>
                                </tr>
                                </tbody>
                                </table>
                                </td>
                                </tr>
                                </table>
                                </div>
                                </center>
                                </div>
                                </td>
                                <td
                                style="
                                hyphens: auto;
                                padding: 0;
                                word-break: break-word;
                                -webkit-hyphens: auto;
                                -moz-hyphens: auto;
                                text-align: left;
                                -webkit-text-size-adjust: 100%;
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                -ms-text-size-adjust: 100%;
                                border-collapse: collapse !important;
                                "
                                align="left"
                                ></td>
                                </tr>
                                </table>
                                </body>
                                </html>
`;
