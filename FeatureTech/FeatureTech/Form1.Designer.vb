<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class FT_Form1
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.l_Intro = New System.Windows.Forms.Label()
        Me.l_Username = New System.Windows.Forms.Label()
        Me.l_Name = New System.Windows.Forms.Label()
        Me.l_Team_name = New System.Windows.Forms.Label()
        Me.l_Tool_name = New System.Windows.Forms.Label()
        Me.l_Process_desc = New System.Windows.Forms.Label()
        Me.l_number = New System.Windows.Forms.Label()
        Me.b_Next = New System.Windows.Forms.Button()
        Me.rt_Process_desc = New System.Windows.Forms.RichTextBox()
        Me.txt_Username = New System.Windows.Forms.TextBox()
        Me.txt_Name = New System.Windows.Forms.TextBox()
        Me.txt_Team_name = New System.Windows.Forms.TextBox()
        Me.txt_Tool_name = New System.Windows.Forms.TextBox()
        Me.txt_Expected_users = New System.Windows.Forms.TextBox()
        Me.SuspendLayout()
        '
        'l_Intro
        '
        Me.l_Intro.AutoSize = True
        Me.l_Intro.Location = New System.Drawing.Point(13, 13)
        Me.l_Intro.Name = "l_Intro"
        Me.l_Intro.Size = New System.Drawing.Size(649, 17)
        Me.l_Intro.TabIndex = 0
        Me.l_Intro.Text = "Hello and wlecome to FeatureTech! To get started, tells us about yourself and the" &
    " way things are now:"
        '
        'l_Username
        '
        Me.l_Username.AutoSize = True
        Me.l_Username.Location = New System.Drawing.Point(16, 64)
        Me.l_Username.Name = "l_Username"
        Me.l_Username.Size = New System.Drawing.Size(73, 17)
        Me.l_Username.TabIndex = 1
        Me.l_Username.Text = "Username"
        '
        'l_Name
        '
        Me.l_Name.AutoSize = True
        Me.l_Name.Location = New System.Drawing.Point(441, 64)
        Me.l_Name.Name = "l_Name"
        Me.l_Name.Size = New System.Drawing.Size(77, 17)
        Me.l_Name.TabIndex = 2
        Me.l_Name.Text = "Your name"
        '
        'l_Team_name
        '
        Me.l_Team_name.AutoSize = True
        Me.l_Team_name.Location = New System.Drawing.Point(895, 64)
        Me.l_Team_name.Name = "l_Team_name"
        Me.l_Team_name.Size = New System.Drawing.Size(83, 17)
        Me.l_Team_name.TabIndex = 3
        Me.l_Team_name.Text = "Team name"
        '
        'l_Tool_name
        '
        Me.l_Tool_name.AutoSize = True
        Me.l_Tool_name.Location = New System.Drawing.Point(16, 123)
        Me.l_Tool_name.Name = "l_Tool_name"
        Me.l_Tool_name.Size = New System.Drawing.Size(77, 17)
        Me.l_Tool_name.TabIndex = 4
        Me.l_Tool_name.Text = "Tool Name"
        '
        'l_Process_desc
        '
        Me.l_Process_desc.AutoSize = True
        Me.l_Process_desc.Location = New System.Drawing.Point(16, 190)
        Me.l_Process_desc.Name = "l_Process_desc"
        Me.l_Process_desc.Size = New System.Drawing.Size(290, 17)
        Me.l_Process_desc.TabIndex = 5
        Me.l_Process_desc.Text = "Please describe the tool/process as it stands"
        '
        'l_number
        '
        Me.l_number.AutoSize = True
        Me.l_number.Location = New System.Drawing.Point(895, 123)
        Me.l_number.Name = "l_number"
        Me.l_number.Size = New System.Drawing.Size(373, 17)
        Me.l_number.TabIndex = 6
        Me.l_number.Text = "# of people using process (integer, closest approximation)"
        '
        'b_Next
        '
        Me.b_Next.Location = New System.Drawing.Point(1274, 502)
        Me.b_Next.Name = "b_Next"
        Me.b_Next.Size = New System.Drawing.Size(75, 23)
        Me.b_Next.TabIndex = 7
        Me.b_Next.Text = "Next"
        Me.b_Next.UseVisualStyleBackColor = True
        '
        'rt_Process_desc
        '
        Me.rt_Process_desc.Location = New System.Drawing.Point(19, 228)
        Me.rt_Process_desc.Name = "rt_Process_desc"
        Me.rt_Process_desc.Size = New System.Drawing.Size(1249, 297)
        Me.rt_Process_desc.TabIndex = 8
        Me.rt_Process_desc.Text = ""
        '
        'txt_Username
        '
        Me.txt_Username.Location = New System.Drawing.Point(96, 64)
        Me.txt_Username.Name = "txt_Username"
        Me.txt_Username.Size = New System.Drawing.Size(339, 22)
        Me.txt_Username.TabIndex = 9
        '
        'txt_Name
        '
        Me.txt_Name.Location = New System.Drawing.Point(525, 63)
        Me.txt_Name.Name = "txt_Name"
        Me.txt_Name.Size = New System.Drawing.Size(364, 22)
        Me.txt_Name.TabIndex = 10
        '
        'txt_Team_name
        '
        Me.txt_Team_name.Location = New System.Drawing.Point(985, 63)
        Me.txt_Team_name.Name = "txt_Team_name"
        Me.txt_Team_name.Size = New System.Drawing.Size(364, 22)
        Me.txt_Team_name.TabIndex = 11
        '
        'txt_Tool_name
        '
        Me.txt_Tool_name.Location = New System.Drawing.Point(100, 123)
        Me.txt_Tool_name.Name = "txt_Tool_name"
        Me.txt_Tool_name.Size = New System.Drawing.Size(562, 22)
        Me.txt_Tool_name.TabIndex = 12
        '
        'txt_Expected_users
        '
        Me.txt_Expected_users.Location = New System.Drawing.Point(898, 167)
        Me.txt_Expected_users.Name = "txt_Expected_users"
        Me.txt_Expected_users.Size = New System.Drawing.Size(155, 22)
        Me.txt_Expected_users.TabIndex = 13
        '
        'FT_Form1
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(8.0!, 16.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(1361, 537)
        Me.Controls.Add(Me.txt_Expected_users)
        Me.Controls.Add(Me.txt_Tool_name)
        Me.Controls.Add(Me.txt_Team_name)
        Me.Controls.Add(Me.txt_Name)
        Me.Controls.Add(Me.txt_Username)
        Me.Controls.Add(Me.rt_Process_desc)
        Me.Controls.Add(Me.b_Next)
        Me.Controls.Add(Me.l_number)
        Me.Controls.Add(Me.l_Process_desc)
        Me.Controls.Add(Me.l_Tool_name)
        Me.Controls.Add(Me.l_Team_name)
        Me.Controls.Add(Me.l_Name)
        Me.Controls.Add(Me.l_Username)
        Me.Controls.Add(Me.l_Intro)
        Me.Name = "FT_Form1"
        Me.Text = "FeatureTech"
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents l_Intro As Label
    Friend WithEvents l_Username As Label
    Friend WithEvents l_Name As Label
    Friend WithEvents l_Team_name As Label
    Friend WithEvents l_Tool_name As Label
    Friend WithEvents l_Process_desc As Label
    Friend WithEvents l_number As Label
    Friend WithEvents b_Next As Button
    Friend WithEvents rt_Process_desc As RichTextBox
    Friend WithEvents txt_Username As TextBox
    Friend WithEvents txt_Name As TextBox
    Friend WithEvents txt_Team_name As TextBox
    Friend WithEvents txt_Tool_name As TextBox
    Friend WithEvents txt_Expected_users As TextBox
End Class
