Public Class FT_Form1
    Public User_sub As New Submission

    Private Sub b_Next_Click(sender As Object, e As EventArgs) Handles b_Next.Click
        'Saves the entries before moving to the next form
        User_sub.Username = txt_Username.Text
        User_sub.Name = txt_Name.Text
        User_sub.Team_name = txt_Team_name.Text
        User_sub.Tool_name = txt_Team_name.Text
        User_sub.Expected_users = Int(txt_Expected_users.Text)
        User_sub.Process_desc = rt_Process_desc.Text
        FT_Form2.Show()
        Me.Hide()
    End Sub
End Class