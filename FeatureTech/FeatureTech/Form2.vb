Imports System.Xml
Imports System.IO
Imports System.Text

Public Class FT_Form2
    Private Sub FT_Form2_Load(sender As Object, e As EventArgs) Handles MyBase.Load

    End Sub

    Private Sub b_Back_Click(sender As Object, e As EventArgs) Handles b_Back.Click
        'Returns to the previous form
        FT_Form1.Show()
        Me.Hide()
    End Sub

    Private Sub b_Submit_Click(sender As Object, e As EventArgs) Handles b_Submit.Click
        'Saves the information before moving it into an XML doc
        FT_Form1.User_sub.Req_features = rt_RFeatures.Text
        FT_Form1.User_sub.Report_req = rt_Reporting_reqs.Text
        FT_Form1.User_sub.Stakeholders = rt_Stakeholders.Text
        FT_Form1.User_sub.Maintenance = rt_Maintenance.Text
        FT_Form1.User_sub.Prev_disc = rt_Prev_discussions.Text
        'Dim Writer As XmlWriter()

        'Took heavy inspiration from http://vb.net-informations.com/xml/create-xml-vb.net.htm
        Dim writer As New XmlTextWriter("submission.xml", System.Text.Encoding.UTF8)
        writer.WriteStartDocument(True)
        writer.Formatting = Formatting.Indented
        writer.Indentation = 2
        writer.WriteStartElement("Submission")
        writer.WriteStartAttribute("")
        createNode("username", FT_Form1.User_sub.Username, writer)
        createNode("name", FT_Form1.User_sub.Name, writer)
        createNode("team_name", FT_Form1.User_sub.Team_name, writer)
        createNode("tool_name", FT_Form1.User_sub.Tool_name, writer)
        createNode("expected_users", FT_Form1.User_sub.Expected_users, writer)
        createNode("Process_desc", FT_Form1.User_sub.Process_desc, writer)
        createNode("Req_features", FT_Form1.User_sub.Req_features, writer)
        createNode("Report_req", FT_Form1.User_sub.Report_req, writer)
        createNode("Maintenance", FT_Form1.User_sub.Maintenance, writer)
        createNode("Prev_disc", FT_Form1.User_sub.Prev_disc, writer)
        createNode("Stakeholders", FT_Form1.User_sub.Stakeholders, writer)
        writer.WriteEndElement()
        writer.WriteEndDocument()
        writer.Close()

        FT_Form1.Close()
        Me.Close()

    End Sub

    Private Sub createNode(ByVal section As String, ByVal content As String, ByVal writer As XmlTextWriter)
        writer.WriteStartElement(section)
        writer.WriteString(content)
        writer.WriteEndElement()

    End Sub

End Class
Public Class Submission
    Public Property Username As String
    Public Property Name As String
    Public Property Team_name As String
    Public Property Tool_name As String
    Public Property Expected_users As String
    '^Maybe this should be an integer, but that would introduce a whole lot of needed checks that aren't currently in the scope of this program
    'May be changed depending on what the rest of the project needs
    Public Property Process_desc As String
    Public Property Req_features As String
    Public Property Report_req As String
    Public Property Maintenance As String
    Public Property Prev_disc As String
    Public Property Stakeholders As String
End Class
